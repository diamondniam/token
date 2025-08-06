import { useEffect, useMemo, useState } from "react";
import { useAccount, useBalance, useWaitForTransactionReceipt } from "wagmi";
import { motion, AnimatePresence } from "framer-motion";

import { getContractEvents, getItemById, readContract } from "@/utils/helpers";
import type { AppDataHandledItemOptions } from "@/types";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { SnackbarTxStatus } from "@/components/snackbars";
import PreSaleOpenedCardSkeleton from "@/features/preSale/modules/PreSaleOpenedCardSkeleton";
import { toFixed } from "@/utils/helpers";
import { parseEther, zeroAddress } from "viem";
import type { SnackbarTxStatusType } from "@/components/snackbars/SnackbarTxStatus";
import { useErrors } from "@/stores";
import { useAllowedChain, useWriteContract } from "@/utils/hooks";
import { useAppData } from "@/providers";

import $d from "@/assets/data/pages/stake.json";
import $nfts from "@/assets/data/pages/nfts.json";
import { useDialogUserMintedNFT } from "@/components/dialogs/dialogUserMintedNFT";

export default function StakeCard() {
  const { chain: wagmiChain, address } = useAccount();
  const { data: chain } = useAllowedChain({ chain: wagmiChain });
  const { refetch: refetchBalance } = useBalance({ address });
  const { tokenInfo, addressInfo, nftInfo } = useAppData();
  const { setIsChainWrong } = useErrors();
  const [buyTx, setBuyTx] = useState<`0x${string}` | undefined>(undefined);
  const [amountToBuy, setAmountToBuy] = useState("0.1");

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarStatus, setSnackbarStatus] = useState<SnackbarTxStatusType>("error");

  const {
    setData: setDialogNFTMintedData,
    setIsOpen: setDialogIsNFTMintedOpen,
    setType: setDialogNFTMintedType,
  } = useDialogUserMintedNFT();

  const isMobile = useMediaQuery($.theme.breakpoints.down("sm"));

  const {
    isError: buyTxError,
    isSuccess: buyTxSuccess,
    error: buyTxErrorData,
  } = useWaitForTransactionReceipt({
    hash: buyTx,
  });

  const { writeContract } = useWriteContract();

  const data = useMemo(() => {
    if (!address) {
      if (!tokenInfo.data?.length) return [];
      else {
        return tokenInfo.data.filter((item) => item.id !== "preSale");
      }
    } else {
      if (!tokenInfo.data?.length || !addressInfo.data?.length || !nftInfo.data) return [];
      const buyerSection = JSON.parse(JSON.stringify(addressInfo.data));
      buyerSection[0].data.push({
        id: "nftTokens",
        title: "NFTs Earned",
        formatted: nftInfo.data.balance.toString(),
        value: nftInfo.data.balance,
      });
      const _data = [...tokenInfo.data, ...buyerSection];
      return _data.filter((item) => item.id !== "preSale");
    }
  }, [tokenInfo.data, addressInfo.data, nftInfo.data, address]);

  const convertedAmount = useMemo(() => {
    if (amountToBuy && tokenInfo.data) {
      const tokenPrice = getItemById(tokenInfo.data, "tokenPrice");

      if (tokenPrice) {
        return toFixed(Number(amountToBuy) / Number(tokenPrice.value), 2);
      } else return 0;
    } else return 0;
  }, [amountToBuy, tokenInfo.data]);

  useEffect(() => {
    if (buyTxError) {
      console.error(buyTxErrorData);
      setSnackbarStatus("error");
      setIsSnackbarOpen(true);
    } else if (buyTxSuccess) {
      setSnackbarStatus("success");
      setIsSnackbarOpen(true);
      tokenInfo.refetch();
      addressInfo.refetch();
      refetchBalance();
      console.log(nftInfo);
      nftInfo.refetch();

      getContractEvents({
        contractName: "nft",
        chain: chain!,
        name: "Transfer",
        from: zeroAddress,
        to: address,
      }).then((data) => {
        if (data.length) {
          const nftEvent = data.find((item) => item.args.tokenId);

          if (nftEvent) {
            readContract({
              chain: chain!,
              contractName: "nft",
              fn: "tokenURI",
              args: [nftEvent?.args.tokenId],
            }).then((uri) => {
              if (uri) {
                const nft = $nfts.items.find((item) => item.uri === uri);

                if (nft) {
                  console.log(
                    nftInfo.data?.items?.length || 0 + 1,
                    nftInfo.data?.totalNFTs?.length,
                  );
                  if ((nftInfo.data?.items?.length || 0) + 1 === nftInfo.data?.totalNFTs?.length) {
                    setDialogNFTMintedType("allMinted");
                  } else {
                    setDialogNFTMintedType("default");
                  }

                  setDialogNFTMintedData(nft);
                  setDialogIsNFTMintedOpen(true);
                }
              }
            });
          }
        }
      });
    }
  }, [buyTxError, buyTxSuccess]);

  const handleBuy = () => {
    if (chain) {
      writeContract({
        chain,
        contractName: "staking",
        fn: "stake",
        value: parseEther(amountToBuy),
      })
        .then((hash) => {
          if (hash) {
            setBuyTx(hash);
            setSnackbarStatus("awaiting");
          } else {
            setSnackbarStatus("error");
          }
        })
        .catch(() => {
          setSnackbarStatus("error");
        })
        .finally(() => {
          setIsSnackbarOpen(true);
        });
    } else {
      setIsChainWrong(true);
    }
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid size={{ xs: 12, md: 6 }}>
        <AnimatePresence initial={false}>
          {data.length ? (
            <motion.div key="data" {...$.animations.getFade()}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 10,
                  p: 1,
                }}
              >
                <CardContent>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {data.map((section) => (
                      <Box key={section.id}>
                        <Divider textAlign="left">
                          <Chip
                            label={section.title}
                            slotProps={{
                              label: { sx: { fontWeight: $.theme.font.xl } },
                            }}
                          />
                        </Divider>

                        {section.data.map((item: AppDataHandledItemOptions) => (
                          <Stack
                            direction={isMobile ? "column" : "row"}
                            justifyContent="space-between"
                            alignItems={isMobile ? "start" : "center"}
                            mt={2}
                            key={item.id}
                          >
                            <Typography
                              color="text.primary"
                              sx={{ fontWeight: 500 }}
                              variant="body1"
                              display="block"
                            >
                              {item.title}
                            </Typography>

                            <Typography
                              color="text.secondary"
                              sx={{ fontWeight: 500 }}
                              variant="body1"
                              display="block"
                            >
                              {item.formatted}
                            </Typography>
                          </Stack>
                        ))}
                      </Box>
                    ))}
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                      width: "100%",
                      mt: 4,
                    }}
                  >
                    <Typography
                      variant="caption"
                      color="primary.main"
                      sx={{ fontWeight: 700, mb: 1 }}
                    >
                      {$d.inputs.buy.label}
                    </Typography>

                    <TextField
                      id="amountToBuy"
                      type="number"
                      inputMode="numeric"
                      required
                      label={$d.inputs.buy.placeholder}
                      variant="standard"
                      value={amountToBuy}
                      slotProps={{
                        inputLabel: {
                          shrink: true,
                        },
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              {chain?.nativeCurrency.symbol}
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end" sx={{ color: "text.secondary" }}>
                              ~ {convertedAmount} DNM
                            </InputAdornment>
                          ),
                          autoComplete: "off",
                        },
                      }}
                      fullWidth
                      error={!Number(amountToBuy) || Number(amountToBuy) <= 1 / 1e5}
                      sx={{ mb: 2 }}
                      onChange={(e) => setAmountToBuy(e.target.value)}
                    />
                  </Box>
                </CardContent>

                <CardActions>
                  <Button variant="contained" size="large" fullWidth onClick={handleBuy}>
                    {$d.buttons.buy}
                  </Button>
                </CardActions>
              </Card>
            </motion.div>
          ) : (
            <motion.div key="skeleton" {...$.animations.getFade()}>
              <PreSaleOpenedCardSkeleton />
            </motion.div>
          )}
        </AnimatePresence>
      </Grid>

      <SnackbarTxStatus
        isOpen={isSnackbarOpen}
        setIsOpen={setIsSnackbarOpen}
        status={snackbarStatus}
      />
    </Grid>
  );
}
