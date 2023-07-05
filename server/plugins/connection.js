import mongoose from "mongoose";

const config = useRuntimeConfig();

export default async() => {
    try {
        await mongoose.connect(config.mongoUrl);
        console.log("DB Connection Success!");
    } catch (error) {
        console.log("DB Connection Failed.", error);
    }
}