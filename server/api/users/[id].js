import { serverSupabaseClient  } from '#supabase/server'

export default defineEventHandler(async (event) => {
    console.log("Getting a certain user..");
    const model = serverSupabaseClient(event)
    const id = event.context.params.id;
    const { data, error } = await model.from('profiles').select().eq('id', id);
    if(error) {
        console.log(error);
        return "";
    }

    return { users: data };
})