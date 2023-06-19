<script>
export default {
  props: ['id'],

  data() {
    return {
      restaurants: [
        {restaurant_id:1 ,logo: '../../public/coffee-time-logo.png', name: 'Coffee Time', summary: 'Coffee,Tea,Pastry,Cafe', description: 'Savor our exquisite handcrafted beverages, meticulously prepared by our skilled artisans. From delicate latte art to carefully infused flavors, each cup is a masterpiece that not only delights your taste buds but also captivates your eyes. At Coffee Time, we believe that coffee should be a symphony of aesthetics and taste. Let every sip transport you to a world of flavor and aesthetic in perfect harmony.', 
      reviewCount: 421, rating: 4.8}
      ],
      reviews: [
        {user_id: 1, restaurant_id:1, rating: 5, upvotes: 30, review: "Is good, is chill"}
      ],
      review_images: [

      ],
      users: [
        {user_id: 1, name: "Jadnel", password: "ako nalang kasi", image: "", location: "puso nya", description: "Sya parin bro", }
      ],
      menu: [
        {restaurant_id: 1, item_name: "Original Latte", price: 139.00, image: ""}
      ]
    }
  },

  mounted() {
    console.log("miss na kita, legit")

    if(this.id == 1) {
      console.log("joke lang")
    }
  }
}
</script>

<template>
  <div>
    <h1>Establishment</h1>
    <div>The id is {{ id }}</div>
  </div>
</template>
