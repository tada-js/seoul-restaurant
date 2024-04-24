import prisma from 'app/(feature)/_db/prisma';
import { authOptions } from 'app/(feature)/_lib/authOptions';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const count = await prisma.like.count();

  const totalLikes = await prisma.like.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  return NextResponse.json({
    data: totalLikes,
    totalCount: count,
  });
}
