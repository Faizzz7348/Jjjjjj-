# 🚀 Quick Start Guide - PWA Terhebat

Panduan cepat untuk mulai menggunakan dan mengembangkan PWA ini.

## 📋 Prerequisites

Pastikan Anda sudah menginstall:
- Node.js 18+ dan npm
- Git
- Code editor (VS Code recommended)

## ⚡ Quick Start (5 Menit)

### 1. Clone & Install

```bash
# Clone repository
git clone <your-repo-url>
cd <project-name>

# Install dependencies
npm install
```

### 2. Setup Environment

```bash
# Copy file environment
cp .env.example .env

# Edit .env sesuai kebutuhan
# Minimal yang perlu diisi:
# DATABASE_URL="your-database-url"
```

### 3. Setup Database

```bash
# Push schema ke database
npm run db:push

# (Optional) Seed database dengan data sample
npm run db:seed
```

### 4. Run Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser! 🎉

## 🧪 Test PWA Features

### Development Mode
**Note**: Service worker DISABLED di development untuk kemudahan development.

Untuk test PWA features:

1. **Build untuk production**:
   ```bash
   npm run build
   npm start
   ```

2. **Open di browser**: http://localhost:3000

3. **Test features**:
   - Install prompt akan muncul setelah 3 detik
   - Test offline: DevTools → Network → Offline
   - Check PWA: DevTools → Application tab
   - Debug panel: Klik tombol ⚡ di kanan bawah

### Production Build

```bash
# Build
npm run build

# Start production server
npm start

# Atau build + start sekaligus
npm run pwa:serve
```

## 🎨 Customization Checklist

### 1. App Identity
- [ ] Ubah nama di `public/manifest.json`
- [ ] Ubah metadata di `app/layout.tsx`
- [ ] Update `package.json` name & description
- [ ] Replace icons di `public/icons/` dengan design Anda

### 2. Theme & Colors
- [ ] Set theme color di `public/manifest.json`
- [ ] Update Tailwind config di `tailwind.config.ts`
- [ ] Customize UI components di `components/ui/`

### 3. Features
- [ ] Review dan enable/disable PWA prompts sesuai kebutuhan
- [ ] Configure caching strategy di `next.config.js`
- [ ] Setup analytics (optional)
- [ ] Configure push notifications (optional)

### 4. Content
- [ ] Update README.md dengan info project Anda
- [ ] Update screenshots di `public/screenshots/`
- [ ] Add your pages di `app/`
- [ ] Customize routes

## 📱 Generate Icons

Jika ingin membuat icons dari logo Anda:

### Option 1: Online Tool (Recommended)
1. Go to https://realfavicongenerator.net/
2. Upload your logo (512x512 PNG recommended)
3. Generate all icons
4. Download dan extract ke `public/icons/`

### Option 2: Manual
```bash
# Generate SVG placeholders
npm run pwa:icons

# Lalu convert ke PNG menggunakan tool seperti:
# - Figma
# - GIMP
# - ImageMagick
# - Sharp
```

## 🚢 Deployment

### Vercel (Recommended)

1. **Push ke GitHub**:
   ```bash
   git add .
   git commit -m "Initial PWA setup"
   git push origin main
   ```

2. **Deploy ke Vercel**:
   - Go to https://vercel.com
   - Import GitHub repository
   - Vercel auto-detect Next.js
   - Add environment variables
   - Deploy! 🚀

3. **Setup Domain** (Optional):
   - Add custom domain di Vercel
   - Update `NEXT_PUBLIC_APP_URL` di environment variables
   - Update domain di `manifest.json`

### Other Platforms

#### Netlify
```bash
npm run build
# Upload .next folder ke Netlify
```

#### Docker
```dockerfile
# Create Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

#### VPS/Dedicated Server
```bash
# Install Node.js
# Clone repository
# npm install
# npm run build
# Use PM2 for process management
npm install -g pm2
pm2 start npm --name "pwa-app" -- start
```

## 🔍 Common Tasks

### Add a New Page
```bash
# Create new page
# app/new-page/page.tsx

export default function NewPage() {
  return <div>New Page</div>
}
```

### Add to Sitemap
```typescript
// Edit app/sitemap.ts
{
  url: `${baseUrl}/new-page`,
  lastModified: new Date(),
  changeFrequency: 'weekly',
  priority: 0.8,
}
```

### Add to App Shortcuts
```json
// Edit public/manifest.json
{
  "shortcuts": [
    {
      "name": "New Page",
      "url": "/new-page",
      "icons": [...]
    }
  ]
}
```

### Modify Caching
```javascript
// Edit next.config.js
runtimeCaching: [
  {
    urlPattern: /your-pattern/,
    handler: 'NetworkFirst', // or 'CacheFirst', 'StaleWhileRevalidate'
    options: {
      cacheName: 'your-cache',
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 24 * 60 * 60
      }
    }
  }
]
```

## 🐛 Troubleshooting

### Service Worker tidak register
```bash
# Clear caches
# Chrome: DevTools → Application → Clear storage
# Or use debug panel to clear

# Rebuild
npm run build
npm start
```

### Install prompt tidak muncul
```javascript
// Clear localStorage
localStorage.removeItem('pwa-install-prompt-dismissed')

// Reload page
window.location.reload()
```

### Offline mode tidak bekerja
1. Check HTTPS (required untuk SW)
2. Rebuild app: `npm run build`
3. Check DevTools → Application → Service Workers
4. Check cache entries in Cache Storage

### Database issues
```bash
# Reset database
npm run db:push

# Regenerate client
npm run db:generate
```

## 📚 Next Steps

1. **Learn More**:
   - Read [PWA_README.md](PWA_README.md) untuk deep dive
   - Check [Next.js docs](https://nextjs.org/docs)
   - Review [PWA best practices](https://web.dev/progressive-web-apps/)

2. **Customize**:
   - Add your features
   - Customize design
   - Configure analytics
   - Setup monitoring

3. **Test**:
   - Run Lighthouse audit
   - Test on real devices
   - Test offline scenarios
   - Test installation flow

4. **Deploy**:
   - Choose hosting platform
   - Configure environment
   - Monitor performance
   - Iterate and improve

## 🆘 Need Help?

- **Documentation**: Check PWA_README.md
- **Issues**: Open GitHub issue
- **Discussions**: GitHub Discussions
- **Email**: [your-email@example.com]

## ⭐ Tips

1. **Development**: Keep service worker disabled di dev mode
2. **Testing**: Always test PWA features in production build
3. **Icons**: Use high-quality 512x512 source image
4. **Performance**: Monitor Core Web Vitals dengan debug panel
5. **Updates**: Push updates carefully, user will need to refresh

---

Happy coding! 🚀

**Need more help?** Check the full documentation in [PWA_README.md](PWA_README.md)
