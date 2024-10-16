import { Request, Response } from "express"
import Category from "../models/Category"
import Course from "../models/Course"
import User from "../models/User"
import { uploadImageToCloudinary } from "../utils/imageUploader"

// Function to create a new course
export const createCourse = async (req: any, res: Response) => {
  try {
    // Get user ID from request object
    const userId = req.user?.id

    // Get all required fields from request body
    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      category,
      instructions,
    } = req.body

    let {status} = req.body

    // Get thumbnail image from request files
    const thumbnail = req.files?.thumbnailImage

    // Check if any of the required fields are missing
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag ||
      !thumbnail ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      })
    }

    if (!status || status === undefined) {
      status = "Draft"
    }
    // Check for instructor details
    const instructorDetails = await User.findById(userId, {
      accountType: "Instructor",
    })

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details Not Found",
      })
    }

    // Check if the tag given is valid
    const categoryDetails = await Category.findById(category)
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details Not Found",
      })
    }

    // Upload the Thumbnail to Cloudinary
    const folderName = process.env.FOLDER_NAME
    if (!folderName) {
      return res.status(404).json({
        success: false,
        message: "Invalid FOLDER_NAME in env",
      })
    }

    const thumbnailImage = await uploadImageToCloudinary(Array.isArray(thumbnail) ? thumbnail[0] : thumbnail, folderName)
    console.log(thumbnailImage)
    // Create a new course with the given details
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn,
      price,
      tag: tag,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      status,
      instructions: instructions,
    })

    // Add the new course to the User Schema of the Instructor
    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    )
    // Add the new course to the Categories
    await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          course: newCourse._id,
        },
      },
      { new: true }
    )
    // Return the new course and a success message
    res.status(200).json({
      success: true,
      data: newCourse,
      message: "Course Created Successfully",
    })
  } catch (error) {
    // Handle any errors that occur during the creation of the course
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: (error as Error).message,
    })
  }
}

//getALlCourses
export const getAllCourses = async (req: any, res: Response) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEnroled: true,
      }
    )
      .populate("instructor")
      .exec()
    return res.status(200).json({
      success: true,
      message: "Data for all courses fetched successsfully",
      data: allCourses,
    })
  } catch (error) {
    console.log(error)
    return res.status(404).json({
      success: false,
      message: `Can't Fetch Course Data`,
      error: (error as Error).message,
    })
  }
}

//getCourseDetails
export const getCourseDetails = async (
  req: any,
  res: Response
): Promise<Response> => {
  try {
    const { courseId } = req.body

    // Fetch course details with multiple levels of population
    const courseDetails = await Course.findById(courseId)
      .populate({ path: "instructor", populate: { path: "additionalDetails" } })
      .populate("category")
      .populate({
        // Only populate specific fields from user model in ratingAndReviews
        path: "ratingAndReviews",
        populate: {
          path: "user",
          select: "firstName lastName accountType image",
        },
      })
      .populate({ path: "courseContent", populate: { path: "subSection" } })
      .exec()

    // Check if course details exist
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course Not Found",
      })
    }

    // Return successful response with course data
    return res.status(200).json({
      success: true,
      message: "Course fetched successfully",
      data: courseDetails,
    })
  } catch (error) {
    console.error("Error fetching course details:", error)
    return res.status(500).json({
      success: false,
      message: `Can't Fetch Course Data`,
      error: (error as Error).message,
    })
  }
}
