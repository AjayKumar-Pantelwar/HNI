import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';
import { ApiResponse } from 'src/types/api';
import { CreateRoleRequest, GetRolesResponse } from 'src/types/role.types';

export async function GET(req: Request): Promise<NextResponse<GetRolesResponse>> {
  let err;
  try {
    const jsonDirectory = path.join(process.cwd(), 'src', 'app', 'api', 'admin', 'role');
    const fileContents = await fs.readFile(`${jsonDirectory}/mock.json`, 'utf8');

    const roles = JSON.parse(fileContents);

    return NextResponse.json(
      {
        data: { roles },
      },
      { status: 200 }
    );
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

export async function POST(req: Request): Promise<NextResponse<ApiResponse>> {
  const body: CreateRoleRequest = await req.json();

  const error400 = NextResponse.json(
    {
      data: null as never,
      error: 'Invalid Request',
    },
    {
      status: 400,
    }
  );

  if (Object.values(body).some((val) => val === undefined)) {
    return error400;
  }

  if (
    body?.permission &&
    body?.permission?.length &&
    body.permission.some((val) => val === undefined)
  ) {
    return error400;
  }

  let err;
  try {
    return NextResponse.json(
      {
        data: null as never,
      },
      {
        status: 201,
      }
    );
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
    }
  );
}
