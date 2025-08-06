import { getChains, getConnectors } from "@/utils/helpers";

type ConnectorSignInProps = {
  chainId: number;
};

export function signIn({ chainId, connectorId }: { chainId: string; connectorId: string }) {
  const chainNumberId = getChains().find((chain) => chain.stringId === chainId)!.id;

  switch (connectorId) {
    case "walletConnect":
      walletConnectSignIn({ chainId: chainNumberId });
      break;
    default:
      injectedSignIn({ chainId: chainNumberId });
      break;
  }
}

async function walletConnectSignIn({ chainId }: ConnectorSignInProps) {
  const walletConnectConnector = getConnectors().find(
    (connector) => connector.id === "walletConnect",
  );

  if (walletConnectConnector) {
    walletConnectConnector.connect({ chainId });
  }
}

function injectedSignIn({ chainId }: ConnectorSignInProps) {
  const injectedConnector = getConnectors().find((connector) => connector.id === "injected");

  if (injectedConnector) {
    injectedConnector.connect({ chainId });
  }
}
