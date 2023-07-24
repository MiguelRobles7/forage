<script>
import Restaurants from '~/assets/JSON/restaurants.json'
import MenuItems from '~/assets/JSON/menu.json'
import Users from '~/assets/JSON/profiles.json'
import Reviews from '~/assets/JSON/reviews.json'

export default {
  data() {
    return {
      addresses: ['Menu', 'Top Reviews'],
      addresses_links: ['#menu', '#reviews'],
      id: useRoute().params.id,
      modal: false,
      restaurants: Restaurants,
      users: Users,
      reviews: [
        {
          user_name: Users[0].name,
          user_image: Users[0].profile_picture,
          title: Reviews[5].title,
          rating: 5,
          body: Reviews[5].body,
          images: ['Amogus'],
          upvotes: Reviews[5].upvotes,
          downvotes: 1,
          is_edited: false,
          owner_responded: true,
          comments: [
            {
              user_name: Users[1].name,
              user_image: Users[1].profile_picture,
              body: 'This is a comment',
              upvotes: 5,
              downvotes: 1,
              is_edited: false
            },
            {
              user_name: Users[2].name,
              user_image: Users[2].profile_picture,
              body: 'This is a comment',
              upvotes: 5,
              downvotes: 1,
              is_edited: false
            }
          ]
        },
        {
          user_name: Users[1].name,
          user_image: Users[1].profile_picture,
          title: Reviews[3].title,
          rating: 2,
          body: Reviews[3].body,
          images: [],
          upvotes: Reviews[3].upvotes,
          downvotes: 1,
          is_edited: true,
          owner_responded: true,
          comments: [
            {
              user_name: Users[1].name,
              user_image: Users[1].profile_picture,
              body: 'This is a comment',
              upvotes: 5,
              downvotes: 1,
              is_edited: false
            },
            {
              user_name: Users[2].name,
              user_image: Users[2].profile_picture,
              body: 'This is a comment',
              upvotes: 5,
              downvotes: 1,
              is_edited: false
            }
          ]
        },
        {
          user_name: Users[2].name,
          user_image: Users[2].profile_picture,
          title: Reviews[0].title,
          rating: 5,
          body: Reviews[0].body,
          images: [],
          upvotes: Reviews[0].upvotes,
          downvotes: 1,
          is_edited: false,
          owner_responded: true,
          comments: [
            {
              user_name: Users[1].name,
              user_image: Users[1].profile_picture,
              body: 'This is a comment',
              upvotes: 5,
              downvotes: 1,
              is_edited: false
            },
            {
              user_name: Users[2].name,
              user_image: Users[2].profile_picture,
              body: 'This is a comment',
              upvotes: 5,
              downvotes: 1,
              is_edited: false
            }
          ]
        },
        {
          user_name: Users[3].name,
          user_image: Users[3].profile_picture,
          title: Reviews[4].title,
          rating: 5,
          body: Reviews[4].body,
          images: [],
          upvotes: Reviews[4].upvotes,
          downvotes: 1,
          is_edited: false,
          owner_responded: true,
          comments: [
            {
              user_name: Users[1].name,
              user_image: Users[1].profile_picture,
              body: 'This is a comment',
              upvotes: 5,
              downvotes: 1,
              is_edited: false
            },
            {
              user_name: Users[2].name,
              user_image: Users[2].profile_picture,
              body: 'This is a comment',
              upvotes: 5,
              downvotes: 1,
              is_edited: false
            }
          ]
        },
        {
          user_name: Users[4].name,
          user_image: Users[4].profile_picture,
          title: Reviews[3].title,
          rating: 5,
          body: Reviews[3].body,
          images: [],
          upvotes: Reviews[3].upvotes,
          downvotes: 1,
          is_edited: true,
          owner_responded: false,
          comments: [
            {
              user_name: Users[1].name,
              user_image: Users[1].profile_picture,
              body: 'This is a comment',
              upvotes: 5,
              downvotes: 1,
              is_edited: false
            },
            {
              user_name: Users[2].name,
              user_image: Users[2].profile_picture,
              body: 'This is a comment',
              upvotes: 5,
              downvotes: 1,
              is_edited: false
            }
          ]
        }
      ],
      review_images: [
        { user_id: 1, restaurant_id: 1, rating: 5, upvotes: 30, review: 'Is good, is chill' },
        { user_id: 2, restaurant_id: 2, rating: 5, upvotes: 30, review: 'Is good, is chill' }
      ],
      reviews_holder: [[], [], []],
      menu: [],
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
      doneLoading: false
    }
  },
  async mounted() {
    const restaurantFetch = useFetch(`/api/restaurants/${useRoute().params.id}`, { immediate: false })
    await restaurantFetch.execute({ _initial: true })
    const restaurantData = restaurantFetch.data.value.restaurants[0]
    this.restaurant.backgroundImg = restaurantData.banner
    this.restaurant.price_range = restaurantData.price_range
    this.restaurant.logo = restaurantData.logo
    this.restaurant.name = restaurantData.name
    this.restaurant.desc = restaurantData.description
    this.restaurant.summary = restaurantData.summary
    this.restaurant.location = restaurantData.location
    this.restaurant.openingTime = restaurantData.openingTime.slice(0, -3)
    this.restaurant.closingTime = restaurantData.closingTime.slice(0, -3)
    this.restaurant.rating = restaurantData.rating
    this.restaurant.reviewCount = restaurantData.reviewCount

    const menuFetch = useFetch(`/api/menu/${useRoute().params.id}`, { immediate: false })
    await menuFetch.execute({ _initial: true })

    const menuData = menuFetch.data.value.menu_items
    this.menu = menuData

    const reviewFetch = useFetch(`/api/reviews/restaurant/${useRoute().params.id}`, { immediate: false })
    await reviewFetch.execute({ _initial: true })
    const reviewData = reviewFetch.data.value.reviews
    var reviewCount = reviewData.length
    var c = 0

    for (var i = 0; i < reviewData.length; i++) {
      const userFetch = useFetch(`/api/users/public/${reviewData[i].userId}`, { immediate: false })
      await userFetch.execute({ _initial: true })
      const userData = userFetch.data.value.users[0]
      const review = {
        user_image: userData.displayPicture,
        userID: userData.profile_id,
        user_name: userData.name,
        title: reviewData[i].title,
        body: reviewData[i].body,
        rating: reviewData[i].rating,
        upvotes: reviewData[i].upvotes,
        //walang comments
        downvotes: reviewData[i].downvotes,
        isEdited: reviewData[i].isEdited,
        //no images breaks da code
        images: reviewData[i].images
      }
      if (review.images === null) {
        review.images = []
      }
      this.reviews_holder[c].push(review)
      console.log(this.reviews_holder)
      console.log(c)
      if (c === 2) {
        c = 0
      } else {
        c += 1
      }
    }

    this.doneLoading = true
  },

  computed: {
    menu_items() {
      return this.menu
    },

    current_reviews() {
      return this.reviews.filter((review) => {
        return review.restaurant_id === Number(1)
      })
    }
  },
  methods: {
    edit: function () {
      this.modal = true
    }
  }
}
</script>

<template>
  <Loading v-if="!doneLoading"></Loading>
  <div v-if="doneLoading">
    <div
      class="establishment-bg d-flex justify-content-end"
      :style="`background:linear-gradient(180deg, rgba(29, 29, 31, 0.00) 0%, #1D1D1F 100%), 
      url(${restaurant.backgroundImg}); background-size:cover; background-position: center center; min-height:40vh`"
    ></div>
    <div class="establishment-card container rounded-3 mb-5">
      <div class="row">
        <div class="col-auto">
          <img :src="restaurant.logo" alt="" class="establishment-picture" />
        </div>
        <div class="col restaurant-info">
          <div class="info">
            <div class="info-pill" style="background: linear-gradient(180deg, #edcc78 0%, #e5b351 100%)">
              <img src="~/assets/icons/star_empty.svg" alt="" class="info-icon" />
              <div class="info-text">{{ restaurant.rating }} Rating</div>
            </div>
            <div class="info-pill" style="background: linear-gradient(180deg, #78c6ff 0%, #4291ca 100%)">
              <img src="~/assets/icons/comments.png" alt="" class="info-icon" />
              <div class="info-text">{{ restaurant.reviewCount }} Reviews</div>
            </div>
            <div class="info-pill" style="background: linear-gradient(180deg, #5ddb8f 0%, #2aa15a 100%)">
              <img src="~/assets/icons/wallet.svg" alt="" class="info-icon" />
              <div class="info-text">{{ restaurant.price_range }}</div>
            </div>
            <div class="info-pill" style="background: linear-gradient(180deg, #d2d2d2 0%, #a3a3a3 100%)">
              <img src="~/assets/icons/clock.png" alt="" class="info-icon" />
              <div class="info-text">{{ restaurant.openingTime }} - {{ restaurant.closingTime }}</div>
            </div>
          </div>
          <div class="name">
            {{ restaurant.name }}
          </div>
          <div style="display: flex; gap: 0.2rem">
            <img src="~/assets/icons/location.png" alt="" class="info-icon" />
            <div class="info-text">{{ restaurant.location }}</div>
          </div>
          <div class="description">
            {{ restaurant.desc }}
          </div>
          <div class="tags">
            <!-- TODO: FIX SUMMARY
            <div class="info-pill" v-for="t in restaurant.summary">
              <div class="info-text" style="text-decoration-line: underline">{{ t }}</div>
            </div>
            -->
          </div>
        </div>
      </div>
    </div>

    <div class="establishment-content d-flex flex-col align-items-center gap-4" id="menu">
      <div class="menu-box">
        <div class="title">What's in the menu?</div>
        <div class="flex-col gap-3">
          <div class="flex-row gap-3">
            <MenuItem :imgPath="menu_items[0].image" :name="menu_items[0].name" :price="menu_items[0].price"></MenuItem>
            <MenuItem :imgPath="menu_items[1].image" :name="menu_items[1].name" :price="menu_items[1].price"></MenuItem>
            <MenuItem :imgPath="menu_items[2].image" :name="menu_items[2].name" :price="menu_items[2].price"></MenuItem>
          </div>
        </div>
      </div>

      <div class="review-box" style="margin-bottom: 5vh" id="reviews">
        <div class="review-box-head">
          <span> Top Reviews </span>
          <NuxtLink :to="`/establishment/review/${this.id}`">
            <button class="see-reviews-button">See All Reviews →</button>
          </NuxtLink>
        </div>
        <div class="reviews-container">
          <div class="review-column">
            <div v-for="(r, i) in reviews_holder[0]" :key="r">
              <EstablishmentReview
                :key="r"
                :ownerReply="r.owner_response"
                :userImg="r.user_image"
                :userID="r.userID"
                :userName="r.user_name"
                :title="r.title"
                :content="r.body"
                :stars="r.rating"
                :upvotes="r.upvotes"
                :downvotes="r.downvotes"
                :isEdited="r.is_edited"
                :comments="r.comments"
                :owner_responded="r.owner_responded"
                :owner_image="restaurant.logo"
              >
              </EstablishmentReview>
            </div>
          </div>
          <div class="review-column">
            <div v-for="(r, i) in reviews_holder[1]" :key="r">
              <EstablishmentReview
                :key="r"
                :ownerReply="r.owner_response"
                :userImg="r.user_image"
                :userID="r.userID"
                :userName="r.user_name"
                :title="r.title"
                :content="r.body"
                :stars="r.rating"
                :upvotes="r.upvotes"
                :downvotes="r.downvotes"
                :isEdited="r.is_edited"
                :comments="r.comments"
                :owner_responded="r.owner_responded"
                :owner_image="restaurant.logo"
              >
              </EstablishmentReview>
            </div>
          </div>
          <div class="review-column">
            <div v-for="(r, i) in reviews_holder[2]" :key="r">
              <EstablishmentReview
                :key="r"
                :ownerReply="r.owner_response"
                :userImg="r.user_image"
                :userID="r.userID"
                :userName="r.user_name"
                :title="r.title"
                :content="r.body"
                :stars="r.rating"
                :upvotes="r.upvotes"
                :downvotes="r.downvotes"
                :isEdited="r.is_edited"
                :comments="r.comments"
                :owner_responded="r.owner_responded"
                :owner_image="restaurant.logo"
              >
              </EstablishmentReview>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
