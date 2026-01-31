"use client"

import React from "react"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Lock, Star } from "lucide-react"

interface GameCardProps {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  level: number
  unlocked: boolean
  stars: number
  color: "coral" | "mint" | "sunny" | "sky" | "lavender"
}

const colorClasses = {
  coral: "bg-coral/20 border-coral hover:bg-coral/30",
  mint: "bg-mint/20 border-mint hover:bg-mint/30",
  sunny: "bg-sunny/20 border-sunny hover:bg-sunny/30",
  sky: "bg-sky/20 border-sky hover:bg-sky/30",
  lavender: "bg-lavender/20 border-lavender hover:bg-lavender/30",
}

const iconBgClasses = {
  coral: "bg-coral",
  mint: "bg-mint",
  sunny: "bg-sunny",
  sky: "bg-sky",
  lavender: "bg-lavender",
}

export function GameCard({ title, description, icon, href, level, unlocked, stars, color }: GameCardProps) {
  const CardWrapper = unlocked ? Link : "div"
  
  return (
    <CardWrapper
      href={unlocked ? href : "#"}
      className={cn(
        "relative flex flex-col items-center p-6 rounded-3xl border-4 transition-all duration-300",
        colorClasses[color],
        unlocked ? "cursor-pointer hover:scale-105 hover:shadow-xl" : "cursor-not-allowed opacity-60"
      )}
    >
      {/* Level Badge */}
      <div className="absolute -top-3 -left-3 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
        {level}
      </div>
      
      {/* Lock Overlay */}
      {!unlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-foreground/10 rounded-3xl">
          <Lock className="w-12 h-12 text-foreground/50" />
        </div>
      )}
      
      {/* Icon */}
      <div className={cn(
        "w-20 h-20 rounded-2xl flex items-center justify-center mb-4 text-foreground",
        iconBgClasses[color]
      )}>
        {icon}
      </div>
      
      {/* Title */}
      <h3 className="text-xl font-bold text-foreground mb-2 text-center">{title}</h3>
      
      {/* Description */}
      <p className="text-sm text-muted-foreground text-center mb-4">{description}</p>
      
      {/* Stars */}
      <div className="flex gap-1">
        {[1, 2, 3].map((starNum) => (
          <Star
            key={starNum}
            className={cn(
              "w-6 h-6",
              starNum <= stars ? "fill-secondary text-secondary" : "text-muted"
            )}
          />
        ))}
      </div>
    </CardWrapper>
  )
}
