import prisma from 'app/(feature)/_db/prisma';
import { NextRequest, NextResponse } from 'next/server';

interface RestaurantRequest {
  name: string;
  category: string;
  rodaddress: string;
}

export async function POST(req: NextRequest) {
  const { name, category, rodaddress }: RestaurantRequest = await req.json();
  const headers = {
    Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
  };

  const kakaoAddress = await fetch(
    `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
      rodaddress
    )}`,
    {
      method: 'GET',
      headers,
    }
  );

  const { documents } = await kakaoAddress.json();

  const result = await prisma.restaurant.create({
    data: {
      name,
      category,
      rodaddress,
      lat: documents[0].y,
      lng: documents[0].x,
      wgs: true,
    },
  });

  return NextResponse.json(result, { status: 200 });
}
