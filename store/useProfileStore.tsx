import { create } from "zustand"

// Define the Auth state interface
interface AuthState {
  token: string | null
  signupData?: any
  loading: boolean
  setToken: (token: string | null) => void
  setSignupData: (data: any) => void
  setLoading: (loading: boolean) => void
}

// Create the store with Zustand
export const useAuthStore = create<AuthState>((set) => ({
  token:
    typeof window !== "undefined" && localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token") as string)
      : null,
  signupData: undefined,
  loading: false,

  // Action to set the token
  setToken: (token: string | null) => {
    set({ token })
    if (token) {
      localStorage.setItem("token", JSON.stringify(token))
    } else {
      localStorage.removeItem("token")
    }
  },

  // Action to set signup data
  setSignupData: (data: any) => set({ signupData: data }),

  // Action to set loading status
  setLoading: (loading: boolean) => set({ loading }),
}))
