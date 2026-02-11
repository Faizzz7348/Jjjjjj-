#!/usr/bin/env node

/**
 * Generate PNG icons from SVG
 * Based on Tobirama PWA best practices
 */

const fs = require('fs');
const path = require('path');

console.log('📱 PWA Icon Generator');
console.log('====================\n');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconsDir = path.join(__dirname, '../public/icons');

// Instructions for manual conversion
console.log('📝 To generate PNG icons from SVG:');
console.log('\n1. Using Online Tools:');
console.log('   - Visit: https://svgtopng.com or https://cloudconvert.com/svg-to-png');
console.log('   - Upload your SVG file from public/icons/');
console.log('   - Convert to the following sizes:');
console.log('   ' + sizes.map(s => `${s}x${s}px`).join(', '));
console.log('   - Save as: icon-{size}x{size}.png\n');

console.log('2. Using ImageMagick (if installed):');
console.log('   npm run convert-icons');
console.log('   (requires ImageMagick to be installed)\n');

console.log('3. Using Sharp (Node.js):');
console.log('   npm install sharp --save-dev');
console.log('   node scripts/convert-with-sharp.js\n');

// Check if SVG icons exist
const svgFiles = fs.readdirSync(iconsDir).filter(f => f.endsWith('.svg'));
console.log(`✅ Found ${svgFiles.length} SVG icons in ${iconsDir}`);

// Check if PNG icons exist
const pngFiles = fs.readdirSync(iconsDir).filter(f => f.endsWith('.png'));
if (pngFiles.length > 0) {
  console.log(`✅ Found ${pngFiles.length} PNG icons already generated`);
} else {
  console.log('⚠️  No PNG icons found. Please generate them manually.');
}

console.log('\n📋 Icon sizes needed:');
sizes.forEach(size => {
  const filename = `icon-${size}x${size}.png`;
  const exists = fs.existsSync(path.join(iconsDir, filename));
  console.log(`   ${exists ? '✅' : '❌'} ${filename}`);
});

console.log('\n💡 Tip: You can also use an online tool like Favicon Generator');
console.log('   https://realfavicongenerator.net/\n');
