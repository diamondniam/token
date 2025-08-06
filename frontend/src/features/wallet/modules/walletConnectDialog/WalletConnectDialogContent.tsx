import { Avatar, Box, Stack, Typography } from "@mui/material";

import { getChains, getConnectors } from "@/utils/helpers";
import type { WalletDialogConetentProps } from "@/features/wallet/types";
import WalletConnectDialogIcon from "@/features/wallet/modules/walletConnectDialog/WalletConnectDialogIcon";
import type { Chain, Connector } from "@/types";

export default function WalletConnectDialogContent({
  chain,
  setChain,
  connector,
  setConnector,
}: WalletDialogConetentProps) {
  const steps = [
    {
      id: 1,
      title: "Choose Network",
      data: getChains(),
    },
    {
      id: 2,
      title: "Choose Wallet",
      data: getConnectors(),
    },
  ];

  const handleIconClick = (stepId: number, itemId: string) => {
    if (stepId === 1) {
      setChain(getChains().find((chain) => chain.stringId === itemId)!);
    } else if (stepId === 2) {
      setConnector(getConnectors().find((connector) => connector.id === itemId)!);
    }
  };

  const getIsActive = (stepId: number, item: Chain | Connector) => {
    if (stepId === 1) {
      return chain.stringId === item.stringId;
    } else if (stepId === 2) {
      return connector.id === item.id;
    } else {
      return false;
    }
  };

  const getItemId = (stepId: number, item: Chain | Connector): string => {
    if (stepId === 1) {
      return item.stringId as string;
    } else if (stepId === 2) {
      return item.id as string;
    } else {
      return "none";
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {steps.map((step) => (
        <Box key={step.id} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ width: 24, height: 24, fontSize: $.theme.typography.body2 }}>
              {step.id}
            </Avatar>

            <Typography sx={{ fontWeight: 500 }}>{step.title}</Typography>
          </Stack>

          <Stack direction="row" spacing={5} alignItems="center" justifyContent="space-evenly">
            {step.data.map((item: Chain | Connector) => (
              <WalletConnectDialogIcon
                key={item.id}
                isActive={getIsActive(step.id, item)}
                id={getItemId(step.id, item)}
                icon={item.icon}
                name={item.name}
                onClick={(id) => handleIconClick(step.id, id)}
              />
            ))}
          </Stack>
        </Box>
      ))}
    </Box>
  );
}
