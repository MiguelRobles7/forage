import { users } from "~/server/model/index.js";

export default defineEventHandler(async (event) => {
    console.log("Getting a certain user..");
    const id = event.context.params.id;

    try {
        const user = await users.findOne(
            {"id": id,}
        );

        if(!user) {
           console.log("User does not exist...");
           return;
        }

        return user; 
    } catch(error) {
        console.log("Endpoint got an error...", error);
    }
})