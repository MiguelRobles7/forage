import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        id: {type: Number},
        name: {type: String},
        logo: {type: Buffer},
        backgroundCard: {type: Buffer},
        banner: {type: Buffer},
        summary: {type: String},
        description: {type: String},
        location: {type: String},
        openingTime: {type: String},
        closingTime: {type: String},
        priceRange: {type: String},
        rating: {type: Number},
        reviewCount: {type: Number}
    }
);

export default mongoose.model("restaurant", schema, "restaurants");