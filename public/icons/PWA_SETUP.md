# PWA Icon Generation Guide

## Quick Setup

This app is PWA-ready! You need to generate app icons to complete the setup.

### Option 1: Using PWA Asset Generator (Recommended)

1. Install PWA Asset Generator:
```bash
npm install -g pwa-asset-generator
```

2. Generate icons from your logo/favicon:
```bash
pwa-asset-generator public/favicon.svg public/icons --background "#000000" --splash-only false --icon-only true --padding "10%" --quality 100
```

### Option 2: Using Online Tools

Visit one of these free tools:
- https://www.pwabuilder.com/imageGenerator
- https://favicon.io/
- https://realfavicongenerator.net/

Upload your logo and download the generated icons to `/public/icons/` folder.

### Required Icon Sizes

- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

### Option 3: Use Placeholder Icons (Development Only)

For testing, you can use a single icon and duplicate it:
```bash
cd public/icons
# Create a simple colored square as placeholder
# Then copy it to all required sizes
```

## Testing Your PWA

1. **Local Testing:**
   - Build your app: `npm run build`
   - Serve it: `npm start`
   - Open Chrome DevTools > Application > Manifest
   - Check Service Workers tab

2. **Mobile Testing:**
   - Use ngrok or similar to expose localhost
   - Open on mobile device
   - Look for "Add to Home Screen" prompt

3. **Lighthouse Audit:**
   - Open Chrome DevTools > Lighthouse
   - Run PWA audit
   - Fix any issues reported

## Features Enabled

✅ **Offline Support** - App works without internet (cached pages)
✅ **Install Prompt** - Users can install app to home screen
✅ **App Shortcuts** - Quick access to Selangor and KL routes
✅ **Push Notifications** - Ready for notification support
✅ **Background Sync** - Queue actions when offline
✅ **Responsive** - Works on all screen sizes
✅ **Fast Loading** - Cached assets load instantly

## Deployment Notes

When deploying to production:

1. Update `manifest.json` with your actual domain
2. Update `start_url` to your production URL
3. Ensure HTTPS is enabled (required for PWA)
4. Test on real devices
5. Submit to PWA directories (optional)

## Troubleshooting

**Icons not showing?**
- Clear browser cache
- Check browser console for errors
- Verify icon paths in manifest.json

**Service Worker not registering?**
- Must use HTTPS (or localhost)
- Check sw.js is accessible at `/sw.js`
- Look for errors in Console

**Install prompt not showing?**
- Must visit site at least twice
- Icons must be valid
- manifest.json must be valid
- HTTPS required

## Resources

- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
