import express from "express";
import Router from "./routes/api/Image"
const app = express();
const port = 3000;
app.listen(port,()=>{
    console.log(`server is running in port ${port}`);
})

app.use("/api",Router)