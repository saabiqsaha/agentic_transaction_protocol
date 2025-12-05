'use client';

import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { Network } from "@aptos-labs/ts-sdk";
import { ReactNode } from "react";

export function WalletProvider({ children }: { children: ReactNode }) {
  return (
    <AptosWalletAdapterProvider
      autoConnect={true}
      dappConfig={{
        network: Network.TESTNET,
        aptosConnectDappId: "cowrie-dev-portal",
      }}
      onError={(error) => {
        // Silently handle wallet errors
        if (error) {
          console.log("Wallet adapter:", error.message || "No wallet detected");
        }
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
}
