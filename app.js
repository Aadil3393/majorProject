//Importing class express from module express
const express = require("express");
//Creating object of class express.
const app = express()

const mongoose = require("mongoose");
const Listing = require("./models/listing")
const path = require("path");

MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main(){
    mongoose.connect(MONGO_URL);
}

main().then( 
    console.log("Connected to MongoDatabse")
).catch((err)=>{
    console.log(err);
})

//Setting eJS
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

//setting up a port to listen
app.listen(8080, ()=>{
    console.log("Server is listening");
})

//Creating an API call

app.get("/", (req,res)=>{
    res.send("Request received");
})

app.get("/listings", async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
})
//Listing
// app.get("/testingNew", async (req,res)=>{
//     let sampleListing = new Listing({
//         title:"My new Villa",
//         description:"By the beach",
//         price:1200,
//         location:"Calangute, Goa",
//         country:"India"
//     });

//     await sampleListing.save();
//     console.log("Sample was saved");
//     res.send("successful");

// })

