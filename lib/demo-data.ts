"use client"

import type {
  Game,
  Category,
  Achievement,
  Challenge,
  Review,
  Payment,
  Privilege,
  ImageRating,
} from './api/types'

// API Base URLs
const API_BASE = 'http://51.21.3.147'
const GAME_SERVICE = `${API_BASE}/api`
const PAYMENT_SERVICE = `${API_BASE}`
const ACHIEVEMENT_SERVICE = `${API_BASE}`
const CHALLENGE_SERVICE = `${API_BASE}`
const REVIEW_SERVICE = `${API_BASE}`
const PRIVILEGES_SERVICE = `${API_BASE}`
const ML_SERVICE = `${API_BASE}/api/ml`

// Storage keys
const STORAGE_KEYS = {
  GAMES: 'mindpals_demo_games',
  CATEGORIES: 'mindpals_demo_categories',
  ACHIEVEMENTS: 'mindpals_demo_achievements',
  CHALLENGES: 'mindpals_demo_challenges',
  REVIEWS: 'mindpals_demo_reviews',
  PAYMENTS: 'mindpals_demo_payments',
  PRIVILEGES: 'mindpals_demo_privileges',
  ML_RATINGS: 'mindpals_demo_ml_ratings',
}

// Default demo data
const defaultCategories: Category[] = [
  { id: 'cat-1', name: 'Emotions', description: 'Learn to recognize and express emotions', icon: 'heart', color: 'coral', createdAt: '2024-01-01' },
  { id: 'cat-2', name: 'Breathing', description: 'Calming breathing exercises', icon: 'wind', color: 'mint', createdAt: '2024-01-01' },
  { id: 'cat-3', name: 'Social Skills', description: 'Practice social interactions', icon: 'users', color: 'sky', createdAt: '2024-01-01' },
  { id: 'cat-4', name: 'Mindfulness', description: 'Be present in the moment', icon: 'brain', color: 'lavender', createdAt: '2024-01-01' },
  { id: 'cat-5', name: 'Creativity', description: 'Express yourself creatively', icon: 'palette', color: 'sunny', createdAt: '2024-01-01' },
]

const defaultGames: Game[] = [
  { id: 'game-1', name: 'Smile Therapy', description: 'Practice your smile with AI-powered feedback and earn points!', categoryId: 'cat-1', imageUrl: '/placeholder.svg', level: 1, stars: 0, unlocked: true, createdAt: '2024-01-01' },
  { id: 'game-2', name: 'Bubble Breathing', description: 'Blow magical bubbles by taking slow, deep breaths!', categoryId: 'cat-2', imageUrl: '/placeholder.svg', level: 2, stars: 3, unlocked: true, createdAt: '2024-01-02' },
  { id: 'game-3', name: 'Emotion Mirror', description: 'Copy the emotions you see and learn to express feelings!', categoryId: 'cat-1', imageUrl: '/placeholder.svg', level: 3, stars: 2, unlocked: true, createdAt: '2024-01-03' },
  { id: 'game-4', name: 'Friendship Island', description: 'Learn social skills by helping characters make friends!', categoryId: 'cat-3', imageUrl: '/placeholder.svg', level: 4, stars: 0, unlocked: false, createdAt: '2024-01-04' },
  { id: 'game-5', name: 'Calm Garden', description: 'Grow a peaceful garden through mindful activities!', categoryId: 'cat-4', imageUrl: '/placeholder.svg', level: 5, stars: 1, unlocked: true, createdAt: '2024-01-05' },
  { id: 'game-6', name: 'Color My Feelings', description: 'Express emotions through creative coloring!', categoryId: 'cat-5', imageUrl: '/placeholder.svg', level: 6, stars: 0, unlocked: false, createdAt: '2024-01-06' },
]

const defaultAchievements: Achievement[] = [
  { id: 'ach-1', title: 'First Smile', description: 'Complete your first smile therapy session', conditionType: 'games_played', value: 1, icon: 'smile', color: 'sunny', unlocked: true, progress: 1, maxProgress: 1, createdAt: '2024-01-01' },
  { id: 'ach-2', title: 'Breath Master', description: 'Complete 10 breathing exercises', conditionType: 'breathing_sessions', value: 10, icon: 'wind', color: 'mint', unlocked: false, progress: 3, maxProgress: 10, createdAt: '2024-01-01' },
  { id: 'ach-3', title: 'Emotion Expert', description: 'Identify 50 different emotions correctly', conditionType: 'emotions_identified', value: 50, icon: 'heart', color: 'coral', unlocked: false, progress: 23, maxProgress: 50, createdAt: '2024-01-01' },
  { id: 'ach-4', title: 'Social Butterfly', description: 'Complete all social skills games', conditionType: 'social_games', value: 5, icon: 'users', color: 'sky', unlocked: false, progress: 2, maxProgress: 5, createdAt: '2024-01-01' },
  { id: 'ach-5', title: 'Mindful Master', description: 'Practice mindfulness for 7 days in a row', conditionType: 'streak', value: 7, icon: 'brain', color: 'lavender', unlocked: true, progress: 7, maxProgress: 7, createdAt: '2024-01-01' },
  { id: 'ach-6', title: 'Creative Star', description: 'Create 20 artworks', conditionType: 'artworks', value: 20, icon: 'star', color: 'sunny', unlocked: false, progress: 8, maxProgress: 20, createdAt: '2024-01-01' },
]

const defaultChallenges: Challenge[] = [
  { id: 'ch-1', name: 'Daily Smile', description: 'Practice smiling for 5 minutes today', reward: 50, gameId: 'game-1', startDate: '2024-01-01', endDate: '2024-12-31', active: true, completed: false, createdAt: '2024-01-01' },
  { id: 'ch-2', name: 'Breathing Break', description: 'Do 3 breathing exercises today', reward: 30, gameId: 'game-2', startDate: '2024-01-01', endDate: '2024-12-31', active: true, completed: true, createdAt: '2024-01-01' },
  { id: 'ch-3', name: 'Emotion Detective', description: 'Identify 10 emotions correctly', reward: 100, gameId: 'game-3', startDate: '2024-01-01', endDate: '2024-12-31', active: true, completed: false, createdAt: '2024-01-01' },
  { id: 'ch-4', name: 'Weekend Warrior', description: 'Play 5 games this weekend', reward: 75, active: true, completed: false, createdAt: '2024-01-01' },
  { id: 'ch-5', name: 'Perfect Week', description: 'Login and play every day for a week', reward: 200, active: false, completed: true, createdAt: '2024-01-01' },
]

const defaultReviews: Review[] = [
  { id: 'rev-1', gameId: 'game-1', userId: 'demo-user-1', rating: 5, comment: 'My kid loves this game! The smile detection is so fun.', isApproved: true, userName: 'Demo User', gameName: 'Smile Therapy', createdAt: '2024-01-15' },
  { id: 'rev-2', gameId: 'game-2', userId: 'demo-user-1', rating: 4, comment: 'Great for calming down before bedtime.', isApproved: true, userName: 'Demo User', gameName: 'Bubble Breathing', createdAt: '2024-01-20' },
  { id: 'rev-3', gameId: 'game-3', userId: 'demo-admin-1', rating: 5, comment: 'Excellent for emotional development!', isApproved: true, userName: 'Demo Admin', gameName: 'Emotion Mirror', createdAt: '2024-02-01' },
  { id: 'rev-4', gameId: 'game-1', userId: 'user-3', rating: 4, comment: 'Fun and educational!', isApproved: false, userName: 'Sarah', gameName: 'Smile Therapy', createdAt: '2024-02-10' },
]

const defaultPayments: Payment[] = [
  { id: 'pay-1', userId: 'demo-user-1', amount: 9.99, currency: 'USD', paymentMethod: 'credit_card', status: 'completed', description: 'Premium subscription - Monthly', createdAt: '2024-01-01' },
  { id: 'pay-2', userId: 'demo-user-1', amount: 4.99, currency: 'USD', paymentMethod: 'paypal', status: 'completed', description: 'Game pack - Emotions bundle', createdAt: '2024-01-15' },
  { id: 'pay-3', userId: 'user-3', amount: 9.99, currency: 'USD', paymentMethod: 'credit_card', status: 'pending', description: 'Premium subscription - Monthly', createdAt: '2024-02-01' },
  { id: 'pay-4', userId: 'user-4', amount: 29.99, currency: 'USD', paymentMethod: 'credit_card', status: 'completed', description: 'Premium subscription - Yearly', createdAt: '2024-02-10' },
  { id: 'pay-5', userId: 'user-5', amount: 9.99, currency: 'USD', paymentMethod: 'apple_pay', status: 'failed', description: 'Premium subscription - Monthly', createdAt: '2024-02-15' },
]

const defaultPrivileges: Privilege[] = [
  { id: 'priv-1', name: 'Admin', description: 'Full system access with all permissions', permissions: ['read', 'write', 'delete', 'manage_users', 'manage_games', 'manage_payments', 'view_analytics'], createdAt: '2024-01-01' },
  { id: 'priv-2', name: 'Moderator', description: 'Can moderate content and reviews', permissions: ['read', 'write', 'moderate_reviews', 'manage_games'], createdAt: '2024-01-01' },
  { id: 'priv-3', name: 'User', description: 'Standard user access', permissions: ['read', 'play_games', 'write_reviews'], createdAt: '2024-01-01' },
  { id: 'priv-4', name: 'Premium User', description: 'Premium features access', permissions: ['read', 'play_games', 'write_reviews', 'access_premium', 'no_ads'], createdAt: '2024-01-01' },
]

const defaultMlRatings: ImageRating[] = [
  { id: 1, userId: 1, label: 'Good', score: 0.95, imageUrl: '/placeholder.svg', createdAt: '2024-01-15T10:30:00' },
  { id: 2, userId: 1, label: 'Nice', score: 0.82, imageUrl: '/placeholder.svg', createdAt: '2024-01-15T10:31:00' },
  { id: 3, userId: 2, label: 'Good', score: 0.91, imageUrl: '/placeholder.svg', createdAt: '2024-01-16T14:20:00' },
  { id: 4, userId: 1, label: 'Bad', score: 0.65, imageUrl: '/placeholder.svg', createdAt: '2024-01-17T09:15:00' },
  { id: 5, userId: 3, label: 'Nice', score: 0.78, imageUrl: '/placeholder.svg', createdAt: '2024-01-18T16:45:00' },
]

// Helper to get data from localStorage or return default
function getData<T>(key: string, defaultData: T[]): T[] {
  if (typeof window === 'undefined') return defaultData
  
  const stored = localStorage.getItem(key)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return defaultData
    }
  }
  
  localStorage.setItem(key, JSON.stringify(defaultData))
  return defaultData
}

// Helper to save data
function saveData<T>(key: string, data: T[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(key, JSON.stringify(data))
}

// Generate unique ID
function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// API Request helper with logging
async function apiRequest<T>(
  method: string,
  url: string,
  body?: unknown,
  isFormData = false
): Promise<{ success: boolean; data?: T; error?: string }> {
  console.log(`[v0 API] ${method} ${url}`)
  if (body && !isFormData) {
    console.log('[v0 API] Request Body:', JSON.stringify(body, null, 2))
  }

  try {
    const options: RequestInit = {
      method,
      headers: isFormData ? {} : { 'Content-Type': 'application/json' },
      body: isFormData ? (body as FormData) : body ? JSON.stringify(body) : undefined,
    }

    const response = await fetch(url, options)
    console.log(`[v0 API] Response Status: ${response.status} ${response.statusText}`)

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`[v0 API] Error Response:`, errorText)
      return { success: false, error: `${response.status}: ${errorText}` }
    }

    const data = await response.json()
    console.log('[v0 API] Response Data:', data)
    return { success: true, data }
  } catch (error) {
    console.error('[v0 API] Network Error:', error)
    return { success: false, error: String(error) }
  }
}

// ============= DEMO STORE WITH API INTEGRATION =============
export const demoStore = {
  // Categories
  categories: {
    getAll: async (): Promise<Category[]> => {
      const result = await apiRequest<Category[]>('GET', `${GAME_SERVICE}/Category`)
      if (result.success && result.data) {
        saveData(STORAGE_KEYS.CATEGORIES, result.data)
        return result.data
      }
      console.log('[v0] API failed, using localStorage data')
      return getData(STORAGE_KEYS.CATEGORIES, defaultCategories)
    },
    getById: (id: string): Category | undefined => {
      const categories = getData(STORAGE_KEYS.CATEGORIES, defaultCategories)
      return categories.find(c => c.id === id)
    },
    create: async (data: Omit<Category, 'id' | 'createdAt'>): Promise<Category> => {
      const result = await apiRequest<Category>('POST', `${GAME_SERVICE}/Category`, data)
      
      const categories = getData(STORAGE_KEYS.CATEGORIES, defaultCategories)
      const newCategory: Category = result.success && result.data ? result.data : {
        ...data,
        id: generateId('cat'),
        createdAt: new Date().toISOString(),
      }
      
      if (!result.success) {
        console.log('[v0] API failed, saving to localStorage only')
        categories.push(newCategory)
        saveData(STORAGE_KEYS.CATEGORIES, categories)
      }
      
      return newCategory
    },
    update: async (id: string, data: Partial<Category>): Promise<Category> => {
      const result = await apiRequest<Category>('PUT', `${GAME_SERVICE}/Category`, { id, ...data })
      
      const categories = getData(STORAGE_KEYS.CATEGORIES, defaultCategories)
      const index = categories.findIndex(c => c.id === id)
      
      if (result.success && result.data) {
        if (index !== -1) {
          categories[index] = result.data
          saveData(STORAGE_KEYS.CATEGORIES, categories)
        }
        return result.data
      }
      
      console.log('[v0] API failed, updating localStorage only')
      if (index !== -1) {
        categories[index] = { ...categories[index], ...data }
        saveData(STORAGE_KEYS.CATEGORIES, categories)
        return categories[index]
      }
      throw new Error('Category not found')
    },
    delete: async (id: string): Promise<void> => {
      await apiRequest('DELETE', `${GAME_SERVICE}/Category/${id}`)
      
      const categories = getData(STORAGE_KEYS.CATEGORIES, defaultCategories)
      const filtered = categories.filter(c => c.id !== id)
      saveData(STORAGE_KEYS.CATEGORIES, filtered)
      console.log('[v0] Category deleted from localStorage')
    },
  },

  // Games
  games: {
    getAll: async (): Promise<Game[]> => {
      const result = await apiRequest<Game[]>('GET', `${GAME_SERVICE}/Game`)
      if (result.success && result.data) {
        saveData(STORAGE_KEYS.GAMES, result.data)
        return result.data
      }
      console.log('[v0] API failed, using localStorage data')
      return getData(STORAGE_KEYS.GAMES, defaultGames)
    },
    getById: (id: string): Game | undefined => {
      const games = getData(STORAGE_KEYS.GAMES, defaultGames)
      return games.find(g => g.id === id)
    },
    create: async (data: Omit<Game, 'id' | 'createdAt'>): Promise<Game> => {
      const result = await apiRequest<Game>('POST', `${GAME_SERVICE}/Game`, data)
      
      const games = getData(STORAGE_KEYS.GAMES, defaultGames)
      const newGame: Game = result.success && result.data ? result.data : {
        ...data,
        id: generateId('game'),
        createdAt: new Date().toISOString(),
      }
      
      if (!result.success) {
        console.log('[v0] API failed, saving to localStorage only')
        games.push(newGame)
        saveData(STORAGE_KEYS.GAMES, games)
      }
      
      return newGame
    },
    update: async (id: string, data: Partial<Game>): Promise<Game> => {
      const result = await apiRequest<Game>('PUT', `${GAME_SERVICE}/Game`, { id, ...data })
      
      const games = getData(STORAGE_KEYS.GAMES, defaultGames)
      const index = games.findIndex(g => g.id === id)
      
      if (result.success && result.data) {
        if (index !== -1) {
          games[index] = result.data
          saveData(STORAGE_KEYS.GAMES, games)
        }
        return result.data
      }
      
      console.log('[v0] API failed, updating localStorage only')
      if (index !== -1) {
        games[index] = { ...games[index], ...data }
        saveData(STORAGE_KEYS.GAMES, games)
        return games[index]
      }
      throw new Error('Game not found')
    },
    delete: async (id: string): Promise<void> => {
      await apiRequest('DELETE', `${GAME_SERVICE}/Game/${id}`)
      
      const games = getData(STORAGE_KEYS.GAMES, defaultGames)
      const filtered = games.filter(g => g.id !== id)
      saveData(STORAGE_KEYS.GAMES, filtered)
      console.log('[v0] Game deleted from localStorage')
    },
  },

  // Achievements
  achievements: {
    getAll: async (): Promise<Achievement[]> => {
      const result = await apiRequest<Achievement[]>('GET', `${ACHIEVEMENT_SERVICE}/Achivement`)
      if (result.success && result.data) {
        saveData(STORAGE_KEYS.ACHIEVEMENTS, result.data)
        return result.data
      }
      console.log('[v0] API failed, using localStorage data')
      return getData(STORAGE_KEYS.ACHIEVEMENTS, defaultAchievements)
    },
    getById: (id: string): Achievement | undefined => {
      const achievements = getData(STORAGE_KEYS.ACHIEVEMENTS, defaultAchievements)
      return achievements.find(a => a.id === id)
    },
    create: async (data: Omit<Achievement, 'id' | 'createdAt'>): Promise<Achievement> => {
      const result = await apiRequest<Achievement>('POST', `${ACHIEVEMENT_SERVICE}/Achivement`, data)
      
      const achievements = getData(STORAGE_KEYS.ACHIEVEMENTS, defaultAchievements)
      const newAchievement: Achievement = result.success && result.data ? result.data : {
        ...data,
        id: generateId('ach'),
        createdAt: new Date().toISOString(),
      }
      
      if (!result.success) {
        console.log('[v0] API failed, saving to localStorage only')
        achievements.push(newAchievement)
        saveData(STORAGE_KEYS.ACHIEVEMENTS, achievements)
      }
      
      return newAchievement
    },
    update: async (id: string, data: Partial<Achievement>): Promise<Achievement> => {
      const result = await apiRequest<Achievement>('PUT', `${ACHIEVEMENT_SERVICE}/Achivement`, { id, ...data })
      
      const achievements = getData(STORAGE_KEYS.ACHIEVEMENTS, defaultAchievements)
      const index = achievements.findIndex(a => a.id === id)
      
      if (result.success && result.data) {
        if (index !== -1) {
          achievements[index] = result.data
          saveData(STORAGE_KEYS.ACHIEVEMENTS, achievements)
        }
        return result.data
      }
      
      console.log('[v0] API failed, updating localStorage only')
      if (index !== -1) {
        achievements[index] = { ...achievements[index], ...data }
        saveData(STORAGE_KEYS.ACHIEVEMENTS, achievements)
        return achievements[index]
      }
      throw new Error('Achievement not found')
    },
    delete: async (id: string): Promise<void> => {
      await apiRequest('DELETE', `${ACHIEVEMENT_SERVICE}/Achivement/${id}`)
      
      const achievements = getData(STORAGE_KEYS.ACHIEVEMENTS, defaultAchievements)
      const filtered = achievements.filter(a => a.id !== id)
      saveData(STORAGE_KEYS.ACHIEVEMENTS, filtered)
      console.log('[v0] Achievement deleted from localStorage')
    },
  },

  // Challenges
  challenges: {
    getAll: async (): Promise<Challenge[]> => {
      const result = await apiRequest<Challenge[]>('GET', `${CHALLENGE_SERVICE}/Challenge`)
      if (result.success && result.data) {
        saveData(STORAGE_KEYS.CHALLENGES, result.data)
        return result.data
      }
      console.log('[v0] API failed, using localStorage data')
      return getData(STORAGE_KEYS.CHALLENGES, defaultChallenges)
    },
    getById: (id: string): Challenge | undefined => {
      const challenges = getData(STORAGE_KEYS.CHALLENGES, defaultChallenges)
      return challenges.find(c => c.id === id)
    },
    create: async (data: Omit<Challenge, 'id' | 'createdAt'>): Promise<Challenge> => {
      const result = await apiRequest<Challenge>('POST', `${CHALLENGE_SERVICE}/Challenge`, data)
      
      const challenges = getData(STORAGE_KEYS.CHALLENGES, defaultChallenges)
      const newChallenge: Challenge = result.success && result.data ? result.data : {
        ...data,
        id: generateId('ch'),
        createdAt: new Date().toISOString(),
      }
      
      if (!result.success) {
        console.log('[v0] API failed, saving to localStorage only')
        challenges.push(newChallenge)
        saveData(STORAGE_KEYS.CHALLENGES, challenges)
      }
      
      return newChallenge
    },
    update: async (id: string, data: Partial<Challenge>): Promise<Challenge> => {
      const result = await apiRequest<Challenge>('PUT', `${CHALLENGE_SERVICE}/Challenge`, { id, ...data })
      
      const challenges = getData(STORAGE_KEYS.CHALLENGES, defaultChallenges)
      const index = challenges.findIndex(c => c.id === id)
      
      if (result.success && result.data) {
        if (index !== -1) {
          challenges[index] = result.data
          saveData(STORAGE_KEYS.CHALLENGES, challenges)
        }
        return result.data
      }
      
      console.log('[v0] API failed, updating localStorage only')
      if (index !== -1) {
        challenges[index] = { ...challenges[index], ...data }
        saveData(STORAGE_KEYS.CHALLENGES, challenges)
        return challenges[index]
      }
      throw new Error('Challenge not found')
    },
    delete: async (id: string): Promise<void> => {
      await apiRequest('DELETE', `${CHALLENGE_SERVICE}/Challenge/${id}`)
      
      const challenges = getData(STORAGE_KEYS.CHALLENGES, defaultChallenges)
      const filtered = challenges.filter(c => c.id !== id)
      saveData(STORAGE_KEYS.CHALLENGES, filtered)
      console.log('[v0] Challenge deleted from localStorage')
    },
  },

  // Reviews
  reviews: {
    getAll: async (): Promise<Review[]> => {
      const result = await apiRequest<Review[]>('GET', `${REVIEW_SERVICE}/Review`)
      if (result.success && result.data) {
        saveData(STORAGE_KEYS.REVIEWS, result.data)
        return result.data
      }
      console.log('[v0] API failed, using localStorage data')
      return getData(STORAGE_KEYS.REVIEWS, defaultReviews)
    },
    getById: (id: string): Review | undefined => {
      const reviews = getData(STORAGE_KEYS.REVIEWS, defaultReviews)
      return reviews.find(r => r.id === id)
    },
    getByGameId: async (gameId: string): Promise<Review[]> => {
      const result = await apiRequest<Review[]>('GET', `${REVIEW_SERVICE}/Review/game/${gameId}`)
      if (result.success && result.data) {
        return result.data
      }
      console.log('[v0] API failed, using localStorage data')
      const reviews = getData(STORAGE_KEYS.REVIEWS, defaultReviews)
      return reviews.filter(r => r.gameId === gameId)
    },
    create: async (data: Omit<Review, 'id' | 'createdAt'>): Promise<Review> => {
      const result = await apiRequest<Review>('POST', `${REVIEW_SERVICE}/Review`, data)
      
      const reviews = getData(STORAGE_KEYS.REVIEWS, defaultReviews)
      const newReview: Review = result.success && result.data ? result.data : {
        ...data,
        id: generateId('rev'),
        createdAt: new Date().toISOString(),
      }
      
      if (!result.success) {
        console.log('[v0] API failed, saving to localStorage only')
        reviews.push(newReview)
        saveData(STORAGE_KEYS.REVIEWS, reviews)
      }
      
      return newReview
    },
    update: async (id: string, data: Partial<Review>): Promise<Review> => {
      const result = await apiRequest<Review>('PUT', `${REVIEW_SERVICE}/Review`, { id, ...data })
      
      const reviews = getData(STORAGE_KEYS.REVIEWS, defaultReviews)
      const index = reviews.findIndex(r => r.id === id)
      
      if (result.success && result.data) {
        if (index !== -1) {
          reviews[index] = result.data
          saveData(STORAGE_KEYS.REVIEWS, reviews)
        }
        return result.data
      }
      
      console.log('[v0] API failed, updating localStorage only')
      if (index !== -1) {
        reviews[index] = { ...reviews[index], ...data }
        saveData(STORAGE_KEYS.REVIEWS, reviews)
        return reviews[index]
      }
      throw new Error('Review not found')
    },
    delete: async (id: string): Promise<void> => {
      await apiRequest('DELETE', `${REVIEW_SERVICE}/Review/${id}`)
      
      const reviews = getData(STORAGE_KEYS.REVIEWS, defaultReviews)
      const filtered = reviews.filter(r => r.id !== id)
      saveData(STORAGE_KEYS.REVIEWS, filtered)
      console.log('[v0] Review deleted from localStorage')
    },
  },

  // Payments
  payments: {
    getAll: async (): Promise<Payment[]> => {
      const result = await apiRequest<Payment[]>('GET', `${PAYMENT_SERVICE}/Payment`)
      if (result.success && result.data) {
        saveData(STORAGE_KEYS.PAYMENTS, result.data)
        return result.data
      }
      console.log('[v0] API failed, using localStorage data')
      return getData(STORAGE_KEYS.PAYMENTS, defaultPayments)
    },
    getById: (id: string): Payment | undefined => {
      const payments = getData(STORAGE_KEYS.PAYMENTS, defaultPayments)
      return payments.find(p => p.id === id)
    },
    create: async (data: Omit<Payment, 'id' | 'createdAt'>): Promise<Payment> => {
      const result = await apiRequest<Payment>('POST', `${PAYMENT_SERVICE}/Payment`, data)
      
      const payments = getData(STORAGE_KEYS.PAYMENTS, defaultPayments)
      const newPayment: Payment = result.success && result.data ? result.data : {
        ...data,
        id: generateId('pay'),
        createdAt: new Date().toISOString(),
      }
      
      if (!result.success) {
        console.log('[v0] API failed, saving to localStorage only')
        payments.push(newPayment)
        saveData(STORAGE_KEYS.PAYMENTS, payments)
      }
      
      return newPayment
    },
    update: async (id: string, data: Partial<Payment>): Promise<Payment> => {
      const result = await apiRequest<Payment>('PUT', `${PAYMENT_SERVICE}/Payment`, { id, ...data })
      
      const payments = getData(STORAGE_KEYS.PAYMENTS, defaultPayments)
      const index = payments.findIndex(p => p.id === id)
      
      if (result.success && result.data) {
        if (index !== -1) {
          payments[index] = result.data
          saveData(STORAGE_KEYS.PAYMENTS, payments)
        }
        return result.data
      }
      
      console.log('[v0] API failed, updating localStorage only')
      if (index !== -1) {
        payments[index] = { ...payments[index], ...data }
        saveData(STORAGE_KEYS.PAYMENTS, payments)
        return payments[index]
      }
      throw new Error('Payment not found')
    },
    delete: async (id: string): Promise<void> => {
      await apiRequest('DELETE', `${PAYMENT_SERVICE}/Payment/${id}`)
      
      const payments = getData(STORAGE_KEYS.PAYMENTS, defaultPayments)
      const filtered = payments.filter(p => p.id !== id)
      saveData(STORAGE_KEYS.PAYMENTS, filtered)
      console.log('[v0] Payment deleted from localStorage')
    },
  },

  // Privileges
  privileges: {
    getAll: async (): Promise<Privilege[]> => {
      const result = await apiRequest<Privilege[]>('GET', `${PRIVILEGES_SERVICE}/Privilleges`)
      if (result.success && result.data) {
        saveData(STORAGE_KEYS.PRIVILEGES, result.data)
        return result.data
      }
      console.log('[v0] API failed, using localStorage data')
      return getData(STORAGE_KEYS.PRIVILEGES, defaultPrivileges)
    },
    getById: (id: string): Privilege | undefined => {
      const privileges = getData(STORAGE_KEYS.PRIVILEGES, defaultPrivileges)
      return privileges.find(p => p.id === id)
    },
    create: async (data: Omit<Privilege, 'id' | 'createdAt'>): Promise<Privilege> => {
      const result = await apiRequest<Privilege>('POST', `${PRIVILEGES_SERVICE}/Privilleges`, data)
      
      const privileges = getData(STORAGE_KEYS.PRIVILEGES, defaultPrivileges)
      const newPrivilege: Privilege = result.success && result.data ? result.data : {
        ...data,
        id: generateId('priv'),
        createdAt: new Date().toISOString(),
      }
      
      if (!result.success) {
        console.log('[v0] API failed, saving to localStorage only')
        privileges.push(newPrivilege)
        saveData(STORAGE_KEYS.PRIVILEGES, privileges)
      }
      
      return newPrivilege
    },
    update: async (id: string, data: Partial<Privilege>): Promise<Privilege> => {
      const result = await apiRequest<Privilege>('PUT', `${PRIVILEGES_SERVICE}/Privilleges`, { id, ...data })
      
      const privileges = getData(STORAGE_KEYS.PRIVILEGES, defaultPrivileges)
      const index = privileges.findIndex(p => p.id === id)
      
      if (result.success && result.data) {
        if (index !== -1) {
          privileges[index] = result.data
          saveData(STORAGE_KEYS.PRIVILEGES, privileges)
        }
        return result.data
      }
      
      console.log('[v0] API failed, updating localStorage only')
      if (index !== -1) {
        privileges[index] = { ...privileges[index], ...data }
        saveData(STORAGE_KEYS.PRIVILEGES, privileges)
        return privileges[index]
      }
      throw new Error('Privilege not found')
    },
    delete: async (id: string): Promise<void> => {
      await apiRequest('DELETE', `${PRIVILEGES_SERVICE}/Privilleges/${id}`)
      
      const privileges = getData(STORAGE_KEYS.PRIVILEGES, defaultPrivileges)
      const filtered = privileges.filter(p => p.id !== id)
      saveData(STORAGE_KEYS.PRIVILEGES, filtered)
      console.log('[v0] Privilege deleted from localStorage')
    },
  },

  // ML Ratings
  mlRatings: {
    getAll: async (): Promise<ImageRating[]> => {
      const result = await apiRequest<ImageRating[]>('GET', `${ML_SERVICE}/image-ratings`)
      if (result.success && result.data) {
        saveData(STORAGE_KEYS.ML_RATINGS, result.data)
        return result.data
      }
      console.log('[v0] API failed, using localStorage data')
      return getData(STORAGE_KEYS.ML_RATINGS, defaultMlRatings)
    },
    getById: (id: number): ImageRating | undefined => {
      const ratings = getData(STORAGE_KEYS.ML_RATINGS, defaultMlRatings)
      return ratings.find(r => r.id === id)
    },
    classifyImage: async (userId: number, imageFile?: File): Promise<ImageRating> => {
      if (imageFile) {
        const formData = new FormData()
        formData.append('userId', userId.toString())
        formData.append('image', imageFile)
        
        const result = await apiRequest<ImageRating>('POST', `${ML_SERVICE}/image-ratings/classify`, formData, true)
        
        if (result.success && result.data) {
          const ratings = getData(STORAGE_KEYS.ML_RATINGS, defaultMlRatings)
          ratings.push(result.data)
          saveData(STORAGE_KEYS.ML_RATINGS, ratings)
          return result.data
        }
      }
      
      // Fallback: Simulate ML classification
      console.log('[v0] API failed or no image, using simulated ML classification')
      const labels: ('Good' | 'Nice' | 'Bad')[] = ['Good', 'Nice', 'Bad']
      const randomLabel = labels[Math.floor(Math.random() * labels.length)]
      const randomScore = Math.random() * 0.4 + 0.6
      
      const ratings = getData(STORAGE_KEYS.ML_RATINGS, defaultMlRatings)
      const newId = Math.max(...ratings.map(r => r.id), 0) + 1
      const newRating: ImageRating = {
        id: newId,
        userId,
        label: randomLabel,
        score: parseFloat(randomScore.toFixed(2)),
        imageUrl: '/placeholder.svg',
        createdAt: new Date().toISOString(),
      }
      
      ratings.push(newRating)
      saveData(STORAGE_KEYS.ML_RATINGS, ratings)
      return newRating
    },
    update: async (id: number, data: Partial<ImageRating>): Promise<ImageRating> => {
      const result = await apiRequest<ImageRating>('PUT', `${ML_SERVICE}/image-ratings/${id}`, data)
      
      const ratings = getData(STORAGE_KEYS.ML_RATINGS, defaultMlRatings)
      const index = ratings.findIndex(r => r.id === id)
      
      if (result.success && result.data) {
        if (index !== -1) {
          ratings[index] = result.data
          saveData(STORAGE_KEYS.ML_RATINGS, ratings)
        }
        return result.data
      }
      
      console.log('[v0] API failed, updating localStorage only')
      if (index !== -1) {
        ratings[index] = { ...ratings[index], ...data }
        saveData(STORAGE_KEYS.ML_RATINGS, ratings)
        return ratings[index]
      }
      throw new Error('Rating not found')
    },
    delete: async (id: number): Promise<void> => {
      await apiRequest('DELETE', `${ML_SERVICE}/image-ratings/${id}`)
      
      const ratings = getData(STORAGE_KEYS.ML_RATINGS, defaultMlRatings)
      const filtered = ratings.filter(r => r.id !== id)
      saveData(STORAGE_KEYS.ML_RATINGS, filtered)
      console.log('[v0] ML Rating deleted from localStorage')
    },
  },
}
