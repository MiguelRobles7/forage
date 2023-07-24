<script>
export default {
  data() {
    return {
      doneLoading: false,
      restaurant: {
        backgroundImg: String,
        logo: String,
        name: String,
        desc: String,
        summary: String,
        location: String,
        openingTime: String,
        closingTime: String,
        rating: Number,
        reviewCount: Number
      },

      reviews: [],
      restaurantNames: [],
      profile_picture: String,
      name: String,
      account_type: 'personal'
    }
  },
  async created() {
    const supabase = useSupabaseClient()
    var supabaseSession = await supabase.auth.getSession()
    var userSession = null
    var userId = ''

    if (!supabaseSession.data.session) {
      this.isLoggedIn = false
    } else {
      this.isLoggedIn = true
      userSession = supabaseSession.data.session.user
      userId = userSession.id
      const userRequest = await useFetch(`/api/users/session/${userId}`)
      const userData = userRequest.data.value.users[0]
      this.name = userData.name
      this.profile_picture = userData.displayPicture
    }
    this.doneLoading = true
  },
  async mounted() {
    const supabase = useSupabaseClient()

    let { data: rv, error } = await supabase.from('reviews').select()

    if (error) {
      console.log(error)
    } else {
      console.log(this.reviews)
    }

    for (var i = 0; i < rv.length; i++) {
      if (rv[i].userId == this.$route.params.id && rv[i].isDeleted == false && rv[i].isReply == false) {
        let { data: restoName, error } = await supabase.from('restaurants').select('name').eq('id', rv[i].restaurantId)
        if (error) {
          console.log(error)
        } else {
          console.log(restoName)
        }
        this.restaurantNames.push(restoName[0].name)
        this.reviews.push(rv[i])
      }
    }
    console.log(this.reviews)
  }
}
</script>

<template>
  <main>
    <div class="profile-edit">
      <div class="left">
        <div class="banner"></div>
        <div class="profile">
          <img :src="profile_picture" alt="profile image" class="profile-image" />
          <div class="profile-info">
            <span class="name">{{ name }}</span>
            <span class="subtext">Your {{ account_type }} account</span>
          </div>
        </div>
        <ProfileEditRedirect></ProfileEditRedirect>
      </div>
      <div class="right">
        <div class="review-settings">
          <h1>Manage Your Reviews</h1>
          <div class="review-container">
            <div v-for="(r, i) in reviews" :key="r">
              {{ console.log(r) }}
              <ProfileManageReview
                :restaurantId="r.restaurantId"
                :restaurantName="restaurantNames[i]"
                :userId="r.userId"
                :title="r.title"
                :content="r.body"
                :stars="r.rating"
                :upvotes="r.upvotes"
                :downvotes="r.downvotes"
                :isEdited="r.isEdited"
                :images="r.images"
                :owner_responded="r.ownerResponded"
                :comments="r.comments"
                owner_image="/_nuxt/assets/icons/clock.png"
              ></ProfileManageReview>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
