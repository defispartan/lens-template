"use client"

import { PayEmbed, ThirdwebProvider } from "thirdweb/react"
import { createThirdwebClient } from "thirdweb"
import { openHalliday } from '@halliday-sdk/commerce'
import { useState, useEffect } from 'react'

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID ?? "",
  secretKey: process.env.NEXT_PUBLIC_THIRDWEB_SECRET_KEY ?? ""
})

export default function OnRampNewPage() {
  const [selectedProvider, setSelectedProvider] = useState<'thirdweb' | 'halliday'>('thirdweb')

  useEffect(() => {
    if (selectedProvider === 'halliday') {
      openHalliday({
        apiKey: process.env.NEXT_PUBLIC_HALLIDAY_API_KEY ?? "",
        destinationChainId: 232,
        destinationTokenAddress: "0x000000000000000000000000000000000000800A",
        services: ["ONRAMP"],
        windowType: "EMBED",
        targetElementId: "halliday-container"
      })
    }
  }, [selectedProvider])

  return (
    <ThirdwebProvider>
      <div className="flex flex-col min-h-screen p-4">
        <div className="w-full">
          <div className="flex flex-col space-y-4">
            <h1 className="text-2xl font-bold text-center">Buy GHO on Lens Chain</h1>
            <p className="text-gray-500 text-center">Widget to purchase GHO with fiat or crypto</p>
            
            {/* Toggle Switch */}
            <div className="flex justify-center items-center space-x-4">
              <button
                className={`px-4 py-2 rounded-l-lg ${
                  selectedProvider === 'thirdweb' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => setSelectedProvider('thirdweb')}
              >
                Thirdweb
              </button>
              <button
                className={`px-4 py-2 rounded-r-lg ${
                  selectedProvider === 'halliday' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => setSelectedProvider('halliday')}
              >
                Halliday
              </button>
            </div>
          </div>

          <div className="mt-6">
            <div className="w-[400px] mx-auto">
              {selectedProvider === 'thirdweb' ? (
                <PayEmbed 
                  client={client}
                  theme="light"
                  payOptions={{
                    showThirdwebBranding: false
                  }}
                  supportedTokens={{
                    232: [{
                      address: "0x0000000000000000000000000000000000000000",
                      name: "GHO Token",
                      symbol: "GHO",
                      icon: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMDAgMzAwIj4KICA8ZGVmcz4KICAgIDxzdHlsZT4KICAgICAgLmNscy0xIHsKICAgICAgICBmaWxsOiAjMjhkMzU4OwogICAgICB9CgogICAgICAuY2xzLTEsIC5jbHMtMiB7CiAgICAgICAgc3Ryb2tlLXdpZHRoOiAwcHg7CiAgICAgIH0KCiAgICAgIC5jbHMtMiB7CiAgICAgICAgZmlsbDogI2ZmZjsKICAgICAgfQogICAgPC9zdHlsZT4KICA8L2RlZnM+CiAgPGNpcmNsZSBjbGFzcz0iY2xzLTEiIGN4PSIxNTAiIGN5PSIxNTAiIHI9IjE1MCIvPgogIDxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTk0Ljg0LDEzMC40MmMwLDEzLjQ5LDEwLjkzLDI0LjQyLDI0LjQyLDI0LjQyczI0LjQyLTEwLjkzLDI0LjQyLTI0LjQyLTEwLjkzLTI0LjQyLTI0LjQyLTI0LjQyLTI0LjQyLDEwLjkzLTI0LjQyLDI0LjQyWiIvPgogIDxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTE1Ni4zOSwxMzAuNDJjMCwxMy40OSwxMC45MywyNC40MiwyNC40MiwyNC40MnMyNC40Mi0xMC45MywyNC40Mi0yNC40Mi0xMC45My0yNC40Mi0yNC40Mi0yNC40Mi0yNC40MiwxMC45My0yNC40MiwyNC40MloiLz4KICA8cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0yNjUuNzMsMjQ1LjQ0di04My4yM2gtMzEuNGMtNi4zNSw0MS45OC00MC45OCw3Mi41Ni04NC4zMyw3Mi41Ni00Ny45LDAtODYuMTctMzcuMzMtODYuMTctODYuMTRzMzguMjctODYuODQsODYuMTgtODYuODRjNDEuNzYsMCw3Ni4xOCwyOC45MSw4NC4zNCw2OC42NWgzMS40Yy04LjU5LTU2LjUtNTcuODktOTkuNzctMTE1Ljc5LTk5Ljc3LTYzLjkzLDAtMTE1Ljc5LDUyLjgyLTExNS43OSwxMTcuOTVzNTEuODIsMTE3Ljk1LDExNS43NSwxMTcuOTVjNDAuMjMsMCw2OC4yOC0xOC42Myw4NS40OS00Ny45Ny40MS4xMi44My4yMSwxLjIyLjMzdjUzLjQ4YzEwLjgzLTcuNjgsMjAuNTktMTYuNzYsMjkuMDItMjYuOThaIi8+Cjwvc3ZnPg=="
                    }]
                  }}         
                />
              ) : (
                <div id="halliday-container" className="w-full h-[600px]" />
              )}
            </div>
          </div>
        </div>
      </div>
    </ThirdwebProvider>
  )
} 