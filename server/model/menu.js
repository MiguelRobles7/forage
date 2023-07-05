import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        restaurantId: {type: Number},
        image: {type: Buffer},
        name: {type: String},
        price: {type: Number}
    }
);

export default mongoose.model("menu", schema, "menu_items");