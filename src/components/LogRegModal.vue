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
            <div>Insert bg Here</div>
            <div class="mt-10 ml-20">
              <span class="font-TTInterphases font-bold text-4xl"><span class="text-[#2A7E58]">{{ type }}</span> {{ typeText }}</span>
              <div>
                <form ></form>
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
</style>