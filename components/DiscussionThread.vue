<script>
export default {
  props: {
    reviewId: Number,
    userImg: String,
    userName: String,
    userID: Number,
    title: String,
    content: String,
    stars: Number,
    upvotes: Number,
    downvotes: Number,
    isEdited: Boolean,
    images: Array,
    comments: Array,
    owner_responded: Boolean,
    owner_image: String,
    comments: Object
  },
  data() {
    return {
      body: '',
      logId: '',
      newComments: []
    }
  },
  async created() {
    const supabase = useSupabaseClient()
    var supabaseSession = await supabase.auth.getSession()
    var userSession = null
    var userId = ''

    if (!supabaseSession.data.session) {
      this.isLoggedIn = false
    } else {
      this.isLoggedIn = true
      userSession = supabaseSession.data.session.user
      userId = userSession.id
      const userRequest = await useFetch(`/api/users/session/${userId}`)
      const userData = userRequest.data.value.users[0]
      this.logId = userData.profile_id
    }
  },
  methods: {
    reloadPage() {
      window.location.reload()
    },
    async addComment() {
      const supabase = useSupabaseClient()
      console.log('Add Comment')
      const { data, error } = await supabase
        .from('reviews')
        .insert([
          {
            restaurantId: this.$route.params.id,
            userId: this.logId,
            rating: 5,
            title: '',
            body: this.body,
            upvotes: 0,
            downvotes: 0,
            isReply: true,
            isDeleted: false,
            isEdited: false,
            images: [],
            comments: [],
            videos: []
          }
        ])
        .select()
      if (error) {
        console.log(error)
      } else {
        console.log('Success')
        console.log('Data', data)
      }

      let { data: reviews, err } = await supabase.from('reviews').select()

      if (err) {
        console.log(err)
      } else {
        console.log('reviews', reviews)
        console.log('Success Getting Comment Chain')

        for (var i = 0; i < reviews.length; i++) {
          console.log('Review ID', this.reviewId)
          console.log('Review ID', reviews[i].id)
          if (reviews[i].id == this.reviewId) {
            console.log('Found', reviews[i])
            for (var j = 0; j < reviews[i].comments.length; j++) {
              this.newComments.push(reviews[i].comments[j])
              console.log('Adding to Array' + reviews[i].comments[j])
            }
            this.newComments.push(data[0].id)
          }
        }
        console.log(this.newComments)
        console.log(data[0].id)
      }
      const { data3, error3 } = await supabase
        .from('reviews')
        .update({ comments: this.newComments })
        .eq('id', this.reviewId)
        .select()
      if (error3) {
        console.log(error3)
      } else {
        location.reload()
        console.log('Success Adding to Comment Chain')
        console.log(data3)
      }
    }
  },
  mounted() {
    console.log('These Comments', this.comments)
  }
}
</script>

<template>
  <main>
    <div class="discussion-modal modal" id="add-modal">
      <div class="modal-main">
        <div class="head-row">
          <div style="display: flex; align-items: center; gap: 0.625rem; flex: 1 0 0">
            <img :src="userImg" alt="" />
            <span>
              {{ userName }}
            </span>
          </div>
          <button class="cancel-button" @click="reloadPage" value="view">
            <img src="~/assets/icons/exit.svg" alt="" />
          </button>
        </div>
        <div class="comments">
          <div class="main-comment">
            <div class="review-item" style="margin-bottom: -0.5vh">
              <span class="discussion-tag">{{ title }}</span>
              <div class="stars">
                <img v-for="index in stars" :key="index" class="star" src="~/assets/icons/star.png" alt="" />
              </div>
            </div>
            <div class="review-item">
              <p>{{ content }}</p>
            </div>
            <!-- TODO: Fix For Logic (Just made something quickly for now) -->
            <div class="image-container" v-if="images.length > 0">
              <div class="image-row" v-for="count in Math.ceil(images.length / 3)">
                <img v-for="i in 3" :src="`/_nuxt${images[i * count - 1]}`" alt="" />
              </div>
            </div>

            <div class="review-elements" style="justify-content: flex-start">
              <div class="review-voting">
                <div class="vote-pill">
                  <img class="review-icon" src="~/assets/icons/upvote.svg" alt="" />
                </div>
                <span class="vote-count">{{ upvotes - downvotes }}</span>
                <div class="vote-pill">
                  <img class="review-icon" src="~/assets/icons/downvote.svg" alt="" />
                </div>
              </div>
              <div class="review-pill" v-if="images.length > 0">
                <img class="review-icon" src="~/assets/icons/userimage.svg" alt="" />
                <span class="review-pill-span">{{ images.length }} Media Attached</span>
              </div>
              <div class="review-pill" v-if="comments.length > 0 && owner_responded" style="gap: 0.4rem">
                <img class="review-icon" src="~/assets/icons/comment_square.svg" alt="" />
                <img class="owner-image" :src="owner_image" alt="" />
                <span class="review-pill-span">+ {{ comments.length }} Replies</span>
              </div>
              <div class="review-pill" v-if="comments.length > 0 && !owner_responded">
                <img class="review-icon" src="~/assets/icons/comment_square.svg" alt="" />
                <span class="review-pill-span">{{ comments.length }} Replies</span>
              </div>
            </div>
          </div>
          <div class="sub-comments" v-if="comments.length > 0">
            <DiscussionSubreview v-for="comment in comments" :Comment="comment"> </DiscussionSubreview>
          </div>
          <div style="width: 100%; display: flex; flex-direction: row; gap: 0.8rem">
            <textarea
              class="comment-box"
              placeholder="Write a comment"
              oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
              rows="1"
              v-model="body"
            ></textarea>
            <button type="button" @click="addComment" class="comment_submit">
              <img src="~/assets/icons/arrow_right.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
