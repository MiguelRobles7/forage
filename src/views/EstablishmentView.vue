<script>
import SearchBarLoggedIn from '../components/navbars/SearchBarLoggedIn.vue'
import AddReviewModal from '../components/AddReviewModal.vue'

import MenuItem from '../components/MenuItem.vue'
import EstablishmentReview from '../components/EstablishmentReview.vue'
import Restaurants from './JSON/restaurants.json'
import MenuItems from './JSON/menu.json'

export default {
  props: ['id'],
  components: {
    SearchBarLoggedIn,
    MenuItem,
    EstablishmentReview,
    AddReviewModal
  },
  data() {
    return {
      modal: false,
      restaurants: Restaurants,
      reviews: [
        {
          user_name: 'Jadnel',
          user_image: '/src/assets/profile-edit-display/user.png',
          title: 'Fantastic Experience',
          rating: 5,
          body: 'I had a fantastic experience at this restaurant. The food was delicious, the service was excellent, and the ambiance was great. Highly recommended!',
          images: [],
          upvotes: 23,
          downvotes: 1,
          owner_response: [
            'Coffee Time',
            '/public/coffee-time-logo.png',
            'Thanks!',
            'Thank you for your kind words! We hope to see you again soon.',
            '12'
          ]
        },
        {
          user_name: 'Jadnel',
          user_image: '/src/assets/profile-edit-display/user.png',
          title: 'Fantastic Experience',
          rating: 5,
          body: 'I had a fantastic experience at this restaurant. The food was delicious, the service was excellent, and the ambiance was great. Highly recommended!',
          images: [],
          upvotes: 23,
          downvotes: 1
        }
      ],
      review_images: [
        { user_id: 1, restaurant_id: 1, rating: 5, upvotes: 30, review: 'Is good, is chill' },
        { user_id: 2, restaurant_id: 2, rating: 5, upvotes: 30, review: 'Is good, is chill' }
      ],
      users: [
        {
          user_id: 1,
          name: 'Jadnel',
          password: 'ako nalang kasi',
          image: '',
          location: 'puso nya',
          description: 'Sya parin bro'
        }
      ],
      menu: MenuItems
    }
  },

  mounted() {
    console.log('miss na kita, legit')
  },

  computed: {
    restaurant() {
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
      this.modal = true
    }
  }
}
</script>

<template>
  <SearchBarLoggedIn name="Johndayll Arizala" image="/public/profile/pfps/1.png"></SearchBarLoggedIn>
  <div class="socials">
    <img src="/src/assets/profile-view/facebook.png" alt="" />
    <img src="/src/assets/profile-view/instagram.png" alt="" />
    <img src="/src/assets/profile-view/twitter.png" alt="" />
  </div>
  <div
    class="establishment-bg d-flex justify-content-end"
    :style="`background:linear-gradient(180deg, rgba(29, 29, 31, 0.00) 0%, #1D1D1F 100%), url(${restaurant.backgroundImg}); background-size:cover; background-position: center center; min-height:40vh`"
  ></div>
  <div class="establishment-card container rounded-3 mb-5">
    <div class="row">
      <div class="col-auto">
        <img :src="restaurant.logo" alt="" class="rounded-3" />
      </div>
      <div class="col restaurant-info">
        <div class="summary">
          {{ restaurant.summary }}
        </div>
        <div class="name">
          {{ restaurant.name }}
        </div>
        <div class="d-flex align-items-center mb-1">
          <img src="/src/assets/icons/star.png" alt="" class="icon" />
          <div class="info">{{ restaurant.rating }} Rating</div>
          <div class="dot">•</div>

          <img src="/src/assets/icons/comments.png" alt="" class="icon" />
          <div class="info">{{ restaurant.reviewCount }} Rating</div>
          <div class="dot">•</div>

          <div class="info">{{ restaurant.price }}</div>
          <div class="dot">•</div>

          <img src="/src/assets/icons/clock.png" alt="" class="icon" />
          <div class="info">{{ restaurant.openingTime }} - {{ restaurant.closingTime }}</div>
        </div>
        <div class="d-flex location align-items-center">
          <img src="/src/assets/icons/location.png" alt="" class="icon" />
          <div>{{ restaurant.location }}</div>
        </div>
        <div class="description">
          {{ restaurant.description }}
        </div>
      </div>
    </div>
  </div>

  <div class="establishment-content d-flex flex-col align-items-center gap-4">
    <div class="menu-box">
      <div class="title">What's in the menu?</div>
      <div class="flex-col gap-3">
        <div class="flex-row gap-3">
          <MenuItem
            :imgPath="menu_items[0].imgPath"
            :name="menu_items[0].name"
            :price="menu_items[0].price"
          ></MenuItem>
          <MenuItem
            :imgPath="menu_items[1].imgPath"
            :name="menu_items[1].name"
            :price="menu_items[1].price"
          ></MenuItem>
          <MenuItem
            :imgPath="menu_items[2].imgPath"
            :name="menu_items[2].name"
            :price="menu_items[2].price"
          ></MenuItem>
        </div>
      </div>
    </div>

    <div class="review-box">
      <div class="title">
        <span> Top Reviews </span>
        <button class="review-button" @click="edit" value="view">
          <img class="review-icon" src="/src/assets/edit-w.svg" alt="" />
          <span class="review-span"> Write a Review </span>
          <AddReviewModal v-if="modal" :restaurant="restaurant.name"></AddReviewModal>
        </button>
      </div>
      <div
        style="
          display: flex;
          flex-direction: row;
          width: 100%;
          justify-content: center;
          align-items: flex-start;
          gap: 1.25rem;
        "
      >
        <!-- TODO: Replace this with unique views per column -->
        <div style="display: flex; flex-direction: column; align-items: flex-start; gap: 1.25rem; flex: 1 0 0">
          <EstablishmentReview
            v-for="review in reviews"
            :key="review"
            :ownerReply="review.owner_response"
            :userImg="review.user_image"
            :userID="review.user_name"
            :title="review.title"
            :content="review.body"
            :stars="review.rating"
            :upvotes="review.upvotes"
            :downvotes="review.downvotes"
          >
          </EstablishmentReview>
        </div>
        <div style="display: flex; flex-direction: column; align-items: flex-start; gap: 1.25rem; flex: 1 0 0">
          <EstablishmentReview
            v-for="review in reviews"
            :key="review"
            :ownerReply="review.owner_response"
            :userImg="review.user_image"
            :userID="review.user_name"
            :title="review.title"
            :content="review.body"
            :stars="review.rating"
            :upvotes="review.upvotes"
            :downvotes="review.downvotes"
          >
          </EstablishmentReview>
        </div>
        <div style="display: flex; flex-direction: column; align-items: flex-start; gap: 1.25rem; flex: 1 0 0">
          <EstablishmentReview
            v-for="review in reviews"
            :key="review"
            :ownerReply="review.owner_response"
            :userImg="review.user_image"
            :userID="review.user_name"
            :title="review.title"
            :content="review.body"
            :stars="review.rating"
            :upvotes="review.upvotes"
            :downvotes="review.downvotes"
          >
          </EstablishmentReview>
        </div>
      </div>
    </div>
  </div>
</template>
