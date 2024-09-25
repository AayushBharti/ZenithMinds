import { ChevronRight } from "lucide-react"
import { Button } from "../UI/button"
import HighlightText from "./HighlightedText"
import Link from "next/link"

export default function Hero() {
  return (
    <div className="flex mt-20 mb-20 flex-col justify-center items-center [mask-image:linear-gradient(to_top,transparent,black_50%)]">
      <Link href={"/signup"}>
        <div className=" group mt-16 p-1 mx-auto rounded-full bg-richblack-800 transition-all duration-200 hover: scale-95 w-fit max-w-maxContent flex items-center">
          <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[2px] transition-all duration-200 group-hover:bg-richblack-900">
            <p>Become an Instructor</p>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </Link>

      <h1 className="text-center bg-gradient-to-br dark:from-white from-black from-30% dark:to-white/40 to-black/40 bg-clip-text py-6 text-5xl font-medium leading-none tracking-tighter text-transparent text-balance sm:text-6xl md:text-7xl lg:text-[6rem] translate-y-[-1rem] md:max-w-[80%]">
      Unlock Your Potential with In-Demand <HighlightText text={"Coding Skills"} />
      </h1>

      <p className="mb-12 mt-2 text-lg tracking-tight text-gray-400 md:text-xl text-balance translate-y-[-1rem] text-center max-w-[65%]">
        Learn to code at your own pace, anywhere, with access to hands-on
        projects, quizzes, and personalized feedback from expert instructors.
      </p>

      {/* <div className="text-center text-7xl md:w-[60%] md:text-7xl font-semibold mt-7 tracking-wide leading-snug">
        Empower Your Future With <HighlightText text={"Coding Skills"} />
      </div>
      <div className=" my-12 md:w-[60%] text-left md:text-center text-base md:text-lg text-richblack-200">
        With our online coding courses, you can learn at your own pace, from
        anywhere in the world, and get access to a wealth of resources,
        including hands-on projects, quizzes, and personalized feedback from
        instructors.
      </div> */}

      <div className="flex flex-row gap-7 mt-2">
        <Button type="button" variant="default">
          Learn More
        </Button>
        <Button type="button" variant="secondary">
          Book a Demo
        </Button>
      </div>

      <video
        className="mx-3 mt-20 rounded-t-3xl relative w-[80%]"
        muted
        loop
        autoPlay
      >
        <source src="/images/banner.mp4" type="video/mp4" />
      </video>
    </div>
  )
}
