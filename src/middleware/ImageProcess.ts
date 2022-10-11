//https://www.npmjs.com/package/sharp
//https://github.com/calvinmetcalf/copyfiles
//https://stackoverflow.com/questions/42654595/how-to-check-if-value-is-nan-in-typescript
//https://jasmine.github.io/api/2.7/matchers.html

import { Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";
import { sharpProcess } from "./sharpProcess";

export const resize = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const inputfile = path.join(__dirname, "../assets/full");
  const outputfile = path.join(__dirname, "../assets/thumb");
  const filename: string = req.query.filename as unknown as string;
  const height: number = parseInt(req.query.height as string);
  const width: number = parseInt(req.query.width as string);
  try {
    const OriginalImagePath = path.join(inputfile, filename + ".jpg");

    const ProccesedImagePath = path.join(
      outputfile,
      `${filename}_filename=${filename}&height=${height}&width=${width}.jpg`,
    );

    if (height <= 0 || width <= 0) {
      throw new Error(
        "Please make sure that the hieght and width are more than 0",
      );
    }
    if (Number.isNaN(height) || Number.isNaN(width)) {
      throw new Error(
        "Please make sure that the hieght and width do not have any characters in them",
      );
    }
    if (fs.existsSync(ProccesedImagePath)) {
      return res.sendFile(ProccesedImagePath);
    } else {
      //sharp procces is moved to another file
      await sharpProcess(OriginalImagePath, ProccesedImagePath, width, height).then().catch(err =>{
        throw new Error(err);
      });

      if (fs.existsSync(ProccesedImagePath)) {
        return res.sendFile(ProccesedImagePath);
      }
    }
  } catch (error) {
    console.log((error as Error).message);
    res.status(404).send((error as Error).message);
  }
  next();
};
