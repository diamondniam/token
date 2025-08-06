import { Box, Container, Skeleton, Typography } from "@mui/material";
import { PageGuard } from "@/components";
import NFTsList from "@/features/nfts";
import { usePreSale } from "@/pages/preSale";
import parse, { type HTMLReactParserOptions } from "html-react-parser";

import $d from "@/assets/data/pages/nfts.json";
import { useAppData } from "@/providers";
import { useEffect, useMemo } from "react";
import { useDialogUserMintedNFT } from "@/components/dialogs/dialogUserMintedNFT";
import { useNFTs } from "@/pages/nfts/NFTsStore";

export default function NFTs() {
  const { isClosed: isPreSaleClosed } = usePreSale();
  const {
    setType: setDialogNFTMintedType,
    setIsOpen: setDialogIsNFTMintedOpen,
    setData: setDialogNFTMintedData,
  } = useDialogUserMintedNFT();
  const { isAllCollectedShown, setIsAllCollectedShown } = useNFTs();
  const { nftInfo } = useAppData();

  const isAllCollected = useMemo(() => {
    return nftInfo.data?.items?.length === nftInfo.data?.totalNFTs?.length;
  }, [nftInfo.data]);

  const descriptionParserOptions: HTMLReactParserOptions = {
    replace: (domNode: any) => {
      if (domNode.type === "tag" && domNode.name === "total") {
        return (
          <>
            {nftInfo.data?.totalNFTs?.length ? (
              nftInfo.data.totalNFTs.length
            ) : (
              <Skeleton
                variant="text"
                component="span"
                animation="wave"
                width={30}
                sx={{ display: "inline-block", translate: "0 5px" }}
              />
            )}
          </>
        );
      }
    },
  };

  useEffect(() => {
    if (isAllCollected && !isAllCollectedShown && isPreSaleClosed) {
      setDialogNFTMintedData(undefined);
      setDialogNFTMintedType("allMinted");
      setDialogIsNFTMintedOpen(true);
      setIsAllCollectedShown(true);
    }
  }, [isAllCollected]);

  return (
    <PageGuard condition={isPreSaleClosed}>
      <Container sx={{ pt: 5 }}>
        <Box sx={{ mb: 4 }}>
          <Typography
            color="primary.main"
            variant="h4"
            sx={{ fontWeight: "bold", mb: 1 }}
            component="div"
          >
            {$d.title}
          </Typography>

          <Typography variant="body1" color="text.secondary">
            {parse($d.description, descriptionParserOptions)}
          </Typography>

          {isAllCollected && (
            <Typography variant="body1" color="text.secondary">
              {$d.youHaveAll}
            </Typography>
          )}
        </Box>
      </Container>

      <Container
        sx={{
          py: 7,
          borderTop: 1,
          borderColor: "$border.main",
          mb: 4,
        }}
      >
        <NFTsList />
      </Container>
    </PageGuard>
  );
}
