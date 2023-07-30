<script src="./controller.js" />

<template>
  <main>
    <div class="search-wrapper">
      <div class="search-left">Search Results</div>
      <div class="search-right">
        <div class="results-row" v-if="restaurants.length" v-for="row in filteredRestaurants">
          <NuxtLink
            v-for="restaurant in row"
            :key="restaurant"
            :to="`/establishment/view/${restaurant.id}`"
            style="flex-basis: 25%"
          >
            <RestaurantCard
              :name="restaurant.name"
              :imgPath="restaurant.logo"
              :bgImgPath="restaurant.bgCard"
              :description="restaurant.description"
              :tags="restaurant.tags"
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
