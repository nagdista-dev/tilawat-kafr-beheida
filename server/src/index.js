import express from "express";
import "dotenv/config";
const app = express();
const port = process.env.PORT || 3001;

app.get("/",(_,res)=>{
    res.json({message:"Server is live | Tilawat Kaf beheida"})
})

app.listen(port,()=>{
    console.log("Server is live on port: ",port);
})
