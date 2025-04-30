"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import Image from "next/image"

interface TokenInfo {
  symbol: string
  logoUrl?: string
}

export interface Quote {
  intentId: string
  fromCurrencyWithFees: number
  fromCurrencySymbol: string
  processingFees: number
  networkFees: number
  toToken: TokenInfo
  toAmount: string
  requiresSwap: boolean
  onRampToken: TokenInfo
  estimatedDurationSeconds: number
  onRampLink: string
}
interface QuoteSummaryProps {
  quote: Quote
}

export function QuoteSummary({ quote }: QuoteSummaryProps) {
  return (
    <div className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-md space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">You pay</span>
          <span className="font-medium">
            {quote.fromCurrencyWithFees.toFixed(2)} {quote.fromCurrencySymbol}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Processing fee</span>
          <span className="text-sm">
            {quote.processingFees.toFixed(2)} {quote.fromCurrencySymbol}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Network fee</span>
          <span className="text-sm">
            {quote.networkFees.toFixed(2)} {quote.fromCurrencySymbol}
          </span>
        </div>

        <div className="border-t pt-3 flex justify-between items-center">
          <span className="text-sm text-gray-500">You receive</span>
          <div className="flex items-center gap-2">
            <Image
              src={quote.toToken.logoUrl || "/placeholder.svg"}
              alt={quote.toToken.symbol}
              width={20}
              height={20}
              className="rounded-full"
            />
            <span className="font-medium">
              {quote.toAmount} {quote.toToken.symbol}
            </span>
          </div>
        </div>
      </div>

      {quote.requiresSwap && (
        <Alert variant="warning">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Two-step process required</AlertTitle>
          <AlertDescription>
            This transaction will require two steps:
            <ol className="list-decimal ml-5 mt-2 space-y-1">
              <li>
                Purchase {quote.onRampToken.symbol} with {quote.fromCurrencySymbol}
              </li>
              <li>
                Convert {quote.onRampToken.symbol} to {quote.toToken.symbol}
              </li>
            </ol>
          </AlertDescription>
        </Alert>
      )}

      <div className="text-sm text-gray-500">
        Estimated time: {Math.floor(quote.estimatedDurationSeconds / 60)} minutes
      </div>
    </div>
  )
}
