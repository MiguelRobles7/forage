<script>
import HomeViewNav from '../components/navbars/HomeViewNav.vue'
import RestaurantCard from '../components/RestaurantCard.vue'
export default {
  components: {
    HomeViewNav,
    RestaurantCard
  },

  data() {
    return {
      phrase: 'Coffee',
      restaurants: [
        {
          logo: '../../public/coffee-time-logo.png',
          name: 'Coffee Time',
          summary: 'Coffee • Tea • Pastry • Cafe',
          description:
            'Savor our exquisite handcrafted beverages, meticulously prepared by our skilled artisans. From delicate latte art to carefully infused flavors, each cup is a masterpiece that not only delights your taste buds but also captivates your eyes. At Coffee Time, we believe that coffee should be a symphony of aesthetics and taste. Let every sip transport you to a world of flavor and aesthetic in perfect harmony.',
          reviewCount: 421,
          rating: 4.8
        },
        {
          logo: '../../public/coffee-time-logo.png',
          name: 'Coffee Time',
          summary: 'Coffee • Tea • Pastry • Cafe',
          description:
            'Savor our exquisite handcrafted beverages, meticulously prepared by our skilled artisans. From delicate latte art to carefully infused flavors, each cup is a masterpiece that not only delights your taste buds but also captivates your eyes. At Coffee Time, we believe that coffee should be a symphony of aesthetics and taste. Let every sip transport you to a world of flavor and aesthetic in perfect harmony.',
          reviewCount: 421,
          rating: 4.8
        },
        {
          logo: '../../public/coffee-time-logo.png',
          name: 'Tea Time',
          summary: 'Coffee • Tea • Pastry • Cafe',
          description:
            'Savor our exquisite handcrafted beverages, meticulously prepared by our skilled artisans. From delicate latte art to carefully infused flavors, each cup is a masterpiece that not only delights your taste buds but also captivates your eyes. At Coffee Time, we believe that coffee should be a symphony of aesthetics and taste. Let every sip transport you to a world of flavor and aesthetic in perfect harmony.',
          reviewCount: 421,
          rating: 4.8
        }
      ]
    }
  }
}
</script>

<template>
  <main>
    <HomeViewNav></HomeViewNav>
    <div class="search">
      <div class="results">
        <!-- MCO2 TODO: Make this actually search based on a given key -->
        <h1>69 Results for "{{ phrase }}"</h1>
        <div v-for="restaurant in restaurants" :key="restaurant">
          <RestaurantCard
            :logo="restaurant.logo"
            :name="restaurant.name"
            :summary="restaurant.summary"
            :description="restaurant.description"
            :reviewCount="restaurant.reviewCount"
            :rating="restaurant.rating"
            v-if="restaurant.name.includes(phrase)"
          ></RestaurantCard>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
.gradient-bg {
  background: linear-gradient(-7.28deg, #1d1d1f 24.57%, rgba(29, 29, 31, 0.2) 90.45%), url('../assets/home-bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 130vh;
}
</style>
