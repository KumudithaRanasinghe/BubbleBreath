"use client"

import { useState } from "react"
import { AppNav } from "@/components/app-nav"
import { Mascot } from "@/components/mascot"
import { EmotionDisplay } from "@/components/emotion-display"
import { useFaceDetection } from "@/hooks/use-face-detection"
import { Button } from "@/components/ui/button"
import { Camera, CameraOff, Play, Pause, Sparkles, Star } from "lucide-react"
import { cn } from "@/lib/utils"

const activities = [
  { id: "mirror", name: "Mirror Game", description: "Copy the expressions you see!", icon: "mirror" },
  { id: "breathing", name: "Breathing Buddy", description: "Breathe with the bubble!", icon: "breathing" },
  { id: "emotions", name: "Emotion Explorer", description: "Can you make these faces?", icon: "emotions" },
]

export default function VideoSessionPage() {
  const {
    detection,
    startDetection,
    stopDetection,
    videoRef,
    isActive,
    permissionGranted,
    requestPermission
  } = useFaceDetection()

  const [selectedActivity, setSelectedActivity] = useState<string | null>(null)
  const [points, setPoints] = useState(0)

  const handleStartCamera = async () => {
    const granted = await requestPermission()
    if (granted) {
      startDetection()
    }
  }

  const handleToggleDetection = () => {
    if (isActive) {
      stopDetection()
    } else {
      startDetection()
    }
  }

  // Award points when emotion matches activity goals
  const awardPoints = () => {
    setPoints(prev => prev + 10)
  }

  const getMascotMood = () => {
    if (!detection.faceDetected) return "thinking"
    if (detection.emotion === "happy") return "excited"
    if (detection.emotion === "calm") return "calm"
    return "happy"
  }

  return (
    <div className="min-h-screen bg-background pb-24 md:pt-24 md:pb-8">
      <AppNav />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Video Fun Zone
            </h1>
            <p className="text-muted-foreground">
              Play games with your camera and discover your feelings!
            </p>
          </div>
          <div className="flex items-center gap-2 bg-secondary/30 px-4 py-2 rounded-full">
            <Star className="w-6 h-6 text-secondary fill-secondary" />
            <span className="text-xl font-bold text-foreground">{points}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Feed */}
          <div className="lg:col-span-2">
            <div className="relative bg-card rounded-3xl border-4 border-primary/30 overflow-hidden aspect-video">
              {!permissionGranted ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/50 p-8">
                  <Mascot mood="waving" size="lg" className="mb-6" />
                  <h2 className="text-2xl font-bold text-foreground mb-4 text-center">
                    Let&apos;s Turn On Your Camera!
                  </h2>
                  <p className="text-muted-foreground text-center mb-6 max-w-md">
                    We need your camera to play fun games together. Don&apos;t worry, 
                    only you can see yourself!
                  </p>
                  <Button 
                    size="lg" 
                    onClick={handleStartCamera}
                    className="rounded-full px-8 py-6 text-lg font-bold"
                  >
                    <Camera className="w-6 h-6 mr-2" />
                    Turn On Camera
                  </Button>
                </div>
              ) : (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover transform -scale-x-100"
                  />
                  
                  {/* Overlay UI */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full",
                      isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    )}>
                      <div className={cn(
                        "w-3 h-3 rounded-full",
                        isActive ? "bg-primary-foreground animate-pulse" : "bg-muted-foreground"
                      )} />
                      <span className="font-semibold">
                        {isActive ? "Detecting..." : "Paused"}
                      </span>
                    </div>
                    
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleToggleDetection}
                      className="rounded-full"
                    >
                      {isActive ? (
                        <><Pause className="w-4 h-4 mr-1" /> Pause</>
                      ) : (
                        <><Play className="w-4 h-4 mr-1" /> Resume</>
                      )}
                    </Button>
                  </div>

                  {/* Mascot Companion */}
                  <div className="absolute bottom-4 right-4">
                    <Mascot mood={getMascotMood()} size="md" />
                  </div>
                </>
              )}
            </div>

            {/* Controls */}
            {permissionGranted && (
              <div className="flex items-center justify-center gap-4 mt-6">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleToggleDetection}
                  className="rounded-full bg-transparent"
                >
                  {isActive ? (
                    <><CameraOff className="w-5 h-5 mr-2" /> Stop Camera</>
                  ) : (
                    <><Camera className="w-5 h-5 mr-2" /> Start Camera</>
                  )}
                </Button>
                <Button
                  size="lg"
                  onClick={awardPoints}
                  className="rounded-full"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Earn Points!
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Detection Results */}
            <EmotionDisplay
              emotion={detection.emotion}
              confidence={detection.emotionConfidence}
              attention={detection.attention}
              attentionScore={detection.attentionScore}
              gesture={detection.gesture}
              faceDetected={detection.faceDetected}
            />

            {/* Activities */}
            <div className="bg-card rounded-3xl border-4 border-border p-6">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Choose an Activity
              </h3>
              <div className="space-y-3">
                {activities.map((activity) => (
                  <button
                    key={activity.id}
                    onClick={() => setSelectedActivity(activity.id)}
                    className={cn(
                      "w-full p-4 rounded-2xl border-2 text-left transition-all",
                      selectedActivity === activity.id
                        ? "bg-primary/20 border-primary"
                        : "bg-muted/50 border-transparent hover:bg-muted"
                    )}
                  >
                    <p className="font-semibold text-foreground">{activity.name}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
