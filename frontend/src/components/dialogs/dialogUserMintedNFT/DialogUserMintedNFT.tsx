import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

import { useDialogUserMintedNFT } from "@/components/dialogs/dialogUserMintedNFT/dialogUserMintedNFTStore";
import { Dialog } from "@/components/ui";
import { Box, Typography, useMediaQuery } from "@mui/material";

import { getSlotProps } from "@/components/ui/dialog";
import { Skeleton } from "@mui/material";
import { createPortal } from "react-dom";

export default function DialogUserMintedNFT() {
  const { data, type, isOpen, setIsOpen } = useDialogUserMintedNFT();
  const isMobile = useMediaQuery($.theme.breakpoints.down("sm"));
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const ConfettiTeleported = () => {
    return createPortal(
      <motion.div
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          top: 0,
          zIndex: 10000,
          pointerEvents: "none",
          overflow: "hidden",
        }}
        {...$.animations.getFade()}
      >
        <Confetti numberOfPieces={isOpen ? 100 : 0} />
      </motion.div>,
      document.querySelector("body")!,
    );
  };

  const size = useMemo(() => {
    if (type === "allMinted") {
      let base = {
        height: "auto",
        minHeight: "auto",
        maxHeight: "auto",
        borderRadius: 5,
      };

      if (isMobile) {
        return {
          ...base,
          maxWidth: 250,
        };
      } else {
        return {
          ...base,
          maxHeight: 550,
          maxWidth: 400,
        };
      }
    } else if (type === "default") {
      if (isMobile) {
        return {
          maxWidth: "auto",
          maxHeight: "auto",
        };
      } else {
        return {
          maxWidth: 350,
          maxHeight: 550,
        };
      }
    }
  }, [isMobile, type]);

  useEffect(() => {
    if (data) {
      setIsImageLoaded(false);
    }
  }, [data]);

  return (
    <>
      <Dialog
        id="user-minted-nft"
        title={
          type === "allMinted"
            ? "You have minted all NFTs. Congratulations!"
            : "You have minted an NFT!"
        }
        isOpen={isOpen}
        options={{
          container: {
            slotProps: {
              ...getSlotProps(isMobile),
              paper: {
                ...getSlotProps(isMobile).paper,
                sx: {
                  ...getSlotProps(isMobile).paper.sx,
                  ...size,
                },
              },
            },
            fullScreen: isMobile,
          },
        }}
        slots={{
          content: data && (
            <>
              {data && (
                <>
                  <motion.img
                    src={$.paths.ipfs(data.uri)}
                    alt={data.name}
                    style={{ width: "100%", position: isImageLoaded ? "static" : "absolute" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isImageLoaded ? 1 : 0 }}
                    onLoad={() => setIsImageLoaded(true)}
                  />
                  <motion.div
                    animate={{ opacity: isImageLoaded ? 0 : 1 }}
                    style={{ position: isImageLoaded ? "absolute" : "static" }}
                  >
                    <Skeleton variant="rounded" width={"100%"} height={300} animation="wave" />
                  </motion.div>

                  <Box sx={{ mt: 3 }}>
                    <Typography variant="h4" sx={{ fontWeight: $.theme.font.lg }}>
                      {data.name}
                    </Typography>

                    <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                      {data.description}
                    </Typography>
                  </Box>
                </>
              )}
            </>
          ),
        }}
        onClose={() => setIsOpen(false)}
      />

      {isOpen && type === "allMinted" && <ConfettiTeleported />}
    </>
  );
}
