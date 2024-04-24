import { NextRequest, NextResponse } from 'next/server';
import prisma from 'app/(feature)/_db/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from 'app/(feature)/_lib/authOptions';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id') as string;
  const page = searchParams.get('page') as string;
  const limit = searchParams.get('limit') as string;
  const q = searchParams.get('q') as string;
  const district = searchParams.get('district') as string;

  const session = await getServerSession(authOptions);

  if (page) {
    const count = await prisma.restaurant.count();
    const skipPage = parseInt(page) - 1;
    const restaurants = await prisma.restaurant.findMany({
      orderBy: { id: 'asc' },
      where: {
        name: q ? { contains: q } : {},
        address: district ? { contains: district } : {},
      },
      take: parseInt(limit),
      skip: skipPage * 20,
    });
    return NextResponse.json(
      {
        page: parseInt(page),
        data: restaurants,
        totalCount: count,
        totalPage: Math.ceil(count / 10),
      },
      {
        status: 200,
      }
    );
  } else {
    const restaurants = await prisma.restaurant.findMany({
      orderBy: { id: 'asc' },
      where: {
        id: id ? parseInt(id) : {},
      },
      include: {
        likes: {
          where: session ? { userId: session.user.id } : {},
        },
      },
    });
    return NextResponse.json(id ? restaurants[0] : restaurants, {
      status: 200,
    });
  }
}
