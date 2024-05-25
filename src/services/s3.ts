import sharp from "sharp";
import {
  PutObjectCommand,
  PutObjectCommandInput,
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  HeadObjectCommand,
  HeadBucketCommandInput,
  DeleteObjectsCommand,
  DeleteObjectsCommandInput,
} from "@aws-sdk/client-s3";
import { s3 } from "@/s3";

class S3Service {
  uploadImage = async (
    file: Buffer,
    fileName: string
  ): Promise<string | undefined> => {
    try {
      const resizedImageBuffer = await sharp(file).resize(400, 500).toBuffer();

      const params: PutObjectCommandInput = {
        ACL: "public-read",
        Bucket: process.env.AWS_BUCKET_NAME as string,
        Key: fileName,
        Body: resizedImageBuffer,
        ContentType: "image/jpeg",
      };

      const command = new PutObjectCommand(params);

      await s3.send(command);

      return fileName;
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };

  deleteImage = async (fileName: string): Promise<void> => {
    try {
      const Key = fileName.replace(
        `${process.env.AWS_ENDPOINT_URL}/${process.env.AWS_BUCKET_NAME}/`,
        ``
      );

      console.log(Key);

      const params: DeleteObjectCommandInput = {
        Bucket: process.env.AWS_BUCKET_NAME as string,
        Key,
      };

      const command = new DeleteObjectCommand(params);

      await s3.send(command);
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };

  deleteImages = async (imagesUrls: string[]) => {
    try {
      const params: DeleteObjectsCommandInput = {
        Bucket: process.env.AWS_BUCKET_NAME as string,
        Delete: {
          Objects: imagesUrls.map((url) => ({
            Key: url.replace(
              `${process.env.AWS_ENDPOINT_URL}/${process.env.AWS_BUCKET_NAME}/`,
              ``
            ),
          })),
        },
      };

      const command = new DeleteObjectsCommand(params);

      await s3.send(command);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  checkFileExists = async (fileName: string) => {
    try {
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME as string,
        Key: fileName,
      };
      const command = new HeadObjectCommand(params);

      await s3.send(command);
      console.log("file exist");
    } catch (error) {
      console.log("error file not exist");
      console.log(error);
      return error;
    }
  };
}

export const s3Service = new S3Service();
