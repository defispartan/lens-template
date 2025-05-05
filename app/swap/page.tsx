"use client"

import { LiFiWidget } from '@lifi/widget'
import { useAccount } from 'wagmi'

export default function SwapPage() {
  const { isConnected } = useAccount()

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-xl text-gray-600">Connect Wallet to view swap</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen p-4">
      <div className="w-full">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-bold">Swap / Bridge</h1>
          <p className="text-gray-500">Swap and bridge tokens on Lens Chain</p>
        </div>

        <div className="mt-6 pl-0">
          <div className="w-full">
            <LiFiWidget
              integrator="Lens Chain"
              config={{
                variant: "wide",
                theme: {
                  container: {
                    border: "1px solid rgb(234, 234, 234)",
                    borderRadius: "16px",
                  },
                  palette: {
                    primary: {
                      main: "#000000",
                    },
                    secondary: {
                      main: "#666666",
                    },
                    background: {
                      paper: "#FFFFFF",
                      default: "#FFFFFF",
                    },
                    text: {
                      primary: "#000000",
                      secondary: "#666666",
                    },
                  },
                },
                fromChain: 232,
                toChain: 232,
                appearance: "light",
                bridges: {
                  allow: ["across"],
                },
                hiddenUI: ["poweredBy", "walletMenu"],
                tokens: {
                  featured: [
                    {
                      address: "0x0000000000000000000000000000000000000000",
                      symbol: "GHO",
                      decimals: 18,
                      chainId: 232,
                      name: "GHO Token",
                      logoURI: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMDAgMzAwIj4KICA8ZGVmcz4KICAgIDxzdHlsZT4KICAgICAgLmNscy0xIHsKICAgICAgICBmaWxsOiAjMjhkMzU4OwogICAgICB9CgogICAgICAuY2xzLTEsIC5jbHMtMiB7CiAgICAgICAgc3Ryb2tlLXdpZHRoOiAwcHg7CiAgICAgIH0KCiAgICAgIC5jbHMtMiB7CiAgICAgICAgZmlsbDogI2ZmZjsKICAgICAgfQogICAgPC9zdHlsZT4KICA8L2RlZnM+CiAgPGNpcmNsZSBjbGFzcz0iY2xzLTEiIGN4PSIxNTAiIGN5PSIxNTAiIHI9IjE1MCIvPgogIDxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTk0Ljg0LDEzMC40MmMwLDEzLjQ5LDEwLjkzLDI0LjQyLDI0LjQyLDI0LjQyczI0LjQyLTEwLjkzLDI0LjQyLTI0LjQyLTEwLjkzLTI0LjQyLTI0LjQyLTI0LjQyLTI0LjQyLDEwLjkzLTI0LjQyLDI0LjQyWiIvPgogIDxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTE1Ni4zOSwxMzAuNDJjMCwxMy40OSwxMC45MywyNC40MiwyNC40MiwyNC40MnMyNC40Mi0xMC45MywyNC40Mi0yNC40Mi0xMC45My0yNC40Mi0yNC40Mi0yNC40Mi0yNC40MiwxMC45My0yNC40MiwyNC40MloiLz4KICA8cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0yNjUuNzMsMjQ1LjQ0di04My4yM2gtMzEuNGMtNi4zNSw0MS45OC00MC45OCw3Mi41Ni04NC4zMyw3Mi41Ni00Ny45LDAtODYuMTctMzcuMzMtODYuMTctODYuMTRzMzguMjctODYuODQsODYuMTgtODYuODRjNDEuNzYsMCw3Ni4xOCwyOC45MSw4NC4zNCw2OC42NWgzMS40Yy04LjU5LTU2LjUtNTcuODktOTkuNzctMTE1Ljc5LTk5Ljc3LTYzLjkzLDAtMTE1Ljc5LDUyLjgyLTExNS43OSwxMTcuOTVzNTEuODIsMTE3Ljk1LDExNS43NSwxMTcuOTVjNDAuMjMsMCw2OC4yOC0xOC42Myw4NS40OS00Ny45Ny40MS4xMi44My4yMSwxLjIyLjMzdjUzLjQ4YzEwLjgzLTcuNjgsMjAuNTktMTYuNzYsMjkuMDItMjYuOThaIi8+Cjwvc3ZnPg==",
                    },
                    {
                      address: "0xE5ecd226b3032910CEaa43ba92EE8232f8237553",
                      symbol: "WETH",
                      decimals: 18,
                      chainId: 232,
                      name: "Wrapped Ether",
                    },
                    {
                      address: '0x88F08E304EC4f90D644Cec3Fb69b8aD414acf884',
                      symbol: "USDC",
                      decimals: 6,
                      chainId: 232,
                      name: "USDC",
                    },
                    {
                      address: '0xB0588f9A9cADe7CD5f194a5fe77AcD6A58250f82',
                      symbol: "BONSAI",
                      decimals: 18,
                      chainId: 232,
                      name: "Bonsai Token",
                    }
                  ]
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
} 