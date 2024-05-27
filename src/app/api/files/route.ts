import { s3Service } from "@/services/s3";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const folderName = formData.get("folderName") as string | null;
  // console.log(folderName);
  if (file && folderName) {
    // const fileExtension = file.type.split("/")[1];
    const fileExtension = file.type.split("/")[1];
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${folderName}/${Date.now()}.${fileExtension}`;
    const baseUrl = `${process.env.AWS_ENDPOINT_URL}/${process.env.AWS_BUCKET_NAME}`;
    const uploadImageUrl = `${baseUrl}/${fileName}`;
    const res = await s3Service.uploadImage(buffer, fileName);

    return NextResponse.json({
      success: true,
      url: uploadImageUrl,
    });
  } else {
    return NextResponse.json(
      {
        success: false,
        message: "Ошибка при загрузке файла",
      },
      { status: 500 }
    );
  }
}
