"use client"

import { Search as SearchIcon } from "lucide-react"
import { PageLayout } from "@/components/page-layout"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"

export default function SearchPage() {
  return (
    <PageLayout>
      {/* Header - Responsive with media queries */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="flex h-14 md:h-16 items-center gap-3 md:gap-4 px-4 md:px-6">
          <SidebarTrigger className="h-9 md:h-10 w-9 md:w-10" />
          <div className="flex-1 min-w-0">
            <h1 className="text-lg md:text-xl font-semibold truncate">Search</h1>
            <p className="text-xs md:text-sm text-muted-foreground truncate">Cari konten</p>
          </div>
        </div>
      </div>

      {/* Content - Responsive padding and spacing */}
      <div className="flex flex-col gap-4 md:gap-6 p-4 md:p-6 max-w-7xl mx-auto w-full">
        <div className="rounded-xl bg-muted/50 p-4 md:p-6 lg:p-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
              🔍 Search
            </h1>
            <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
              Cari dokumen, pesan, atau konten lainnya.
            </p>

            <div className="max-w-2xl mb-6 md:mb-8">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
                <Input 
                  placeholder="Cari apapun..." 
                  className="pl-10 md:pl-12 h-10 md:h-12 text-sm md:text-base"
                />
              </div>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div>
                <h3 className="text-sm md:text-base font-semibold mb-2 md:mb-3">Hasil Pencarian Terbaru</h3>
                <div className="space-y-2 md:space-y-3">
                  <div className="rounded-lg border bg-card p-3 md:p-4 hover:bg-accent transition-colors cursor-pointer active:scale-95 touch-manipulation">
                    <h4 className="text-sm md:text-base font-medium mb-1">Design System Documentation</h4>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Panduan lengkap untuk menggunakan komponen UI...
                    </p>
                  </div>
                  <div className="rounded-lg border bg-card p-3 md:p-4 hover:bg-accent transition-colors cursor-pointer active:scale-95 touch-manipulation">
                    <h4 className="text-sm md:text-base font-medium mb-1">Meeting Notes - Q1 2026</h4>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Catatan dari meeting strategy planning...
                    </p>
                  </div>
                  <div className="rounded-lg border bg-card p-3 md:p-4 hover:bg-accent transition-colors cursor-pointer active:scale-95 touch-manipulation">
                    <h4 className="text-sm md:text-base font-medium mb-1">Product Roadmap</h4>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Rencana pengembangan produk untuk 6 bulan ke depan...
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm md:text-base font-semibold mb-2 md:mb-3">Kategori Populer</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base rounded-full border bg-card hover:bg-accent cursor-pointer active:scale-95 touch-manipulation">
                    📄 Dokumen
                  </div>
                  <div className="px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base rounded-full border bg-card hover:bg-accent cursor-pointer active:scale-95 touch-manipulation">
                    👥 Tim
                  </div>
                  <div className="px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base rounded-full border bg-card hover:bg-accent cursor-pointer active:scale-95 touch-manipulation">
                    📊 Project
                  </div>
                  <div className="px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base rounded-full border bg-card hover:bg-accent cursor-pointer active:scale-95 touch-manipulation">
                    ⚙️ Settings
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </PageLayout>
  )
}
