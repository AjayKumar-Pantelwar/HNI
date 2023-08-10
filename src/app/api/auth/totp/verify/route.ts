import { NextResponse } from 'next/server';
import { ApiResponse } from 'src/types/api.types';
import { ValidateTotpResponse } from 'src/types/auth.types';

export async function POST(
  req: Request
): Promise<NextResponse<ApiResponse<ValidateTotpResponse | null>>> {
  return NextResponse.json(
    {
      data: null,
    },
    {
      status: 200,
    }
  );
}
