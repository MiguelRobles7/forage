<script>
import HomeViewNav from '../components/navbars/HomeViewNav.vue'
import ProfileEditRedirect from '../components/ProfileEditRedirect.vue'
import OwnerManageReviews from '../components/OwnerManageReviews.vue'

export default {
  components: {
    HomeViewNav,
    ProfileEditRedirect,
    OwnerManageReviews
  },
  data() {
    return {
      profile_picture: '/src/assets/profile-edit-display/user.png',
      banner: '/src/assets/profile-edit-display/cover.png',
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
          restaurant: 'Coffee Time',
          title: 'Simply the best latte in town',
          rating: 5,
          body: 'The latte at your coffee shop is an exquisite work of art, perfectly crafted to delight the senses. Its velvety smoothness dances with the rich aroma of freshly brewed espresso, creating a symphony of flavors that caress the palate with each sip. Savoring your latte is like embarking on a blissful journey, where the harmonious balance of steamed milk and espresso transports me to a realm of pure indulgence. Thank you for creating such a divine elixir that elevates my coffee experience to new heights.',
          images: ['/src/assets/coffee-time-bg-s.png'],
          upvotes: 301,
          downvotes: 0
        },
        {
          title: 'The pastries are a must try',
          rating: 5,
          body: "Your coffee shop's pastries are a delectable delight that brings sheer joy to my taste buds.",
          images: ['/src/assets/review-cards/userimage.png'],
          upvotes: 73,
          downvotes: 0
        }
      ]
    }
  }
}
</script>

<template>
  <main>
    <HomeViewNav></HomeViewNav>
    <div class="profile-edit">
      <div class="left">
        <div class="banner"></div>
        <div class="profile">
          <img :src="profile_picture" alt="profile image" class="profile-image" />
          <div class="profile-info">
            <span class="name">{{ name }}</span>
            <span class="subtext">{{ account_type }} account</span>
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
