<script>
import DefaultBarLoggedIn from '../components/navbars/DefaultBarLoggedIn.vue'
import RestaurantCard from '../components/RestaurantCard.vue'
export default {
  props: {
    phrase: String
  },
  components: {
    DefaultBarLoggedIn,
    RestaurantCard
  },

  data() {
    return {
      restaurants: [
        {
          restaurant_id: 1,
          logo: '../../public/coffee-time-logo.png',
          bgCard: '../../public/restaurant-bg/coffee-time-bg-s.png',
          backgroundImg: '../../public/restaurant-bg/coffee-time-bg-l.png',
          name: 'Coffee Time',
          summary: 'Coffee • Tea • Pastry • Cafe',
          description:
            'Savor our exquisite handcrafted beverages, meticulously prepared by our skilled artisans. From delicate latte art to carefully infused flavors, each cup is a masterpiece that not only delights your taste buds but also captivates your eyes. At Coffee Time, we believe that coffee should be a symphony of aesthetics and taste. Let every sip transport you to a world of flavor and aesthetic in perfect harmony.',
          reviewCount: 421,
          rating: 4.8,
          openingTime: '9:00AM',
          closingTime: '9:00PM',

          price_range: '$$$$',

          location: 'Shangrila Plaza'
        },
        {
          restaurant_id: 2,
          logo: '../../public/pizza-logo.jpg',
          bgCard: '../../public/restaurant-bg/pizza-bg.jpg',
          backgroundImg: '../../public/restaurant-bg/pizza-bg-l.jpg',
          name: 'Pizza Palace',
          summary: 'Authentic Italian Pizza',
          description:
            'Indulge in the taste of Italy with our authentic, wood-fired pizzas made from the finest ingredients. Each bite is a delightful explosion of flavors, with a crispy crust and a perfect balance of toppings. At Pizza Palace, we take pride in delivering the true essence of Italian cuisine to your table. Experience the magic of pizza that will transport you to the streets of Naples.',
          reviewCount: 356,
          rating: 4.7,
          openingTime: '11:00AM',
          closingTime: '10:00PM',

          price_range: '$$$$',

          location: 'SM Megamall'
        },
        {
          restaurant_id: 3,
          logo: '../../public/sushi-logo.jpg',
          bgCard: '../../public/restaurant-bg/sushi-bg.jpg',
          backgroundImg: '../../public/restaurant-bg/sushi-bg-l.jpg',
          name: 'Sushi Spot',
          summary: 'Fresh Sushi and Japanese Cuisine',
          description:
            'Embark on a culinary journey to Japan with our exquisite selection of fresh sushi and authentic Japanese dishes. Our skilled chefs meticulously prepare each sushi roll, ensuring a perfect balance of taste and presentation. We are committed to delivering the highest quality seafood and ingredients to satisfy your cravings for genuine Japanese cuisine.',
          reviewCount: 512,
          rating: 4.9,
          openingTime: '11:00AM',
          closingTime: '10:00PM',

          price_range: '$$$$',

          location: 'Glorietta 4'
        },
        {
          restaurant_id: 4,
          logo: '../../public/indian-logo.jpg',
          bgCard: '../../public/restaurant-bg/indian-bg.jpg',
          backgroundImg: '../../public/restaurant-bg/indian-bg-l.jpg',
          name: 'Spice Avenue',
          summary: 'Flavors of India',
          description:
            'Embark on a culinary adventure through the vibrant and aromatic flavors of India. From curries to biryanis, our menu showcases the best of Indian cuisine. We expertly blend traditional spices and fresh ingredients to create a symphony of flavors that will transport you to the streets of Mumbai.',
          reviewCount: 289,
          rating: 4.5,
          openingTime: '11:00AM',
          closingTime: '10:00PM',

          price_range: '$$$$',

          location: 'Greenbelt 3'
        },
        {
          restaurant_id: 5,
          logo: '../../public/veggie-logo.jpg',
          bgCard: '../../public/restaurant-bg/veggie-bg.jpg',
          backgroundImg: '../../public/restaurant-bg/veggie-bg-l.jpg',
          name: 'Veggie Haven',
          summary: 'Plant-Based Delights',
          description:
            'Experience the wonders of plant-based cuisine at Veggie Haven. Our menu features a diverse array of dishes made from the freshest seasonal produce. From nourishing salads to hearty vegan burgers, our culinary creations are designed to delight both the palate and the conscience. Embrace a healthier and more sustainable lifestyle with the delectable offerings at Veggie Haven.',
          reviewCount: 382,
          rating: 4.7,
          openingTime: '10:00AM',
          closingTime: '9:00PM',

          price_range: '$$$$',

          location: 'SM Mall of Asia'
        }
      ]
    }
  }
}
</script>

<template>
  <main>
    <DefaultBarLoggedIn name="Johndayll Arizala" image="/public/profile/pfps/1.png"></DefaultBarLoggedIn>
    <div class="search">
      <div class="results">
        <!-- MCO2 TODO: Make this actually search based on a given key -->
        <h1>Results for "{{ phrase }}"</h1>
        <div v-for="restaurant in restaurants" :key="restaurant">
          <RestaurantCard
            :name="restaurant.name"
            :imgPath="restaurant.logo"
            :bgImgPath="restaurant.bgCard"
            :description="restaurant.description"
            :tags="restaurant.tags"
            :rating="restaurant.rating"
            :reviewCount="restaurant.reviewCount"
            :price="restaurant.price_range"
            v-if="restaurant.name.toLowerCase().includes(phrase)"
          ></RestaurantCard>
        </div>
      </div>
    </div>
  </main>
</template>
