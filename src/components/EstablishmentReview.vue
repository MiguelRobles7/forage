<script>
export default {
    props: {
        UserID: Number,
        userImg: String,
        restaurant_id: Number,
        title: String, 
        body: String,
        images: Array,
        rating: Number,
        upvotes: Number, 
        downvotes: Number,
        isReply: Boolean
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