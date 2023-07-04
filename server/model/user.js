import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        id: {type: Number},
        name: {type: String},
        pasword: {type: String},
        displayPicture: {type: Buffer},
        banner: {type: Buffer},
        description: {type: String},
        country: {type: String},
        province: {type: String},
        city: {type: String},
        street: {type: String},
        zipcode: {type: Number},
        email: {type: Number},
        fbLink: {type: String},
        instagramLink: {type: String},
        twitterLink: {type: String},
        userType: {type: String},
        ownedRestaurants: [Number]
    }

);

export default mongoose.model("user", schema, "users");