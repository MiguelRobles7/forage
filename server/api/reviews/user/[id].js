import { reviews } from "~/server/model/index.js";

export default defineEventHandler(async (event) => {
    console.log("Getting the reviews of a certain user...");
    const id = event.context.params.id;
    try {
        const allReviews = await reviews.findOne(
            {"userId": id,}
        );

        if(!allReviews) {
           console.log("That user got no reviews...");
           return;
        }

        return allReviews;  
    } catch(error) {
        console.log("Endpoint got an error...", error);
    }
})