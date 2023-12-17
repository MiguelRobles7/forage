import { serverSupabaseClient  } from '#supabase/server'
import { mode } from 'process';

export default defineEventHandler(async (event) => {
    console.log("deleting user upvote...");
    const body = await readBody(event);
    const model = serverSupabaseClient(event)
    const { data, error } = await model 
      .from('user_upvotes') 
      .delete() 
      .eq('user_id', body.loggedUserID) 
      .eq('restaurant_id', body.restaurantID) 
      .eq('review_id', body.reviewID)
      .select();
    if(error) {
        console.log(error);
        return "";
    }

    return "success";
})