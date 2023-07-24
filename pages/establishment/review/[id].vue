<script>
export default {
  methods: {
    edit: function () {
      this.getUserID()
      this.modal = true
    },
    async getUserID() {
      const supabase = useSupabaseClient()
      let uid = null
      try {
        const { data, error } = await supabase.auth.getSession()
        uid = data.session.user.id
        console.log(uid)
        if (error) throw error
      } catch (error) {
        console.log(error)
      }

      try {
        const { data, error } = await supabase.from('profiles').select('profile_id').eq('id', uid)
        if (error) {
          throw error
        } else {
          this.userID = data[0].profile_id
          console.log(this.userID)
        }
      } catch (error) {
        console.log(error)
      }
    }
  },

  data() {
    return {
      doneLoading: false,
      id: useRoute().params.id,
      restaurant: {
        name: String,
        logo: String,
        bgCard: String,
        description: String,
        tags: String,
        rating: Number,
        reviewCount: Number,
        price_range: String
      },

      modal: false,
      userID: null,
      reviews: [],
      restaurantNames: [],
      restaurantComments: []
    }
  },

  async mounted() {
    const supabase = useSupabaseClient()

    const restaurantFetch = useFetch(`/api/restaurants/${useRoute().params.id}`, { immediate: false })
    await restaurantFetch.execute({ _initial: true })
    const restaurantData = restaurantFetch.data.value.restaurants[0]
    this.restaurant.bgCard = restaurantData.banner
    this.restaurant.price_range = restaurantData.price_range
    this.restaurant.logo = restaurantData.logo
    this.restaurant.name = restaurantData.name
    this.restaurant.description = restaurantData.description
    this.restaurant.tags = restaurantData.summary
    this.restaurant.rating = restaurantData.rating
    this.restaurant.reviewCount = restaurantData.reviewCount

    let { data: rv, error } = await supabase.from('reviews').select()
    if (error) {
      console.log(error)
    } else {
      console.log(this.reviews)
    }

    for (var i = 0; i < rv.length; i++) {
      if (rv[i].restaurantId == this.$route.params.id && rv[i].isReply == false) {
        let { data: restoName, error } = await supabase.from('restaurants').select('name').eq('id', rv[i].restaurantId)
        if (error) {
          console.log(error)
        } else {
          console.log(restoName)
        }
        let { data: restoUser, e } = await supabase.from('profiles').select().eq('profile_id', rv[i].userId)
        if (e) {
          console.log(e)
        } else {
          console.log(restoUser)
        }

        let rev = {
          id: rv[i].id,
          restaurantId: rv[i].restaurantId,
          userId: rv[i].userId,
          title: rv[i].title,
          body: rv[i].body,
          rating: rv[i].rating,
          upvotes: rv[i].upvotes,
          downvotes: rv[i].downvotes,
          isEdited: rv[i].is_edited,
          isReply: rv[i].is_reply,
          isDeleted: rv[i].is_deleted,
          images: rv[i].images,
          comments: rv[i].comments,
          ownerResponded: rv[i].owner_responded,

          userImage: restoUser[0].displayPicture,
          userName: restoUser[0].name
        }
        rev['restaurantComments'] = []
        for (var j = 0; j < rv.length; j++) {
          if (rv[j].isReply == true && rv[i].comments.includes(rv[j].id)) {
            rev['restaurantComments'].push(rv[j])
          }
        }
        rev['restaurantName'] = restoName[0].name
        this.reviews.push(rev)
      }
    }
    console.log(this.reviews)
    this.doneLoading = true
  }
}
</script>

<template>
  <main>
    <div class="establishment-all-reviews">
      <div class="left">
        <RestaurantCard
          :name="restaurant.name"
          :imgPath="restaurant.logo"
          :bgImgPath="restaurant.bgCard"
          :description="restaurant.description"
          :tags="restaurant.tags"
          :rating="restaurant.rating"
          :reviewCount="restaurant.reviewCount"
          :price="restaurant.price_range"
        ></RestaurantCard>
      </div>
      <div class="right">
        <div class="review-settings">
          <div class="review-head">
            <h1>{{ restaurant.name }}'s Reviews</h1>
            <NuxtLink :to="`/establishment/review/${this.id}`">
              <button class="see-reviews-button" @click="edit" value="view">
                <span class="review-span"> Write a Review + </span>
                <!-- TODO: (GET WAIT) Get data and pass data from Supabase 
                  and get user ID from session -->
              </button>
            </NuxtLink>
          </div>
          <AddReviewModal
            v-if="modal"
            :restaurant="restaurant.name"
            :restaurantId="id"
            :userId="this.userID"
          ></AddReviewModal>

          <div class="review-container">
            <div v-for="(r, i) in reviews" :key="r">
              <EstablishmentReviewAll
                :ownerReply="r.owner_response"
                :userImg="r.userImage"
                :userID="r.userId"
                :userName="r.userName"
                :title="r.title"
                :content="r.body"
                :stars="r.rating"
                :upvotes="r.upvotes"
                :downvotes="r.downvotes"
                :isEdited="r.is_edited"
                :images="r.images"
                :comments="r.comments"
                :owner_responded="r.owner_responded"
                :owner_image="restaurant.logo"
              ></EstablishmentReviewAll>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
