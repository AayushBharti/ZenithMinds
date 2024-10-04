import Link from "next/link"

export default function ForgotPassword() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Forgot Password</h1>
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Email" />
          <button type="submit">Submit</button>
          <Link href="/login">Back to Login</Link>
          <Link href="/signup">Signup</Link>
        </form>
      </div>
    </div>
  )
}
