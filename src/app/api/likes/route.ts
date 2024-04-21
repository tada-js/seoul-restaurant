import prisma from 'app/(feature)/_db/prisma';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);
  const { restaurantId } = await req.json();

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
        userId: session.user.id,
      },
    });
    return NextResponse.json(like, {
      status: 201,
    });
  }
}
