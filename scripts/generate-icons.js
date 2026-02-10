const fs = require('fs');
const path = require('path');

// Create icons directory if it doesn't exist
const iconsDir = path.join(process.cwd(), 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// SVG template for Route Manager icons
const generateSVG = (size) => `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Background gradient -->
  <defs>
    <linearGradient id="grad${size}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#000000;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#grad${size})"/>
  
  <!-- Route path icon -->
  <g transform="translate(${size*0.15}, ${size*0.15})">
    <!-- Starting point -->
    <circle cx="${size*0.15}" cy="${size*0.15}" r="${size*0.08}" fill="#22c55e" opacity="0.9"/>
    
    <!-- Route line -->
    <path d="M${size*0.15} ${size*0.15} Q${size*0.35} ${size*0.25} ${size*0.35} ${size*0.45}" 
          stroke="#3b82f6" stroke-width="${size/40}" fill="none" stroke-linecap="round"/>
    <path d="M${size*0.35} ${size*0.45} Q${size*0.35} ${size*0.65} ${size*0.55} ${size*0.65}" 
          stroke="#3b82f6" stroke-width="${size/40}" fill="none" stroke-linecap="round"/>
    
    <!-- Waypoints -->
    <circle cx="${size*0.35}" cy="${size*0.45}" r="${size*0.05}" fill="#60a5fa" opacity="0.9"/>
    
    <!-- End point -->
    <circle cx="${size*0.55}" cy="${size*0.65}" r="${size*0.08}" fill="#ef4444" opacity="0.9"/>
  </g>
  
  <!-- Text label -->
  <text x="50%" y="90%" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="${size/10}" font-weight="bold" opacity="0.9">RM</text>
</svg>`;

// Sizes needed for PWA
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

console.log('🎨 Generating Route Manager icons...\n');

sizes.forEach(size => {
  const svg = generateSVG(size);
  const filename = `icon-${size}x${size}.svg`;
  const svgPath = path.join(iconsDir, filename);
  
  fs.writeFileSync(svgPath, svg);
  console.log(`✅ Created ${filename}`);
});

// Generate favicon
const faviconSVG = generateSVG(32);
fs.writeFileSync(path.join(process.cwd(), 'public', 'favicon.svg'), faviconSVG);
console.log('✅ Created favicon.svg');

console.log('\n✨ Icon generation complete!');
console.log('\n📝 Note: SVG placeholders have been created. For production, replace with actual PNG images using:');
console.log('   - Online tools like: https://realfavicongenerator.net/');
console.log('   - Or convert these SVGs to PNGs using a tool like sharp or imagemagick');
