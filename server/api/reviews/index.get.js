import { serverSupabaseClient  } from '#supabase/server'

export default defineEventHandler(async (event) => {
    console.log("Getting all reviews");
    const model = serverSupabaseClient(event)
    const { data, error } = await model.from('reviews').select();
    if(error) {
        console.log(error);
        return "";
    }

    return { reviews: data };
})