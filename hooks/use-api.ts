"use client"

import useSWR from 'swr'
import { demoStore } from '@/lib/demo-data'
import type { 
  Game, 
  Category, 
  Achievement, 
  Challenge, 
  Review, 
  Payment,
  Privilege,
  ImageRating 
} from '@/lib/api/types'

// Games
export function useGames() {
  return useSWR<Game[]>('games', () => Promise.resolve(demoStore.games.getAll()))
}

export function useGame(id: string | undefined) {
  return useSWR<Game | undefined>(id ? `game-${id}` : null, () => id ? Promise.resolve(demoStore.games.getById(id)) : Promise.resolve(undefined))
}

// Categories
export function useCategories() {
  return useSWR<Category[]>('categories', () => Promise.resolve(demoStore.categories.getAll()))
}

export function useCategory(id: string | undefined) {
  return useSWR<Category | undefined>(id ? `category-${id}` : null, () => id ? Promise.resolve(demoStore.categories.getById(id)) : Promise.resolve(undefined))
}

// Achievements
export function useAchievements() {
  return useSWR<Achievement[]>('achievements', () => Promise.resolve(demoStore.achievements.getAll()))
}

export function useAchievement(id: string | undefined) {
  return useSWR<Achievement | undefined>(id ? `achievement-${id}` : null, () => id ? Promise.resolve(demoStore.achievements.getById(id)) : Promise.resolve(undefined))
}

// Challenges
export function useChallenges() {
  return useSWR<Challenge[]>('challenges', () => Promise.resolve(demoStore.challenges.getAll()))
}

export function useChallenge(id: string | undefined) {
  return useSWR<Challenge | undefined>(id ? `challenge-${id}` : null, () => id ? Promise.resolve(demoStore.challenges.getById(id)) : Promise.resolve(undefined))
}

// Reviews
export function useReviews() {
  return useSWR<Review[]>('reviews', () => Promise.resolve(demoStore.reviews.getAll()))
}

export function useReview(id: string | undefined) {
  return useSWR<Review | undefined>(id ? `review-${id}` : null, () => id ? Promise.resolve(demoStore.reviews.getById(id)) : Promise.resolve(undefined))
}

export function useGameReviews(gameId: string | undefined) {
  return useSWR<Review[]>(gameId ? `reviews-game-${gameId}` : null, () => gameId ? Promise.resolve(demoStore.reviews.getByGameId(gameId)) : Promise.resolve([]))
}

// Payments
export function usePayments() {
  return useSWR<Payment[]>('payments', () => Promise.resolve(demoStore.payments.getAll()))
}

export function usePayment(id: string | undefined) {
  return useSWR<Payment | undefined>(id ? `payment-${id}` : null, () => id ? Promise.resolve(demoStore.payments.getById(id)) : Promise.resolve(undefined))
}

// Privileges
export function usePrivileges() {
  return useSWR<Privilege[]>('privileges', () => Promise.resolve(demoStore.privileges.getAll()))
}

export function usePrivilege(id: string | undefined) {
  return useSWR<Privilege | undefined>(id ? `privilege-${id}` : null, () => id ? Promise.resolve(demoStore.privileges.getById(id)) : Promise.resolve(undefined))
}

// ML Image Ratings
export function useImageRatings() {
  return useSWR<ImageRating[]>('image-ratings', () => Promise.resolve(demoStore.mlRatings.getAll()))
}

export function useImageRating(id: number | undefined) {
  return useSWR<ImageRating | undefined>(id ? `image-rating-${id}` : null, () => id ? Promise.resolve(demoStore.mlRatings.getById(id)) : Promise.resolve(undefined))
}
