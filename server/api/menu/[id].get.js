import { serverSupabaseClient  } from '#supabase/server'


export default defineEventHandler(async (event) => {
    console.log("Getting the menu of a certain restaurant..");
    const model = serverSupabaseClient(event)
    const id = event.context.params.id;
    const { data, error } = await model.from('menu_items').select().eq('restaurantId', id);
    if(error) {
        console.log(error);
        return "";
    }

    return { menu_items: data };
})