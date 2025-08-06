import { Box, Container, Divider, Typography } from "@mui/material";
import { StakeCard, StakeSteps } from "@/features/stake";

import { useAccount } from "wagmi";
import { PageGuard } from "@/components";
import { usePreSale } from "@/pages/preSale";

import $d from "@/assets/data/pages/stake.json";
import parse, { domToReact, type DOMNode, type HTMLReactParserOptions } from "html-react-parser";

export default function Stake() {
  const { isConnected } = useAccount();
  const { isClosed } = usePreSale();

  const descriptionParserOptions: HTMLReactParserOptions = {
    replace: (domNode: any) => {
      if (domNode.type === "tag" && domNode.name === "strong") {
        return (
          <Typography component="span" color="primary.main">
            {domToReact(domNode.children as DOMNode[], descriptionParserOptions)}
          </Typography>
        );
      }
    },
  };

  return (
    <PageGuard condition={isClosed}>
      <Container sx={{ pt: 5 }}>
        <Box sx={{ mb: 6 }}>
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
        </Box>
      </Container>

      <Divider sx={{ borderColor: "$border.main" }} />

      <Container
        sx={{
          py: 7,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        {!isConnected && <StakeSteps />}

        <StakeCard />
      </Container>
    </PageGuard>
  );
}
