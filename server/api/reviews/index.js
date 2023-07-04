import { reviews } from "~/server/model/index.js";

export default defineEventHandler(async (event) => {
    console.log("Getting all reviews..");

    try {
        const allReviews = await reviews.find();
        return allReviews;  
    } catch(error) {
        console.log("Endpoint got an error...", error);
    }
})