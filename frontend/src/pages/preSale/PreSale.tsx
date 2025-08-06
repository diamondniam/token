import { useEffect, useMemo, useState } from "react";

import { button } from "@/utils/styles";

import { usePreSale } from "@/pages/preSale";

import { PreSaleEnded, PreSaleNotStarted, PreSaleOpened } from "@/features/preSale";
import { Box, Button, Container, Divider, Typography } from "@mui/material";

import { AnimatePresence, motion } from "framer-motion";

import $d from "@/assets/data/pages/preSale.json";

const OPENS_AFTER = 1 * 15 * 1000;
const CLOSES_AFTER = 2 * 15 * 1000;

export default function PreSale() {
  const [now, setNow] = useState<number>(Date.now());
  const {
    isOpened: isOpenedStore,
    opensIn,
    closesIn,
    isClosed: isClosedStore,
    setClosesIn,
    setOpensIn,
    setIsOpened,
    setIsClosed,
  } = usePreSale();

  const isOpened = useMemo(() => {
    return isOpenedStore || (opensIn && closesIn && now > opensIn && now < closesIn);
  }, [now, opensIn, closesIn]);

  useEffect(() => {
    if (isOpened) {
      setIsOpened(isOpened);
    }
  }, [isOpened]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (!isClosedStore) {
      setOpensIn(Date.now() + OPENS_AFTER);
      setClosesIn(Date.now() + CLOSES_AFTER);

      interval = setInterval(() => {
        setNow(Date.now());
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  const handleStop = () => {
    if (isClosedStore) {
      setIsClosed(false);
    } else {
      setIsClosed(true);
    }
  };

  return (
    <>
      <Container sx={{ pt: 5, display: "flex", flexDirection: "column" }}>
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
            {$d.description}
          </Typography>

          {isOpened && (
            <Button
              color="primary"
              sx={{ ...button.variants.text.primary, mt: 2 }}
              onClick={handleStop}
            >
              {isClosedStore ? $d.buttons.back : $d.buttons.stop}
            </Button>
          )}
        </Box>
      </Container>

      <Divider sx={{ borderColor: "$border.main" }} />

      <Container
        sx={{
          bgcolor: "neutral.main",
          py: 7,
          mb: 4,
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isClosedStore ? (
            <motion.div key="ended" {...$.animations.getFade()}>
              <PreSaleEnded />
            </motion.div>
          ) : !isOpened ? (
            <motion.div key="not-started" {...$.animations.getFade()}>
              <PreSaleNotStarted />
            </motion.div>
          ) : (
            <motion.div key="opened" {...$.animations.getFade()}>
              <PreSaleOpened />
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </>
  );
}
