//Importing class express from module express
const express = require("express");
//Creating object of class express.
const app = express()

const mongoose = require("mongoose");

MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main(){
    mongoose.connect(MONGO_URL);
}

main().then( 
    console.log("Connected to MongoDatabse")
).catch((err)=>{
    console.log(err);
})

//setting up a port to listen
app.listen(8080, ()=>{
    console.log("Server is listening");
})

//Creating an API call

app.get("/", (req,res)=>{
    res.send("Request received");
})

