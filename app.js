//Importing class express from module express
const express = require("express");
//Creating object of class express.
const app = express()

const mongoose = require("mongoose");
const Listing = require("./models/listing")

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

//Listing
app.get("/testingNew", async (req,res)=>{
    let sampleListing = new Listing({
        title:"My new Villa",
        description:"By the beach",
        price:1200,
        location:"Calangute, Goa",
        country:"India"
    });

    await sampleListing.save();
    console.log("Sample was saved");
    res.send("successful");

})

