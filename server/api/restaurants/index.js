import { serverSupabaseClient  } from '#supabase/server'

export default defineEventHandler(async (event) => {
    console.log("Getting all restaurants..");
    const model = serverSupabaseClient(event)
    const { data, error } = await model.from('restaurants').select();
    if(error) {
        console.log(error);
        return "";
    }

    return { restaurants: data };
})