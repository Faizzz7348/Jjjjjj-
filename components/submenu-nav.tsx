"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SubmenuItem {
  title: string
  url: string
}

// Define all submenu pages
const submenuPages: SubmenuItem[] = [
  { title: "Selangor", url: "/selangor" },
  { title: "Kuala Lumpur", url: "/kuala-lumpur" },
]

export function SubmenuNav() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) return null
  
  // Find current page index
  const currentIndex = submenuPages.findIndex(page => page.url === pathname)
  
  // If not on a submenu page, don't render
  if (currentIndex === -1) return null
  
  const prevPage = currentIndex > 0 ? submenuPages[currentIndex - 1] : null
  const nextPage = currentIndex < submenuPages.length - 1 ? submenuPages[currentIndex + 1] : null
  
  return (
    <div className="border-t bg-background">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between gap-4">
          {/* Previous Link */}
          {prevPage ? (
            <Link 
              href={prevPage.url}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
              <div className="flex flex-col items-start">
                <span className="text-xs uppercase tracking-wide">Previous</span>
                <span className="font-medium">{prevPage.title}</span>
              </div>
            </Link>
          ) : <div />}
          
          {/* Next Link */}
          {nextPage ? (
            <Link 
              href={nextPage.url}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group text-right"
            >
              <div className="flex flex-col items-end">
                <span className="text-xs uppercase tracking-wide">Next</span>
                <span className="font-medium">{nextPage.title}</span>
              </div>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  )
}
