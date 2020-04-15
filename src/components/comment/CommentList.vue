<template>
    <div class="comment-container">
        <Comment :key="post.id" v-for="post in posts" :post="post"/>
<!--        <Comment :key="post.id" v-for="post in posts" :post="post" :comments="post.comments"/>-->
<!--        <Comment :key="post.id" v-for="post in parentPosts" :post="post" :comments="getPostComments(post.id)"/>-->
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
            // parentPosts() {
            //     return this.posts.filter(p => p.parentId === null);
            // }
        },
        methods: {
            // getPostComments(postId) {
            //     return this.posts.filter(p => p.parentId === postId);
            // }
        }
    }
</script>

<style scoped>

</style>
