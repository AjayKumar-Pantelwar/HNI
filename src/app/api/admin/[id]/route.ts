import { NextResponse } from 'next/server';
import { Admin, EditAdminRequest, EditAdminResponse } from 'src/types/admin.types';
import { promises as fs } from 'fs';
import path from 'path';
import { fDate } from 'src/utils/format-time';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse<EditAdminResponse>> {
  let err;
  try {
    const body: EditAdminRequest = await req.json();

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

    const jsonDirectory = path.join(process.cwd(), 'src', 'app', 'api', 'admin');
    const fileContents = await fs.readFile(`${jsonDirectory}/mock.json`, 'utf8');

    const admins: Admin[] = JSON.parse(fileContents);

    const admin = admins.find((ad) => ad.aid === params.id);

    if (!admin) {
      return NextResponse.json({ data: null as never, error: 'Admin not found' }, { status: 404 });
    }

    admin.name = body.name || admin.name;
    admin.username = body.username || admin.username;
    admin.email = body.email || admin.email;
    admin.mobile_number = body.mobile_number || admin.mobile_number;

    admin.updated_at = fDate(new Date());

    await fs.writeFile(`${jsonDirectory}/mock.json`, JSON.stringify(admins), 'utf8');

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
