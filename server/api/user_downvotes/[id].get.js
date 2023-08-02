import { serverSupabaseClient  } from '#supabase/server'

export default defineEventHandler(async (event) => {
    console.log("Getting all user's downvotes");
    const id = event.context.params.id;
    const model = serverSupabaseClient(event)
    const { data, error } = await model.from('user_downvotes').select().eq('userID', id);
    if(error) {
        console.log(error);
        return "";
    }

    return { user_downvotes: data};
})