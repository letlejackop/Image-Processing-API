import express from "express";
import { resize } from "../../middleware/ImageProcess";
import { validation } from "../../middleware/validate";

const Router = express.Router();

Router.get("/images", [validation, resize]);

export default Router;
