<script src="./controller.js"/>
<template>
  <main>
    <div class="profile-edit">
      <div class="left">
        <div class="banner"></div>
        <div class="profile">
          <img :src="profile_picture" alt="profile image" class="profile-image" />
          <div class="profile-info">
            <span class="name">{{ name }}</span>
            <span class="subtext">Your {{ account_type }} account</span>
          </div>
        </div>
        <ProfileEditRedirect></ProfileEditRedirect>
      </div>
      <div class="right">
        <div class="review-settings">
          <h1>Manage Your Reviews</h1>
          <div class="review-container">
            <div v-for="(r, i) in reviews" :key="r">
              {{ console.log(r) }}
              <ProfileManageReview
                :restaurantId="r.restaurantId"
                :restaurantName="restaurantNames[i]"
                :userId="r.userId"
                :title="r.title"
                :content="r.body"
                :stars="r.rating"
                :upvotes="r.upvotes"
                :downvotes="r.downvotes"
                :isEdited="r.isEdited"
                :images="r.images"
                :owner_responded="r.ownerResponded"
                :comments="r.comments"
                owner_image="/_nuxt/assets/icons/clock.png"
              ></ProfileManageReview>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
