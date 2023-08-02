<script src="./controller.js" />

<template>
  <Loading v-if="!doneLoading"></Loading>
  <main v-if="doneLoading">
    <div class="establishment-all-reviews">
      <div class="left">
        <RestaurantCard
          :name="restaurant.name"
          :imgPath="restaurant.logo"
          :description="restaurant.description"
          :tags="restaurant.tags"
          :rating="restaurant.rating"
          :reviewCount="restaurant.reviewCount"
          :price="restaurant.price_range"
        ></RestaurantCard>
      </div>
      <div class="right">
        <div class="review-settings">
          <div class="review-head">
            <h1>{{ restaurant.name }}'s Reviews</h1>
            <NuxtLink :to="`/establishment/review/${this.id}`">
              <button class="see-reviews-button" @click="edit" value="view" v-if="!this.reviewed">
                <span class="review-span"> Write a Review + </span>
              </button>
            </NuxtLink>
          </div>
          <AddReview v-if="modal" :restaurant="restaurant.name" :restaurantId="Number(id)" :userId="this.userID"></AddReview>

          <div class="review-container">
            <div v-for="r in reviews" :key="r">
              <ReviewCard
                :isLoggedIn="isLoggedIn"
                :loggedUserID="uid"
                :restaurantID="Number(id)"
                :owner_image="restaurant.logo"
                :review="r"
              ></ReviewCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
