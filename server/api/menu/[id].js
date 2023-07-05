import { menu_items } from "~/server/model/index.js";

export default defineEventHandler(async (event) => {
    console.log("Getting the menu of a certain restaurant..");
    const id = event.context.params.id;
    try {
        const menuItems = await menu_items.find(
            {"restaurantId": id,}
        );

        if(!menuItems ) {
           console.log("No menu items for that restaurant...");
           return;
        }

        return menuItems;  
    } catch(error) {
        console.log("Endpoint got an error...", error);
    }
})