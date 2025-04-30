"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

interface Token {
  chainId: number
  address: string
  symbol: string
  name: string
  decimals: number
  logoUrl: string
}

interface TokenSelectorProps {
  value: Token
  onChange: (value: Token) => void
}

const TOKENS = [
  {
    chainId: 232,
    address: "0x000000000000000000000000000000000000800A",
    symbol: "GHO",
    name: "GHO",
    decimals: 18,
    logoUrl: "https://raw.githubusercontent.com/MetaMask/contract-metadata/master/icons/eip155:1/erc20:0x40D16FC0246aD3160Ccc09B8D0D3A2cD28aE6C2f.svg",
  },
  {
    chainId: 232,
    address: "0xE5ecd226b3032910CEaa43ba92EE8232f8237553",
    symbol: "WETH",
    name: "Wrapped Ethereum",
    decimals: 18,
    logoUrl: "https://raw.githubusercontent.com/MetaMask/contract-metadata/master/icons/eip155:1/erc20:0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2.svg",
  },
  {
    chainId: 232,
    address: "0x88F08E304EC4f90D644Cec3Fb69b8aD414acf884",
    symbol: "USDC",
    name: "USDC",
    decimals: 18,
    logoUrl: "https://raw.githubusercontent.com/MetaMask/contract-metadata/master/icons/eip155:1/erc20:0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48.svg",
  },
]

export function TokenSelector({ value, onChange }: TokenSelectorProps) {
  return (
    <Select
      value={`${value.chainId}-${value.address}`}
      onValueChange={(val) => {
        const [chainId, address] = val.split("-")
        const token = TOKENS.find((t) => t.chainId === Number.parseInt(chainId) && t.address === address)
        if (token) {
          onChange(token)
        }
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue>
          <div className="flex items-center gap-2">
            <Image
              src={value.logoUrl || "/placeholder.svg"}
              alt={value.symbol}
              width={20}
              height={20}
              className="rounded-full"
            />
            <span>{value.symbol}</span>
            <span className="text-gray-500 text-xs">on {getChainName(value.chainId)}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {TOKENS.map((token) => (
          <SelectItem key={`${token.chainId}-${token.address}`} value={`${token.chainId}-${token.address}`}>
            <div className="flex items-center gap-2">
              <Image
                src={token.logoUrl || "/placeholder.svg"}
                alt={token.symbol}
                width={20}
                height={20}
                className="rounded-full"
              />
              <span>{token.symbol}</span>
              <span className="text-gray-500 text-xs">on {getChainName(token.chainId)}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function getChainName(chainId: number): string {
  const chains: Record<number, string> = {
    1: "Ethereum",
    137: "Polygon",
    56: "BNB Chain",
    8453: "Base",
    43114: "Avalanche C-Chain",
    232: "Lens Chain"
  }
  return chains[chainId] || `Chain ${chainId}`
}
