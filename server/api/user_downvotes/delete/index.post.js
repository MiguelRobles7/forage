import { serverSupabaseClient  } from '#supabase/server'
import { mode } from 'process';

export default defineEventHandler(async (event) => {
    console.log("deleting user downvote...");
    const body = await readBody(event);
    const model = serverSupabaseClient(event)
    const { data, error } = await model 
      .from('user_downvotes') 
      .delete() 
      .eq('userID', body.loggedUserID) 
      .eq('restaurantID', body.restaurantID) 
      .eq('reviewID', body.reviewID)
      .select();
    if(error) {
        console.log(error);
        return "";
    }

    return "success";
})