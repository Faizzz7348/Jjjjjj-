# PWA Documentation

## 🚀 Fitur-Fitur PWA yang Telah Diimplementasikan

### 1. **Installable App** ✅
- Aplikasi dapat diinstall di desktop dan mobile
- Install prompt otomatis muncul setelah 3 detik
- Dukungan khusus untuk iOS dengan panduan manual
- Deteksi otomatis jika aplikasi sudah terinstall

### 2. **Offline Support** ✅
- Service Worker dengan caching strategy yang optimal
- Halaman offline fallback
- Indikator status online/offline real-time
- Network-first untuk API, Cache-first untuk assets

### 3. **Push Notifications** ✅
- Notification prompt yang user-friendly
- Test notification saat pertama kali mengaktifkan
- Badge dan vibration support
- Background notification handling

### 4. **Auto-Update** ✅
- Deteksi otomatis update baru
- Prompt untuk refresh aplikasi
- Skip waiting untuk instant update

### 5. **App-like Experience** ✅
- Standalone display mode
- Custom splash screens
- Theme color adaptation
- No browser UI dalam standalone mode

### 6. **Performance Optimization** ✅
- Advanced caching strategies:
  - Font caching (365 hari)
  - Image caching (24 jam)
  - API caching dengan network timeout
  - Static asset caching
- Code splitting otomatis dengan Next.js
- SWC minification
- Production console removal

### 7. **Cross-Platform Support** ✅
- Android (Chrome, Edge, Samsung Internet)
- iOS (Safari dengan Add to Home Screen)
- Desktop (Chrome, Edge, Brave)
- Responsive untuk semua ukuran layar

### 8. **App Shortcuts** ✅
- Quick access menu dengan 3 shortcuts:
  - Home
  - Calendar
  - Search
- Right-click app icon untuk akses cepat

### 9. **Share Target API** ✅
- Terima share dari aplikasi lain
- Support text, title, dan URL

### 10. **Analytics & Monitoring** ✅
- PWA analytics tracking
- Core Web Vitals monitoring (LCP, FID, CLS)
- Offline usage tracking
- Install/launch event tracking

## 📱 Cara Install PWA

### Android:
1. Buka website di Chrome/Edge
2. Popup "Install App" akan muncul
3. Klik "Install"
4. Atau: Menu ⋮ → "Add to Home screen"

### iOS:
1. Buka website di Safari
2. Tap tombol Share (kotak dengan panah)
3. Scroll dan tap "Add to Home Screen"
4. Tap "Add"

### Desktop:
1. Buka website di Chrome/Edge
2. Lihat icon install di address bar
3. Klik icon install
4. Atau: Menu ⋮ → "Install [App Name]"

## 🔧 Teknologi yang Digunakan

- **Next.js 15** - React framework
- **next-pwa** - PWA plugin untuk Next.js
- **Workbox** - Service worker library
- **Web App Manifest** - App configuration
- **Service Worker API** - Offline & caching
- **Notification API** - Push notifications
- **Cache API** - Asset caching
- **IndexedDB** - Local data storage (via next-pwa)

## 📊 Caching Strategy

### Network First (dengan timeout)
- `/api/*` endpoints
- Halaman dinamis
- Timeout: 10 detik

### Cache First
- Font files
- Audio files
- Video files

### Stale While Revalidate
- Images (JPG, PNG, SVG, WebP)
- CSS & JS files
- Google Fonts
- Next.js image optimization

## 🎨 Assets yang Dibutuhkan

### Icons (SVG placeholders tersedia):
- 72x72, 96x96, 128x128, 144x144
- 152x152, 192x192, 384x384, 512x512

**⚠️ Untuk Production**: Ganti SVG dengan PNG menggunakan:
- https://realfavicongenerator.net/
- atau tools seperti sharp/imagemagick

### Screenshots:
- Wide: 1280x720 (untuk desktop)
- Mobile: 750x1334 (untuk mobile)

## 🛠️ Development

```bash
# Install dependencies
npm install

# Development mode (PWA disabled)
npm run dev

# Build untuk production
npm run build

# Start production server
npm start
```

## 🚀 Production Deployment

### Vercel (Recommended):
1. Push ke GitHub
2. Import project ke Vercel
3. Deploy otomatis dengan PWA enabled

### Manual:
```bash
npm run build
npm start
```

## 📝 Customization

### Ubah Nama & Deskripsi:
Edit `/public/manifest.json`:
```json
{
  "name": "Your App Name",
  "short_name": "App",
  "description": "Your app description"
}
```

### Ubah Theme Color:
Edit `/public/manifest.json` dan `/app/layout.tsx`:
```json
{
  "theme_color": "#your-color",
  "background_color": "#your-color"
}
```

### Ubah Icons:
Replace files di `/public/icons/` dengan icons Anda

### Ubah Caching Strategy:
Edit `/next.config.js` di bagian `runtimeCaching`

## 🔍 Testing PWA

### Chrome DevTools:
1. Open DevTools (F12)
2. Application tab
3. Check:
   - Manifest
   - Service Workers
   - Cache Storage
   - Offline mode

### Lighthouse:
1. Open DevTools
2. Lighthouse tab
3. Select "Progressive Web App"
4. Run audit

### Test Offline:
1. DevTools → Network tab
2. Set "Offline"
3. Navigate aplikasi

## 📈 Performance Monitoring

Aplikasi ini dilengkapi dengan PWA Analytics yang melacak:
- App installation
- Offline usage
- Core Web Vitals
- Page performance

Import dan gunakan:
```typescript
import PWAAnalytics from '@/lib/pwa-analytics'

const analytics = PWAAnalytics.getInstance()
analytics.trackEvent('custom_event', { data: 'value' })
```

## 🎯 Best Practices yang Diterapkan

✅ HTTPS only (required untuk PWA)
✅ Responsive design
✅ Fast load time dengan caching
✅ Offline functionality
✅ Add to home screen prompt
✅ App-like experience
✅ Push notification support
✅ Background sync ready
✅ SEO optimized
✅ Accessibility compliant

## 🐛 Troubleshooting

### Service Worker tidak register:
- Pastikan menggunakan HTTPS atau localhost
- Clear browser cache
- Check console untuk errors

### Install prompt tidak muncul:
- Pastikan semua kriteria PWA terpenuhi
- Check Lighthouse audit
- Clear localStorage: `pwa-install-prompt-dismissed`

### Offline tidak bekerja:
- Check Service Worker status di DevTools
- Verify cache entries
- Rebuild aplikasi

## 📚 Resources

- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [next-pwa GitHub](https://github.com/shadowwalker/next-pwa)
- [Workbox Documentation](https://developers.google.com/web/tools/workbox)

---

**Made with ❤️ using Next.js & PWA best practices**
