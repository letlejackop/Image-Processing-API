import sharp from "sharp";
import { Request,Response,NextFunction } from "express";
import path from 'path';
import fs, {promises as fspromises} from "fs";


const inputfile = path.join(__dirname,'../assets/full');
let outputfile = path.join(__dirname,'../assets/thumb')


export const Image = async (req:Request,res:Response,next:NextFunction) :Promise<void>=>{
  let filename:string = (req.query.filename as unknown) as string
  let height:number = (req.query.height as unknown) as number
  let width:number = (req.query.width as unknown) as number

  const OriginalImagePath = path.join(
    inputfile,filename+".jpg");

  const ProccesedImagePath = path.join(
    outputfile,filename+".jpg");

      const myFile = await fspromises.writeFile(ProccesedImagePath,'')
      console.log(myFile);

   let a = await sharp(OriginalImagePath).metadata()

  let k = await sharp(OriginalImagePath)
  .resize(300, 200)
  .toFile(ProccesedImagePath);

  if (fs.existsSync(ProccesedImagePath)) {
    res.sendFile(ProccesedImagePath);
  }
next()
}

