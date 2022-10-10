import express, { Request, Response } from "express";
import {resize} from "../../middleware/ImageProcces"
import {validation} from "../../middleware/validate"

const Router = express.Router();


Router.get("/images",[validation,resize],(req:Request,res:Response)=>{

});

export default Router;
