import { Dialog } from "@/components/ui";
import { getSlotProps } from "@/components/ui/dialog";
import type { AppDataStoreNFTDataItem } from "@/types";
import { Skeleton, Typography, useMediaQuery } from "@mui/material";

type NFTsListDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  data: AppDataStoreNFTDataItem | null;
};

export default function NFTsListDialog({ data, isOpen, onClose }: NFTsListDialogProps) {
  const isMobile = useMediaQuery($.theme.breakpoints.down("md"));

  return (
    <Dialog
      id="nft"
      isOpen={isOpen}
      slots={{
        content: (
          <>
            {data && (
              <>
                <img src={$.paths.ipfs(data?.uri)} alt={data?.name} style={{ width: "100%" }} />

                <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                  {data.description}
                </Typography>
              </>
            )}
          </>
        ),
      }}
      onClose={onClose}
      title={data?.name || <Skeleton width={100} animation="wave" />}
      options={{
        container: {
          slotProps: {
            ...getSlotProps(isMobile),
            paper: {
              ...getSlotProps(isMobile).paper,
              sx: {
                ...getSlotProps(isMobile).paper.sx,
                maxWidth: isMobile ? "auto" : "350px",
                maxHeight: isMobile ? "auto" : "550px",
                transition: "none !important",
              },
            },
          },
        },
      }}
    />
  );
}
