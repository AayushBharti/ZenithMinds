// This will prevent Unauthenticated users from accessing this route
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/useAuthStore"
import { useEffect } from "react"

interface PrivateRouteProps {
  children: React.ReactNode
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { token } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!token) {
      router.push("/login")
    }
  }, [token, router])

  if (!token) {
    return <div>Loading...</div>
  }

  return children
}
