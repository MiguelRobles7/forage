<template>
  <main>
    <div class="footer-main">
      <div class="box-1">
        <div style="display: flex; flex-direction: column; align-items: flex-start; gap: 0.375rem">
          <span class="footer-title"> Forage </span>
          <div class="footer-media">
            <img src="~/assets/icons/facebook.svg" alt="" />
            <img src="~/assets/icons/twitter.svg" alt="" />
            <img src="~/assets/icons/instagram.svg" alt="" />
          </div>
        </div>
        <p class="text">REACH OUT TO US ANYTIME, ANYWHERE THROUGH OUR SOCIAL MEDIA ACCOUNTS</p>
      </div>
      <div class="box-2">
        <span class="footer-header">Contact Us</span>
        <p class="text">
          For support please contact:
          <br />
          &nbsp; support@forage.com <br />
          &nbsp; (+63) 0913 934 2392
          <br />
          <br />
          To get an establishment registered contact:
          <br />
          &nbsp; establishments@forage.com <br />
          &nbsp; (+63) 0912 294 0294
          <br />
        </p>
      </div>
      <div class="box-3">
        <span class="footer-header">Disclaimer</span>
        <p class="text">
          This is a prototype website made for CCAPDEV (Web Development) course in De La Salle University. While all
          GET, POST functions work, users, reviews, restaurants do not exist in real life. Contacts listed here are also
          not real.
        </p>
      </div>
      <div class="box-3">
        <span class="footer-header">About Page</span>
        <p class="text">
          Want to know more about this website? The Technologies used? This website was made primarily with NuxtJS. It
          also uses Supabase for its database. SCSS was used for styling. Learn more about the other technologies used
          in this website by visiting the About Page
          <br />
          <br />
          <NuxtLink to="/about">About Page →</NuxtLink>
        </p>
      </div>
    </div>
  </main>
</template>
