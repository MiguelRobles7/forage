export async function getUserSession() {
  const supabase = useSupabaseClient()
  const session = await supabase.auth.getSession()

  if (!session.data.session) {
    return { isLoggedIn: false, userId: null, profile: null }
  }

  const userId = session.data.session.user.id
  const userRequest = await useFetch(`/api/users/session/${userId}`)
  const userData = userRequest.data.value.users[0]

  return {
    isLoggedIn: true,
    userId,
    profileId: userRequest.data.value.users[0].profile_id,
    profile: {
      id: userData.profile_id,
      name: userData.name,
      dpLink: userData.displayPicture,
      bannerLink: userData.banner,
      description: userData.description,
      city: userData.city,
      country: userData.country,
      province: userData.province
    }
  }
}

export async function getPublicUserProfile(userId) {
  const userRequest = useFetch(`/api/users/public/${userId}`, { immediate: false })
  await userRequest.execute({ _initial: true })

  return userRequest.data.value.users[0]
}
