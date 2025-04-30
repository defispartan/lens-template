"use client"

import { useState, useMemo } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, ArrowRight } from "lucide-react"
import { CurrencySelector } from "./currency-selector"
import { TokenSelector } from "./token-selector"
import { QuoteSummary, Quote } from "./quote-summary"

import { createThirdwebClient } from "thirdweb"
import { getBuyWithFiatQuote } from "thirdweb/pay"
import { useAccount } from "wagmi"

interface OnRampFormProps {
  onQuoteGenerated: (intentId: string) => void
}

// only allow these fiat symbols
export type Currency = "USD" | "CAD" | "GBP" | "EUR" | "JPY" | "AUD" | "NZD"

// shape for your token selector
export interface OnRampToken {
  chainId: number
  address: string
  symbol: string
  name: string
  decimals: number
  logoUrl: string
}

export function OnRampForm({ onQuoteGenerated }: OnRampFormProps) {
  const { address } = useAccount()

  const [fromCurrency, setFromCurrency] = useState<Currency>("USD")
  const [toToken, setToToken] = useState<OnRampToken>({
    chainId: 232,
    address: "0x0000000000000000000000000000000000000000",
    symbol: "GHO",
    name: "GHO",
    decimals: 18,
    logoUrl:
      "https://raw.githubusercontent.com/MetaMask/contract-metadata/master/icons/eip155:1/erc20:0x40D16FC0246aD3160Ccc09B8D0D3A2cD28aE6C2f.svg",
  })
  const [amount, setAmount] = useState<string>("0.01")

  // use our Quote interface from quote-summary.tsx
  const [quote, setQuote] = useState<Quote | null>(null)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const client = useMemo(
    () =>
      createThirdwebClient({
        clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID ?? "",
      }),
    []
  )

  const handleGetQuote = async () => {
    if (!address) {
      setError("Please connect your wallet first.")
      return
    }
    setError(null)
    setIsLoading(true)

    try {
      const realQuote = await getBuyWithFiatQuote({
        client,
        fromCurrencySymbol: fromCurrency,
        toChainId: toToken.chainId,
        toTokenAddress: toToken.address,
        toAddress: address,
        toAmount: amount,
        fromAddress: address
      })
      // cast to our Quote type
      const q = realQuote as unknown as Quote
      setQuote(q)
      onQuoteGenerated(q.intentId)
    } catch (e: unknown) {
      console.error(e)
      // narrow error for TS
      const msg = e instanceof Error ? e.message : String(e)
      setError(msg || "Failed to fetch quote.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleProceed = () => {
    if (quote?.onRampLink) {
      window.open(quote.onRampLink, "_blank")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Buy Crypto</CardTitle>
        <CardDescription>Purchase crypto with your preferred payment method</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Spend section */}
        <div className="space-y-2">
          <label className="text-sm font-medium">I want to spend</label>
          <div className="flex gap-2">
            <CurrencySelector value={fromCurrency} onChange={setFromCurrency} />
            <Input
              type="number"
              placeholder="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1"
            />
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center py-2">
          <div className="bg-gray-100 p-2 rounded-full">
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>

        {/* Receive section */}
        <div className="space-y-2">
          <label className="text-sm font-medium">I want to buy</label>
          <TokenSelector value={toToken} onChange={setToToken} />
        </div>

        {/* Error & quote */}
        {error && <div className="bg-red-50 text-red-800 p-3 rounded-md text-sm">{error}</div>}
        {quote && <QuoteSummary quote={quote} />}
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        {!quote ? (
          <Button onClick={handleGetQuote} disabled={isLoading || parseFloat(amount) <= 0}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Get Quote
          </Button>
        ) : (
          <Button onClick={handleProceed}>Proceed to Payment</Button>
        )}
      </CardFooter>
    </Card>
  )
}
