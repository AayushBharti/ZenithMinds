import { Request, Response } from "express"
import Category from "../models/Category"
import Course from "../models/Course"

export const createCategory = async (req: any, res: Response) => {
  try {
    const { name, description } = req.body
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" })
    }
    const CategorysDetails = await Category.create({
      name: name,
      description: description,
    })
    console.log(CategorysDetails)
    return res.status(200).json({
      success: true,
      message: "Categorys Created Successfully",
    })
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: (error as Error).message,
    })
  }
}

export const showAllCategories = async (req: any, res: Response) => {
  try {
    const allCategorys = await Category.find(
      {},
      { name: true, description: true }
    )
    res.status(200).json({
      success: true,
      data: allCategorys,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: (error as Error).message,
    })
  }
}

export const categoryPageDetails = async (req: any, res: Response) => {
  try {
    const { categoryId } = req.body

    // Get courses for the specified category
    const selectedCategory = await Category.findById(categoryId) //populate instuctor and rating and reviews from courses
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: [{ path: "instructor" }, { path: "ratingAndReviews" }],
      })
      .exec()
    // console.log(selectedCategory);
    // Handle the case when the category is not found
    if (!selectedCategory) {
      console.log("Category not found.")
      return res
        .status(404)
        .json({ success: false, message: "Category not found" })
    }
    // Handle the case when there are no courses
    if (selectedCategory.courses.length === 0) {
      console.log("No courses found for the selected category.")
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
      })
    }

    const selectedCourses = selectedCategory.courses

    // Get courses for other categories
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    }).populate({
      path: "courses",
      match: { status: "Published" },
      populate: [{ path: "instructor" }, { path: "ratingAndReviews" }],
    })
    const differentCourses = []
    for (const category of categoriesExceptSelected) {
      differentCourses.push(...category.courses)
    }

    // Get top-selling courses across all categories
    const allCategories = await Category.find().populate({
      path: "courses",
      match: { status: "Published" },
      populate: [{ path: "instructor" }, { path: "ratingAndReviews" }],
    })
    const allCourses = allCategories.flatMap((category) => category.courses)
    const mostSellingCourses = allCourses
      // .sort((a, b) => (b as any).sold - (a as any).sold)
      .slice(0, 10)

    res.status(200).json({
      selectedCourses: selectedCourses,
      differentCourses: differentCourses,
      mostSellingCourses: mostSellingCourses,
      success: true,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: (error as Error).message,
    })
  }
}

//add course to category
export const addCourseToCategory = async (req: any, res: Response) => {
  const { courseId, categoryId } = req.body
  // console.log("category id", categoryId);
  try {
    const category = await Category.findById(categoryId)
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      })
    }
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      })
    }
    if (category.courses.includes(courseId)) {
      return res.status(200).json({
        success: true,
        message: "Course already exists in the category",
      })
    }
    category.courses.push(courseId)
    await category.save()
    return res.status(200).json({
      success: true,
      message: "Course added to category successfully",
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: (error as Error).message,
    })
  }
}
