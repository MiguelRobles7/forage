<script>
import Restaurants from '~/assets/JSON/restaurants.json'
import MenuItems from '~/assets/JSON/menu.json'
import Users from '~/assets/JSON/profiles.json'
import Reviews from '~/assets/JSON/reviews.json'

export default {
  data() {
    return {
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
          images: [],
          upvotes: Reviews[5].upvotes,
          downvotes: 1,
          owner_response: [
            'Coffee Time',
            '/coffee-time-logo.png',
            'Thanks!',
            'Thank you for your kind words! We hope to see you again soon.',
            '12'
          ]
        },
        {
          user_name: Users[1].name + ' • Edited',
          user_image: Users[1].profile_picture,
          title: Reviews[3].title,
          rating: 5,
          body: Reviews[3].body,
          images: [],
          upvotes: Reviews[3].upvotes,
          downvotes: 1
        },
        {
          user_name: Users[2].name,
          user_image: Users[2].profile_picture,
          title: Reviews[0].title,
          rating: 5,
          body: Reviews[0].body,
          images: [],
          upvotes: Reviews[0].upvotes,
          downvotes: 1
        },
        {
          user_name: Users[3].name,
          user_image: Users[3].profile_picture,
          title: Reviews[4].title,
          rating: 5,
          body: Reviews[4].body,
          images: [],
          upvotes: Reviews[4].upvotes,
          downvotes: 1
        },
        {
          user_name: Users[4].name,
          user_image: Users[4].profile_picture,
          title: Reviews[3].title,
          rating: 5,
          body: Reviews[3].body,
          images: [],
          upvotes: Reviews[3].upvotes,
          downvotes: 1
        }
      ],
      review_images: [
        { user_id: 1, restaurant_id: 1, rating: 5, upvotes: 30, review: 'Is good, is chill' },
        { user_id: 2, restaurant_id: 2, rating: 5, upvotes: 30, review: 'Is good, is chill' }
      ],
      menu: MenuItems
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
      this.modal = true
    }
  }
}
</script>

<template>
  <NavbarSearchLoggedIn name="Johndayll Arizala" image="/profile/pfps/1.png"></NavbarSearchLoggedIn>
  <div
    class="establishment-bg d-flex justify-content-end"
    :style="`background:linear-gradient(180deg, rgba(29, 29, 31, 0.00) 0%, #1D1D1F 100%), 
    url(${restaurant.backgroundImg}); background-size:cover; background-position: center center; min-height:40vh`"
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
          <img src="~/assets/icons/star.png" alt="" class="icon" />
          <div class="info">{{ restaurant.rating }} Rating</div>
          <div class="dot">•</div>

          <img src="~/assets/icons/comments.png" alt="" class="icon" />
          <div class="info">{{ restaurant.reviewCount }} Reviews</div>
          <div class="dot">•</div>

          <div class="info">{{ restaurant.price_range }}</div>
          <div class="dot">•</div>

          <img src="~/assets/icons/clock.png" alt="" class="icon" />
          <div class="info">{{ restaurant.openingTime }} - {{ restaurant.closingTime }}</div>
        </div>
        <div class="d-flex location align-items-center">
          <img src="~/assets/icons/location.png" alt="" class="icon" />
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
          <MenuItem :imgPath="menu_items[0].imgPath" :name="menu_items[0].name" :price="menu_items[0].price"></MenuItem>
          <MenuItem :imgPath="menu_items[1].imgPath" :name="menu_items[1].name" :price="menu_items[1].price"></MenuItem>
          <MenuItem :imgPath="menu_items[2].imgPath" :name="menu_items[2].name" :price="menu_items[2].price"></MenuItem>
        </div>
      </div>
    </div>

    <div class="review-box" style="margin-bottom: 5vh">
      <div class="title">
        <span> Top Reviews </span>
        <button class="review-button" @click="edit" value="view">
          <img class="review-icon" src="~/assets/icons/edit-w.svg" alt="" />
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
            :key="reviews[0]"
            :ownerReply="reviews[0].owner_response"
            :userImg="reviews[0].user_image"
            :userID="users[0].id"
            :userName="reviews[0].user_name"
            :title="reviews[0].title"
            :content="reviews[0].body"
            :stars="reviews[0].rating"
            :upvotes="reviews[0].upvotes"
            :downvotes="reviews[0].downvotes"
          >
          </EstablishmentReview>
        </div>
        <div style="display: flex; flex-direction: column; align-items: flex-start; gap: 1.25rem; flex: 1 0 0">
          <EstablishmentReview
            :key="reviews[1]"
            :ownerReply="reviews[1].owner_response"
            :userImg="reviews[1].user_image"
            :userID="users[1].id"
            :userName="reviews[1].user_name"
            :title="reviews[1].title"
            :content="reviews[1].body"
            :stars="reviews[1].rating"
            :upvotes="reviews[1].upvotes"
            :downvotes="reviews[1].downvotes"
          >
          </EstablishmentReview>
          <EstablishmentReview
            :key="reviews[2]"
            :ownerReply="reviews[2].owner_response"
            :userImg="reviews[2].user_image"
            :userID="users[2].id"
            :userName="reviews[2].user_name"
            :title="reviews[2].title"
            :content="reviews[2].body"
            :stars="reviews[2].rating"
            :upvotes="reviews[2].upvotes"
            :downvotes="reviews[2].downvotes"
          >
          </EstablishmentReview>
        </div>
        <div style="display: flex; flex-direction: column; align-items: flex-start; gap: 1.25rem; flex: 1 0 0">
          <EstablishmentReview
            :key="reviews[3]"
            :ownerReply="reviews[3].owner_response"
            :userImg="reviews[3].user_image"
            :userID="users[3].id"
            :userName="reviews[3].user_name"
            :title="reviews[3].title"
            :content="reviews[3].body"
            :stars="reviews[3].rating"
            :upvotes="reviews[3].upvotes"
            :downvotes="reviews[3].downvotes"
          >
          </EstablishmentReview>
          <EstablishmentReview
            :key="reviews[4]"
            :ownerReply="reviews[4].owner_response"
            :userImg="reviews[4].user_image"
            :userID="this.users[4].id"
            :userName="reviews[4].user_name"
            :title="reviews[4].title"
            :content="reviews[4].body"
            :stars="reviews[4].rating"
            :upvotes="reviews[4].upvotes"
            :downvotes="reviews[4].downvotes"
          >
          </EstablishmentReview>
        </div>
      </div>
    </div>
  </div>
</template>
