<script src="./controller.js" />

<template>
  <Loading v-if="!doneLoading"></Loading>
  <div v-if="doneLoading">
    <div
      class="establishment-bg d-flex justify-content-end"
      :style="`background:linear-gradient(180deg, rgba(29, 29, 31, 0.00) 0%, #1D1D1F 100%), 
      url(${restaurant.backgroundImg}); background-size:cover; background-position: center center; min-height:40vh`"
    ></div>
    <div class="establishment-card container rounded-3 mb-5">
      <div class="row">
        <div class="col-auto">
          <img :src="restaurant.logo" alt="" class="establishment-picture" />
        </div>
        <div class="col restaurant-info">
          <div class="info">
            <div class="info-pill" style="background: linear-gradient(180deg, #edcc78 0%, #e5b351 100%)">
              <img src="~/assets/icons/star_empty.svg" alt="" class="info-icon" />
              <div class="info-text">{{ restaurant.rating }} Rating</div>
            </div>
            <div class="info-pill" style="background: linear-gradient(180deg, #78c6ff 0%, #4291ca 100%)">
              <img src="~/assets/icons/comments.png" alt="" class="info-icon" />
              <div class="info-text">{{ restaurant.reviewCount }} Reviews</div>
            </div>
            <div class="info-pill" style="background: linear-gradient(180deg, #5ddb8f 0%, #2aa15a 100%)">
              <img src="~/assets/icons/wallet.svg" alt="" class="info-icon" />
              <div class="info-text">{{ restaurant.price_range }}</div>
            </div>
            <div class="info-pill" style="background: linear-gradient(180deg, #d2d2d2 0%, #a3a3a3 100%)">
              <img src="~/assets/icons/clock.png" alt="" class="info-icon" />
              <div class="info-text">{{ restaurant.openingTime }} - {{ restaurant.closingTime }}</div>
            </div>
          </div>
          <div class="name">
            {{ restaurant.name }}
          </div>
          <div style="display: flex; gap: 0.2rem">
            <img src="~/assets/icons/location.png" alt="" class="info-icon" />
            <div class="info-text">{{ restaurant.location }}</div>
          </div>
          <div class="description">
            {{ restaurant.desc }}
          </div>
          <div class="tags">
            <div class="info-pill" v-for="t in restaurant.tags">
              <div class="info-text" style="text-decoration-line: underline">{{ t }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="establishment-content d-flex flex-col align-items-center gap-4" id="menu">
      <div class="menu-box">
        <div class="title">What's in the menu?</div>
        <div class="flex-col gap-3">
          <div class="flex-row gap-3">
            <MenuItem :imgPath="menu_items[0].image" :name="menu_items[0].name" :price="menu_items[0].price"></MenuItem>
            <MenuItem :imgPath="menu_items[1].image" :name="menu_items[1].name" :price="menu_items[1].price"></MenuItem>
            <MenuItem :imgPath="menu_items[2].image" :name="menu_items[2].name" :price="menu_items[2].price"></MenuItem>
          </div>
        </div>
      </div>

      <div class="review-box" style="margin-bottom: 5vh" id="reviews">
        <div class="review-box-head">
          <span> Top Reviews </span>
          <NuxtLink :to="`/establishment/review/${this.id}`">
            <button v-if="isLoggedIn" class="see-reviews-button">See All Reviews →</button>
          </NuxtLink>
        </div>
        <div class="reviews-container">
          <div class="review-column">
            <div class="abox" v-for="(r, i) in reviews_holder[0]" :key="r">
              <EstablishmentReview
                :key="r"
                :loggedUserID="loggedUserID"
                :restaurantID="Number(id)"
                :reviewID="r.review_id"
                :isUpvoted="r.isUpvoted"
                :isLoggedIn="isLoggedIn"
                :ownerReply="r.owner_response"
                :userImg="r.user_image"
                :userID="r.userID"
                :userName="r.user_name"
                :title="r.title"
                :content="r.body"
                :stars="r.rating"
                :upvotes="r.upvotes"
                :downvotes="r.downvotes"
                :isEdited="r.is_edited"
                :owner_responded="r.owner_responded"
                :owner_image="restaurant.logo"
                :comments="r.comments"
                :images="r.images"
              >
              </EstablishmentReview>
            </div>
          </div>
          <div class="review-column">
            <div class="abox" v-for="(r, i) in reviews_holder[1]" :key="r">
              <EstablishmentReview
                :key="r"
                :loggedUserID="loggedUserID"
                :restaurantID="Number(id)"
                :reviewID="r.review_id"
                :isUpvoted="r.isUpvoted"
                :isLoggedIn="isLoggedIn"
                :ownerReply="r.owner_response"
                :userImg="r.user_image"
                :userID="r.userID"
                :userName="r.user_name"
                :title="r.title"
                :content="r.body"
                :stars="r.rating"
                :upvotes="r.upvotes"
                :downvotes="r.downvotes"
                :isEdited="r.is_edited"
                :comments="r.comments"
                :owner_responded="r.owner_responded"
                :owner_image="restaurant.logo"
                :images="r.images"
              >
              </EstablishmentReview>
            </div>
          </div>
          <div class="review-column">
            <div class="abox" v-for="(r, i) in reviews_holder[2]" :key="r">
              <EstablishmentReview
                :key="r"
                :loggedUserID="loggedUserID"
                :restaurantID="Number(id)"
                :reviewID="r.review_id"
                :isUpvoted="r.isUpvoted"
                :isLoggedIn="isLoggedIn"
                :ownerReply="r.owner_response"
                :userImg="r.user_image"
                :userID="r.userID"
                :userName="r.user_name"
                :title="r.title"
                :content="r.body"
                :stars="r.rating"
                :upvotes="r.upvotes"
                :downvotes="r.downvotes"
                :isEdited="r.is_edited"
                :comments="r.comments"
                :owner_responded="r.owner_responded"
                :owner_image="restaurant.logo"
                :images="r.images"
              >
              </EstablishmentReview>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
