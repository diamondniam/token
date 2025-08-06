import { getRandomInt } from "@/utils/helpers";
import { LinearProgress, linearProgressClasses, styled } from "@mui/material";

export const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    transition: `transform ${getRandomInt(500, 1500)}ms ease-in-out`,
    transitionDelay: `${getRandomInt(500, 1500)}ms`,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));
