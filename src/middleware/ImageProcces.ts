import sharp from "sharp";
import { Request,Response,NextFunction } from "express";
import path from 'path';
import fs, {promises as fspromises} from "fs";


export const resize = async (req:Request,res:Response,next:NextFunction) :Promise<void>=>{

    const inputfile = path.join(__dirname,'../assets/full');
  const outputfile = path.join(__dirname,'../assets/thumb');
  let filename:string = (req.query.filename as unknown) as string
    
    try {
      let height:number = parseInt(req.query.height as string);
      let width:number =  parseInt(req.query.width as string); 
      const OriginalImagePath = path.join(
        inputfile,filename+".jpg");
    
      const ProccesedImagePath = path.join(
        outputfile,`${filename}_filename=${filename}&height=${height}&width=${width}.jpg`);

      if (height <=0 || width<=0 ) {
        throw new Error("Please make sure that the hieght and width are more than 0");
      }
      if (Number.isNaN(height)  || Number.isNaN(width) ) {
        throw new Error("Please make sure that the hieght and width do not have any characters in them");
      }
      if (fs.existsSync(ProccesedImagePath)) {    
          res.sendFile(ProccesedImagePath);
      } else{
          await fspromises.writeFile(ProccesedImagePath,'')                    
          await sharp(OriginalImagePath)
          .resize(width as number, height as number)
          .toFile(ProccesedImagePath);
        
          if (fs.existsSync(ProccesedImagePath)) {
            res.sendFile(ProccesedImagePath);
          }
        }
        
        
      }catch (error) {
        console.log((error as Error).message);
        res.status(404).send((error as Error).message);
      }
      next()
}