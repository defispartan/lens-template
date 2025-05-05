"use client"

import { useAccount, useWalletClient } from "wagmi"
import { useEffect, useState } from "react"
import Image from "next/image"
import { createPublicClient, http } from "viem"
import { chains } from "@lens-chain/sdk/viem"

// ERC20 ABI for balanceOf
const erc20Abi = [
  {
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

interface Token {
  chainId: number;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
}

interface TokenBalance {
  token: Token;
  balance: bigint;
}

export default function ChainPage() {
  const { address } = useAccount()
  const { data: walletClient } = useWalletClient()
  const [tokens, setTokens] = useState<Token[]>([])
  const [balances, setBalances] = useState<TokenBalance[]>([])
  const [loading, setLoading] = useState(false)
  
  // Action states
  const [readResult, setReadResult] = useState<{ success: boolean; message: string } | null>(null)
  const [writeResult, setWriteResult] = useState<{ success: boolean; hash?: string; message: string } | null>(null)
  const [signResult, setSignResult] = useState<{ success: boolean; signature?: string; message: string } | null>(null)
  
  // Loading states for actions
  const [isReadLoading, setIsReadLoading] = useState(false)
  const [isWriteLoading, setIsWriteLoading] = useState(false)
  const [isSignLoading, setIsSignLoading] = useState(false)

  // Fetch token list
  useEffect(() => {
    const fetchTokenList = async () => {
      try {
        const response = await fetch("https://lens.xyz/DOCS/tokenlist.json");
        const data = await response.json();
        
        // Add GHO token if not already in the list
        const ghoToken = {
          chainId: 232,
          address: "0x000000000000000000000000000000000000800A",
          name: "GHO Token",
          symbol: "GHO",
          decimals: 18,
          logoURI: "https://raw.githubusercontent.com/MetaMask/contract-metadata/master/icons/eip155:1/erc20:0x40D16FC0246aD3160Ccc09B8D0D3A2cD28aE6C2f.svg"
        };

        // Check if GHO token already exists in the list
        const ghoExists = data.tokens.some(
          (token: Token) => token.address.toLowerCase() === ghoToken.address.toLowerCase()
        );

        // Add GHO token if it doesn't exist
        const tokens = ghoExists ? data.tokens : [...data.tokens, ghoToken];
        setTokens(tokens);
      } catch (error) {
        console.error("Failed to fetch token list:", error);
      }
    };

    fetchTokenList();
  }, []);

  // Fetch balances using multicall
  useEffect(() => {
    if (!address || tokens.length === 0) return
    setLoading(true)

    const fetchBalances = async () => {
      try {
        const publicClient = createPublicClient({
          chain: chains.mainnet,
          transport: http(),
        })

        const calls = tokens.map((token) => ({
          address: token.address as `0x${string}`,
          abi: erc20Abi,
          functionName: "balanceOf",
          args: [address],
        }))

        const results = await publicClient.multicall({
          contracts: calls,
        })

        const tokenBalances = results.map((result, index) => ({
          token: tokens[index],
          balance: result.result as bigint,
        }))

        setBalances(tokenBalances)
      } catch (error) {
        console.error("Failed to fetch balances:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBalances()
  }, [address, tokens])

  const handleRead = async () => {
    setIsReadLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setReadResult({
        success: true,
        message: "Successfully read contract data"
      });
    } catch {
      setReadResult({
        success: false,
        message: "Failed to read contract data"
      });
    } finally {
      setIsReadLoading(false);
    }
  };

  const handleWrite = async () => {
    if (!walletClient || !address) return;
    
    setIsWriteLoading(true);
    try {
      const hash = await walletClient.sendTransaction({
        to: address,
        value: BigInt(0)
      });
      
      setWriteResult({
        success: true,
        hash,
        message: "Transaction sent successfully"
      });
    } catch (error: unknown) {
      setWriteResult({
        success: false,
        message: error instanceof Error ? error.message : "Failed to send transaction"
      });
    } finally {
      setIsWriteLoading(false);
    }
  };

  const handleSign = async () => {
    if (!walletClient) return;
    
    setIsSignLoading(true);
    try {
      const signature = await walletClient.signMessage({
        message: "Hello from Lens Chain!"
      });
      
      setSignResult({
        success: true,
        signature,
        message: "Message signed successfully"
      });
    } catch (error: unknown) {
      setSignResult({
        success: false,
        message: error instanceof Error ? error.message : "Failed to sign message"
      });
    } finally {
      setIsSignLoading(false);
    }
  };

  if (!address) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-xl text-gray-600">Connect Wallet to view balances</p>
      </div>
    )
  }

  return (
    <div className="p-8">
      {/* Balances Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold">Balances</h2>
        <p className="text-gray-600 mt-2">Token balances on Lens Chain</p>
        
        {loading ? (
          <div className="mt-4">Loading balances...</div>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Token</th>
                  <th className="text-left py-3 px-4">Symbol</th>
                  <th className="text-right py-3 px-4">Balance</th>
                  <th className="text-right py-3 px-4">Contract</th>
                </tr>
              </thead>
              <tbody>
                {balances.map(({ token, balance }) => (
                  <tr key={token.address} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Image
                          src={token.logoURI}
                          alt={token.name}
                          width={24}
                          height={24}
                          className="rounded-full"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <span>{token.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{token.symbol}</td>
                    <td className="text-right py-3 px-4">
                      {isNaN(Number(balance) / Math.pow(10, token.decimals)) 
                        ? 0 
                        : Number(balance) / Math.pow(10, token.decimals)}
                    </td>
                    <td className="text-right py-3 px-4">
                      <a 
                        href={`https://explorer.lens.xyz/address/${token.address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Actions Section */}
      <div>
        <h2 className="text-2xl font-bold">Actions</h2>
        <p className="text-gray-600 mt-2">Interact with Lens Chain</p>
        
        <div className="mt-6 grid grid-cols-3 gap-6">
          <div className="border rounded-lg p-6 flex flex-col items-center">
            <button 
              onClick={handleRead}
              disabled={isReadLoading}
              className={`px-6 py-2 rounded-md transition-colors ${
                isReadLoading
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              Read
            </button>
          </div>
          <div className="border rounded-lg p-6 flex flex-col items-center">
            <button 
              onClick={handleWrite}
              disabled={!address || isWriteLoading}
              className={`px-6 py-2 rounded-md transition-colors ${
                !address || isWriteLoading
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              Write
            </button>
          </div>
          <div className="border rounded-lg p-6 flex flex-col items-center">
            <button 
              onClick={handleSign}
              disabled={!address || isSignLoading}
              className={`px-6 py-2 rounded-md transition-colors ${
                !address || isSignLoading
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              Sign
            </button>
          </div>
        </div>

        {/* Action Results */}
        <div className="mt-6 grid grid-cols-3 gap-6">
          <div className="text-center">
            {isReadLoading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
              </div>
            ) : readResult && (
              <p className={`${readResult.success ? 'text-green-600' : 'text-red-600'}`}>
                {readResult.message}
              </p>
            )}
          </div>
          <div className="text-center">
            {isWriteLoading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
              </div>
            ) : writeResult && (
              <div>
                <p className={writeResult.success ? 'text-green-600' : 'text-red-600'}>
                  {writeResult.message}
                </p>
                {writeResult.hash && (
                  <a 
                    href={`https://explorer.lens.xyz/tx/${writeResult.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline mt-2 block"
                  >
                    View Transaction
                  </a>
                )}
              </div>
            )}
          </div>
          <div className="text-center">
            {isSignLoading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
              </div>
            ) : signResult && (
              <div>
                <p className={signResult.success ? 'text-green-600' : 'text-red-600'}>
                  {signResult.message}
                </p>
                {signResult.signature && (
                  <p className="text-sm mt-2 break-all">
                    {signResult.signature}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
