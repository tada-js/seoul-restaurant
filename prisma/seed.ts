import { PrismaClient } from '@prisma/client';
const data = require('../src/data/서울시 일반음식점 인허가 정보.json');

interface RestaurantData {
  bplcnm: string;
  SITETEL?: string;
  sitewhladdr?: string;
  rdnwhladdr?: string;
  uptaenm?: string;
  x?: string;
  y?: string;
}

const prisma = new PrismaClient();

async function seedData() {
  data?.['DATA']?.map(async (restaurant: RestaurantData) => {
    const restaurantData = {
      name: restaurant?.bplcnm,
      address: restaurant?.sitewhladdr,
      rodaddress: restaurant?.rdnwhladdr,
      category: restaurant?.uptaenm,
      lng: restaurant?.x,
      lat: restaurant?.y,
    };

    const res = await prisma.restaurant.create({
      data: restaurantData,
    });
  });
}

async function main() {
  await seedData();
}

main()
  .catch((error) => {
    console.log(error);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
