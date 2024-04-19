import prisma from 'app/(feature)/_db/prisma';
import { NextRequest, NextResponse } from 'next/server';

interface RestaurantRequest {
  id: number;
  name: string;
  category: string;
  rodaddress: string;
  address: string;
}

export async function POST(req: NextRequest) {
  const { name, category, rodaddress, address }: RestaurantRequest =
    await req.json();
  const headers = {
    Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
  };

  const kakaoRodaddress = await fetch(
    `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
      rodaddress
    )}`,
    {
      method: 'GET',
      headers,
    }
  );

  const { documents } = await kakaoRodaddress.json();

  const result = await prisma.restaurant.create({
    data: {
      name,
      category,
      rodaddress,
      address,
      lat: documents[0].y,
      lng: documents[0].x,
      wgs: true,
    },
  });

  return NextResponse.json(result, { status: 200 });
}

export async function PUT(req: NextRequest) {
  const { id, name, category, rodaddress, address }: RestaurantRequest =
    await req.json();

  const headers = {
    Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
  };

  const kakaoRodaddress = await fetch(
    `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
      rodaddress
    )}`,
    {
      method: 'GET',
      headers,
    }
  );

  const { documents } = await kakaoRodaddress.json();

  const result = await prisma.restaurant.update({
    where: { id },
    data: {
      id,
      name,
      category,
      rodaddress,
      address,
      lat: documents[0].y,
      lng: documents[0].x,
      wgs: true,
    },
  });

  return NextResponse.json(result, { status: 200 });
}
