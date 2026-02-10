"use client"

import { PageLayout } from "@/components/page-layout"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useResponsiveHeight } from "@/hooks/use-device"

export default function HomePage() {
  const responsive = useResponsiveHeight()
  
  return (
    <PageLayout>
      {/* Header - Responsive height */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className={`flex ${responsive.header} items-center ${responsive.gap} ${responsive.paddingX}`}>
          <SidebarTrigger className={`${responsive.button} w-9 md:w-10`} />
          <div className="flex-1 min-w-0">
            <h1 className={`${responsive.text.title} font-semibold truncate`}>Home</h1>
            <p className="text-xs md:text-sm text-muted-foreground truncate">Dashboard utama</p>
          </div>
        </div>
      </div>

      {/* Content - Responsive padding */}
      <div className={`flex flex-col ${responsive.gap} ${responsive.padding} max-w-7xl mx-auto w-full`}>
        <div className="rounded-xl bg-muted/50 p-4 md:p-6 lg:p-8">
            <h1 className={`${responsive.text.heading} font-bold mb-3 md:mb-4`}>
              🏠 Selamat Datang di Home
            </h1>
            <p className={`${responsive.text.body} text-muted-foreground mb-3 md:mb-4`}>
              Ini adalah halaman Home. Sidebar ini dibangun dengan shadcn/ui dan Radix UI.
            </p>
            <p className={`${responsive.text.body} text-muted-foreground mb-3 md:mb-4`}>
              Sidebar ini memiliki fitur:
            </p>
            <ul className={`list-disc list-inside space-y-1.5 md:space-y-2 ${responsive.text.body} text-muted-foreground mb-6 md:mb-8`}>
              <li>Overlay mode dengan backdrop blur</li>
              <li>Responsif - otomatis menjadi sheet di mobile</li>
              <li>Keyboard shortcut - tekan Ctrl/Cmd + B untuk toggle</li>
              <li>Menu dengan sub-menu</li>
              <li>Dark mode support</li>
              <li>Smooth animations</li>
            </ul>

            <div className="mt-6 md:mt-8 grid gap-3 md:gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border bg-card p-4 md:p-6 hover:shadow-lg transition-shadow active:scale-95 touch-manipulation">
                <h3 className={`font-semibold mb-2 ${responsive.text.body}`}>📊 Dashboard</h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Lihat statistik dan overview aplikasi Anda
                </p>
              </div>
              <div className="rounded-lg border bg-card p-4 md:p-6 hover:shadow-lg transition-shadow active:scale-95 touch-manipulation">
                <h3 className={`font-semibold mb-2 ${responsive.text.body}`}>📈 Analytics</h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Monitor performa dan metrics penting
                </p>
              </div>
              <div className="rounded-lg border bg-card p-4 md:p-6 hover:shadow-lg transition-shadow active:scale-95 touch-manipulation sm:col-span-2 lg:col-span-1">
                <h3 className={`font-semibold mb-2 ${responsive.text.body}`}>⚡ Quick Actions</h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Akses cepat ke fitur yang sering digunakan
                </p>
              </div>
            </div>
        </div>
      </div>
    </PageLayout>
  )
}
