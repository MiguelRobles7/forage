export function createVoteHandler(voteType) {
  return {
    async triggerVote(
      isLoggedIn,
      clicked,
      reviewID,
      restaurantID,
      loggedUserID,
      isOppositeVoted,
      revokeOppositeVote,
      voteCount,
      voteUrl,
      userVoteUrl
    ) {
      if (!isLoggedIn || clicked) {
        console.log(`${voteType} discontinued`)
        return
      }

      if (isOppositeVoted) {
        await revokeOppositeVote()
      }

      clicked = true
      const data = { count: voteCount, loggedUserID, reviewID, restaurantID }

      await useFetch(voteUrl, { method: 'POST', body: data })
      await useFetch(userVoteUrl, { method: 'POST', body: data })

      await refreshNuxtData()
      voteCount++
      setTimeout(() => {
        clicked = false
      }, 5000)
    },

    async revokeVote(clicked, reviewID, restaurantID, loggedUserID, voteCount, revokeUrl, deleteUrl) {
      clicked = true
      const data = { count: voteCount, loggedUserID, reviewID, restaurantID }

      await useFetch(revokeUrl, { method: 'POST', body: data })
      await useFetch(deleteUrl, { method: 'POST', body: data })

      await refreshNuxtData()
      if (voteCount > 0) voteCount--
      setTimeout(() => {
        clicked = false
      }, 5000)
    }
  }
}
