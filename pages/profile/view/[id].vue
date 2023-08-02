<script src="./controller.js" />

<template>
  <Loading v-if="!doneLoading"></Loading>
  <main v-if="doneLoading">
    <div class="profile-view">
      <div
        class="banner"
        :style="`background: linear-gradient(180deg, rgba(29, 29, 31, 0) 0%, #1d1d1f 84.17%),
      url(${profile.bannerLink});`"
      ></div>
      <div class="content">
        <div class="left">
          <img class="profile-image" :src="profile.dpLink" alt="" />
          <div class="left-panel">
            <span>Owned Establishments</span>
            <div class="establishments" v-if="establishments.length > 0">
              <div class="pair" v-for="establishment in establishments" :key="establishment">
                <img :src="establishment.logo" alt="" />
                <p>{{ establishment.name }}</p>
                <div class="stars">
                  <img class="star" src="~/assets/icons/star.png" alt="" />
                  <img class="star" src="~/assets/icons/star.png" alt="" />
                  <img class="star" src="~/assets/icons/star.png" alt="" />
                  <img class="star" src="~/assets/icons/star.png" alt="" />
                  <img class="star" src="~/assets/icons/star.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="info">
            <h1>{{ profile.name }}</h1>
            <div class="stats">
              <img src="~/assets/icons/comments.png" alt="" />
              <span>Wrote {{ reviews.length }} Reviews</span>
              <span>•</span>
              <img src="~/assets/icons/location.png" alt="" />
              <span> {{ profile.city }}, {{ profile.province }}, {{ profile.country }} </span>
            </div>
            <p style="min-height: 17.5vh">{{ profile.description }}</p>
          </div>
          <div class="review-container">
            <h1>{{ profile.name }}'s Latest Reviews</h1>
            <div class="review-box">
              <div class="review-col">
                <div v-for="(r, i) in reviews" :key="r">
                  <ProfileReview v-if="i % 2 == 0" :review="r" :restaurantName="reviewRestaurants[i]"></ProfileReview>
                </div>
              </div>
              <div class="review-col">
                <div v-for="(r, i) in reviews" :key="i" style="margin: 0; padding: 0">
                  <ProfileReview v-if="i % 2 == 1" :review="r" :restaurantName="reviewRestaurants[i]"></ProfileReview>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
