import { users } from "~/server/model/index.js";

export default defineEventHandler(async (event) => {
    console.log("Getting all users..");

    try {
        const allUsers = await users.find();
        return allUsers; 
    } catch(error) {
        console.log("Endpoint got an error...", error);
    }
})