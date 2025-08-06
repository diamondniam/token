import { useState } from "react";
import parse, { domToReact, type HTMLReactParserOptions, type DOMNode } from "html-react-parser";
import { motion } from "framer-motion";

import {
  Button,
  Typography,
  Box,
  Container,
  Stepper,
  Step,
  Grid,
  StepContent,
  StepButton,
  Link,
} from "@mui/material";
import { button } from "@/utils/styles";

import $d from "@/assets/data/pages/home.json";

export default function HomeHowTo() {
  const [activeStep, setActiveStep] = useState(0);

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const descriptionParserOptions: HTMLReactParserOptions = {
    replace: (domNode: any) => {
      if (domNode.type === "tag" && domNode.name === "a") {
        return (
          <Link
            href={domNode.attribs.href}
            target={domNode.attribs.target}
            rel="noreferrer"
            underline="hover"
            color="primary"
          >
            {domToReact(domNode.children as DOMNode[], descriptionParserOptions)}
          </Link>
        );
      }
    },
  };

  return (
    <Box sx={{ py: 7 }} component="section">
      <Container component={motion.div} {...$.animations.getFadeInView()}>
        <Typography
          variant="body1"
          color="primary.main"
          sx={{ mb: 1, fontWeight: $.theme.font.xl, textAlign: "center" }}
        >
          {$d.howTo.title}
        </Typography>
        <Typography
          variant="h4"
          component="div"
          color="text.primary"
          sx={{ fontWeight: "bold", pb: 6, textAlign: "center" }}
        >
          {$d.howTo.description}
        </Typography>

        <Grid container spacing={0} justifyContent="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Stepper activeStep={activeStep} orientation="vertical" nonLinear>
              {$d.howTo.steps.map((step, index) => (
                <Step key={step.label}>
                  <StepButton color="inherit" onClick={handleStep(index)}>
                    <Typography variant="h6" component="div">
                      {step.label}
                    </Typography>
                  </StepButton>

                  <StepContent>
                    <Typography color="text.secondary">
                      {parse(step.description, descriptionParserOptions)}
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                      <div>
                        <Button
                          disableElevation
                          onClick={index === $d.howTo.steps.length - 1 ? handleReset : handleNext}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          {index === $d.howTo.steps.length - 1 ? "Again" : "Got It"}
                        </Button>

                        <Button
                          disabled={index === 0}
                          onClick={handleBack}
                          sx={{ mt: 1, mr: 1, ...button.variants.third }}
                        >
                          previous step
                        </Button>
                      </div>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
