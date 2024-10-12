import ReviewsCarousel from "@/components/Common/ReviewCarousel"
import LearningGrid from "@/components/About/LearningGrid"
import HeroAbout from "@/components/About/HeroAbout"
import Mission from "@/components/About/Mission"
import Statistics from "@/components/About/Statistics"
import VideoSection from "@/components/About/VIdeoSection"
import FAQ from "@/components/About/FAQ"
import CTASection from "@/components/About/CTA"

export default function PremiumDarkModeEdTechAboutPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <HeroAbout />

      <Mission />

      <LearningGrid />

      <Statistics />

      <VideoSection />

      <FAQ />

      <CTASection />

      <ReviewsCarousel />
    </div>
  )
}
