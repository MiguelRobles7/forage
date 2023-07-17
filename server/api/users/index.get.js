import { serverSupabaseClient  } from '#supabase/server'

export default defineEventHandler(async (event) => {
    console.log("Getting a all users..");
    const model = serverSupabaseClient(event)
    const { data, error } = await model.from('profiles').select();
    if(error) {
        console.log(error);
        return "";
    }

    return { users: data };
})