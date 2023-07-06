<script>
import Profiles from '~/assets/JSON/profiles.json'

export default {
  methods: {
    review() {
      navigateTo('/owner/manage-reviews/' + this.id)
    },
    setting() {
      navigateTo('/profile/edit/' + this.id)
    }
  },
  data() {
    return {
      id: useRoute().params.id,
      profiles: Profiles,
      establishments: [
        {
          name: 'Sussé Cafe',
          average_rating: 5,
          image: '/profile-view/susse.png'
        },
        {
          name: 'Imissyou Tiramisù',
          average_rating: 5,
          image: '/profile-view/imy.png'
        },
        {
          name: 'Akonlng Kainan',
          average_rating: 5,
          image: '/profile-view/akonlng.png'
        },
        {
          name: 'Boy Besprend Bar',
          average_rating: 5,
          image: '/profile-view/bbb.png'
        }
      ],
      reviews: [
        {
          title: 'Simply the best latte in town',
          rating: 5,
          body: 'The latte at your coffee shop is an exquisite work of art, perfectly crafted to delight the senses. Its velvety smoothness dances with the rich aroma of freshly brewed espresso, creating a symphony of flavors that caress the palate with each sip. Savoring your latte is like embarking on a blissful journey, where the harmonious balance of steamed milk and espresso transports me to a realm of pure indulgence. Thank you for creating such a divine elixir that elevates my coffee experience to new heights.',
          images: ['/icons/userimage.png'],
          upvotes: 301,
          downvotes: 0
        },
        {
          title: 'The pastries are a must try',
          rating: 5,
          body: "Your coffee shop's pastries are a delectable delight that brings sheer joy to my taste buds.",
          images: ['/icons/userimage.png'],
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
    <NavbarDefault name="Johndayll Arizala" :has_search="true"></NavbarDefault>
    <div class="profile-view">
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
                  <img class="star" src="~/assets/icons/star.png" alt="" />
                  <img class="star" src="~/assets/icons/star.png" alt="" />
                  <img class="star" src="~/assets/icons/star.png" alt="" />
                  <img class="star" src="~/assets/icons/star.png" alt="" />
                  <img class="star" src="~/assets/icons/star.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="info">
            <h1>{{ Profile.name }}</h1>
            <div class="stats">
              <img src="~/assets/icons/comments.png" alt="" />
              <span>Wrote {{ reviews.length }} Reviews</span>
              <span>•</span>
              <img src="~/assets/icons/location.png" alt="" />
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
