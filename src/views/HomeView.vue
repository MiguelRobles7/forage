<script>
import HomeViewNav from '../components/navbars/HomeViewNav.vue'
import RestaurantCard from '../components/RestaurantCard.vue'
import restoCard from '../views/JSON/restaurants.json'
export default {
  components: {
    HomeViewNav,
    RestaurantCard,
  },

  data() {
    return {
      restaurants: restoCard
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
            <RouterLink :to="{name: 'establishment', params: {id: restaurants[0].restaurant_id}}">
              <RestaurantCard
                :name="restaurants[0].name"
                :imgPath="restaurants[0].logo"
                :bgImgPath="restaurants[0].bgCard"
                :description="restaurants[0].description"
                :summary="restaurants[0].summary"
                :rating="restaurants[0].rating"
                :reviewCount="restaurants[0].reviewCount"
              ></RestaurantCard>
            </RouterLink>
            <RouterLink :to="{name: 'establishment', params: {id: restaurants[1].restaurant_id}}">
              <RestaurantCard
                :name="restaurants[1].name"
                :imgPath="restaurants[1].logo"
                :bgImgPath="restaurants[1].bgCard"
                :description="restaurants[1].description"
                :summary="restaurants[1].summary"
                :rating="restaurants[1].rating"
                :reviewCount="restaurants[1].reviewCount"
              ></RestaurantCard>
            </RouterLink>
          </div>
          <div class="flex-col gap-3">
            <RestaurantCard
              :name="restaurants[2].name"
              :imgPath="restaurants[2].logo"
              :bgImgPath="restaurants[2].bgCard"
              :description="restaurants[2].description"
              :summary="restaurants[2].summary"
              :rating="restaurants[2].rating"
              :reviewCount="restaurants[2].reviewCount"
            ></RestaurantCard>
            <RestaurantCard
              :name="restaurants[3].name"
              :imgPath="restaurants[3].logo"
              :bgImgPath="restaurants[3].bgCard"
              :description="restaurants[3].description"
              :summary="restaurants[3].summary"
              :rating="restaurants[3].rating"
              :reviewCount="restaurants[3].reviewCount"
            ></RestaurantCard>
          </div>
        </div>
      </div>

      <div class="gradient-box-type-2">
        <div class="title">The latest craze spots around.</div>
        <div class="flex-row gap-3">
          <div class="flex-col gap-3">
            <RestaurantCard
              :name="restaurants[4].name"
              :imgPath="restaurants[4].logo"
              :bgImgPath="restaurants[4].bgCard"
              :description="restaurants[4].description"
              :summary="restaurants[4].summary"
              :rating="restaurants[4].rating"
              :reviewCount="restaurants[4].reviewCount"
            ></RestaurantCard>
            <RestaurantCard
              :name="restaurants[0].name"
              :imgPath="restaurants[0].logo"
              :bgImgPath="restaurants[0].bgCard"
              :description="restaurants[0].description"
              :summary="restaurants[0].summary"
              :rating="restaurants[0].rating"
              :reviewCount="restaurants[0].reviewCount"
            ></RestaurantCard>
          </div>
          <div class="flex-col gap-3">
            <RestaurantCard
              :name="restaurants[3].name"
              :imgPath="restaurants[3].logo"
              :bgImgPath="restaurants[3].bgCard"
              :description="restaurants[3].description"
              :summary="restaurants[3].summary"
              :rating="restaurants[3].rating"
              :reviewCount="restaurants[3].reviewCount"
            ></RestaurantCard>
            <RestaurantCard
              :name="restaurants[2].name"
              :imgPath="restaurants[2].logo"
              :bgImgPath="restaurants[2].bgCard"
              :description="restaurants[2].description"
              :summary="restaurants[2].summary"
              :rating="restaurants[2].rating"
              :reviewCount="restaurants[2].reviewCount"
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
a {
  all: unset; 
}

</style>
