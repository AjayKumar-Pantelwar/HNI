import { NextResponse } from 'next/server';
import { ApiResponse } from 'src/types/api';
import { LoginResponse } from 'src/types/auth';

export async function POST(req: Request): Promise<NextResponse<ApiResponse<LoginResponse | null>>> {
  const body = await req.json();

  if (body.username === 'superadminMA' && body.password === 'Test@123') {
    return NextResponse.json(
      {
        data: {
          is_pwd_change_required: true,
          is_totp_activated: false,
          req_token: 'fab4e040-6da4-41d9-9450-01661ca8e6ba',
        },
        error: 'Password change required',
      },
      {
        status: 200,
      }
    );
  }

  return NextResponse.json(
    {
      data: null,
      error: 'Username or password is incorrect',
    },
    {
      status: 401,
    }
  );
}
