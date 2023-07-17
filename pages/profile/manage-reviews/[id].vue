<script>
import Users from '~/assets/JSON/profiles.json'
import Reviews from '~/assets/JSON/reviews.json'

export default {
  data() {
    return {
      profile_picture: '/profile/pfps/1.png',
      banner: '/profile-edit-display/cover.png',
      name: 'I miss you balik ka na',
      account_type: 'personal ',
      description:
        "Nakatitig sa malayo, may lungkot na bumabalot sa'king puso. Sa mundong puno ng tawa at ngiti, ako'y tila isang tanging damo sa disyerto ng kaligayahan. Ang saklap ng pag-ibig, ito ang aking laging kasama. Sa bawat tibok ng puso, ramdam ko ang pagkirot ng nakaraan. Isang alaala ng mga pangakong binitawan, mga sandaling puno ng tamis, ngunit wala nang natira kundi mga pagsisisi.",
      street: 'n/a',
      city: 'Mandaluyong City',
      province: 'Metro Manila',
      country: 'Philippines',
      zip_code: '1550',
      reviews: [
        {
          user_name: 'Users[0].name',
          user_image: Users[0].profile_picture,
          title: Reviews[5].title,
          rating: 5,
          body: Reviews[5].body,
          images: ['Amogus'],
          upvotes: Reviews[5].upvotes,
          downvotes: 1,
          is_edited: false,
          owner_responded: true,
          comments: [
            {
              user_name: Users[1].name,
              user_image: Users[1].profile_picture,
              body: 'This is a comment',
              upvotes: 5,
              downvotes: 1,
              is_edited: false
            },
            {
              user_name: Users[2].name,
              user_image: Users[2].profile_picture,
              body: 'This is a comment',
              upvotes: 5,
              downvotes: 1,
              is_edited: false
            }
          ]
        },
        {
          user_name: Users[1].name,
          user_image: Users[1].profile_picture,
          title: Reviews[3].title,
          rating: 2,
          body: Reviews[3].body,
          images: [],
          upvotes: Reviews[3].upvotes,
          downvotes: 1,
          is_edited: true,
          owner_responded: true,
          comments: [
            {
              user_name: Users[1].name,
              user_image: Users[1].profile_picture,
              body: 'This is a comment',
              upvotes: 5,
              downvotes: 1,
              is_edited: false
            },
            {
              user_name: Users[2].name,
              user_image: Users[2].profile_picture,
              body: 'This is a comment',
              upvotes: 5,
              downvotes: 1,
              is_edited: false
            }
          ]
        },
        {
          user_name: Users[2].name,
          user_image: Users[2].profile_picture,
          title: Reviews[0].title,
          rating: 5,
          body: Reviews[0].body,
          images: [],
          upvotes: Reviews[0].upvotes,
          downvotes: 1,
          is_edited: false,
          owner_responded: true,
          comments: [
            {
              user_name: Users[1].name,
              user_image: Users[1].profile_picture,
              body: 'This is a comment',
              upvotes: 5,
              downvotes: 1,
              is_edited: false
            },
            {
              user_name: Users[2].name,
              user_image: Users[2].profile_picture,
              body: 'This is a comment',
              upvotes: 5,
              downvotes: 1,
              is_edited: false
            }
          ]
        },
        {
          user_name: Users[3].name,
          user_image: Users[3].profile_picture,
          title: Reviews[4].title,
          rating: 5,
          body: Reviews[4].body,
          images: [],
          upvotes: Reviews[4].upvotes,
          downvotes: 1,
          is_edited: false,
          owner_responded: true,
          comments: [
            {
              user_name: Users[1].name,
              user_image: Users[1].profile_picture,
              body: 'This is a comment',
              upvotes: 5,
              downvotes: 1,
              is_edited: false
            },
            {
              user_name: Users[2].name,
              user_image: Users[2].profile_picture,
              body: 'This is a comment',
              upvotes: 5,
              downvotes: 1,
              is_edited: false
            }
          ]
        },
        {
          user_name: Users[4].name,
          user_image: Users[4].profile_picture,
          title: Reviews[3].title,
          rating: 5,
          body: Reviews[3].body,
          images: [],
          upvotes: Reviews[3].upvotes,
          downvotes: 1,
          is_edited: true,
          owner_responded: false,
          comments: [
            {
              user_name: Users[1].name,
              user_image: Users[1].profile_picture,
              body: 'This is a comment',
              upvotes: 5,
              downvotes: 1,
              is_edited: false
            },
            {
              user_name: Users[2].name,
              user_image: Users[2].profile_picture,
              body: 'This is a comment',
              upvotes: 5,
              downvotes: 1,
              is_edited: false
            }
          ]
        }
      ]
    }
  }
}
</script>

<template>
  <main>
    <NavbarDefault name="Johndayll Arizala" :has_search="true"></NavbarDefault>
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
            <div v-for="r in reviews" :key="r">
              <ProfileManageReview
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
              ></ProfileManageReview>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
