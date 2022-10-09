import express, { Request, Response } from "express";
import {Image} from "../../middleware/ImageProcces"

const Router = express.Router();


Router.get("/images",Image,(req:Request,res:Response)=>{

});

export default Router;
