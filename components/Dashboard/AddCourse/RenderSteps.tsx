"use client"

import React from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import useCourseStore from "../../../store/useCourseStore"
import CourseInformationForm from "./CourseInformation/CourseInformationForm"
import CourseBuilderForm from "./CourseBuilder/CourseBuilder"
const steps = [
  { id: 1, title: "Course Information" },
  { id: 2, title: "Course Builder" },
  { id: 3, title: "Publish Course" },
]

export function RenderSteps() {
  const { step } = useCourseStore()

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <div className="relative flex justify-between">
          {steps.map((item, index) => (
            <React.Fragment key={item.id}>
              <div className="flex flex-col items-center">
                <motion.div
                  className={`grid h-10 w-10 place-items-center rounded-full border-2 ${
                    step >= item.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted bg-background text-muted-foreground"
                  }`}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {step > item.id ? <Check className="h-6 w-6" /> : item.id}
                </motion.div>
                <p className="mt-2 text-sm font-medium">{item.title}</p>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`absolute top-5 left-0 h-[2px] ${
                    step > item.id ? "bg-primary" : "bg-muted"
                  }`}
                  style={{
                    width: `${100 / (steps.length - 1)}%`,
                    left: `${(100 / (steps.length - 1)) * index}%`,
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <motion.div
        className="space-y-8"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {step === 1 && <CourseInformationForm />}
        {step === 2 && <CourseBuilderForm />}
        {/* {step === 3 && <PublishCourseForm form={form} />} */}
      </motion.div>
    </div>
  )
}
