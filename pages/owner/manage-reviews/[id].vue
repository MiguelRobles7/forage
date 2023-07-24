<script src="./controller.js">
</script>

<template>
  <main>
    <div class="profile-edit">
      <div class="left">
        <div class="banner"></div>
        <div class="profile">
          <img :src="profile_picture" alt="profile image" class="profile-image" />
          <div class="profile-info">
            <span class="name">Coffee Time</span>
            <span class="subtext">establishment account</span>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="review-settings">
          <h1>Reply to your store's reviews</h1>
          <div class="review-container">
            <div v-for="r in reviews" :key="r">
              <OwnerManageReviews
                :restaurant="r.restaurant"
                :title="r.title"
                :rating="r.rating"
                :body="r.body"
                :images="r.images"
                :upvotes="r.upvotes"
                :downvotes="r.downvotes"
                user="Type"
              ></OwnerManageReviews>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
