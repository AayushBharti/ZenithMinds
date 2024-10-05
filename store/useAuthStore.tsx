// src/store/useAuthStore.ts
import { create } from "zustand"

// Define the User interface
interface User {
  firstName: string
  lastName: string
  email: string
}

// Define the SignupData interface
interface SignupData {
  accountType: string
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  // otp: string
}

// Define the Auth state interface
interface AuthState {
  token: string | null
  signupData?: SignupData
  user: User | null
  loading: boolean
  setToken: (token: string | null) => void
  setSignupData: (data: SignupData) => void
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
}

// Create the store
export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  signupData: undefined,
  user: null,
  loading: false,

  setToken: (token) => set({ token }),
  setSignupData: (data) => set({ signupData: data }),
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
}))
