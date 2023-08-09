import { faker } from '@faker-js/faker';
import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';
import {
  Admin,
  AdminResponse,
  CreateAdminRequest,
  CreateAdminResponse,
} from 'src/types/admin.types';
import { ApiResponse } from 'src/types/api.types';
import { fDateTime } from 'src/utils/format-time';
import uuidv4 from 'src/utils/uuidv4';

const generateFakeAdmin = () =>
  ({
    aid: uuidv4(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    created_at: fDateTime(new Date()),
    is_blocked: Math.random() > 0.5,
    is_pwd_change_required: Math.random() > 0.5,
    is_totp_activated: Math.random() > 0.5,
    mobile_number: faker.phone.number(),
    username: faker.internet.userName(),
    rid: uuidv4(),
    type: Math.random() > 0.8 ? 'super_admin' : 'admin',
    updated_at: fDateTime(new Date()),
  } as Admin);

export async function GET(req: Request): Promise<NextResponse<AdminResponse | ApiResponse<null>>> {
  let err;
  try {
    const jsonDirectory = path.join(process.cwd(), 'src', 'app', 'api', 'admin');
    const fileContents = await fs.readFile(`${jsonDirectory}/mock.json`, 'utf8');

    const admins = JSON.parse(fileContents);

    if (admins.length === 0) {
      const admin = generateFakeAdmin();
      await fs.writeFile(`${jsonDirectory}/mock.json`, JSON.stringify([admin]));

      return NextResponse.json(
        {
          data: { admins: [admin] },
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        data: { admins },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    err = error;
  }

  return NextResponse.json(
    {
      data: null,
      error: err?.message || 'Internal Error',
    },
    {
      status: 500,
      statusText: 'Internal Server Error',
    }
  );
}

export async function POST(req: Request): Promise<NextResponse<CreateAdminResponse>> {
  const body: CreateAdminRequest = await req.json();

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

  let err;
  try {
    const jsonDirectory = path.join(process.cwd(), 'src', 'app', 'api', 'admin');
    const fileContents = await fs.readFile(`${jsonDirectory}/mock.json`, 'utf8');

    const admins: Admin[] = JSON.parse(fileContents);

    const admin = generateFakeAdmin();

    if (admins.find((adm) => adm.username === body.username)) {
      return NextResponse.json(
        {
          data: null as never,
          error: 'Username already exists',
        },
        {
          status: 400,
        }
      );
    }

    admins.push({
      ...admin,
      created_at: fDateTime(new Date()),
      updated_at: fDateTime(new Date()),
      username: body.username,
      mobile_number: body.mobile_number,
      email: body.email,
      rid: body.rid,
      is_pwd_change_required: body.is_pwd_change_required,
      name: body.name,
    });

    await fs.writeFile(`${jsonDirectory}/mock.json`, JSON.stringify(admins), 'utf8');

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
