// store/useAuthStore.ts
import { create } from "zustand"

// Define the Auth state interface
interface AuthState {
  token: string | null
  signupData?: any // Replace `any` with actual signup data type if known
  loading: boolean
  setToken: (token: string | null) => void
  setSignupData: (data: any) => void
  setLoading: (loading: boolean) => void
}

// Create the store
export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  signupData: undefined,
  loading: false,

  setToken: (token: string | null) => set({ token }),
  setSignupData: (data: any) => set({ signupData: data }),
  setLoading: (loading: boolean) => set({ loading }),
}))
