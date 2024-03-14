import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { RestaurantsType } from '@/app/restaurants/_model';

export async function GET(
  req: NextApiRequest,
  res: NextApiResponse<RestaurantsType[]>
) {
  const prisma = new PrismaClient();
  const restaurants = await prisma.restaurant.findMany({
    orderBy: { id: 'asc' },
  });

  return Response.json(restaurants);
}
