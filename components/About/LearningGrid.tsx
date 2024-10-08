import HighlightText from "../Home/HighlightedText"
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card"

const LearningGridArray = [
  {
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "ZenithMinds partners with over 275 leading universities and companies to provide flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
  },
  {
    heading: "Curriculum Based on Industry Needs",
    description:
      "Our curriculum is designed to be easily understandable and aligned with the needs of the industry.",
  },
  {
    heading: "Our Learning Methods",
    description:
      "We utilize innovative learning techniques to enhance understanding and retention.",
  },
  {
    heading: "Certification",
    description:
      "Receive recognized certifications upon course completion to enhance your credentials.",
  },
  {
    heading: `Rating "Auto-grading"`,
    description:
      "Experience automated grading that provides instant feedback on your performance.",
  },
  {
    heading: "Ready to Work",
    description:
      "Our courses are designed to equip you with the skills necessary for immediate employment.",
  },
  {
    heading: "Certification",
    description:
      "Receive recognized certifications upon course completion to enhance your credentials.",
  },
]

export default function LearningGrid() {
  return (
    <div className="grid grid-cols-1 max-w-6xl mx-auto lg:grid-cols-4 my-20 lg:mb-40">
      {LearningGridArray.map((card, index) => (
        <div
          key={index}
          className={`relative p-3 ${index === 0 && "lg:col-span-2"}`}
        >
          {index === 0 ? (
            <div className="flex flex-col p-4 gap-5 lg:h-56">
              <div className="text-4xl font-semibold text-white">
                {card.heading} <HighlightText text={card.highlightText} />
              </div>
              <CardDescription>{card.description}</CardDescription>
            </div>
          ) : (
            <Card className="lg:h-56">
              <CardHeader className="font-semibold">{card.heading}</CardHeader>
              <CardContent>{card.description}</CardContent>
            </Card>
          )}
        </div>
      ))}
    </div>
  )
}
