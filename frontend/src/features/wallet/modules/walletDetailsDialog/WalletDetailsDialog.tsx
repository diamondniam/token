import { useMemo } from "react";
import { useAccount, useBalance } from "wagmi";

import type { WalletDetailsDialogProps } from "@/features/wallet/types";

import { Dialog } from "@/components/ui";
import { Box, Button, Link, Skeleton, Typography } from "@mui/material";
import { CopyIcon } from "@/components/icons";
import LogoutIcon from "@mui/icons-material/Logout";

import { useAllowedChain } from "@/utils/hooks";
import { useErrors } from "@/stores";
import { getItemById, elipseText } from "@/utils/helpers";
import { useAppData } from "@/providers";

export default function WalletDetailsDialog({ isOpen, onClose }: WalletDetailsDialogProps) {
  const { address, chain: wagmiChain, connector } = useAccount();
  const { addressInfo, nftInfo } = useAppData();
  const { setIsSomethingWrong } = useErrors();
  const { data: chain } = useAllowedChain({ chain: wagmiChain });
  const { data: balance } = useBalance({ address });

  const addressTokens = useMemo(() => {
    if (addressInfo.data?.length) {
      const tokensOptions = getItemById(addressInfo.data, "buyerTokens");

      if (tokensOptions) {
        return tokensOptions.formatted;
      } else {
        console.error("Tokens not found");
        setIsSomethingWrong(true);
      }
    } else {
      return null;
    }
  }, [addressInfo.data]);

  const handleLogOut = () => {
    if (connector) {
      connector.disconnect().then(() => {
        onClose();
      });
    }
  };

  const data = [
    {
      id: "address",
      title: "Address",
      component: (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 3,
            alignItems: "center",
          }}
        >
          {address ? (
            <>
              <Link
                href={`${chain?.blockExplorers?.default.url}/address/${address}`}
                underline="none"
                target="_blank"
                rel="noreferrer"
                sx={{ fontWeight: 500 }}
              >
                {elipseText(String(address), 12)}
              </Link>
              <CopyIcon
                title="Copy Address"
                string={String(address)}
                options={{
                  container: {
                    sx: {
                      position: "absolute",
                      right: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                    },
                  },
                }}
              />{" "}
            </>
          ) : (
            <Typography>
              <Skeleton width={200} animation="wave" />
            </Typography>
          )}
        </Box>
      ),
    },
    {
      id: "network",
      title: "Network",
      component: (
        <>
          {chain?.name ? (
            <Typography>{chain?.name}</Typography>
          ) : (
            <Typography>
              <Skeleton width={100} animation="wave" />
            </Typography>
          )}
        </>
      ),
    },
    {
      id: "balance",
      title: "Balance",
      component: (
        <>
          {balance?.formatted ? (
            <Typography>
              {Number(balance?.formatted).toFixed(4) + " " + chain?.nativeCurrency?.symbol}
            </Typography>
          ) : (
            <Typography>
              <Skeleton width={100} animation="wave" />
            </Typography>
          )}
        </>
      ),
    },
    {
      id: "tokenBalance",
      title: "Tokens",
      component: (
        <>
          {addressTokens ? (
            <Typography>{addressTokens}</Typography>
          ) : (
            <Typography>
              <Skeleton width={100} animation="wave" />
            </Typography>
          )}
        </>
      ),
    },
    {
      id: "nftBalance",
      title: "NFTs owned",
      component: (
        <>
          {nftInfo.data?.balance !== undefined ? (
            <Typography>{nftInfo.data?.balance}</Typography>
          ) : (
            <Typography>
              <Skeleton width={40} animation="wave" />
            </Typography>
          )}
        </>
      ),
    },
  ];

  return (
    <Dialog
      id="wallet-details"
      isOpen={isOpen}
      onClose={onClose}
      title="Account"
      slots={{
        content: (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {data.map((item) => (
              <Box key={item.id} sx={{ position: "relative" }}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: $.theme.font.xs }}
                  color="text.secondary"
                >
                  {item.title}
                </Typography>

                {item.component}
              </Box>
            ))}
          </Box>
        ),
        actions: (
          <Button
            startIcon={<LogoutIcon />}
            disableElevation
            onClick={handleLogOut}
            fullWidth
            sx={{ borderRadius: 5 }}
          >
            Disconnect Wallet
          </Button>
        ),
      }}
    />
  );
}
