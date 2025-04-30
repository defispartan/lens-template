"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface OnRampStatusProps {
  intentId: string
  onReset: () => void
  onStatusChange: (status: string) => void
}

export function OnRampStatus({ intentId, onReset, onStatusChange }: OnRampStatusProps) {
  const [status, setStatus] = useState<string>("NONE")
  const [progress, setProgress] = useState(0)
  const [swapRequired, setSwapRequired] = useState(false)
  const [swapStatus, setSwapStatus] = useState<string | null>(null)
  const [error,] = useState<string | null>(null)

  // Simulate polling for status
  useEffect(() => {
    let count = 0

    const pollStatus = () => {
      count++

      // Simulate status progression
      if (count === 1) {
        setStatus("PENDING_PAYMENT")
        setProgress(10)
      } else if (count === 3) {
        setStatus("PENDING_ON_RAMP_TRANSFER")
        setProgress(30)
      } else if (count === 5) {
        setStatus("ON_RAMP_TRANSFER_IN_PROGRESS")
        setProgress(50)
      } else if (count === 7) {
        setStatus("ON_RAMP_TRANSFER_COMPLETED")
        setProgress(70)

        // Randomly decide if swap is required
        const needsSwap = Math.random() > 0.5
        setSwapRequired(needsSwap)

        if (needsSwap) {
          setStatus("CRYPTO_SWAP_REQUIRED")
        } else {
          setProgress(100)
        }
      } else if (count === 9 && swapRequired) {
        setSwapStatus("PENDING")
        setProgress(80)
      } else if (count === 11 && swapRequired) {
        setSwapStatus("COMPLETED")
        setProgress(100)
      }

      // Stop polling when complete
      if ((status === "ON_RAMP_TRANSFER_COMPLETED" && !swapRequired) || swapStatus === "COMPLETED") {
        clearInterval(timer)
      }

      // Simulate error (uncomment to test)
      // if (count === 4) {
      //   setStatus("ON_RAMP_TRANSFER_FAILED")
      //   setError("The payment provider rejected the transaction.")
      //   clearInterval(timer)
      // }
    }

    const timer = setInterval(pollStatus, 2000)
    return () => clearInterval(timer)
  }, [status, swapRequired, swapStatus])

  // Update parent component with status
  useEffect(() => {
    onStatusChange(status)
  }, [status, onStatusChange])

  const getStatusDisplay = () => {
    switch (status) {
      case "NONE":
        return "Initializing transaction..."
      case "PENDING_PAYMENT":
        return "Waiting for payment confirmation..."
      case "PENDING_ON_RAMP_TRANSFER":
        return "Payment confirmed, preparing on-ramp transfer..."
      case "ON_RAMP_TRANSFER_IN_PROGRESS":
        return "Processing on-ramp transfer..."
      case "ON_RAMP_TRANSFER_COMPLETED":
        return swapRequired ? "On-ramp completed, preparing swap..." : "Transaction completed successfully!"
      case "ON_RAMP_TRANSFER_FAILED":
        return "On-ramp transfer failed"
      case "CRYPTO_SWAP_REQUIRED":
        return swapStatus === null
          ? "Ready to swap tokens"
          : swapStatus === "PENDING"
            ? "Swapping tokens..."
            : "Swap completed successfully!"
      default:
        return "Processing transaction..."
    }
  }

  const handleSwapTokens = () => {
    setSwapStatus("PENDING")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Status</CardTitle>
        <CardDescription>Transaction ID: {intentId}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={progress} className="h-2" />

        <div className="flex items-center gap-3">
          {status === "ON_RAMP_TRANSFER_FAILED" || error ? (
            <AlertCircle className="h-5 w-5 text-red-500" />
          ) : progress === 100 ? (
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          ) : (
            <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
          )}
          <span className="font-medium">{getStatusDisplay()}</span>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {status === "CRYPTO_SWAP_REQUIRED" && swapStatus === null && (
          <div className="bg-gray-50 p-4 rounded-md space-y-4">
            <div className="text-sm">
              Your on-ramp is complete, but you need to swap the received tokens to your desired token.
            </div>
            <Button onClick={handleSwapTokens}>Swap Tokens</Button>
          </div>
        )}

        {progress === 100 && (
          <Alert variant="success" className="bg-green-50 text-green-800 border-green-200">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Your transaction has been completed successfully!</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        {(progress === 100 || status === "ON_RAMP_TRANSFER_FAILED" || error) && (
          <Button onClick={onReset}>Start New Transaction</Button>
        )}
      </CardFooter>
    </Card>
  )
}
