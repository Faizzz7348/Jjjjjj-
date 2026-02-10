#!/bin/bash

# Migration helper script untuk update pages ke responsive design system
# Usage: ./scripts/migrate-to-responsive.sh

echo "🔄 Migration Helper: Convert pages to responsive design"
echo "=================================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}This script will help you identify pages that need updating.${NC}"
echo ""

# Find files with old patterns
echo -e "${YELLOW}📝 Checking for pages with fixed heights...${NC}"
grep -r "className.*h-16" app/ --include="*.tsx" | grep -v "node_modules" > /tmp/fixed-heights.txt || true
if [ -s /tmp/fixed-heights.txt ]; then
  echo -e "${GREEN}Found pages with h-16:${NC}"
  cat /tmp/fixed-heights.txt
  echo ""
else
  echo "✓ No hardcoded h-16 found"
  echo ""
fi

echo -e "${YELLOW}📝 Checking for pages without useResponsiveHeight...${NC}"
for file in app/*/page.tsx app/*/*/page.tsx; do
  if [ -f "$file" ]; then
    if ! grep -q "useResponsiveHeight\|useDevice" "$file"; then
      echo "  → $file (not using responsive hooks)"
    fi
  fi
done
echo ""

echo -e "${YELLOW}📋 Migration Checklist:${NC}"
echo ""
echo "1. Import responsive hooks:"
echo "   import { useResponsiveHeight } from '@/hooks/use-device'"
echo ""
echo "2. Initialize in component:"
echo "   const responsive = useResponsiveHeight()"
echo ""
echo "3. Replace fixed heights:"
echo "   h-16 → \${responsive.header}"
echo "   h-9 → \${responsive.button}"
echo "   px-6 → \${responsive.paddingX}"
echo "   gap-4 → \${responsive.gap}"
echo ""
echo "4. Update text sizes:"
echo "   text-xl → \${responsive.text.title}"
echo "   text-3xl → \${responsive.text.heading}"
echo "   text-base → \${responsive.text.body}"
echo ""
echo "5. Add touch interactions:"
echo "   Add 'active:scale-95 touch-manipulation' to interactive elements"
echo ""
echo "6. Test on:"
echo "   - Mobile (portrait & landscape)"
echo "   - Tablet"
echo "   - Desktop"
echo ""
echo -e "${GREEN}📖 See docs/RESPONSIVE_DESIGN.md for complete guide${NC}"
echo ""
echo "Done! 🎉"
