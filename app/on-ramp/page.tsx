"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OnRampForm } from "@/components/on-ramp/on-ramp-form"
import { OnRampStatus } from "@/components/on-ramp/on-ramp-status"

export default function OnRampPage() {
  const [, setActiveTab] = useState("buy")
  const [intentId, setIntentId] = useState<string | null>(null)
  const [, setTransactionStatus] = useState<string | null>(null)

  return (
    <div className="space-y-6 w-[60%] min-w-[500px] mx-auto">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold">Buy with Fiat</h1>
        <p className="text-gray-500">Purchase crypto directly with your credit card or bank account</p>
      </div>

      <Tabs defaultValue="buy" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="buy">Buy</TabsTrigger>
          <TabsTrigger value="history">Transaction History</TabsTrigger>
        </TabsList>

        <TabsContent value="buy" className="space-y-4 pt-4">
          {!intentId ? (
            <OnRampForm onQuoteGenerated={(id) => setIntentId(id)} />
          ) : (
            <OnRampStatus
              intentId={intentId}
              onReset={() => {
                setIntentId(null)
                setTransactionStatus(null)
              }}
              onStatusChange={setTransactionStatus}
            />
          )}
        </TabsContent>

        <TabsContent value="history" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>View your recent fiat on-ramp transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="p-4 text-center text-sm text-gray-500">No transactions found</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
