"use client"

import { cn } from "@/lib/utils"
import type { Emotion, AttentionLevel, Gesture } from "@/hooks/use-face-detection"
import { Smile, Frown, AlertCircle, Heart, Brain, Meh, Hand, ThumbsUp, Sparkles, Eye } from "lucide-react"

interface EmotionDisplayProps {
  emotion: Emotion
  confidence: number
  attention: AttentionLevel
  attentionScore: number
  gesture: Gesture
  faceDetected: boolean
}

const emotionConfig = {
  happy: { icon: Smile, label: "Happy", color: "bg-sunny", message: "You look so happy!" },
  sad: { icon: Frown, label: "Sad", color: "bg-sky", message: "It's okay to feel sad sometimes." },
  surprised: { icon: AlertCircle, label: "Surprised", color: "bg-coral", message: "Wow, what a surprise!" },
  calm: { icon: Heart, label: "Calm", color: "bg-mint", message: "You're feeling peaceful!" },
  thinking: { icon: Brain, label: "Thinking", color: "bg-lavender", message: "Great thinking face!" },
  neutral: { icon: Meh, label: "Neutral", color: "bg-muted", message: "Just being you!" },
}

const gestureConfig = {
  wave: { icon: Hand, label: "Waving", message: "Hello there!" },
  "thumbs-up": { icon: ThumbsUp, label: "Thumbs Up", message: "Great job!" },
  peace: { icon: Sparkles, label: "Peace", message: "Peace and love!" },
  none: null,
}

const attentionConfig = {
  "very-focused": { label: "Super Focused", color: "bg-primary" },
  focused: { label: "Focused", color: "bg-mint" },
  distracted: { label: "A bit distracted", color: "bg-coral" },
}

export function EmotionDisplay({ emotion, confidence, attention, attentionScore, gesture, faceDetected }: EmotionDisplayProps) {
  if (!faceDetected) {
    return (
      <div className="flex flex-col items-center gap-4 p-6 bg-card rounded-3xl border-4 border-muted">
        <Eye className="w-12 h-12 text-muted-foreground animate-pulse" />
        <p className="text-lg font-semibold text-muted-foreground">
          Looking for your face...
        </p>
        <p className="text-sm text-muted-foreground">
          Make sure your camera can see you!
        </p>
      </div>
    )
  }

  const emotionData = emotionConfig[emotion]
  const EmotionIcon = emotionData.icon
  const gestureData = gestureConfig[gesture]
  const attentionData = attentionConfig[attention]

  return (
    <div className="flex flex-col gap-4">
      {/* Emotion Card */}
      <div className={cn(
        "flex items-center gap-4 p-6 rounded-3xl border-4 transition-all duration-300",
        `${emotionData.color}/30 border-${emotionData.color.replace('bg-', '')}`
      )}>
        <div className={cn(
          "w-16 h-16 rounded-2xl flex items-center justify-center",
          emotionData.color
        )}>
          <EmotionIcon className="w-8 h-8 text-foreground" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-bold text-foreground">{emotionData.label}</h3>
            <span className="text-sm bg-foreground/10 px-2 py-0.5 rounded-full">
              {Math.round(confidence * 100)}%
            </span>
          </div>
          <p className="text-muted-foreground">{emotionData.message}</p>
        </div>
      </div>

      {/* Attention Bar */}
      <div className="p-4 bg-card rounded-2xl border-2 border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-foreground">Focus Level</span>
          <span className={cn(
            "text-xs font-bold px-2 py-1 rounded-full text-foreground",
            attentionData.color
          )}>
            {attentionData.label}
          </span>
        </div>
        <div className="h-4 bg-muted rounded-full overflow-hidden">
          <div 
            className={cn("h-full rounded-full transition-all duration-500", attentionData.color)}
            style={{ width: `${attentionScore * 100}%` }}
          />
        </div>
      </div>

      {/* Gesture Detection */}
      {gestureData && (
        <div className="flex items-center gap-3 p-4 bg-secondary/30 rounded-2xl border-2 border-secondary animate-bounce">
          <gestureData.icon className="w-8 h-8 text-secondary-foreground" />
          <div>
            <p className="font-bold text-secondary-foreground">{gestureData.label} Detected!</p>
            <p className="text-sm text-secondary-foreground/80">{gestureData.message}</p>
          </div>
        </div>
      )}
    </div>
  )
}
