import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import type { AppDataStoreNFTDataItem } from "@/types";

import { button } from "@/utils/styles";
import { Box, Card, CardContent, CardMedia, Grid, Skeleton, Typography } from "@mui/material";
import { TextClamped } from "@/components/ui";
import NFTsListDialog from "@/features/nfts/NFTsListDialog";
import NFTsListSkeleton from "@/features/nfts/NFTsListSkeleton";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";

import { IconButton } from "@mui/material";
import { useDebounce } from "@/utils/hooks";
import { useAppData } from "@/providers";

import $d from "@/assets/data/pages/nfts.json";

const CARD_HEIGHT = 450;

export default function NFTsList() {
  const { nftInfo } = useAppData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState<Record<string, boolean>>({});
  const [clickedNft, setClickedNft] = useState<AppDataStoreNFTDataItem | null>(null);
  const isFetching = useDebounce(nftInfo.isFetching, 100);

  const handleOpenDialog = (nft: AppDataStoreNFTDataItem) => {
    setClickedNft(nft);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <AnimatePresence initial={false} mode="wait">
        {!nftInfo.data?.balance ? (
          <motion.div key="empty" style={{ position: "relative" }} {...$.animations.getFade()}>
            <NFTsListSkeleton />

            {!isFetching && (
              <Box
                sx={{
                  position: "absolute",
                  top: `${CARD_HEIGHT / 2}px`,
                  left: "50%",
                  transform: "translate(-50%, -100%)",
                  bgcolor: "background.default",
                  minWidth: "200px",
                  px: 2,
                  py: 1,
                  borderRadius: 5,
                }}
              >
                <Typography color="text.secondary" sx={{ textAlign: "center" }}>
                  {$d.noNFTs}
                </Typography>
              </Box>
            )}
          </motion.div>
        ) : (
          <motion.div key="nfts" {...$.animations.getFade()}>
            {nftInfo.data?.balance && (
              <>
                <Grid key="second" container spacing={2}>
                  {nftInfo.data.items.map((nft) => (
                    <Grid key={nft.uri} size={{ xs: 12, sm: 4, md: 3 }}>
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <CardContent>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isImageLoaded[nft.uri] ? 1 : 0 }}
                            style={{
                              position: isImageLoaded[nft.uri] ? "relative" : "absolute",
                            }}
                          >
                            <CardMedia
                              component="img"
                              image={$.paths.ipfs(nft.uri)}
                              alt={nft.name}
                              onLoad={() =>
                                setIsImageLoaded((prev) => ({ ...prev, [nft.uri]: true }))
                              }
                            />
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{
                              opacity: isImageLoaded[nft.uri] ? 0 : 1,
                            }}
                            style={{
                              position: isImageLoaded[nft.uri] ? "absolute" : "relative",
                            }}
                          >
                            <Skeleton
                              variant="rounded"
                              width={"100%"}
                              height={"250px"}
                              animation="wave"
                            />
                          </motion.div>

                          <Box sx={{ mt: 2 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                              <Typography variant="h5" sx={{ fontWeight: $.theme.font.lg }}>
                                {nft.name}
                              </Typography>

                              <IconButton
                                size="small"
                                sx={{ ...button.variants.text.primary, px: 0.7 }}
                                onClick={() => handleOpenDialog(nft)}
                              >
                                <OpenInFullIcon fontSize="small" color="primary" />
                              </IconButton>
                            </Box>

                            <TextClamped options={{ variant: "body2", color: "text.secondary" }}>
                              {nft.description}
                            </TextClamped>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                <NFTsListDialog
                  data={clickedNft}
                  isOpen={isDialogOpen}
                  onClose={handleCloseDialog}
                />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
