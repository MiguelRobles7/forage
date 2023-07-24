<script src="./controller.js">
</script>

<template>
  <main>
    <div class="establishment-all-reviews">
      <div class="left">
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
      </div>
      <div class="right">
        <div class="review-settings">
          <div class="review-head">
            <h1>{{ restaurant.name }}'s Reviews</h1>
            <NuxtLink :to="`/establishment/review/${this.id}`">
              <button class="see-reviews-button" @click="edit" value="view">
                <span class="review-span"> Write a Review + </span>
                <!-- TODO: (GET WAIT) Get data and pass data from Supabase 
                  and get user ID from session -->
              </button>
            </NuxtLink>
          </div>
          <AddReviewModal
            v-if="modal"
            :restaurant="restaurant.name"
            :restaurantId="id"
            :userId="this.userID"
          ></AddReviewModal>

          <div class="review-container">
            <div v-for="(r, i) in reviews" :key="r">
              <EstablishmentReviewAll
                :ownerReply="r.owner_response"
                :userImg="r.user_image"
                :userID="users[i].id"
                :userName="r.user_name"
                :title="r.title"
                :content="r.body"
                :stars="r.rating"
                :upvotes="r.upvotes"
                :downvotes="r.downvotes"
                :isEdited="r.is_edited"
                :images="r.images"
                :comments="r.comments"
                :owner_responded="r.owner_responded"
                :owner_image="restaurant.logo"
              ></EstablishmentReviewAll>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
