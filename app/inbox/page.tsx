"use client"

import { PageLayout } from "@/components/page-layout"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function InboxPage() {
  return (
    <PageLayout>
      {/* Header - Responsive with media queries */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="flex h-14 md:h-16 items-center gap-3 md:gap-4 px-4 md:px-6">
          <SidebarTrigger className="h-9 md:h-10 w-9 md:w-10" />
          <div className="flex-1 min-w-0">
            <h1 className="text-lg md:text-xl font-semibold truncate">Inbox</h1>
            <p className="text-xs md:text-sm text-muted-foreground truncate">Pesan dan notifikasi</p>
          </div>
        </div>
      </div>

      {/* Content - Responsive padding and spacing */}
      <div className="flex flex-col gap-4 md:gap-6 p-4 md:p-6 max-w-7xl mx-auto w-full">
        <div className="rounded-xl bg-muted/50 p-4 md:p-6 lg:p-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
              📨 Inbox
            </h1>
            <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
              Kelola pesan dan notifikasi Anda di sini.
            </p>

            <div className="space-y-3 md:space-y-4">
              <div className="rounded-lg border bg-card p-3 md:p-4 hover:bg-accent transition-colors cursor-pointer active:scale-95 touch-manipulation">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm md:text-base font-semibold mb-1 truncate">Pesan Baru dari Tim Marketing</h3>
                    <p className="text-xs md:text-sm text-muted-foreground mb-2 line-clamp-2">
                      Update terbaru tentang kampanye produk Q1 2026...
                    </p>
                    <span className="text-xs text-muted-foreground">2 jam yang lalu</span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1 md:mt-2 flex-shrink-0"></div>
                </div>
              </div>

              <div className="rounded-lg border bg-card p-3 md:p-4 hover:bg-accent transition-colors cursor-pointer active:scale-95 touch-manipulation">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm md:text-base font-semibold mb-1 truncate">Reminder: Meeting Hari Ini</h3>
                    <p className="text-xs md:text-sm text-muted-foreground mb-2 line-clamp-2">
                      Jangan lupa meeting dengan klien pukul 14.00...
                    </p>
                    <span className="text-xs text-muted-foreground">5 jam yang lalu</span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1 md:mt-2 flex-shrink-0"></div>
                </div>
              </div>

              <div className="rounded-lg border bg-card p-3 md:p-4 hover:bg-accent transition-colors cursor-pointer opacity-60 active:scale-95 touch-manipulation">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm md:text-base font-semibold mb-1 truncate">Task Completed</h3>
                    <p className="text-xs md:text-sm text-muted-foreground mb-2 line-clamp-2">
                      Project Design Engineering telah selesai...
                    </p>
                    <span className="text-xs text-muted-foreground">Kemarin</span>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </PageLayout>
  )
}
