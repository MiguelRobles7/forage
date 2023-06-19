<script>
import HomeViewNav from '../components/navbars/HomeViewNav.vue'
import RestaurantCard from '../components/RestaurantCard.vue'
export default {
  components: {
    HomeViewNav, RestaurantCard
  },

  data() {
    return {
      restaurants: [
        {id: 1, logo: '../../public/restaurant-logos/coffee-time-logo.png', backgroundCard: "../../public/restaurant-bg/coffee-time-bg-s.png", name: 'Coffee Time', summary: 'Coffee,Tea,Pastry,Cafe', description: 'Savor our exquisite handcrafted beverages, meticulously prepared by our skilled artisans. From delicate latte art to carefully infused flavors, each cup is a masterpiece that not only delights your taste buds but also captivates your eyes. At Coffee Time, we believe that coffee should be a symphony of aesthetics and taste. Let every sip transport you to a world of flavor and aesthetic in perfect harmony.', 
      reviewCount: 421, rating: 4.8}
      ]
    }
  }
}
</script>

<template>
  <main>
    <HomeViewNav></HomeViewNav>
    <div class="text-white pl-32 pt-[92px] gradient-bg h-[100vh] flex items-center">
     <div class="">
      <div class="font-TTInterphases font-bold text-5xl mb-1">
        Explore New Flavors
      </div>
      <div class="font-TTInterphases font-bold text-5xl mb-3">
        Find New Flavors
      </div>
      <div class="flex">
        <input type="text" class="w-[500px] rounded-s-md h-10 text-xl text-black pl-4 py-8 placeholder:text-gray-500 placeholder:font-bold font-SpaceGrotesk" placeholder="Search...">
        <div class="bg-white rounded-e-md border-l border-black px-6 flex items-center justify-center">
          <img src="../assets/search-2.png" alt="" class="w-7">
        </div>
      </div>
      <div class=" font-TTInterphases font-semibold text-xl mt-4">
        With Forage, you can access a vast community of passionate food <br> enthusiasts who share their honest reviews and recommendations.
      </div>
     </div> 
    </div>

    <div class="bg-[#1D1D1F] flex items-center flex-col ">
      <div class="gradient-1 text-white w-[90%] px-6 border-[#26262A] border-4 rounded-md">
        <div class="font-TTInterphases font-bold my-3 text-lg">
          The Latest Craze Spots Around
        </div>
        <div class="flex flex-wrap justify-between">
          <RouterLink :to="{name: 'establishment', params: {id: restaurants[0].id}}" class="basis-[49.5%]">
            <RestaurantCard :name="restaurants[0].name" :imgPath="restaurants[0].logo" :bgImgPath="restaurants[0].backgroundCard" :description="restaurants[0].description" :summary="restaurants[0].summary" :rating="restaurants[0].rating" :reviewCount="restaurants[0].reviewCount"></RestaurantCard>
          </RouterLink>
          <RouterLink :to="{name: 'establishment', params: {id: restaurants[0].id}}" class="basis-[49.5%]">
            <RestaurantCard :name="restaurants[0].name" :imgPath="restaurants[0].logo" :bgImgPath="restaurants[0].backgroundCard" :description="restaurants[0].description" :summary="restaurants[0].summary" :rating="restaurants[0].rating" :reviewCount="restaurants[0].reviewCount"></RestaurantCard>
          </RouterLink>
          <RouterLink :to="{name: 'establishment', params: {id: restaurants[0].id}}" class="basis-[49.5%]">
            <RestaurantCard :name="restaurants[0].name" :imgPath="restaurants[0].logo" :bgImgPath="restaurants[0].backgroundCard" :description="restaurants[0].description" :summary="restaurants[0].summary" :rating="restaurants[0].rating" :reviewCount="restaurants[0].reviewCount"></RestaurantCard>
          </RouterLink>
        </div>
      </div>

      <div class="gradient-2 text-white w-[90%] px-6 border-[#26262A] border-4 rounded-md mt-4">
        <div class="font-TTInterphases font-bold my-3 text-lg">
          Everyone's Favorites
        </div>
        <div class="flex flex-wrap justify-between">
          <RouterLink :to="{name: 'establishment', params: {id: restaurants[0].id}}" class="basis-[49.5%]">
            <RestaurantCard :name="restaurants[0].name" :imgPath="restaurants[0].logo" :bgImgPath="restaurants[0].backgroundCard" :description="restaurants[0].description" :summary="restaurants[0].summary" :rating="restaurants[0].rating" :reviewCount="restaurants[0].reviewCount"></RestaurantCard>
          </RouterLink>
          <RouterLink :to="{name: 'establishment', params: {id: restaurants[0].id}}" class="basis-[49.5%]">
            <RestaurantCard :name="restaurants[0].name" :imgPath="restaurants[0].logo" :bgImgPath="restaurants[0].backgroundCard" :description="restaurants[0].description" :summary="restaurants[0].summary" :rating="restaurants[0].rating" :reviewCount="restaurants[0].reviewCount"></RestaurantCard>
          </RouterLink>
          <RouterLink :to="{name: 'establishment', params: {id: restaurants[0].id}}" class="basis-[49.5%]">
            <RestaurantCard :name="restaurants[0].name" :imgPath="restaurants[0].logo" :bgImgPath="restaurants[0].backgroundCard" :description="restaurants[0].description" :summary="restaurants[0].summary" :rating="restaurants[0].rating" :reviewCount="restaurants[0].reviewCount"></RestaurantCard>
          </RouterLink>
          <RouterLink :to="{name: 'establishment', params: {id: restaurants[0].id}}" class="basis-[49.5%]">
            <RestaurantCard :name="restaurants[0].name" :imgPath="restaurants[0].logo" :bgImgPath="restaurants[0].backgroundCard" :description="restaurants[0].description" :summary="restaurants[0].summary" :rating="restaurants[0].rating" :reviewCount="restaurants[0].reviewCount"></RestaurantCard>
          </RouterLink>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
.gradient-bg {
  background: linear-gradient(-7.28deg, #1D1D1F 24.57%, rgba(29, 29, 31, 0.2) 90.45%),
   url('../assets/home-bg.png');
   background-repeat: no-repeat;
   background-size: cover;
}

.gradient-1 {
  background: linear-gradient(148.59deg, #212124 18.97%, #111112 81.06%);
}

.gradient-2 {
  background: linear-gradient(135.59deg, #212124 18.97%, #111112 81.06%);
}

</style>
