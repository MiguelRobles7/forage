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
  async created() {
    const supabase = useSupabaseClient()
    let { data: rv, error } = await supabase.from('reviews').select()

    if (error) {
      console.log(error)
    } else {
      console.log(this.reviews)
    }
  },

  async mounted() {
    const restaurantFetch = useFetch(`/api/restaurants/${useRoute().params.id}`, { immediate: false})
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
      if (!reviewData[i].isReply) {
        this.reviews_holder[c].push(review)
        console.log(this.reviews_holder)
        console.log(c)
        if (c === 2) {
          c = 0
        } else {
          c += 1
        }
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