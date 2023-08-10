import { NextResponse } from 'next/server';
import { ApiResponse } from 'src/types/api.types';
import { ActivateTotpResponse } from 'src/types/auth.types';

export async function POST(
  req: Request
): Promise<NextResponse<ApiResponse<ActivateTotpResponse | null>>> {
  return NextResponse.json(
    {
      data: null,
    },
    {
      status: 200,
    }
  );
}
