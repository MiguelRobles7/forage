<script>
import Users from '~/assets/JSON/profiles.json'
import Reviews from '~/assets/JSON/reviews.json'
import Restaurants from '~/assets/JSON/restaurants.json'

export default {
  props: {
    restaurant: {
      type: Object,
      required: true
    }
  },
  computed: {
    restaurant() {
      const obj = this.restaurants.filter((restaurant) => {
        return restaurant.restaurant_id === Number(this.id)
      })[0]

      return this.restaurants.filter((restaurant) => {
        return restaurant.restaurant_id === Number(this.id)
      })[0]
    },

    menu_items() {
      return this.menu.filter((row) => {
        return row.restaurant_id === Number(this.id)
      })
    },

    current_reviews() {
      return this.reviews.filter((review) => {
        return review.restaurant_id === Number(this.id)
      })
    }
  },
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
      restaurants: Restaurants,
      id: useRoute().params.id,

      users: Users,
      modal: false,
      userID: null
    }
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
          :tags="restaurant.summary"
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
                :userImg="r.user_image"
                :userID="users[i].id"
                :userName="r.user_name"
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
