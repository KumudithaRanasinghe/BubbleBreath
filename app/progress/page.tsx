"use client"

import { useState } from "react"
import { AppNav } from "@/components/app-nav"
import { Mascot } from "@/components/mascot"
import { Button } from "@/components/ui/button"
import { 
  Star, Trophy, Flame, Heart, Brain, Target, Gift, 
  Calendar, TrendingUp, Award, Sparkles, ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"

const achievements = [
  {
    id: "first-breath",
    title: "First Breath",
    description: "Complete your first breathing exercise",
    icon: Heart,
    unlocked: true,
    color: "bg-coral",
  },
  {
    id: "emotion-expert",
    title: "Emotion Expert",
    description: "Identify 10 different emotions correctly",
    icon: Brain,
    unlocked: true,
    color: "bg-mint",
  },
  {
    id: "week-warrior",
    title: "Week Warrior",
    description: "Play games for 7 days in a row",
    icon: Flame,
    unlocked: true,
    color: "bg-sunny",
  },
  {
    id: "star-collector",
    title: "Star Collector",
    description: "Earn 50 stars total",
    icon: Star,
    unlocked: false,
    progress: 35,
    maxProgress: 50,
    color: "bg-sky",
  },
  {
    id: "friend-maker",
    title: "Friend Maker",
    description: "Complete all social skills games",
    icon: Gift,
    unlocked: false,
    progress: 2,
    maxProgress: 5,
    color: "bg-lavender",
  },
  {
    id: "calm-champion",
    title: "Calm Champion",
    description: "Do 100 breathing cycles",
    icon: Target,
    unlocked: false,
    progress: 42,
    maxProgress: 100,
    color: "bg-primary",
  },
]

const weeklyActivity = [
  { day: "Mon", played: true, minutes: 15 },
  { day: "Tue", played: true, minutes: 22 },
  { day: "Wed", played: true, minutes: 8 },
  { day: "Thu", played: false, minutes: 0 },
  { day: "Fri", played: true, minutes: 30 },
  { day: "Sat", played: true, minutes: 25 },
  { day: "Sun", played: false, minutes: 0 },
]

const recentActivities = [
  { game: "Bubble Breathing", stars: 3, time: "2 hours ago" },
  { game: "Emotion Match", stars: 2, time: "Yesterday" },
  { game: "Friend Finder", stars: 1, time: "2 days ago" },
  { game: "Calm Clouds", stars: 2, time: "3 days ago" },
]

export default function ProgressPage() {
  const [selectedTab, setSelectedTab] = useState<"stats" | "achievements">("stats")
  
  const totalStars = 35
  const currentStreak = 5
  const totalMinutes = 100
  const gamesPlayed = 24
  const level = Math.floor(totalStars / 10) + 1

  return (
    <div className="min-h-screen bg-background pb-24 md:pt-24 md:pb-8">
      <AppNav />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-card rounded-3xl border-4 border-primary/30 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <Mascot mood="proud" size="xl" animate={false} />
              <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                {level}
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Super Star!
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                Level {level} Mind Explorer
              </p>
              
              {/* Level Progress */}
              <div className="max-w-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Level Progress</span>
                  <span className="text-sm text-muted-foreground">{totalStars % 10}/10 stars to level {level + 1}</span>
                </div>
                <div className="h-4 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${(totalStars % 10) * 10}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-2xl p-6 border-2 border-border text-center">
            <Star className="w-8 h-8 mx-auto mb-2 text-secondary fill-secondary" />
            <p className="text-3xl font-bold text-foreground">{totalStars}</p>
            <p className="text-sm text-muted-foreground">Total Stars</p>
          </div>
          <div className="bg-card rounded-2xl p-6 border-2 border-border text-center">
            <Flame className="w-8 h-8 mx-auto mb-2 text-coral" />
            <p className="text-3xl font-bold text-foreground">{currentStreak}</p>
            <p className="text-sm text-muted-foreground">Day Streak</p>
          </div>
          <div className="bg-card rounded-2xl p-6 border-2 border-border text-center">
            <Calendar className="w-8 h-8 mx-auto mb-2 text-sky" />
            <p className="text-3xl font-bold text-foreground">{totalMinutes}</p>
            <p className="text-sm text-muted-foreground">Minutes Played</p>
          </div>
          <div className="bg-card rounded-2xl p-6 border-2 border-border text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-sunny" />
            <p className="text-3xl font-bold text-foreground">{gamesPlayed}</p>
            <p className="text-sm text-muted-foreground">Games Played</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={selectedTab === "stats" ? "default" : "outline"}
            onClick={() => setSelectedTab("stats")}
            className="rounded-full"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            My Stats
          </Button>
          <Button
            variant={selectedTab === "achievements" ? "default" : "outline"}
            onClick={() => setSelectedTab("achievements")}
            className="rounded-full"
          >
            <Award className="w-4 h-4 mr-2" />
            Achievements
          </Button>
        </div>

        {selectedTab === "stats" ? (
          <div className="space-y-6">
            {/* Weekly Activity */}
            <div className="bg-card rounded-3xl border-4 border-border p-6">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                This Week
              </h2>
              <div className="grid grid-cols-7 gap-2">
                {weeklyActivity.map((day) => (
                  <div key={day.day} className="text-center">
                    <p className="text-xs text-muted-foreground mb-2">{day.day}</p>
                    <div className={cn(
                      "w-12 h-12 mx-auto rounded-xl flex items-center justify-center",
                      day.played ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    )}>
                      {day.played ? (
                        <Sparkles className="w-5 h-5" />
                      ) : (
                        <span className="text-lg">-</span>
                      )}
                    </div>
                    {day.minutes > 0 && (
                      <p className="text-xs text-muted-foreground mt-1">{day.minutes}m</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-card rounded-3xl border-4 border-border p-6">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Recent Games
              </h2>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-2xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{activity.game}</p>
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3].map((starNum) => (
                        <Star
                          key={starNum}
                          className={cn(
                            "w-5 h-5",
                            starNum <= activity.stars ? "fill-secondary text-secondary" : "text-muted"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => {
              const Icon = achievement.icon
              return (
                <div
                  key={achievement.id}
                  className={cn(
                    "relative p-6 rounded-3xl border-4 transition-all",
                    achievement.unlocked 
                      ? `${achievement.color}/20 border-${achievement.color.replace('bg-', '')}`
                      : "bg-muted/50 border-muted opacity-75"
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center",
                      achievement.unlocked ? achievement.color : "bg-muted"
                    )}>
                      <Icon className={cn(
                        "w-7 h-7",
                        achievement.unlocked ? "text-foreground" : "text-muted-foreground"
                      )} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground mb-1">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                      
                      {!achievement.unlocked && achievement.progress !== undefined && (
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium text-foreground">
                              {achievement.progress}/{achievement.maxProgress}
                            </span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${(achievement.progress / (achievement.maxProgress || 1)) * 100}%` }}
                            />
                          </div>
                        </div>
                      )}
                      
                      {achievement.unlocked && (
                        <div className="flex items-center gap-1 text-sm text-primary font-medium">
                          <Sparkles className="w-4 h-4" />
                          Unlocked!
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {achievement.unlocked && (
                    <div className="absolute top-4 right-4">
                      <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                        <Star className="w-5 h-5 fill-secondary-foreground text-secondary-foreground" />
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Motivational Banner */}
        <div className="mt-8 bg-primary/10 rounded-3xl p-8 text-center border-4 border-primary/30">
          <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Keep Up the Great Work!
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-4">
            Every time you play, you learn something new about yourself. 
            You are becoming stronger every day!
          </p>
          <Button className="rounded-full">
            Play More Games
            <ChevronRight className="w-5 h-5 ml-1" />
          </Button>
        </div>
      </main>
    </div>
  )
}
