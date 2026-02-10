# 📱 Responsive Design System

## Overview

Sistem responsive design yang comprehensive untuk memastikan app berfungsi dengan sempurna di semua device types (mobile, tablet, desktop).

## 🎯 Key Features

- **CSS-first responsive design** - Media queries untuk avoid hydration issues
- **Device-aware hooks** - Optional JavaScript detection untuk advanced features
- **Dynamic height calculations** - 100dvh untuk mobile safari support
- **Safe area support** - Handle notched devices (iPhone X+)
- **Touch-optimized** - Proper touch targets dan interactions

## ⚠️ Important: Avoiding Hydration Issues

**ALWAYS use Tailwind CSS media queries** untuk responsive styling yang berubah antara device types. Ini prevent hydration mismatch antara server dan client rendering.

### ✅ CORRECT - Use CSS Media Queries:
```tsx
// Use Tailwind responsive classes - no hydration issues
<div className="h-14 md:h-16 px-4 md:px-6">
  <h1 className="text-lg md:text-xl">Title</h1>
</div>
```

### ❌ WRONG - Using JavaScript hooks for styling:
```tsx
// This causes hydration mismatch!
const responsive = useResponsiveHeight()
<div className={responsive.header}>  // ❌ Different on server vs client
  <h1 className={responsive.text.title}>Title</h1>
</div>
```

## 🔧 Usage

### 1. Primary Method: Tailwind Responsive Classes

Gunakan Tailwind's built-in responsive modifiers:

### 1. Primary Method: Tailwind Responsive Classes

Gunakan Tailwind's built-in responsive modifiers:

```tsx
export default function MyPage() {
  return (
    <div>
      {/* Responsive heights */}
      <header className="h-14 md:h-16">
        {/* Responsive padding */}
        <div className="px-4 md:px-6 py-3 md:py-4">
          {/* Responsive text sizes */}
          <h1 className="text-lg md:text-xl lg:text-2xl">Title</h1>
          <p className="text-sm md:text-base">Description</p>
        </div>
      </header>
      
      {/* Responsive button */}
      <button className="h-9 md:h-10 px-3 md:px-4 text-sm md:text-base">
        Click Me
      </button>
    </div>
  )
}
```

**Common Responsive Patterns:**
- Heights: `h-14 md:h-16` (mobile: 56px, desktop: 64px)
- Padding: `p-4 md:p-6` (mobile: 1rem, desktop: 1.5rem)
- Text: `text-sm md:text-base` (mobile: 14px, desktop: 16px)
- Gaps: `gap-3 md:gap-4` (mobile: 0.75rem, desktop: 1rem)

### 2. Optional: useDevice() Hook (For Logic Only)

**ONLY use for conditional logic**, bukan untuk styling:

```tsx
import { useDevice } from "@/hooks/use-device"

export default function MyPage() {
  const device = useDevice()
  
  // ✅ CORRECT - Use for conditional logic
  useEffect(() => {
    if (device.isMobile && device.isClient) {
      // Do something only on mobile
      enableMobileGestures()
    }
  }, [device.isMobile, device.isClient])
  
  // ❌ WRONG - Don't use for styling
  // return <div className={device.isMobile ? "h-14" : "h-16"}>
  
  // ✅ CORRECT - Use CSS media queries
  return <div className="h-14 md:h-16">
    <p>Device Type: {device.isClient ? device.type : 'loading...'}</p>
  </div>
}
```

**Device Info Properties:**
- `type`: "mobile" | "tablet" | "desktop"
- `orientation`: "portrait" | "landscape"
- `isMobile`, `isTablet`, `isDesktop`: boolean
- `isTouchDevice`: boolean
- `viewportHeight`, `viewportWidth`: number
- `safeAreaTop`, `safeAreaBottom`: number  
- `isClient`: boolean (true after hydration)

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

### After (Responsive with Media Queries):
```tsx
<div className="h-14 md:h-16 px-4 md:px-6 gap-3 md:gap-4">
  <h1 className="text-lg md:text-xl">Title</h1>
</div>
```

### ❌ DON'T Use Hooks for Styling (Causes Hydration Issues):
```tsx
// This will cause hydration mismatch!
const responsive = useResponsiveHeight()
<div className={`${responsive.header} ${responsive.paddingX}`}>
  <h1 className={responsive.text.title}>Title</h1>
</div>
```

### ✅ DO Use Tailwind Responsive Classes:
```tsx
// This works perfectly - no hydration issues
<div className="h-14 md:h-16 px-4 md:px-6">
  <h1 className="text-lg md:text-xl">Title</h1>
</div>
```

## 🐛 Common Issues & Solutions

### Issue: Hydration mismatch error
**Cause:** Using JavaScript hooks untuk styling yang berbeza antara server dan client
**Solution:** Use Tailwind CSS media queries instead
```tsx
// ❌ Wrong - causes hydration mismatch
const responsive = useResponsiveHeight()
<div className={responsive.header}>

// ✅ Correct - no hydration issues
<div className="h-14 md:h-16">
```

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

// ✅ Correct
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

### Issue: Device detection not working
**Solution:** Always check `isClient` before using device values
```tsx
const device = useDevice()

// ❌ Wrong - might be undefined during SSR
if (device.isMobile) { ... }

// ✅ Correct - check isClient first
if (device.isClient && device.isMobile) { ... }
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

1. **ALWAYS use Tailwind media queries for styling** - Prevents hydration issues
2. **Use useDevice() only for logic** - Not for className generation
3. **Check `isClient` before using device values** - Ensure safe SSR
4. **Test on real devices** - Simulators may not show all issues
5. **Use proper touch targets** - Minimum 44x44px on touch devices
6. **Handle safe areas** - Especially for fixed position elements
7. **Test both orientations** on mobile devices
8. **Avoid fixed pixel heights** - Use responsive Tailwind classes

### Quick Reference for Common Patterns

```tsx
// ✅ Headers
<header className="h-14 md:h-16 px-4 md:px-6">

// ✅ Buttons  
<button className="h-9 md:h-10 px-3 md:px-4 text-sm md:text-base">

// ✅ Cards
<div className="p-4 md:p-6 gap-3 md:gap-4">

// ✅ Text
<h1 className="text-lg md:text-xl lg:text-2xl">
<p className="text-sm md:text-base">

// ✅ Touch interactions
<button className="active:scale-95 touch-manipulation">
```

## 📚 Example Page

See [/app/home/page.tsx](/app/home/page.tsx) for complete example implementation.
