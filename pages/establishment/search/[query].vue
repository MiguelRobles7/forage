<script>
import Restaurants from '~/assets/JSON/restaurants.json'

export default {
  data() {
    return {
      phrase: useRoute().params.query,
      restaurants: Restaurants
    }
  },
  computed: {
    // TODO: Handle more than 5 results
    filteredRestaurants() {
      let filtered = this.restaurants.filter((restaurant) => {
        return restaurant.name.toLowerCase().includes(this.phrase.toLowerCase())
      })
      if (filtered.length > 5) {
        return filtered.slice(0, 5)
      }
      return filtered
    }
  }
}
</script>

<template>
  <main>
    <NavbarDefault name="Johndayll Arizala" :has_search="true"></NavbarDefault>
    <div class="search-wrapper">
      <div class="search-left">Search Results</div>
      <div class="search-right">
        <div class="results-row">
          <NuxtLink
            v-for="restaurant in filteredRestaurants"
            :key="restaurant"
            :to="`/establishment/view/${restaurant.restaurant_id}`"
            style="flex-basis: 25%"
          >
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
          </NuxtLink>
        </div>
      </div>
    </div>
  </main>
</template>
