import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clean existing data (optional - remove if you want to keep existing data)
  // await prisma.galleryImage.deleteMany()
  // await prisma.galleryRow.deleteMany()
  // await prisma.deliverySchedule.deleteMany()
  // await prisma.location.deleteMany()
  // await prisma.route.deleteMany()

  // Seed Gallery Rows and Images for Standard page
  console.log('📸 Seeding gallery data...')
  
  const row1 = await prisma.galleryRow.create({
    data: {
      title: 'Featured Products',
      position: 0,
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
            title: 'Product 1',
            subtitle: 'Premium Quality',
            position: 0,
          },
          {
            url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
            title: 'Product 2',
            subtitle: 'Best Seller',
            position: 1,
          },
          {
            url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
            title: 'Product 3',
            subtitle: 'New Arrival',
            position: 2,
          },
        ],
      },
    },
  })

  const row2 = await prisma.galleryRow.create({
    data: {
      title: 'Popular Items',
      position: 1,
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400',
            title: 'Item 1',
            subtitle: 'Trending',
            position: 0,
          },
          {
            url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
            title: 'Item 2',
            subtitle: 'Popular',
            position: 1,
          },
        ],
      },
    },
  })

  // Seed Routes for Selangor
  console.log('🗺️  Seeding route data...')
  
  const selangorRoute = await prisma.route.create({
    data: {
      code: 'SEL-001',
      name: 'Selangor Main Route',
      description: 'Main delivery route for Selangor area',
      region: 'selangor',
      shift: 'AM',
      deliveryMode: 'daily',
      locations: {
        create: [
          {
            code: 'LOC-001',
            name: 'Petaling Jaya Hub',
            address: 'Jalan SS2, Petaling Jaya',
            contact: '03-1234567',
            position: 0,
            deliveryMode: 'daily',
            lat: '3.1073',
            lng: '101.6067',
            deliverySchedule: {
              create: [
                { day: 'Monday', mode: 'daily' },
                { day: 'Wednesday', mode: 'daily' },
                { day: 'Friday', mode: 'daily' },
              ],
            },
          },
          {
            code: 'LOC-002',
            name: 'Shah Alam Center',
            address: 'Seksyen 2, Shah Alam',
            contact: '03-7654321',
            position: 1,
            deliveryMode: 'alt1',
            lat: '3.0733',
            lng: '101.5185',
            deliverySchedule: {
              create: [
                { day: 'Tuesday', mode: 'alt1' },
                { day: 'Thursday', mode: 'alt1' },
              ],
            },
          },
        ],
      },
    },
  })

  // Seed Routes for Kuala Lumpur
  const klRoute = await prisma.route.create({
    data: {
      code: 'KL-001',
      name: 'Kuala Lumpur Main Route',
      description: 'Main delivery route for KL area',
      region: 'kuala-lumpur',
      shift: 'PM',
      deliveryMode: 'daily',
      locations: {
        create: [
          {
            code: 'LOC-003',
            name: 'KLCC Hub',
            address: 'Jalan Ampang, KLCC',
            contact: '03-2222333',
            position: 0,
            deliveryMode: 'daily',
            lat: '3.1578',
            lng: '101.7123',
            deliverySchedule: {
              create: [
                { day: 'Monday', mode: 'daily' },
                { day: 'Tuesday', mode: 'daily' },
                { day: 'Wednesday', mode: 'daily' },
                { day: 'Thursday', mode: 'daily' },
                { day: 'Friday', mode: 'daily' },
              ],
            },
          },
        ],
      },
    },
  })

  console.log('✅ Database seeded successfully!')
  console.log(`   - Created ${2} gallery rows`)
  console.log(`   - Created ${2} routes`)
  console.log(`   - Created ${3} locations`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
