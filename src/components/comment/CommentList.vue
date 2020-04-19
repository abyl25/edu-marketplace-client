<template>
    <div class="comment-list">
        <Comment :key="post.id" v-for="post in posts" :post="post" @reply-to-comment="replyToComment"/>
    </div>
</template>

<script>
    import Comment from "@/components/comment/Comment";

    export default {
        name: "CommentList",
        components: {
            Comment: Comment,
        },
        props: {
            posts: Array
        },
        data() {
            return {

            }
        },
        computed: {
        },
        methods: {
            replyToComment(newComment, parentComment) {
                this.$emit('reply-to-comment', newComment, parentComment);
            }
        }
    }
</script>

<style scoped>

</style>
