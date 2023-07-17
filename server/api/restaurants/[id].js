import { serverSupabaseClient  } from '#supabase/server'

export default defineEventHandler(async (event) => {
    console.log("Getting a certain restaurant..");
    const model = serverSupabaseClient(event)
    const id = event.context.params.id;
    const { data, error } = await model.from('restaurants').select().eq('id', id);
    if(error) {
        console.log(error);
        return "";
    }

    return { restaurants: data };
})