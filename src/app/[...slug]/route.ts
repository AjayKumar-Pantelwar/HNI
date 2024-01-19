// import axios, { AxiosHeaders } from 'axios';
// import { NextRequest } from 'next/server';

// export async function POST(request: NextRequest, { params }: { params: { slug: string } }) {
//   const { searchParams } = new URL(request.url);
//   const href = params.slug;
//   const { body } = request;

//   const headers = new AxiosHeaders();

//   const axiosResponse = await axios.post(
//     `${process.env.NEXT_PUBLIC_API_URL}/${href}?${searchParams.toString()}`,
//     {
//       headers,
//       data: body,
//     }
//   );

//   console.log({ axiosResponse });
// }

import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const { body, nextUrl } = request;
  const { pathname } = nextUrl;
  const headers = Object.fromEntries(request.headers);
  const proxy = process.env.NEXT_PUBLIC_API_URL || nextUrl.origin;

  return fetch(`${proxy}${pathname}${nextUrl.search}`, {
    headers,
    body,
    method: 'POST',
    // @ts-ignore
    duplex: 'half',
  });
}

export async function PUT(request: NextRequest) {
  const { body, nextUrl } = request;
  const { pathname } = nextUrl;
  const headers = Object.fromEntries(request.headers);
  const proxy = process.env.NEXT_PUBLIC_API_URL || nextUrl.origin;

  return fetch(`${proxy}${pathname}${nextUrl.search}`, {
    headers,
    body,
    method: 'PUT',
    // @ts-ignore
    duplex: 'half',
  });
}

export async function GET(request: NextRequest) {
  const { nextUrl } = request;
  const { pathname } = nextUrl;
  const headers = Object.fromEntries(request.headers);
  const proxy = process.env.NEXT_PUBLIC_API_URL || nextUrl.origin;

  console.log('Got GET request', pathname, headers);
  const url = `${proxy}${pathname}${nextUrl.search}`;

  console.log('Sending request', url);
  const response = await fetch(url, {
    headers,
  });

  const body = await response.text();

  console.log('Got response', response.status, response.statusText, body, response.headers);

  return new Response(body);
}
