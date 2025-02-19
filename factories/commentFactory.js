export async function addComment(reviewId, userId, body, isOwner) {
  const supabase = useSupabaseClient()
  const { data, error } = await supabase.from('reviews').insert([
    {
      restaurantId: reviewId,
      userId,
      rating: 5,
      title: '',
      body,
      upvotes: 0,
      downvotes: 0,
      isReply: true,
      isDeleted: false,
      isEdited: false,
      images: [],
      comments: [],
      videos: [],
      ownerResponded: isOwner
    }
  ])

  if (error) console.log(error)
  return data
}
