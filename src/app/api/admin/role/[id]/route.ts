import { NextResponse } from 'next/server';
import { ApiResponse } from 'src/types/api';
import { EditRoleRequest } from 'src/types/role.types';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse>> {
  let err;
  try {
    const body: EditRoleRequest = await req.json();

    if (Object.values(body).some((val) => val === undefined)) {
      return NextResponse.json(
        {
          data: null as never,
          error: 'Invalid Request',
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json({ data: null as never }, { status: 202 });
  } catch (error) {
    console.error(error);
    err = error;
  }

  return NextResponse.json(
    {
      data: null as never,
      error: err?.message || 'Internal Error',
    },
    {
      status: 500,
      statusText: 'Internal Server Error',
    }
  );
}
