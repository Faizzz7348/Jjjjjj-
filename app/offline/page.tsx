import { WifiOff, RefreshCw, Home } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="rounded-full bg-muted p-6">
            <WifiOff className="h-16 w-16 text-muted-foreground" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Tidak Ada Koneksi
          </h1>
          <p className="text-muted-foreground">
            Sepertinya Anda sedang offline. Beberapa fitur mungkin tidak tersedia.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => window.location.reload()}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Coba Lagi
          </Button>
          <Button variant="outline" asChild>
            <Link href="/" className="gap-2">
              <Home className="h-4 w-4" />
              Kembali ke Home
            </Link>
          </Button>
        </div>

        <div className="pt-6 border-t border-border">
          <h3 className="font-semibold mb-3 text-sm">
            Tips saat offline:
          </h3>
          <ul className="text-sm text-muted-foreground space-y-2 text-left">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Halaman yang sudah dibuka sebelumnya mungkin masih bisa diakses</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Data akan otomatis tersinkronisasi saat koneksi kembali</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Periksa koneksi internet Anda dan coba lagi</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
