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
        <span class="search-for">Search for a review</span>
        <div style="display: flex; flex-direction: row; align-items: center">
          <input
            v-model="searchCriteria"
            type="text"
            class="review-search"
            placeholder="Search..."
            @keyup.enter="searchClick()"
          />
          <button style="margin-left: -2.2em; background: none; border: none">
            <span>🔎︎</span>
          </button>
        </div>
      </div>
      <div class="right">
        <div class="review-settings">
          <div class="review-head">
            <h1>{{ restaurant.name }}'s Reviews</h1>
            <NuxtLink :to="`/establishment/review/${this.id}`">
              <button class="see-reviews-button" @click="toggleModal" value="view" v-if="!this.reviewed">
                <span class="review-span"> Write a Review + </span>
              </button>
            </NuxtLink>
          </div>
          <AddReview
            v-if="modal"
            :restaurant="restaurant.name"
            :restaurantId="Number(id)"
            :userId="this.userID"
            @toggleModal="toggleModal"
          ></AddReview>

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
