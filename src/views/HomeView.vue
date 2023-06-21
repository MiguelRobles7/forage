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
      restaurants: [
        {
          logo: '../../public/coffee-time-logo.png',
          name: 'Coffee Time',
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
    <div class="gradient-bg">
      <HomeViewNav></HomeViewNav>
      <div class="container-fluid index-land">
        <div style="display: grid; gap: 1rem">
          <div style="padding: 0; margin: 0">
            <div class="display-text">Explore New Flavors</div>
            <div class="display-text">Find New Favorites</div>
          </div>
          <input type="text" class="col index-search" placeholder="Search..." />
          <div class="font-default" style="width: 35%">
            With Forage, you can access a vast community of passionate food enthusiasts who share their honest reviews
            and recommendations.
          </div>
        </div>
      </div>
    </div>

    <div class="gradient-wrapper">
      <div class="gradient-box-type-1">
        <div class="title">The latest craze spots around.</div>
        <div class="flex-row gap-3">
          <div class="flex-col gap-3">
            <RestaurantCard
              :name="restaurants[0].name"
              :imgPath="restaurants[0].logo"
              :description="restaurants[0].description"
              :summary="restaurants[0].summary"
              :rating="restaurants[0].rating"
              :reviewCount="restaurants[0].reviewCount"
            ></RestaurantCard>
            <RestaurantCard
              :name="restaurants[0].name"
              :imgPath="restaurants[0].logo"
              :description="restaurants[0].description"
              :summary="restaurants[0].summary"
              :rating="restaurants[0].rating"
              :reviewCount="restaurants[0].reviewCount"
            ></RestaurantCard>
          </div>
          <div class="flex-col gap-3">
            <RestaurantCard
              :name="restaurants[0].name"
              :imgPath="restaurants[0].logo"
              :description="restaurants[0].description"
              :summary="restaurants[0].summary"
              :rating="restaurants[0].rating"
              :reviewCount="restaurants[0].reviewCount"
            ></RestaurantCard>
            <RestaurantCard
              :name="restaurants[0].name"
              :imgPath="restaurants[0].logo"
              :description="restaurants[0].description"
              :summary="restaurants[0].summary"
              :rating="restaurants[0].rating"
              :reviewCount="restaurants[0].reviewCount"
            ></RestaurantCard>
          </div>
        </div>
      </div>

      <div class="gradient-box-type-2">
        <div class="title">The latest craze spots around.</div>
        <div class="flex-row gap-3">
          <div class="flex-col gap-3">
            <RestaurantCard
              :name="restaurants[0].name"
              :imgPath="restaurants[0].logo"
              :description="restaurants[0].description"
              :summary="restaurants[0].summary"
              :rating="restaurants[0].rating"
              :reviewCount="restaurants[0].reviewCount"
            ></RestaurantCard>
            <RestaurantCard
              :name="restaurants[0].name"
              :imgPath="restaurants[0].logo"
              :description="restaurants[0].description"
              :summary="restaurants[0].summary"
              :rating="restaurants[0].rating"
              :reviewCount="restaurants[0].reviewCount"
            ></RestaurantCard>
          </div>
          <div class="flex-col gap-3">
            <RestaurantCard
              :name="restaurants[0].name"
              :imgPath="restaurants[0].logo"
              :description="restaurants[0].description"
              :summary="restaurants[0].summary"
              :rating="restaurants[0].rating"
              :reviewCount="restaurants[0].reviewCount"
            ></RestaurantCard>
            <RestaurantCard
              :name="restaurants[0].name"
              :imgPath="restaurants[0].logo"
              :description="restaurants[0].description"
              :summary="restaurants[0].summary"
              :rating="restaurants[0].rating"
              :reviewCount="restaurants[0].reviewCount"
            ></RestaurantCard>
          </div>
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
