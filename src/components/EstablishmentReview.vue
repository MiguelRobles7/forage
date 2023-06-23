<script>
export default {
    props: {
        isReply: Boolean,
        userImg: String,
        UserID: Number,
        title: String, 
        content: String,
        stars: Number,
        upvotes: Number, 
        downvotes: Number
    }
}
</script>

<template>
    <div class="review">
        <div class="flex-row">
            <img src="../../public/review-avatar.png" alt="">
            <div>
                Hakdog
            </div>
        </div>
    </div>
</template>