import { serverSupabaseClient  } from '#supabase/server'
import { mode } from 'process';

export default defineEventHandler(async (event) => {
    console.log("updating review count..");
    const body = await readBody(event);
    const model = serverSupabaseClient(event)
    const newCount = body.count + 1;
    const { error } = await model 
      .from('reviews')
      .update({ upvotes: newCount })
      .eq('id', body.reviewID)
    if(error) {
        console.log(error);
        return "";
    }

    return "success";
})