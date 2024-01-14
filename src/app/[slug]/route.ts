import axios, { AxiosHeaders } from 'axios';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const { searchParams } = new URL(request.url);
  const href = params.slug;
  const body = request.body;

  const headers = new AxiosHeaders();

  for (const [key, value] of Object.entries(request.headers)) {
    headers.set(key, value);
  }

  const axiosResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/${href}?${searchParams.toString()}`,
    {
      headers,
      data: body,
    }
  );
}
