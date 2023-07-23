<script>
import Users from '~/assets/JSON/profiles.json'
import Reviews from '~/assets/JSON/reviews.json'

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
      profile: {
        dpLink : String, 
        bannerLink : String, 
        name: String, 
        account_type: String, 
        description: String,
        city: String, 
        province:  String,
        country: String 
      },
      doneLoading: false,
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
          user_name: 'Users[0].name',
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
      ]
    }
  },
  async mounted() {
    const userRequest = useFetch(`/api/users/public/${this.id}`, {immediate: false});
    await userRequest.execute({_initial: true});
    const userData = userRequest.data.value.users[0];
    this.profile.name = userData.name;
    this.profile.dpLink = userData.displayPicture;
    this.profile.bannerLink = userData.banner;
    this.profile.description = userData.description;
    this.profile.city = userData.city;
    this.profile.country = userData.country;
    this.profile.province = userData.province;
    this.doneLoading = true;
  },
}
</script>

<template>
  <main>
    <Loading v-if="!doneLoading"></Loading>
    <div class="profile-view">
      <div
        class="banner"
        :style="`background: linear-gradient(180deg, rgba(29, 29, 31, 0) 0%, #1d1d1f 84.17%),
      url(${profile.bannerLink});`"
      ></div>
      <div class="content">
        <div class="left">
          <img class="profile-image" :src="profile.dpLink" alt="" />
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
            <h1>{{ profile.name }}</h1>
            <div class="stats">
              <img src="~/assets/icons/comments.png" alt="" />
              <span>Wrote {{ reviews.length }} Reviews</span>
              <span>•</span>
              <img src="~/assets/icons/location.png" alt="" />
              <span> {{ profile.city }}, {{ profile.province}}, {{ profile.country }} </span>
            </div>
            <p style="min-height: 17.5vh">{{ profile.description }}</p>
          </div>
          <div class="filter">
            <span class="selected"> Latest </span>
            <span> Oldest Reviews </span>
            <span> Highest </span>
            <span> Lowest </span>
          </div>
          <div class="review-container">
            <h1>{{ profile.name }}'s Latest Reviews</h1>
            <div class="review-box">
              <div class="review-col">
                <div v-for="(r, i) in reviews" :key="r">
                  <ProfileReview
                    v-if="i % 2 == 0"
                    :title="r.title"
                    :content="r.body"
                    :stars="r.rating"
                    :upvotes="r.upvotes"
                    :downvotes="r.downvotes"
                    :isEdited="r.is_edited"
                    :images="r.images"
                    :comments="r.comments"
                    :owner_responded="r.owner_responded"
                    owner_image="/_nuxt/assets/icons/clock.png"
                  ></ProfileReview>
                </div>
              </div>
              <div class="review-col">
                <div v-for="(r, i) in reviews" :key="i" style="margin: 0; padding: 0">
                  <ProfileReview
                    v-if="i % 2 == 1"
                    :title="r.title"
                    :content="r.body"
                    :stars="r.rating"
                    :upvotes="r.upvotes"
                    :downvotes="r.downvotes"
                    :isEdited="r.is_edited"
                    :images="r.images"
                    :comments="r.comments"
                    :owner_responded="r.owner_responded"
                    owner_image="/_nuxt/assets/icons/userimage.svg"
                  ></ProfileReview>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
