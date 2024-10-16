"use client"

import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2 } from "lucide-react"
import { toast } from "react-hot-toast"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "@/services/courseDetailsService"
import { COURSE_STATUS } from "@/data/constants"
import { useAuthStore } from "@/store/useAuthStore"
import useCourseStore from "@/store/useCourseStore"
import ChipInput from "./ChipInput"
import Upload from "./Upload"

const formSchema = z.object({
  courseTitle: z.string().min(1, "Course Title is required"),
  courseShortDesc: z.string().min(1, "Course Description is required"),
  coursePrice: z.number().min(0, "Price must be a positive number"),
  courseCategory: z.string().min(1, "Course Category is required"),
  courseTags: z.array(z.string()).min(1, "At least one tag is required"),
  courseBenefits: z.string().min(1, "Course benefits are required"),
  courseRequirements: z
    .array(z.string())
    .min(1, "At least one requirement is required"),
  courseImage: z.instanceof(File).optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function CourseInformationForm() {
  const [loading, setLoading] = useState(false)
  const [courseCategories, setCourseCategories] = useState([])
  const { token } = useAuthStore()
  const { course, editCourse, setCourse, setStep, setEditCourse } =
    useCourseStore()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseTitle: "",
      courseShortDesc: "",
      coursePrice: 0,
      courseCategory: "",
      courseTags: [],
      courseBenefits: "",
      courseRequirements: [],
    },
  })

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      const categories = await fetchCourseCategories()
      if (categories.length > 0) {
        setCourseCategories(categories)
      }
      setLoading(false)
    }

    if (editCourse) {
      form.reset({
        courseTitle: course.courseName,
        courseShortDesc: course.courseDescription,
        coursePrice: course.price,
        courseCategory: course.category._id,
        courseTags: course.tag,
        courseBenefits: course.whatYouWillLearn,
        courseRequirements: course.instructions,
      })
    }
    getCategories()
  }, [editCourse, course, form])

  const onSubmit = async (data: FormValues) => {
    setLoading(true)
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (key === "courseTags" || key === "courseRequirements") {
          formData.append(key, JSON.stringify(value))
        } else if (key === "courseImage" && value instanceof File) {
          formData.append("thumbnailImage", value)
        } else {
          formData.append(key, value.toString())
        }
      })

      if (editCourse) {
        formData.append("courseId", course._id)
        const result = await editCourseDetails(formData, token as string)
        if (result) {
          setEditCourse(false)
          setStep(2)
          setCourse(result)
        }
      } else {
        formData.append("status", COURSE_STATUS.DRAFT)
        const result = await addCourseDetails(formData, token as string)
        if (result) {
          setStep(2)
          setCourse(result)
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("Failed to submit course information")
    }
    setLoading(false)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {editCourse ? "Edit Course Information" : "Create New Course"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="courseTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Course Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="courseShortDesc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter Course Description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coursePrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter Course Price"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="courseCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {courseCategories.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Controller
              name="courseTags"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Tags</FormLabel>
                  <FormControl>
                    <ChipInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Enter tags and press Enter"
                    />
                  </FormControl>
                  <FormDescription>
                    Enter tags and press Enter to add
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="courseBenefits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Benefits</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter Course Benefits" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Controller
              name="courseRequirements"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Requirements</FormLabel>
                  <FormControl>
                    <ChipInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Enter requirements and press Enter"
                    />
                  </FormControl>
                  <FormDescription>
                    Enter requirements and press Enter to add
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Controller
              name="courseImage"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Image</FormLabel>
                  <FormControl>
                    <Upload
                      onChange={(file) => field.onChange(file)}
                      value={field.value as File}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CardFooter className="flex justify-between">
              {editCourse && (
                <Button variant="outline" onClick={() => setStep(2)}>
                  Continue Without Saving
                </Button>
              )}
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  <>{editCourse ? "Save Changes" : "Next"}</>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
