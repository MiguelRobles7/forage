<script src="./indexController.js" />

<template>
  <main>
    <Loading v-if="!doneLoading"></Loading>
    <div class="gradient-bg">
      <div class="container-fluid index-land">
        <div style="display: grid; gap: 1rem">
          <div style="padding: 0; margin: 0">
            <div class="display-text">Explore New Flavors</div>
            <div class="display-text">Find New Favorites</div>
          </div>
          <div>
            <input
              v-model="searchCriteria"
              type="text"
              class="col index-search"
              placeholder="Search..."
              @keyup.enter="searchClick()"
            />
            <button style="margin-left: -2.5em; background: none; border: none">
              <!-- TODO: Make this based on what is typed -->
              <span>🔎︎</span>
            </button>
          </div>
          <div class="font-default" style="width: 35%">
            With Forage, you can access a vast community of passionate food enthusiasts who share their honest reviews
            and recommendations.
          </div>
        </div>
      </div>
    </div>

    <div class="gradient-wrapper" @click="getRestaurants">
      <div class="gradient-box-type-1" id="highlights">
        <div class="title">The latest craze spots around.</div>
        <div class="flex-col gap-3">
          <div class="flex-row gap-3">
            <div v-for="(r, i) in restaurants" :key="r" style="flex-basis: 25%">
              <NuxtLink :to="`/establishment/view/${r.id}`" v-if="i < 6">
                <RestaurantCard
                  :name="r.name"
                  :imgPath="r.logo"
                  :description="r.description"
                  :tags="r.summary"
                  :rating="r.rating"
                  :reviewCount="r.reviewCount"
                  :price="r.price_range"
                ></RestaurantCard>
              </NuxtLink>
            </div>
          </div>
          <div class="flex-row gap-3">
            <div v-for="(r, i) in restaurants" :key="r" style="flex-basis: 25%">
              <NuxtLink :to="`/establishment/view/${r.id}`" v-if="i < 6">
                <RestaurantCard
                  :name="r.name"
                  :imgPath="r.logo"
                  :description="r.description"
                  :tags="r.summary"
                  :rating="r.rating"
                  :reviewCount="r.reviewCount"
                  :price="r.price_range"
                ></RestaurantCard>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <div class="gradient-box-type-2" id="top">
        <div class="title">Everyone's Favorites</div>
        <div class="flex-col gap-3">
          <div class="flex-row gap-3">
            <div v-for="(r, i) in restaurants" :key="r" style="flex-basis: 25%">
              <NuxtLink :to="`/establishment/view/${r.id}`" v-if="i < 6">
                <RestaurantCard
                  :name="r.name"
                  :imgPath="r.logo"
                  :description="r.description"
                  :tags="r.summary"
                  :rating="r.rating"
                  :reviewCount="r.reviewCount"
                  :price="r.price_range"
                ></RestaurantCard>
              </NuxtLink>
            </div>
          </div>
          <div class="flex-row gap-3">
            <div v-for="(r, i) in restaurants" :key="r" style="flex-basis: 25%">
              <NuxtLink :to="`/establishment/view/${r.id}`" v-if="i < 6">
                <RestaurantCard
                  :name="r.name"
                  :imgPath="r.logo"
                  :description="r.description"
                  :tags="r.summary"
                  :rating="r.rating"
                  :reviewCount="r.reviewCount"
                  :price="r.price_range"
                ></RestaurantCard>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
