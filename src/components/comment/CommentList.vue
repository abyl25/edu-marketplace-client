<template>
    <div class="comment-list">
        <Comment :key="post.id" v-for="post in posts" :post="post" :parent="null" @reply-to-comment="replyToComment" @delete-comment="onDeleteComment" @edit-comment="editComment"/>
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
            },
            onDeleteComment(comment) {
                this.$emit('delete-comment', comment);
            },
            editComment(comment) {
                this.$emit('edit-comment', comment);
            }
        }
    }
</script>

<style scoped>

</style>
