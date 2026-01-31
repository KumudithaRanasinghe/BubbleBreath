"use client"

import { cn } from "@/lib/utils"

type MascotMood = "happy" | "excited" | "calm" | "thinking" | "proud" | "waving"

interface MascotProps {
  mood?: MascotMood
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  animate?: boolean
}

export function Mascot({ mood = "happy", size = "md", className, animate = true }: MascotProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
    xl: "w-48 h-48"
  }

  const getMoodExpression = () => {
    switch (mood) {
      case "happy":
        return { eyes: "happy", mouth: "smile" }
      case "excited":
        return { eyes: "sparkle", mouth: "open" }
      case "calm":
        return { eyes: "relaxed", mouth: "gentle" }
      case "thinking":
        return { eyes: "looking", mouth: "hmm" }
      case "proud":
        return { eyes: "happy", mouth: "big-smile" }
      case "waving":
        return { eyes: "happy", mouth: "smile" }
      default:
        return { eyes: "happy", mouth: "smile" }
    }
  }

  const expression = getMoodExpression()

  return (
    <div className={cn(
      sizeClasses[size],
      "relative",
      animate && "animate-bounce",
      className
    )}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Body */}
        <ellipse cx="50" cy="60" rx="35" ry="30" fill="#7DD3C0" />
        
        {/* Belly */}
        <ellipse cx="50" cy="65" rx="25" ry="20" fill="#A5E9D9" />
        
        {/* Head */}
        <circle cx="50" cy="35" r="28" fill="#7DD3C0" />
        
        {/* Cheeks */}
        <circle cx="30" cy="40" r="6" fill="#FFB7B2" opacity="0.6" />
        <circle cx="70" cy="40" r="6" fill="#FFB7B2" opacity="0.6" />
        
        {/* Eyes */}
        {expression.eyes === "happy" && (
          <>
            <ellipse cx="40" cy="32" rx="5" ry="6" fill="#2D3748" />
            <ellipse cx="60" cy="32" rx="5" ry="6" fill="#2D3748" />
            <circle cx="42" cy="30" r="2" fill="white" />
            <circle cx="62" cy="30" r="2" fill="white" />
          </>
        )}
        {expression.eyes === "sparkle" && (
          <>
            <ellipse cx="40" cy="32" rx="6" ry="7" fill="#2D3748" />
            <ellipse cx="60" cy="32" rx="6" ry="7" fill="#2D3748" />
            <circle cx="42" cy="30" r="3" fill="white" />
            <circle cx="62" cy="30" r="3" fill="white" />
            <circle cx="38" cy="34" r="1.5" fill="white" />
            <circle cx="58" cy="34" r="1.5" fill="white" />
          </>
        )}
        {expression.eyes === "relaxed" && (
          <>
            <path d="M35 32 Q40 35 45 32" stroke="#2D3748" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M55 32 Q60 35 65 32" stroke="#2D3748" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        )}
        {expression.eyes === "looking" && (
          <>
            <ellipse cx="40" cy="32" rx="5" ry="6" fill="#2D3748" />
            <ellipse cx="60" cy="32" rx="5" ry="6" fill="#2D3748" />
            <circle cx="43" cy="32" r="2" fill="white" />
            <circle cx="63" cy="32" r="2" fill="white" />
          </>
        )}
        
        {/* Mouth */}
        {expression.mouth === "smile" && (
          <path d="M40 45 Q50 55 60 45" stroke="#2D3748" strokeWidth="3" fill="none" strokeLinecap="round" />
        )}
        {expression.mouth === "open" && (
          <ellipse cx="50" cy="48" rx="8" ry="6" fill="#2D3748" />
        )}
        {expression.mouth === "gentle" && (
          <path d="M42 46 Q50 50 58 46" stroke="#2D3748" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        )}
        {expression.mouth === "hmm" && (
          <ellipse cx="52" cy="47" rx="4" ry="3" fill="#2D3748" />
        )}
        {expression.mouth === "big-smile" && (
          <path d="M38 44 Q50 58 62 44" stroke="#2D3748" strokeWidth="3" fill="none" strokeLinecap="round" />
        )}
        
        {/* Arms */}
        {mood === "waving" ? (
          <>
            <ellipse cx="20" cy="55" rx="8" ry="10" fill="#7DD3C0" transform="rotate(-30 20 55)" />
            <ellipse cx="80" cy="45" rx="8" ry="10" fill="#7DD3C0" transform="rotate(30 80 45)" className="animate-[wave_0.5s_ease-in-out_infinite]" />
          </>
        ) : (
          <>
            <ellipse cx="20" cy="60" rx="8" ry="10" fill="#7DD3C0" transform="rotate(-20 20 60)" />
            <ellipse cx="80" cy="60" rx="8" ry="10" fill="#7DD3C0" transform="rotate(20 80 60)" />
          </>
        )}
        
        {/* Feet */}
        <ellipse cx="35" cy="88" rx="12" ry="6" fill="#5CBFAA" />
        <ellipse cx="65" cy="88" rx="12" ry="6" fill="#5CBFAA" />
        
        {/* Sparkles for excited mood */}
        {mood === "excited" && (
          <>
            <path d="M15 20 L17 15 L19 20 L24 18 L19 20 L17 25 L15 20 L10 18 Z" fill="#FFD93D" />
            <path d="M81 20 L83 15 L85 20 L90 18 L85 20 L83 25 L81 20 L76 18 Z" fill="#FFD93D" />
          </>
        )}
      </svg>
    </div>
  )
}
