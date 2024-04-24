import prisma from 'app/(feature)/_db/prisma';
import { authOptions } from 'app/(feature)/_lib/authOptions';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') as string;
  const district = searchParams.get('district') as string;
  const page = searchParams.get('page') as string;
  const limit = searchParams.get('limit') as string;
  const session = await getServerSession(authOptions);
  const count = await prisma.like.count();
  const skipPage = parseInt(page) - 1;

  const likes = await prisma.like.findMany({
    orderBy: { createdAt: 'desc' },
    where: {
      userId: session?.user.id,
      restaurantName: q ? { contains: q } : {},
      restaurantAddress: district ? { contains: district } : {},
    },
    include: {
      restaurant: true,
    },
    take: parseInt(limit),
    skip: skipPage * 20,
  });

  return NextResponse.json(
    {
      page: parseInt(page),
      data: likes,
      totalCount: count,
      totalPage: Math.ceil(count / 10),
    },
    {
      status: 200,
    }
  );
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const { restaurantId, restaurantName, restaurantAddress } = await req.json();

  if (!session?.user) {
    return NextResponse.json('401 Unauthorized', { status: 401 });
  }

  let like = await prisma.like.findFirst({
    where: {
      restaurantId,
      userId: session.user.id,
    },
  });

  if (like) {
    like = await prisma.like.delete({
      where: {
        id: like.id,
      },
    });
    return NextResponse.json({
      status: 204,
    });
  } else {
    like = await prisma.like.create({
      data: {
        restaurantId,
        restaurantName,
        restaurantAddress,
        userId: session.user.id,
      },
    });
    return NextResponse.json(like, {
      status: 201,
    });
  }
}
