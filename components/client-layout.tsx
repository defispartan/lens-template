"use client"

import { ConnectKitButton } from "connectkit"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type React from "react"
import { cn } from "@/lib/utils"
import { LayoutGrid } from "lucide-react"

interface NavItemProps {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
  active?: boolean
}

function NavItem({ href, icon, children, active }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn("flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg", active && "bg-gray-100")}
    >
      {icon}
      <span>{children}</span>
    </Link>
  )
}

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 border-r bg-white">
        <div className="p-4">
          <Image src="/lens.svg" alt="Lens" width={120} height={40} />
        </div>
        <nav className="space-y-1 px-2">
          <NavItem href="/chain" icon={<LayoutGrid className="h-4 w-4" />} active={pathname === "/chain"}>
            Chain
          </NavItem>
          <NavItem
            href="/social"
            icon={
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  d="M15 3v18M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            }
            active={pathname === "/social"}
          >
            Social
          </NavItem>
          <NavItem
            href="/bridge"
            icon={
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2M9 5h6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            active={pathname === "/bridge"}
          >
            Bridge
          </NavItem>
          <NavItem
            href="/swap"
            icon={
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            active={pathname === "/swap"}
          >
            Swap
          </NavItem>
          <NavItem
            href="/on-ramp"
            icon={
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8v16m0-16H8m4 0h4"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            active={pathname === "/on-ramp"}
          >
            On-Ramp
          </NavItem>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between border-b px-6 h-16">
          <div className="flex-1"></div>
          <div className="flex items-center">
            <ConnectKitButton />
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">{children}</div>
      </div>
    </div>
  )
}
