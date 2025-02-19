export async function handleMediaUpdate(reviewId, newImages = [], newVideos = [], deleteExisting = false) {
  const supabase = useSupabaseClient()

  // Delete existing media if required
  if (deleteExisting) {
    try {
      const { data: oldReview, error: fetchError } = await supabase
        .from('reviews')
        .select('images, videos')
        .eq('id', reviewId)
        .single()
      if (fetchError) throw fetchError

      let filesToDelete = []
      if (oldReview.images) filesToDelete = [...filesToDelete, ...oldReview.images.map((img) => img.split('/').pop())]
      if (oldReview.videos) filesToDelete = [...filesToDelete, ...oldReview.videos.map((vid) => vid.split('/').pop())]

      if (filesToDelete.length > 0) {
        const { error: deleteError } = await supabase.storage.from('reviews').remove(filesToDelete)
        if (deleteError) throw deleteError
        console.log('Deleted old media successfully.')
      }
    } catch (error) {
      console.log('Error deleting old media:', error)
    }
  }

  let imageLinks = []
  let videoLinks = []

  // Upload new images
  for (let i = 0; i < newImages.length; i++) {
    try {
      const { data, error } = await supabase.storage
        .from('reviews')
        .upload(`${reviewId}/image_${i}.png`, newImages[i].file, { cacheControl: '0', upsert: true })
      if (error) throw error
      imageLinks.push(`https://your-supabase-url/storage/v1/object/public/reviews/${reviewId}/image_${i}.png`)
    } catch (error) {
      console.log(error)
    }
  }

  // Upload new videos
  for (let i = 0; i < newVideos.length; i++) {
    try {
      const { data, error } = await supabase.storage
        .from('reviews')
        .upload(`${reviewId}/video_${i}.mp4`, newVideos[i].file, { cacheControl: '0', upsert: true })
      if (error) throw error
      videoLinks.push(`https://your-supabase-url/storage/v1/object/public/reviews/${reviewId}/video_${i}.mp4`)
    } catch (error) {
      console.log(error)
    }
  }

  // Update the review record with new media URLs
  try {
    const { error: updateError } = await supabase
      .from('reviews')
      .update({ images: imageLinks, videos: videoLinks })
      .eq('id', reviewId)
    if (updateError) throw updateError
    console.log('Updated review with new media successfully.')
  } catch (error) {
    console.log(error)
  }
}
