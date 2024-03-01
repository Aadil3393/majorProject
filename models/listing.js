const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type:String,
        required: true
    },
    description: String,
    image: {
        type: String,
        default:"https://plus.unsplash.com/premium_photo-1674086524511-567ad049a61a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8",
        set: (v) => v === "" ? "https://plus.unsplash.com/premium_photo-1674086524511-567ad049a61a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8" : v,
    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;