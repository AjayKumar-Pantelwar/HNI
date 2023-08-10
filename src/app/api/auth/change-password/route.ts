import { NextResponse } from 'next/server';
import { ApiResponse } from 'src/types/api.types';
import { ChangePasswordResponse } from 'src/types/auth.types';

export async function POST(
  req: Request
): Promise<NextResponse<ApiResponse<ChangePasswordResponse | null>>> {
  return NextResponse.json(
    {
      data: {
        is_pwd_change_required: false,
        is_totp_activated: false,
      },
    },
    {
      status: 200,
    }
  );
}
