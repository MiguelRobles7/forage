import { serverSupabaseClient  } from '#supabase/server'

export default defineEventHandler(async (event) => {
    console.log("Getting all user's upvotes");
    const id = event.context.params.id;
    const model = serverSupabaseClient(event)
    const { data, error } = await model.from('user_upvotes').select().eq('user_id', id);
    if(error) {
        console.log(error);
        return "";
    }

    return { user_upvotes: data};
})