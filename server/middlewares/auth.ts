import { NextFunction } from "express"
import jwt from "jsonwebtoken"

import dotenv from "dotenv"
dotenv.config()

//auth
export const auth = async (req, res, next: NextFunction) => {
  try {
    //extract token
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorisation").replace("Bearer ", "")

    // If token is missing, return response
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      })
    }

    //verify the token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET)
      console.log("decode = ", decode)
      req.user = decode
    } catch (err) {
      // Verification issue
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      })
    }
    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating the token",
    })
  }
}

//isStudent
export const isStudent = async (req, res, next: NextFunction) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Students only",
      })
    }
    next()
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    })
  }
}

//isInstructor
export const isInstructor = async (req, res, next: NextFunction) => {
  try {
    if (req.user.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Instructor only",
      })
    }
    next()
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    })
  }
}

//isAdmin
export const isAdmin = async (req, res, next: NextFunction) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Admin only",
      })
    }
    next()
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    })
  }
}
