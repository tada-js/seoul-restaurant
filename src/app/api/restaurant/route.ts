import prisma from 'app/(feature)/_db/prisma';
import { NextRequest, NextResponse } from 'next/server';

interface RestaurantRequest {
  name: string;
  category: string;
}

export async function POST(req: NextRequest) {
  const { name, category }: RestaurantRequest = await req.json();
  const result = await prisma.restaurant.create({
    data: {
      name,
      category,
    },
  });

  return NextResponse.json(result, { status: 200 });
}
