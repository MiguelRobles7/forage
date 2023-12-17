import { serverSupabaseClient  } from '#supabase/server'
import { mode } from 'process';

export default defineEventHandler(async (event) => {
    console.log("inserting user upvote...");
    const body = await readBody(event);
    const model = serverSupabaseClient(event)
    const { data, error } = await model 
      .from('user_upvotes') 
      .insert([ 
        {
          user_id: body.loggedUserID, 
          restaurant_id: body.restaurantID, 
          review_id: body.reviewID}
      ]).select();
    if(error) {
        console.log(error);
        return "";
    }

    return "success";
})