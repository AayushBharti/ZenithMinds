"use client"

import React, { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import type { Swiper as SwiperType } from "swiper"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { cn } from "@/lib/utils"

interface Review {
  id: number
  name: string
  image: string
  rating: number
  review: string
}

// Sample review data with real Unsplash images
const reviews: Review[] = [
  {
    id: 1,
    name: "Alice Johnson",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=150&h=150",
    rating: 5,
    review:
      "Absolutely love this product! It has made my life so much easier. The attention to detail is impressive.",
  },
  {
    id: 2,
    name: "Bob Smith",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?fit=crop&w=150&h=150",
    rating: 4,
    review:
      "Great value for money. Would definitely recommend to others. The customer support is also top-notch.",
  },
  {
    id: 3,
    name: "Carol Williams",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=crop&w=150&h=150",
    rating: 5,
    review:
      "Top-notch quality and excellent customer service. I've been using it for months and it still works like new.",
  },
  {
    id: 4,
    name: "David Brown",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=150&h=150",
    rating: 4,
    review:
      "Very satisfied with my purchase. Will buy again! The product exceeded my expectations in many ways.",
  },
  {
    id: 5,
    name: "Eva Davis",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?fit=crop&w=150&h=150",
    rating: 5,
    review:
      "Exceeded my expectations. Truly a game-changer! I can't imagine going back to my old routine without it.",
  },
]

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => (
  <Card className="h-full bg-card">
    <CardContent className="p-6">
      <div className="flex items-center mb-4">
        <Avatar className="h-12 w-12 mr-4">
          <AvatarImage src={review.image} alt={review.name} />
          <AvatarFallback>
            {review.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-foreground">{review.name}</h3>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-4 h-4 text-yellow-500",
                  i < review.rating && "fill-yellow-500"
                )}
              />
            ))}
          </div>
        </div>
      </div>
      <Quote className="w-8 h-8 text-primary/20 mb-2" />
      <p className="text-muted-foreground">{review.review}</p>
    </CardContent>
  </Card>
)

export default function ReviewsCarousel() {
  const [swiper, setSwiper] = useState<SwiperType | null>(null)

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 relative">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
          bulletActiveClass: "bg-primary",
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        onSwiper={setSwiper}
        className="py-12"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <ReviewCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-pagination mt-4"></div>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-background/60 text-foreground hover:bg-accent hover:text-accent-foreground rounded-full"
        onClick={() => swiper?.slidePrev()}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous review</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-background/60 text-foreground hover:bg-accent hover:text-accent-foreground rounded-full"
        onClick={() => swiper?.slideNext()}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next review</span>
      </Button>
    </div>
  )
}
