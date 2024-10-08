import PrivateRoute from "@/components/Auth/PrivateRoute"

export default function dashboard() {
  return (
    <PrivateRoute>
      <div>Dashboard</div>
    </PrivateRoute>
  )
}
