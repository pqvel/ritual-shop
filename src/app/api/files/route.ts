import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (file) {
    console.log("Received file:", file.name);
    // Вывод содержимого файла в консоль (если это текстовый файл)
    const content = await file.text();
    console.log("File content:", content);
  } else {
    console.log("No file received");
  }

  return NextResponse.json({ success: true });
}
