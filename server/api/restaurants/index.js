import { restaurants } from "~/server/model/index.js";

export default defineEventHandler(async (event) => {
    console.log("Getting all restaurants..");

    try {
        const allRestaurants = await restaurants.find();
        return allRestaurants;  
    } catch(error) {
        console.log("Endpoint got an error...", error);
    }
})