// src/store/useCartStore.ts
import { create } from "zustand"
import { toast } from "react-hot-toast"

// Define types for cart items and the store state
interface Course {
  _id: string
  title: string
  price: number
}

interface CartState {
  cart: Course[]
  total: number
  totalItems: number
  addToCart: (course: Course) => void
  removeFromCart: (courseId: string) => void
  resetCart: () => void
}

// Create the Zustand store
export const useCartStore = create<CartState>((set) => ({
  cart:
    typeof window !== "undefined" && localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")!)
      : [],
  total:
    typeof window !== "undefined" && localStorage.getItem("total")
      ? JSON.parse(localStorage.getItem("total")!)
      : 0,
  totalItems:
    typeof window !== "undefined" && localStorage.getItem("totalItems")
      ? JSON.parse(localStorage.getItem("totalItems")!)
      : 0,

  // Action to add a course to the cart
  addToCart: (course) =>
    set((state) => {
      const index = state.cart.findIndex((item) => item._id === course._id)

      if (index >= 0) {
        // If the course is already in the cart, show an error toast
        toast.error("Course already in cart")
        return state // Return unchanged state
      }

      // If the course is not in the cart, add it to the cart
      const newCart = [...state.cart, course]

      // Update the total quantity and price
      const newTotalItems = state.totalItems + 1
      const newTotal = state.total + course.price

      // Show success toast
      toast.success("Course added to cart")

      return {
        cart: newCart,
        total: newTotal,
        totalItems: newTotalItems,
      }
    }),

  // Action to remove a course from the cart
  removeFromCart: (courseId) =>
    set((state) => {
      const index = state.cart.findIndex((item) => item._id === courseId)

      if (index >= 0) {
        // If the course is found in the cart, remove it
        const newCart = [...state.cart]
        const coursePrice = newCart[index].price

        newCart.splice(index, 1) // Remove the course from the cart

        // Update total and totalItems
        const newTotalItems = state.totalItems - 1
        const newTotal = state.total - coursePrice

        // Show success toast
        toast.success("Course removed from cart")

        return {
          cart: newCart,
          total: newTotal,
          totalItems: newTotalItems,
        }
      }

      return state // Return unchanged state if course not found
    }),

  // Action to reset the cart
  resetCart: () => {
    set({
      cart: [],
      total: 0,
      totalItems: 0,
    })
  },
}))
