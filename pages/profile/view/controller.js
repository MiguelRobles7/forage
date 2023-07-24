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
        dpLink: String,
        bannerLink: String,
        name: String,
        account_type: String,
        description: String,
        city: String,
        province: String,
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
    const userRequest = useFetch(`/api/users/public/${this.id}`, { immediate: false })
    await userRequest.execute({ _initial: true })
    const userData = userRequest.data.value.users[0]
    this.profile.name = userData.name
    this.profile.dpLink = userData.displayPicture
    this.profile.bannerLink = userData.banner
    this.profile.description = userData.description
    this.profile.city = userData.city
    this.profile.country = userData.country
    this.profile.province = userData.province
    this.doneLoading = true
  }
}