//Importing class express from module express
const express = require("express");
//Creating object of class express.
const app = express()

const ejsMate = require("ejs-mate");

const mongoose = require("mongoose");
const Listing = require("./models/listing")
const path = require("path");
const methodOverride = require("method-override");
const wrapAsync = require("./utils/wrapAsync.js");

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
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

//setting up a port to listen
app.listen(8080, ()=>{
    console.log("Server is listening");
})

//Creating an API call

app.get("/", (req,res)=>{
    res.send("Request received");
})

//Index Route
app.get("/listings", async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
})

//New Route
app.get("/listings/new", async (req,res)=>{
    // res.send("New listing request received");
    res.render("./listings/new.ejs")
});

//Show Route
app.get("/listings/:id", async (req,res) => {
    let {id} = req.params;
    console.log({id});
    const listing = await Listing.findById(id);
    res.render("./listings/show.ejs",{listing});
});

//Create Route
app.post("/listings", wrapAsync(async (req,res,next)=>{
    // let listing = req.body.Listing;
        const newListing = new Listing(req.body.Listing);
        await newListing.save();
    
        // res.send("Post request received")
        res.redirect("/listings");


}))

//Edit Route
app.get("/listings/:id/edit",async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
});

//Update Route
app.put("/listings/:id", async (req,res)=>{
    let {id} = req.params;
    // console.log(req.body.Listing)
    const list = await Listing.findByIdAndUpdate(id, {...req.body.Listing})
    res.redirect(`/listings/${id}`);
});

//Delete Route
app.delete("/listings/:id", async (req,res)=>{
    let {id} = req.params;
    const del = await Listing.findByIdAndDelete(id);
    console.log(id);
    res.redirect("/listings");
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

app.use((err,req,res,next)=>{
    res.send("Something went wrong");
})