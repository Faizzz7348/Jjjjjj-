# 📱 Responsive Design System

## Overview

Sistem responsive design yang comprehensive untuk memastikan app berfungsi dengan sempurna di semua device types (mobile, tablet, desktop).

## 🎯 Key Features

- **Device-aware viewport handling** - Auto-detect device type dan adjust
- **Dynamic height calculations** - 100dvh untuk mobile safari support
- **Safe area support** - Handle notched devices (iPhone X+)
- **Touch-optimized** - Proper touch targets dan interactions
- **Responsive utilities** - Hooks untuk consistent responsive behavior

## 🔧 Usage

### 1. Using `useDevice()` Hook

Hook ini provide comprehensive device information:

```tsx
import { useDevice } from "@/hooks/use-device"

export default function MyPage() {
  const device = useDevice()
  
  return (
    <div>
      <p>Device Type: {device.type}</p>
      <p>Is Mobile: {device.isMobile ? 'Yes' : 'No'}</p>
      <p>Viewport Height: {device.viewportHeight}px</p>
      <p>Safe Area Top: {device.safeAreaTop}px</p>
    </div>
  )
}
```

**Device Info Properties:**
- `type`: "mobile" | "tablet" | "desktop"
- `orientation`: "portrait" | "landscape"
- `isMobile`: boolean
- `isTablet`: boolean
- `isDesktop`: boolean
- `isTouchDevice`: boolean
- `viewportHeight`: number
- `viewportWidth`: number
- `safeAreaTop`: number
- `safeAreaBottom`: number

### 2. Using `useResponsiveHeight()` Hook

Hook ini provide responsive class names untuk consistent sizing:

```tsx
import { useResponsiveHeight } from "@/hooks/use-device"

export default function MyPage() {
  const responsive = useResponsiveHeight()
  
  return (
    <div>
      {/* Header dengan height responsive */}
      <header className={`${responsive.header} flex items-center`}>
        <h1 className={responsive.text.title}>Title</h1>
      </header>
      
      {/* Content dengan padding responsive */}
      <main className={responsive.padding}>
        <h2 className={responsive.text.heading}>Heading</h2>
        <button className={responsive.button}>Click Me</button>
      </main>
    </div>
  )
}
```

**Responsive Properties:**
- `header`: "h-14" (mobile) | "h-16" (desktop)
- `headerPx`: 56 (mobile) | 64 (desktop)
- `button`: "h-9" (mobile) | "h-10" (desktop)
- `input`: "h-10" (mobile) | "h-11" (desktop)
- `padding`: "p-4" (mobile) | "p-6" (desktop)
- `paddingX`: "px-4" (mobile) | "px-6" (desktop)
- `paddingY`: "py-4" (mobile) | "py-6" (desktop)
- `gap`: "gap-3" (mobile) | "gap-4" (desktop)
- `text.title`: "text-lg" (mobile) | "text-xl" (desktop)
- `text.heading`: "text-2xl" (mobile) | "text-3xl" (desktop)
- `text.body`: "text-sm" (mobile) | "text-base" (desktop)

## 📏 Breakpoints

```css
/* Mobile */
< 640px - Mobile phones

/* Tablet */
640px - 1023px - Tablets and small laptops

/* Desktop */
≥ 1024px - Desktops and large screens
```

## 🎨 CSS Utilities

### Touch Interactions

```tsx
{/* Add touch-friendly interactions */}
<button className="active:scale-95 touch-manipulation">
  Touch Me
</button>
```

### Safe Areas (for notched devices)

```tsx
{/* Automatic safe area padding in body */}
{/* Or manual safe areas: */}
<div className="safe-top">Content with top safe area</div>
<div className="safe-bottom">Content with bottom safe area</div>
```

### Container Padding

```tsx
<div className="container-padding">
  {/* Responsive padding: 1rem on mobile, 1.5rem on desktop */}
</div>
```

## 📱 Mobile-Specific Features

### 1. Dynamic Viewport Height

App menggunakan `100dvh` untuk handle mobile browser address bars:

```css
/* Automatically handled in globals.css */
html, body {
  height: 100dvh; /* Dynamic viewport - adjusts when address bar shows/hides */
}
```

### 2. Prevent Pull-to-Refresh

```css
/* Automatic - prevents accidental refresh on mobile */
body {
  overscroll-behavior-y: contain;
}
```

### 3. Touch Target Size

Semua interactive elements automatically minimum 44x44px on touch devices:

```css
@media (pointer: coarse) {
  button, a, input {
    min-height: 44px;
    min-width: 44px;
  }
}
```

## 🔄 Migration Guide

### Before (Fixed Sizes):
```tsx
<div className="h-16 px-6 gap-4">
  <h1 className="text-xl">Title</h1>
</div>
```

### After (Responsive):
```tsx
const responsive = useResponsiveHeight()

<div className={`${responsive.header} ${responsive.paddingX} ${responsive.gap}`}>
  <h1 className={responsive.text.title}>Title</h1>
</div>
```

## 🐛 Common Issues & Solutions

### Issue: Content cut off on mobile
**Solution:** Ensure proper viewport units and overflow handling
```tsx
// Use h-full instead of h-screen
<div className="h-full overflow-y-auto">
```

### Issue: Double scrollbars
**Solution:** PageLayout handles overflow - don't add overflow to children
```tsx
// ❌ Wrong
<PageLayout>
  <div className="overflow-y-auto">content</div>
</PageLayout>

// ✓ Correct
<PageLayout>
  <div>content</div>
</PageLayout>
```

### Issue: Content under iPhone notch
**Solution:** Safe areas are automatic, but can be customized
```tsx
// Safe areas handled by body padding
// For specific needs:
<div className="safe-top">Header content</div>
```

## 📊 Testing

Test on different devices:
- **Mobile**: iPhone SE, iPhone 14 Pro (notch), Android phones
- **Tablet**: iPad, Android tablets
- **Desktop**: Various screen sizes

Use browser DevTools responsive mode and test:
- ✓ Portrait orientation
- ✓ Landscape orientation
- ✓ Scrolling behavior
- ✓ Touch interactions
- ✓ Address bar show/hide (mobile)

## 🚀 Best Practices

1. **Always use responsive hooks** for sizing
2. **Test on real devices** - simulators may not show all issues
3. **Avoid fixed pixel heights** - use responsive utilities
4. **Use proper touch targets** - minimum 44x44px
5. **Handle safe areas** - especially for fixed position elements
6. **Test both orientations** on mobile devices

## 📚 Example Page

See [/app/home/page.tsx](/app/home/page.tsx) for complete example implementation.
