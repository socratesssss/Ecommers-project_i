import { NextResponse } from 'next/server';

// Define banner type
export type BannerType = string;

// Banner array with type
const banners: BannerType[] = [
  "/placeholderimage.webp",
  "/placeholderimage.webp",
  "/placeholderimage.webp",
];

// GET /api/banners — Return all banners
export async function GET() {
  return NextResponse.json(banners);
}
