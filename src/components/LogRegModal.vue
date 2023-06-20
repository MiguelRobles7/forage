<script>
export default {
    props: {
        type: String,
        typeText: String
    },
    data() {
        return {
        }
    }
}
</script>

<template>
  <main>
    <div class="backdrop">
      <div class="grid h-screen place-items-center">
        <div class="rounded-xl bg-gradient-to-b from-[#F4F2EB] to-[#B8B6B2] min-w-[75vw] min-h-[75vh]">
          <div class="grid grid-flow-col">
            <div class="bg">
                <div class="flex min-h-[75vh] items-center ml-14">
                    <div class="flex flex-col">
                        <span class="font-TTInterphases font-bold text-4xl text-white">Welcome to<br>Forage</span>
                        <div class="font-TTInterphases text-sm text-white max-w-xs">
                            Once you've made an account, you'll be able to write your own reviews, upvote or downvote others' reviews, register your own establishment, and get a personalized feed.
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-10 ml-20 svg">
              <span class="font-TTInterphases font-bold text-4xl"><span class="text-[#2A7E58]">{{ type }}</span> {{ typeText }}</span>
              <div class="mt-10">
                <slot name="content"></slot>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.backdrop {
    top: 0;
    position: fixed;
    background: rgba(0,0,0,0.5);
    width: 100%;
    height: 100%;
}
.bg {
    background-image: url('../assets/LogRegModal/LogRegbg.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    max-height: 75vh;
}
</style>