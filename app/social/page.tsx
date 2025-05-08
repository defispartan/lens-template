"use client";

import { useAccount, useWalletClient } from "wagmi";
import { useEffect, useState } from "react";
import { fetchAccountsAvailable } from "@lens-protocol/client/actions";
import { evmAddress } from "@lens-protocol/client";
import Image from "next/image";
import { signMessageWith } from "@lens-protocol/client/viem";
import { lensClient } from "@/lens/client";
import { UserPlus } from "lucide-react";
import Link from "next/link";

export default function SocialPage() {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [authenticatedProfile, setAuthenticatedProfile] = useState<string | null>(null);

  useEffect(() => {
    if (!address) return;
    setLoading(true);
    fetchAccountsAvailable(lensClient, {
      managedBy: evmAddress(address),
      includeOwned: true,
    }).then((result) => {
      if (result.isOk()) {
        setProfiles([...result.value.items]);
      }
      setLoading(false);
    });
  }, [address]);

  const handleSignIn = async (profile: any) => {
    if (!walletClient) return;
    try {
      const authenticated = await lensClient.login({
        accountOwner: {
          app: process.env.NEXT_PUBLIC_LENS_APP_ADDRESS || '0x0000000000000000000000000000000000000000',
          owner: address,
          account: profile.account.address,
        },
        signMessage: signMessageWith(walletClient),
      });
      if (authenticated.isErr()) {
        alert("Authentication failed: " + authenticated.error);
      } else {
        setAuthenticatedProfile(profile.account.address);
      }
    } catch (error: unknown) {
      console.error("Failed to sign in:", error);
    }
  };

  const handleLogOut = () => {
    try {
      setAuthenticatedProfile(null);
    } catch (error: unknown) {
      console.error("Failed to log out:", error);
    }
  };

  if (!address) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-xl text-gray-600">Connect Wallet to view accounts</p>
      </div>
    );
  }

  return (
    <div className="p-8 w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Lens Accounts</h1>
        <p className="text-gray-600 mt-2">Lens Accounts owned and managed by connected wallet</p>
      </div>
      {loading && <div>Loading...</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
        {profiles.map((profile) => (
          <div key={profile.account.address} className="w-full max-w-sm border rounded-lg p-6 flex flex-col items-center space-y-4 bg-white shadow-sm">
            <div className="font-semibold text-lg">@{profile.account.username.localName}</div>
            <div className="text-sm px-3 py-1 rounded-full bg-gray-100">
              {profile.__typename === "AccountOwned" ? (
                <span className="text-green-600">Owner</span>
              ) : (
                <span className="text-blue-600">Manager</span>
              )}
            </div>
            <div className="w-[120px] h-[120px] rounded-full overflow-hidden bg-gray-100">
              {profile.account.metadata?.picture ? (
                <Image
                  src={profile.account.metadata.picture}
                  alt={profile.account.username.localName}
                  width={120}
                  height={120}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
            </div>
            <div className="h-[80px] flex flex-col items-center justify-center">
              {authenticatedProfile === profile.account.address ? (
                <div className="flex flex-col items-center space-y-2">
                  <div className="text-sm text-green-600 font-medium">Currently Logged In</div>
                  <button
                    className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                    onClick={handleLogOut}
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <button
                  className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                  onClick={() => handleSignIn(profile)}
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 flex justify-center">
        <Link 
          href="https://onboarding.lens.xyz/"
          target="_blank"
          className="flex items-center gap-2 text-black hover:text-gray-700 transition-colors border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50"
        >
          <UserPlus className="w-5 h-5" />
          <span>Create Account</span>
        </Link>
      </div>
    </div>
  );
}