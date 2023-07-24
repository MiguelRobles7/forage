<script src="./controller.js"/>

<template>
  <main>
    <Loading v-if="!doneLoading"></Loading>
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
            <!-- Phase 2 TODO: show  only when user is business owner -->
            <span>Owned Establishments</span>
            <div class="establishments">
              <div class="pair" v-for="establishment in establishments" :key="establishment">
                <img :src="establishment.image" alt="" />
                <p>{{ establishment.name }}</p>
                <!-- TODO: (GET WAIT) dynamically change star count based on get -->
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
                  <ProfileReview
                    v-if="i % 2 == 0"
                    :title="r.title"
                    :content="r.body"
                    :stars="r.rating"
                    :upvotes="r.upvotes"
                    :downvotes="r.downvotes"
                    :isEdited="r.is_edited"
                    :images="r.images"
                    :comments="r.comments"
                    :owner_responded="r.owner_responded"
                    owner_image="/_nuxt/assets/icons/clock.png"
                  ></ProfileReview>
                </div>
              </div>
              <div class="review-col">
                <div v-for="(r, i) in reviews" :key="i" style="margin: 0; padding: 0">
                  <ProfileReview
                    v-if="i % 2 == 1"
                    :title="r.title"
                    :content="r.body"
                    :stars="r.rating"
                    :upvotes="r.upvotes"
                    :downvotes="r.downvotes"
                    :isEdited="r.is_edited"
                    :images="r.images"
                    :comments="r.comments"
                    :owner_responded="r.owner_responded"
                    owner_image="/_nuxt/assets/icons/userimage.svg"
                  ></ProfileReview>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
