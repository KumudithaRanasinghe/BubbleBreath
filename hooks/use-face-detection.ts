"use client"

import React from "react"

import { useState, useCallback, useRef, useEffect } from "react"

export type Emotion = "happy" | "sad" | "surprised" | "calm" | "thinking" | "neutral"
export type AttentionLevel = "focused" | "distracted" | "very-focused"
export type Gesture = "wave" | "thumbs-up" | "peace" | "none"

interface DetectionState {
  emotion: Emotion
  emotionConfidence: number
  attention: AttentionLevel
  attentionScore: number
  gesture: Gesture
  faceDetected: boolean
  isProcessing: boolean
}

interface UseFaceDetectionReturn {
  detection: DetectionState
  startDetection: () => void
  stopDetection: () => void
  videoRef: React.RefObject<HTMLVideoElement | null>
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  isActive: boolean
  permissionGranted: boolean
  requestPermission: () => Promise<boolean>
}

// Simulated ML detection for demo purposes
// In production, you would integrate with TensorFlow.js, face-api.js, or similar
const simulateEmotionDetection = (): { emotion: Emotion; confidence: number } => {
  const emotions: Emotion[] = ["happy", "calm", "surprised", "thinking", "neutral"]
  const weights = [0.35, 0.25, 0.15, 0.15, 0.1] // Weighted towards positive emotions for kids
  
  const random = Math.random()
  let cumulative = 0
  let selectedEmotion: Emotion = "happy"
  
  for (let i = 0; i < emotions.length; i++) {
    cumulative += weights[i]
    if (random <= cumulative) {
      selectedEmotion = emotions[i]
      break
    }
  }
  
  return {
    emotion: selectedEmotion,
    confidence: 0.7 + Math.random() * 0.25
  }
}

const simulateAttentionDetection = (): { attention: AttentionLevel; score: number } => {
  const score = 0.5 + Math.random() * 0.5 // 50-100% attention score
  let attention: AttentionLevel = "focused"
  
  if (score > 0.85) attention = "very-focused"
  else if (score < 0.65) attention = "distracted"
  
  return { attention, score }
}

const simulateGestureDetection = (): Gesture => {
  const random = Math.random()
  if (random < 0.1) return "wave"
  if (random < 0.15) return "thumbs-up"
  if (random < 0.18) return "peace"
  return "none"
}

export function useFaceDetection(): UseFaceDetectionReturn {
  const [detection, setDetection] = useState<DetectionState>({
    emotion: "neutral",
    emotionConfidence: 0,
    attention: "focused",
    attentionScore: 0,
    gesture: "none",
    faceDetected: false,
    isProcessing: false
  })
  
  const [isActive, setIsActive] = useState(false)
  const [permissionGranted, setPermissionGranted] = useState(false)
  
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const requestPermission = useCallback(async (): Promise<boolean> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 640, height: 480 }
      })
      
      streamRef.current = stream
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
      
      setPermissionGranted(true)
      return true
    } catch (error) {
      console.error("Camera permission denied:", error)
      setPermissionGranted(false)
      return false
    }
  }, [])

  const startDetection = useCallback(() => {
    if (!permissionGranted) return
    
    setIsActive(true)
    setDetection(prev => ({ ...prev, isProcessing: true }))
    
    // Simulate ML detection every 500ms
    intervalRef.current = setInterval(() => {
      const emotionResult = simulateEmotionDetection()
      const attentionResult = simulateAttentionDetection()
      const gesture = simulateGestureDetection()
      
      setDetection({
        emotion: emotionResult.emotion,
        emotionConfidence: emotionResult.confidence,
        attention: attentionResult.attention,
        attentionScore: attentionResult.score,
        gesture,
        faceDetected: true,
        isProcessing: true
      })
    }, 500)
  }, [permissionGranted])

  const stopDetection = useCallback(() => {
    setIsActive(false)
    setDetection(prev => ({ ...prev, isProcessing: false, faceDetected: false }))
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  return {
    detection,
    startDetection,
    stopDetection,
    videoRef,
    canvasRef,
    isActive,
    permissionGranted,
    requestPermission
  }
}
