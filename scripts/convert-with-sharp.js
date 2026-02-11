#!/usr/bin/env node

/**
 * Convert SVG icons to PNG using Sharp
 * Alternative automated approach
 */

const fs = require('fs');
const path = require('path');

console.log('📱 Icon Converter (Sharp-based)');
console.log('================================\n');

// Check if sharp is installed
try {
  require.resolve('sharp');
} catch (e) {
  console.log('❌ Sharp not installed!');
  console.log('\nInstall it with: npm install sharp --save-dev\n');
  process.exit(1);
}

const sharp = require('sharp');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconsDir = path.join(__dirname, '../public/icons');
const sourceSvg = path.join(iconsDir, 'icon-512x512.svg'); // Use largest SVG as source

async function convertIcons() {
  if (!fs.existsSync(sourceSvg)) {
    console.log(`❌ Source SVG not found: ${sourceSvg}`);
    return;
  }

  console.log(`📂 Source: ${path.basename(sourceSvg)}`);
  console.log(`📁 Output: ${iconsDir}\n`);

  for (const size of sizes) {
    const outputPath = path.join(iconsDir, `icon-${size}x${size}.png`);
    
    try {
      await sharp(sourceSvg)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toFile(outputPath);
      
      console.log(`✅ Generated: icon-${size}x${size}.png`);
    } catch (error) {
      console.log(`❌ Failed: icon-${size}x${size}.png - ${error.message}`);
    }
  }

  console.log('\n✨ Icon generation complete!\n');
}

convertIcons();
