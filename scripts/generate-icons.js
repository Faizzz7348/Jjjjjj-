const fs = require('fs');
const path = require('path');

// Create icons directory if it doesn't exist
const iconsDir = path.join(process.cwd(), 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// SVG template for icons
const generateSVG = (size) => `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="black"/>
  <circle cx="${size/2}" cy="${size/2}" r="${size/3}" fill="white" opacity="0.1"/>
  <path d="M${size*0.25} ${size*0.4}L${size*0.4} ${size*0.6}L${size*0.75} ${size*0.3}" stroke="white" stroke-width="${size/20}" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="50%" y="75%" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="${size/8}" font-weight="bold">PWA</text>
</svg>`;

// Sizes needed for PWA
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

console.log('🎨 Generating PWA icons...\n');

sizes.forEach(size => {
  const svg = generateSVG(size);
  const filename = `icon-${size}x${size}.png`;
  const svgPath = path.join(iconsDir, `icon-${size}x${size}.svg`);
  
  fs.writeFileSync(svgPath, svg);
  console.log(`✅ Created ${filename} (SVG placeholder)`);
});

// Generate favicon
const faviconSVG = generateSVG(32);
fs.writeFileSync(path.join(process.cwd(), 'public', 'favicon.svg'), faviconSVG);
console.log('✅ Created favicon.svg');

console.log('\n✨ Icon generation complete!');
console.log('\n📝 Note: SVG placeholders have been created. For production, replace with actual PNG images using:');
console.log('   - Online tools like: https://realfavicongenerator.net/');
console.log('   - Or convert these SVGs to PNGs using a tool like sharp or imagemagick');
