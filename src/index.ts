import express from "express";
import path from "path";
import Router from "./routes/api/Image"
const app = express();
const port = 3000;
app.listen(port,()=>{
    console.log(`server is running in port ${port}`);
})

let dir = path.join(__dirname,'assets');

app.use("/api",Router)
app.use('/images', express.static(dir));

export default app;