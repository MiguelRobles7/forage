<script>
import DefaultBarLoggedIn from '../components/navbars/DefaultBarLoggedIn.vue'
import ProfileReview from '../components/ProfileReview.vue'
import Profiles from '../views/JSON/profiles.json'

export default {
  props: { id: Number },
  methods: {
    review() {
      console.log('imy')
      window.location.href = '../owner-manage-reviews'
    },
    setting() {
      console.log('imy')
      window.location.href = '../profile-edit-display'
    }
  },
  components: {
    DefaultBarLoggedIn,
    ProfileReview
  },
  data() {
    return {
      profiles: Profiles,
      establishments: [
        {
          name: 'Sussé Cafe',
          average_rating: 5,
          image: '/src/assets/profile-view/susse.png'
        },
        {
          name: 'Imissyou Tiramisù',
          average_rating: 5,
          image: '/src/assets/profile-view/imy.png'
        },
        {
          name: 'Akonlng Kainan',
          average_rating: 5,
          image: '/src/assets/profile-view/akonlng.png'
        },
        {
          name: 'Boy Besprend Bar',
          average_rating: 5,
          image: '/src/assets/profile-view/bbb.png'
        }
      ],
      reviews: [
        {
          title: 'Simply the best latte in town',
          rating: 5,
          body: 'The latte at your coffee shop is an exquisite work of art, perfectly crafted to delight the senses. Its velvety smoothness dances with the rich aroma of freshly brewed espresso, creating a symphony of flavors that caress the palate with each sip. Savoring your latte is like embarking on a blissful journey, where the harmonious balance of steamed milk and espresso transports me to a realm of pure indulgence. Thank you for creating such a divine elixir that elevates my coffee experience to new heights.',
          images: ['/src/assets/review-cards/userimage.png'],
          upvotes: 301,
          downvotes: 0
        },
        {
          title: 'The pastries are a must try',
          rating: 5,
          body: "Your coffee shop's pastries are a delectable delight that brings sheer joy to my taste buds.",
          images: ['/src/assets/review-cards/userimage.png'],
          upvotes: 73,
          downvotes: 0
        }
      ]
    }
  },

  computed: {
    Profile() {
      return this.profiles.filter((profile) => {
        return profile.id === Number(this.id)
      })[0]
    }
  }
}
</script>

<template>
  <main>
    <DefaultBarLoggedIn name="Johndayll Arizala" image="/public/profile/pfps/1.png"></DefaultBarLoggedIn>
    <div class="profile-view">
      <div class="socials">
        <button @click="review" style="border: none; border-radius: 8px; padding: 0 !important; margin: none">
          <img src="/public/review.png" alt="" style="width: 2.3em; height: auto" />
        </button>
        <button @click="setting" style="border: none; border-radius: 8px; padding: 0 !important; margin: none">
          <img src="/public/setting.png" alt="" style="width: 2.3em; height: auto" />
        </button>
        <img src="/src/assets/profile-view/facebook.png" alt="" />
        <img src="/src/assets/profile-view/instagram.png" alt="" />
        <img src="/src/assets/profile-view/twitter.png" alt="" />
      </div>
      <div
        class="banner"
        :style="`background: linear-gradient(180deg, rgba(29, 29, 31, 0) 0%, #1d1d1f 84.17%),
      url(${Profile.banner});`"
      ></div>
      <div class="content">
        <div class="left">
          <img class="profile-image" :src="Profile.profile_picture" alt="" />
          <div class="left-panel">
            <!-- Phase 2 TODO: show  only when user is business owner -->
            <span>Owned Establishments</span>
            <div class="establishments">
              <div class="pair" v-for="establishment in establishments" :key="establishment">
                <img :src="establishment.image" alt="" />
                <p>{{ establishment.name }}</p>
                <!-- Phase 2 TODO: way to dynamically change star count -->
                <div class="stars">
                  <img class="star" src="/src/assets/icons/star.png" alt="" />
                  <img class="star" src="/src/assets/icons/star.png" alt="" />
                  <img class="star" src="/src/assets/icons/star.png" alt="" />
                  <img class="star" src="/src/assets/icons/star.png" alt="" />
                  <img class="star" src="/src/assets/icons/star.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="info">
            <h1>{{ Profile.name }}</h1>
            <div class="stats">
              <img src="/src/assets/profile-view/comments.svg" alt="" />
              <span>Wrote {{ reviews.length }} Reviews</span>
              <span>•</span>
              <img src="/src/assets/profile-view/location.svg" alt="" />
              <span>{{ Profile.street }} {{ Profile.city }}, {{ Profile.province }}, {{ Profile.country }} </span>
            </div>
            <p style="min-height: 17.5vh">{{ Profile.description }}</p>
          </div>
          <div class="filter">
            <span class="selected"> Latest </span>
            <span> Oldest Reviews </span>
            <span> Highest </span>
            <span> Lowest </span>
          </div>
          <div class="review-container">
            <h1>{{ Profile.name }}'s Latest Reviews</h1>
            <div class="review-box">
              <div class="review-col">
                <!-- MCO2 TODO: Dynamically load these -->
                <ProfileReview
                  :title="reviews[0].title"
                  :rating="reviews[0].rating"
                  :body="reviews[0].body"
                  :images="reviews[0].images"
                  :upvotes="reviews[0].upvotes"
                  :downvotes="reviews[0].downvotes"
                ></ProfileReview>
                <ProfileReview
                  :title="reviews[0].title"
                  :rating="reviews[0].rating"
                  :body="reviews[0].body"
                  :images="reviews[0].images"
                  :upvotes="reviews[0].upvotes"
                  :downvotes="reviews[0].downvotes"
                ></ProfileReview>
              </div>
              <div class="review-col">
                <ProfileReview
                  :title="reviews[1].title"
                  :rating="reviews[1].rating"
                  :body="reviews[1].body"
                  :images="reviews[1].images"
                  :upvotes="reviews[1].upvotes"
                  :downvotes="reviews[1].downvotes"
                ></ProfileReview>
                <ProfileReview
                  :title="reviews[1].title"
                  :rating="reviews[1].rating"
                  :body="reviews[1].body"
                  :images="reviews[1].images"
                  :upvotes="reviews[1].upvotes"
                  :downvotes="reviews[1].downvotes"
                ></ProfileReview>
                <ProfileReview
                  :title="reviews[0].title"
                  :rating="reviews[0].rating"
                  :body="reviews[0].body"
                  :images="reviews[0].images"
                  :upvotes="reviews[0].upvotes"
                  :downvotes="reviews[0].downvotes"
                ></ProfileReview>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
