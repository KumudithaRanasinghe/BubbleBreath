"use client"

import { useState } from "react"
import { AppNav } from "@/components/app-nav"
import { GameCard } from "@/components/game-card"
import { Mascot } from "@/components/mascot"
import { Wind, Heart, Users, Brain, Palette, Music, Star, Lock } from "lucide-react"
import { cn } from "@/lib/utils"

const gameCategories = [
  { id: "all", label: "All Games" },
  { id: "breathing", label: "Breathing" },
  { id: "emotions", label: "Emotions" },
  { id: "social", label: "Social" },
  { id: "mindfulness", label: "Mindfulness" },
]

const games = [
  {
    id: "bubble-breathing",
    title: "Bubble Breathing",
    description: "Blow magical bubbles by taking slow, deep breaths!",
    icon: <Wind className="w-10 h-10" />,
    href: "/games/bubble-breathing",
    level: 1,
    unlocked: true,
    stars: 3,
    color: "mint" as const,
    category: "breathing",
  },
  {
    id: "emotion-match",
    title: "Emotion Match",
    description: "Match faces with feelings in this fun card game!",
    icon: <Heart className="w-10 h-10" />,
    href: "/games/emotion-match",
    level: 2,
    unlocked: true,
    stars: 2,
    color: "coral" as const,
    category: "emotions",
  },
  {
    id: "friend-finder",
    title: "Friend Finder",
    description: "Learn how to make friends through fun scenarios!",
    icon: <Users className="w-10 h-10" />,
    href: "/games/friend-finder",
    level: 3,
    unlocked: true,
    stars: 1,
    color: "sky" as const,
    category: "social",
  },
  {
    id: "calm-clouds",
    title: "Calm Clouds",
    description: "Float on peaceful clouds and relax your mind!",
    icon: <Brain className="w-10 h-10" />,
    href: "/games/calm-clouds",
    level: 4,
    unlocked: true,
    stars: 0,
    color: "lavender" as const,
    category: "mindfulness",
  },
  {
    id: "color-moods",
    title: "Color My Mood",
    description: "Express your feelings through beautiful art!",
    icon: <Palette className="w-10 h-10" />,
    href: "/games/color-moods",
    level: 5,
    unlocked: false,
    stars: 0,
    color: "sunny" as const,
    category: "emotions",
  },
  {
    id: "rhythm-relax",
    title: "Rhythm Relax",
    description: "Follow the beat and calm your heart!",
    icon: <Music className="w-10 h-10" />,
    href: "/games/rhythm-relax",
    level: 6,
    unlocked: false,
    stars: 0,
    color: "coral" as const,
    category: "mindfulness",
  },
]

export default function GamesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const totalStars = games.reduce((acc, game) => acc + game.stars, 0)
  const maxStars = games.length * 3

  const filteredGames = selectedCategory === "all" 
    ? games 
    : games.filter(game => game.category === selectedCategory)

  return (
    <div className="min-h-screen bg-background pb-24 md:pt-24 md:pb-8">
      <AppNav />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          <Mascot mood="excited" size="lg" animate={false} />
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Game World
            </h1>
            <p className="text-muted-foreground mb-4">
              Explore fun games that help you learn about feelings and grow stronger!
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="flex items-center gap-2 bg-secondary/30 px-4 py-2 rounded-full">
                <Star className="w-5 h-5 text-secondary fill-secondary" />
                <span className="font-bold text-foreground">{totalStars} / {maxStars} Stars</span>
              </div>
              <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full">
                <Lock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {games.filter(g => !g.unlocked).length} locked
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-card rounded-2xl p-6 mb-8 border-2 border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-foreground">Your Progress</span>
            <span className="text-sm text-muted-foreground">
              Level {Math.floor(totalStars / 3) + 1} Explorer
            </span>
          </div>
          <div className="h-4 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${(totalStars / maxStars) * 100}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Earn {maxStars - totalStars} more stars to unlock all games!
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {gameCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "px-4 py-2 rounded-full font-semibold transition-all",
                selectedCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <GameCard
              key={game.id}
              title={game.title}
              description={game.description}
              icon={game.icon}
              href={game.href}
              level={game.level}
              unlocked={game.unlocked}
              stars={game.stars}
              color={game.color}
            />
          ))}
        </div>

        {/* Encouragement Banner */}
        <div className="mt-12 bg-primary/10 rounded-3xl p-8 text-center border-4 border-primary/30">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            You are doing amazing!
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Every game you play helps you understand your feelings better. 
            Keep exploring and having fun!
          </p>
        </div>
      </main>
    </div>
  )
}
