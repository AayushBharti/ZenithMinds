import { TypeAnimation } from "react-type-animation"
import { Button } from "../UI/button"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroudGradient,
  codeColor,
}: {
  position: string
  heading: React.ReactNode
  subheading: React.ReactNode
  ctabtn1: {
    active: boolean
    linkto: string
    btnText: React.ReactNode
  }
  ctabtn2: {
    active: boolean
    linkto: string
    btnText: React.ReactNode
  }
  codeblock: string
  backgroudGradient: string
  codeColor: string
}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10 flex-wrap `}>
      {/*Section 1*/}
      <div className="flex flex-col gap-8 lg:w-[50%] p-4">
        {heading}
        <div className="text-richblack-200 tracking-wide text-sm py-4 md:text-lg">
          {subheading}
        </div>

        <div className="flex gap-7 mt-7 pb-3">
          <Link href={ctabtn1.linkto}>
            <Button variant={"default"}>
              <div className="flex gap-2 items-center">
                {ctabtn1.btnText}
                <ChevronRight className="w-4 h-4" />
              </div>
            </Button>
          </Link>

          <Link href={ctabtn2.linkto}>
            <Button variant={"ghost"}>{ctabtn2.btnText}</Button>
          </Link>
        </div>
      </div>

      {/*Section 2*/}
      <div className=" h-fit  flex flex-row text-10[px] w-[100%] py-3 lg:w-[500px] glass  ">
        {/*HW -> BG gradient*/}

        <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>

        <div
          className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2 relative`}
        >
          <div className={`${backgroudGradient}`}></div>
          <TypeAnimation
            sequence={[codeblock, 2000, ""]}
            repeat={Infinity}
            cursor={true}
            style={{
              whiteSpace: "pre-line",
              display: "block",
              overflowX: "hidden",
              overflowY: "scroll",
              fontSize: "16px",
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  )
}

export default CodeBlocks
