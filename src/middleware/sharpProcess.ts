import sharp from "sharp";
import { promises as fspromises } from "fs";

export const sharpProcess = async (
  OriginalImagePath: string,
  ProccesedImagePath: string,
  width: number,
  height: number,
): Promise<string> => {
  try {
    await fspromises.writeFile(ProccesedImagePath, "");

    await sharp(OriginalImagePath)
      .resize(width, height )
      .toFile(ProccesedImagePath);

    return new Promise<string>((resolve) => {
      resolve("success");
    });
  } catch (error) {
    console.log(error);
    return new Promise<string>((resolve, reject) => {
      reject((error as Error).message);
    });
  }
};
