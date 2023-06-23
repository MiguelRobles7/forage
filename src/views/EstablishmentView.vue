<script>
import EstablishmentViewNav from '../components/navbars/EstablishmentViewNav.vue'
export default {
  props: ['id'],
  components: {
    EstablishmentViewNav
  },
  data() {
    return {
      restaurants: [
        {restaurant_id:1 ,logo: '../../public/coffee-time-logo.png', name: 'Coffee Time', summary: 'Coffee,Tea,Pastry,Cafe', description: 'Savor our exquisite handcrafted beverages, meticulously prepared by our skilled artisans. From delicate latte art to carefully infused flavors, each cup is a masterpiece that not only delights your taste buds but also captivates your eyes. At Coffee Time, we believe that coffee should be a symphony of aesthetics and taste. Let every sip transport you to a world of flavor and aesthetic in perfect harmony.', 
      reviewCount: 421, rating: 4.8}
      ],
      reviews: [
        {user_id: 1, restaurant_id:1, rating: 5, upvotes: 30, review: "Is good, is chill"},
        {user_id: 2, restaurant_id:2, rating: 5, upvotes: 30, review: "Is good, is chill"}
      ],
      review_images: [
        {user_id: 1, restaurant_id:1, rating: 5, upvotes: 30, review: "Is good, is chill"},
        {user_id: 2, restaurant_id:2, rating: 5, upvotes: 30, review: "Is good, is chill"}
      ],
      users: [
        {user_id: 1, name: "Jadnel", password: "ako nalang kasi", image: "", location: "puso nya", description: "Sya parin bro", }
      ],
      menu: [
        {restaurant_id: 1, item_name: "Original Latte", price: 139.00, image: ""},
        {restaurant_id: 1, item_name: "Caramel Latte", price: 149.00, image: ""},
        {restaurant_id: 2, item_name: "Vanilla Latte", price: 149.00, image: ""}
      ]
    }
  },

  mounted() {
    console.log("miss na kita, legit")
  },

  computed: {
    restaurant() {
      return this.restaurants.filter((restaurant) => {
        return restaurant.restaurant_id === Number(this.id)})[0]
    },

    menu_items() { 
      return this.menu.filter((row) => {return row.restaurant_id === Number(this.id)})
    },

    current_reviews() {
      return this.reviews.filter((review) => {return review.restaurant_id === Number(this.id)})
    }
  }
}
</script>

<template>
  <EstablishmentViewNav></EstablishmentViewNav>
  <div class="pt-[92px]">
    <h1>Establishment</h1>
    <div>The id is {{ id }}</div>
    <div>The restaurant is {{ restaurant.name }}</div>
    <div>The menu is {{ menu_items }}</div>
    <div>The reviews are {{ current_reviews }}</div>
  </div>
</template>
