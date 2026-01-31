"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { AppNav } from "@/components/app-nav"
import { Mascot } from "@/components/mascot"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Play, Pause, RotateCcw, Star, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

type BreathPhase = "inhale" | "hold" | "exhale" | "rest"

const phaseConfig = {
  inhale: { duration: 4000, instruction: "Breathe In...", color: "bg-mint" },
  hold: { duration: 2000, instruction: "Hold...", color: "bg-sky" },
  exhale: { duration: 4000, instruction: "Breathe Out...", color: "bg-lavender" },
  rest: { duration: 2000, instruction: "Rest...", color: "bg-sunny" },
}

const phaseOrder: BreathPhase[] = ["inhale", "hold", "exhale", "rest"]

export default function BubbleBreathingGame() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [phase, setPhase] = useState<BreathPhase>("rest")
  const [phaseProgress, setPhaseProgress] = useState(0)
  const [bubbleSize, setBubbleSize] = useState(100)
  const [cyclesCompleted, setCyclesCompleted] = useState(0)
  const [score, setScore] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)

  const startBreathing = useCallback(() => {
    setIsPlaying(true)
    setPhase("inhale")
    setPhaseProgress(0)
  }, [])

  const pauseBreathing = () => {
    setIsPlaying(false)
  }

  const resetGame = () => {
    setIsPlaying(false)
    setPhase("rest")
    setPhaseProgress(0)
    setBubbleSize(100)
    setCyclesCompleted(0)
    setScore(0)
    setShowCelebration(false)
  }

  useEffect(() => {
    if (!isPlaying) return

    const config = phaseConfig[phase]
    const interval = 50 // Update every 50ms
    const steps = config.duration / interval

    const timer = setInterval(() => {
      setPhaseProgress((prev) => {
        const next = prev + (100 / steps)
        
        if (next >= 100) {
          // Move to next phase
          const currentIndex = phaseOrder.indexOf(phase)
          const nextIndex = (currentIndex + 1) % phaseOrder.length
          const nextPhase = phaseOrder[nextIndex]
          
          // If completing a full cycle
          if (nextIndex === 0) {
            setCyclesCompleted((c) => c + 1)
            setScore((s) => s + 25)
            
            // Show celebration every 3 cycles
            if ((cyclesCompleted + 1) % 3 === 0) {
              setShowCelebration(true)
              setTimeout(() => setShowCelebration(false), 2000)
            }
          }
          
          setPhase(nextPhase)
          return 0
        }
        
        return next
      })
    }, interval)

    return () => clearInterval(timer)
  }, [isPlaying, phase, cyclesCompleted])

  // Update bubble size based on phase
  useEffect(() => {
    if (phase === "inhale") {
      setBubbleSize(100 + (phaseProgress * 1.5)) // Grow from 100 to 250
    } else if (phase === "exhale") {
      setBubbleSize(250 - (phaseProgress * 1.5)) // Shrink from 250 to 100
    }
  }, [phase, phaseProgress])

  const getMascotMood = () => {
    if (showCelebration) return "excited"
    if (phase === "inhale") return "thinking"
    if (phase === "exhale") return "calm"
    return "happy"
  }

  const currentConfig = phaseConfig[phase]
  const stars = Math.min(3, Math.floor(cyclesCompleted / 3))

  return (
    <div className="min-h-screen bg-background pb-24 md:pt-24 md:pb-8">
      <AppNav />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/games">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Bubble Breathing
            </h1>
            <p className="text-muted-foreground">
              Breathe slowly and watch the bubble grow!
            </p>
          </div>
          <div className="flex items-center gap-2 bg-secondary/30 px-4 py-2 rounded-full">
            <Star className="w-5 h-5 text-secondary fill-secondary" />
            <span className="font-bold text-foreground">{score}</span>
          </div>
        </div>

        {/* Game Area */}
        <div className="relative bg-card rounded-3xl border-4 border-primary/30 p-8 min-h-[500px] flex flex-col items-center justify-center overflow-hidden">
          {/* Background bubbles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-primary/10 animate-pulse"
                style={{
                  width: `${30 + Math.random() * 40}px`,
                  height: `${30 + Math.random() * 40}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          {/* Celebration Overlay */}
          {showCelebration && (
            <div className="absolute inset-0 flex items-center justify-center bg-primary/20 z-20 animate-pulse">
              <div className="text-center">
                <Sparkles className="w-16 h-16 text-secondary mx-auto mb-4 animate-bounce" />
                <p className="text-3xl font-bold text-foreground">Amazing Job!</p>
              </div>
            </div>
          )}

          {/* Main Bubble */}
          <div className="relative z-10 flex flex-col items-center">
            <div
              className={cn(
                "rounded-full transition-all duration-300 ease-in-out flex items-center justify-center",
                currentConfig.color,
                "shadow-2xl"
              )}
              style={{
                width: `${bubbleSize}px`,
                height: `${bubbleSize}px`,
              }}
            >
              <div className="absolute inset-4 rounded-full bg-white/30" />
              <div className="absolute top-4 left-4 w-6 h-6 rounded-full bg-white/50" />
            </div>

            {/* Instruction */}
            <p className="text-3xl font-bold text-foreground mt-8 animate-pulse">
              {isPlaying ? currentConfig.instruction : "Ready to breathe?"}
            </p>

            {/* Progress Ring */}
            {isPlaying && (
              <div className="mt-4 w-full max-w-xs">
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className={cn("h-full rounded-full transition-all", currentConfig.color)}
                    style={{ width: `${phaseProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Mascot */}
          <div className="absolute bottom-4 right-4">
            <Mascot mood={getMascotMood()} size="md" animate={!isPlaying} />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          {!isPlaying ? (
            <Button
              size="lg"
              onClick={startBreathing}
              className="rounded-full px-8 py-6 text-lg font-bold"
            >
              <Play className="w-6 h-6 mr-2" />
              Start Breathing
            </Button>
          ) : (
            <Button
              size="lg"
              variant="secondary"
              onClick={pauseBreathing}
              className="rounded-full px-8 py-6 text-lg font-bold"
            >
              <Pause className="w-6 h-6 mr-2" />
              Pause
            </Button>
          )}
          <Button
            size="lg"
            variant="outline"
            onClick={resetGame}
            className="rounded-full bg-transparent"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-card rounded-2xl p-6 text-center border-2 border-border">
            <p className="text-3xl font-bold text-foreground">{cyclesCompleted}</p>
            <p className="text-sm text-muted-foreground">Cycles</p>
          </div>
          <div className="bg-card rounded-2xl p-6 text-center border-2 border-border">
            <p className="text-3xl font-bold text-foreground">{score}</p>
            <p className="text-sm text-muted-foreground">Points</p>
          </div>
          <div className="bg-card rounded-2xl p-6 text-center border-2 border-border col-span-2 md:col-span-1">
            <div className="flex justify-center gap-1 mb-1">
              {[1, 2, 3].map((starNum) => (
                <Star
                  key={starNum}
                  className={cn(
                    "w-8 h-8",
                    starNum <= stars ? "fill-secondary text-secondary" : "text-muted"
                  )}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">Stars Earned</p>
          </div>
        </div>
      </main>
    </div>
  )
}
