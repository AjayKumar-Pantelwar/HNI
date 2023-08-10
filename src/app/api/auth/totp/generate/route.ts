import { NextResponse } from 'next/server';
import { ApiResponse } from 'src/types/api.types';
import { GenerateTotpResponse } from 'src/types/auth.types';

export async function POST(
  req: Request
): Promise<NextResponse<ApiResponse<GenerateTotpResponse | null>>> {
  return NextResponse.json(
    {
      data: {
        req_token: 'e69e0a91-7fb4-4cda-82c0-6368d3a82aaa',
        secret: '4NK2BDPQ367NY5CO',
        url: 'otpauth://totp/superadminMA@yopmail.com?issuer=Mumbai+Angels&secret=4NK2BDPQ367NY5CO',
      },
    },
    {
      status: 200,
    }
  );
}
