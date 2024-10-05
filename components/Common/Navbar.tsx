"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Book, ShoppingCart, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import ProfileDropdown from "../Auth/ProfileDropDown"

export default function Navbar() {
  const [token, setToken] = useState<string | null>(null)
  const [cartItemCount, setCartItemCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Simulating token retrieval from localStorage
    const storedToken = localStorage.getItem("token")
    setToken(storedToken)

    // Simulating cart item count retrieval
    const storedCartItemCount = localStorage.getItem("cartItemCount")
    setCartItemCount(storedCartItemCount ? parseInt(storedCartItemCount) : 0)
  }, [])

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center mx-auto">
        <Link href="/" className="flex items-center mr-6">
          <Book className="h-6 w-6 mr-2" />
          <span className="font-bold text-lg">Zenith Minds</span>
        </Link>

        <div className="hidden md:flex flex-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Courses</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <Book className="h-6 w-6" />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            EdTech Courses
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Discover our wide range of online courses to boost
                            your skills.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/courses/programming" title="Programming">
                      Learn various programming languages and frameworks.
                    </ListItem>
                    <ListItem href="/courses/design" title="Design">
                      Master the art of UI/UX and graphic design.
                    </ListItem>
                    <ListItem href="/courses/business" title="Business">
                      Develop essential business and entrepreneurship skills.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/about"
                  className={navigationMenuTriggerStyle()}
                >
                  About
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/contact"
                  className={navigationMenuTriggerStyle()}
                >
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          {token ? (
            <>
              <Button variant="outline" size="icon">
                <ShoppingCart className="h-4 w-4" />
                <span className="sr-only">Cart</span>
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>
              <ProfileDropdown />
            </>
          ) : (
            <>
              <Button variant="ghost" asChild className="hidden sm:inline-flex">
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild className="hidden sm:inline-flex py-2 px-4">
                <Link href="/signup">Sign up</Link>
              </Button>
            </>
          )}

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                {!token && (
                  <>
                    <Button variant="ghost" className="inline-flex">
                      <Link href="/login">Log in</Link>
                    </Button>
                    <Button className="inline-flex">
                      <Link href="/signup">Sign up</Link>
                    </Button>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

const ListItem = ({
  className,
  title,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"a"> & { title: string }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
}
