"use client"

import { ConnectKitButton } from "connectkit"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type React from "react"
import { cn } from "@/lib/utils"
import { Link2, Users, ArrowLeftRight, CreditCard } from "lucide-react"
import { Web3Provider } from "./Web3Provider"

interface NavItemProps {
  href: string
  icon: React.ReactNode
  active?: boolean
  children: React.ReactNode
}

function NavItem({ href, icon, active, children }: NavItemProps) {
  return (
    <a
      href={href}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium",
        active
          ? "bg-gray-100 text-black"
          : "text-gray-600 hover:bg-gray-50 hover:text-black"
      )}
    >
      {icon}
      {children}
    </a>
  )
}

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <Web3Provider>
      <div className="flex flex-col h-screen bg-white">
        {/* Top header with logo and connect wallet */}
        <header className="flex items-center justify-between px-6 h-16">
          <div className="flex items-center">
            <Image src="/lens.svg" alt="Lens" width={120} height={40} />
          </div>
          <div className="flex items-center">
            <ConnectKitButton />
          </div>
        </header>

        {/* Horizontal divider */}
        <div className="border-b w-full"></div>

        {/* Main content area with sidebar and content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-64 border-r bg-white">
            <nav className="space-y-1 p-4">
              <NavItem href="/social" icon={<Users className="h-4 w-4" />} active={pathname === "/social"}>
                Social
              </NavItem>
              <NavItem href="/chain" icon={<Link2 className="h-4 w-4" />} active={pathname === "/chain"}>
                Chain
              </NavItem>
              <NavItem href="/swap" icon={<ArrowLeftRight className="h-4 w-4" />} active={pathname === "/swap"}>
                Swap / Bridge
              </NavItem>
              <NavItem href="/on-ramp" icon={<CreditCard className="h-4 w-4" />} active={pathname === "/on-ramp"}>
                On-Ramp
              </NavItem>
            </nav>
          </div>

          {/* Content area */}
          <div className="flex-1 overflow-auto p-6">{children}</div>
        </div>
      </div>
    </Web3Provider>
  )
}
