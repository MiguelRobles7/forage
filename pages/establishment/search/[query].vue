<script src="./controller.js"/>

<template>
  <main>
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
