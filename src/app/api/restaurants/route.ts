import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { RestaurantType } from 'app/restaurants/_model';

export async function GET(
  req: NextApiRequest,
  res: NextApiResponse<RestaurantType[]>
) {
  const prisma = new PrismaClient();
  const restaurants = await prisma.restaurant.findMany({
    orderBy: { id: 'asc' },
  });

  return Response.json(restaurants);
}
