"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Video, Gamepad2, Trophy } from "lucide-react"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/video-session", label: "Video Fun", icon: Video },
  { href: "/games", label: "Games", icon: Gamepad2 },
  { href: "/progress", label: "My Stars", icon: Trophy },
]

export function AppNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t-4 border-primary/20 shadow-lg md:top-0 md:bottom-auto md:border-t-0 md:border-b-4">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-around md:justify-center md:gap-8 h-16 md:h-20">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all duration-200",
                  "hover:bg-primary/10 hover:scale-105",
                  isActive && "bg-primary/20 scale-105"
                )}
              >
                <div className={cn(
                  "p-2 rounded-xl transition-colors",
                  isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}>
                  <Icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <span className={cn(
                  "text-xs md:text-sm font-semibold",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
