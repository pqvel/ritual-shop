import { NextRequest, NextResponse } from "next/server";
import { s3Service } from "@/services/s3";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    await s3Service.deleteImage(url);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
