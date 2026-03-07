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

// SWR config to prevent error states when using localStorage fallback
const swrConfig = {
  revalidateOnFocus: false,
  shouldRetryOnError: false,
}

// Games - Now uses async API calls with fallback
export function useGames() {
  return useSWR<Game[]>('games', () => demoStore.games.getAll(), swrConfig)
}

export function useGame(id: string | undefined) {
  return useSWR<Game | undefined>(id ? `game-${id}` : null, () => id ? Promise.resolve(demoStore.games.getById(id)) : Promise.resolve(undefined), swrConfig)
}

// Categories - Now uses async API calls with fallback
export function useCategories() {
  return useSWR<Category[]>('categories', () => demoStore.categories.getAll(), swrConfig)
}

export function useCategory(id: string | undefined) {
  return useSWR<Category | undefined>(id ? `category-${id}` : null, () => id ? Promise.resolve(demoStore.categories.getById(id)) : Promise.resolve(undefined), swrConfig)
}

// Achievements - Now uses async API calls with fallback
export function useAchievements() {
  return useSWR<Achievement[]>('achievements', () => demoStore.achievements.getAll(), swrConfig)
}

export function useAchievement(id: string | undefined) {
  return useSWR<Achievement | undefined>(id ? `achievement-${id}` : null, () => id ? Promise.resolve(demoStore.achievements.getById(id)) : Promise.resolve(undefined), swrConfig)
}

// Challenges - Now uses async API calls with fallback
export function useChallenges() {
  return useSWR<Challenge[]>('challenges', () => demoStore.challenges.getAll(), swrConfig)
}

export function useChallenge(id: string | undefined) {
  return useSWR<Challenge | undefined>(id ? `challenge-${id}` : null, () => id ? Promise.resolve(demoStore.challenges.getById(id)) : Promise.resolve(undefined), swrConfig)
}

// Reviews - Now uses async API calls with fallback
export function useReviews() {
  return useSWR<Review[]>('reviews', () => demoStore.reviews.getAll(), swrConfig)
}

export function useReview(id: string | undefined) {
  return useSWR<Review | undefined>(id ? `review-${id}` : null, () => id ? Promise.resolve(demoStore.reviews.getById(id)) : Promise.resolve(undefined), swrConfig)
}

export function useGameReviews(gameId: string | undefined) {
  return useSWR<Review[]>(gameId ? `reviews-game-${gameId}` : null, () => gameId ? demoStore.reviews.getByGameId(gameId) : Promise.resolve([]), swrConfig)
}

// Payments - Now uses async API calls with fallback
export function usePayments() {
  return useSWR<Payment[]>('payments', () => demoStore.payments.getAll(), swrConfig)
}

export function usePayment(id: string | undefined) {
  return useSWR<Payment | undefined>(id ? `payment-${id}` : null, () => id ? Promise.resolve(demoStore.payments.getById(id)) : Promise.resolve(undefined), swrConfig)
}

// Privileges - Now uses async API calls with fallback
export function usePrivileges() {
  return useSWR<Privilege[]>('privileges', () => demoStore.privileges.getAll(), swrConfig)
}

export function usePrivilege(id: string | undefined) {
  return useSWR<Privilege | undefined>(id ? `privilege-${id}` : null, () => id ? Promise.resolve(demoStore.privileges.getById(id)) : Promise.resolve(undefined), swrConfig)
}

// ML Image Ratings - Now uses async API calls with fallback
export function useImageRatings() {
  return useSWR<ImageRating[]>('image-ratings', () => demoStore.mlRatings.getAll(), swrConfig)
}

export function useImageRating(id: number | undefined) {
  return useSWR<ImageRating | undefined>(id ? `image-rating-${id}` : null, () => id ? Promise.resolve(demoStore.mlRatings.getById(id)) : Promise.resolve(undefined), swrConfig)
}
