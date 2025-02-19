export function createReview({ restaurantId, userId, rating, title, body, upvotes = 0, downvotes = 0 }) {
  return {
    restaurantId,
    userId,
    rating,
    title,
    body,
    upvotes,
    downvotes,
    isReply: false,
    isDeleted: false,
    isEdited: false,
    images: [],
    comments: [],
    videos: []
  }
}

export async function fetchReviews(restaurantId) {
  const reviewFetch = useFetch(`/api/reviews/restaurant/${restaurantId}`, { immediate: false })
  await reviewFetch.execute({ _initial: true })
  const reviewData = reviewFetch.data.value.reviews

  let reviews = []

  for (const review of reviewData) {
    const user = await getPublicUserProfile(review.userId)

    reviews.push({
      reviewId: review.id,
      userImage: user.displayPicture,
      userName: user.name,
      userId: user.profile_id,
      title: review.title,
      body: review.body,
      rating: review.rating,
      upvotes: review.upvotes,
      downvotes: review.downvotes,
      isEdited: review.isEdited,
      images: review.images,
      isDeleted: review.isDeleted,
      comments: review.comments
    })
  }
  return reviews
}

export async function fetchUserVotes(userId) {
  const upvotesFetch = useFetch(`/api/user_upvotes/${userId}`, { immediate: false })
  await upvotesFetch.execute({ _initial: true })
  const upvotes = upvotesFetch.data.value.user_upvotes

  const downvotesFetch = useFetch(`/api/user_downvotes/${userId}`, { immediate: false })
  await downvotesFetch.execute({ _initial: true })
  const downvotes = downvotesFetch.data.value.user_downvotes

  return { upvotes, downvotes }
}
