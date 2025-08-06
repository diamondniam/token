import { DialogUserMintedNFT } from "@/components";
import { Footer, Header } from "@/features";
import { Box } from "@mui/material";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      <Box
        component="main"
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column", minHeight: "60vh" }}
      >
        {children}
      </Box>

      <DialogUserMintedNFT />

      <Footer />
    </Box>
  );
}
