import { restaurants } from "~/server/model/index.js";

export default defineEventHandler(async (event) => {
    console.log("Getting a certain restaurant..");
    const id = event.context.params.id;
    try {
        const restaurant = await restaurants.findOne(
            {"id": id,}
        );

        if(!restaurant) {
           console.log("Restaurant does not exist...");
           return;
        }

        return restaurant;  
    } catch(error) {
        console.log("Endpoint got an error...", error);
    }
})