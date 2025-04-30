"use client"

import type React from "react"

import { WagmiConfig, createConfig } from "wagmi"
import { ConnectKitProvider, getDefaultConfig } from "connectkit"
import { mainnet } from "wagmi/chains"

// Configure chains & providers
const config = createConfig(
  getDefaultConfig({
    // Your dApp's info
    appName: "Lens App",
    // Optional: provide your own connectors
    // connectors: [],
    // Required API Keys
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "demo",
    // Required
    chains: [mainnet],
  }),
)

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>{children}</ConnectKitProvider>
    </WagmiConfig>
  )
}
