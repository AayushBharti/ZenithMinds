// This will prevent authenticated users from accessing this route
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/useAuthStore"
import { useEffect } from "react"

interface OpenRouteProps {
  children: React.ReactNode
}

export default function OpenRoute({ children }: OpenRouteProps) {
  const { token } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (token) {
      router.push("/dashboard/my-profile")
    }
  }, [token, router])

  if (token) {
    return <div>Loading...</div>
  }

  return children
}
