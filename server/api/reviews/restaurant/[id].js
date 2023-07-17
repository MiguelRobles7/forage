import { serverSupabaseClient  } from '#supabase/server'

export default defineEventHandler(async (event) => {
    console.log("Getting reviews from a certain restaurant..");
    const model = serverSupabaseClient(event)
    const id = event.context.params.id;
    const { data, error } = await model.from('reviews').select().eq('restaurantId', id);
    if(error) {
        console.log(error);
        return "";
    }

    return { reviews: data };
})