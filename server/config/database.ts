import mongoose from "mongoose"
import dotenv from "dotenv"

// Load environment variables
dotenv.config()

// Define the connection function
const connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL as string)
    .then(() => console.log("DB Connected Successfully"))
    .catch((error) => {
      console.log("DB Connection Failed")
      console.error(error)
      process.exit(1)
    })
}

// Export the connection function
export { connect }
