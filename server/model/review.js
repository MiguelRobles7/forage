import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        restaurantId: {type: Number},
        userId: {type: Number},
        rating: {type: Number},
        title: {type: String},
        body: {type: String},
        images: [Buffer],
        upvotes: {type: Number},
        downvotes: {type: Number},
        isReply: {type: Boolean},
    }
);

export default mongoose.model("review", schema, "reviews");