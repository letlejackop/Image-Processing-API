import { Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";

export const validation = (req: Request, res: Response, next: NextFunction) => {
  const filename = req.query.filename;
  const height = req.query.height;
  const width = req.query.width;
  const inputfile = path.join(__dirname, "../assets/full");

  const OriginalImagePath = path.join(inputfile, filename + ".jpg");

  if (!filename || !height || !width) {
    return res
      .status(404)
      .send("Please enter the filename and the hight and the width");
  }

  if (!fs.existsSync(OriginalImagePath)) {
    console.log("original");
    return res.status(404).send("this file does not exist!");
  }
  next();
};
