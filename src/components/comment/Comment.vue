<template>
    <div class="container">
        <div class="comment">
            <div class="user-image-wrapper">
                <img src="../../assets/default-user.jpeg" alt="" class="user-image">
            </div>
            <div class="comment-main">
                <div class="comment-header">
                    <p class="username">{{ post.user }}</p>
                    <p class="posted-at">{{ post.postedAt }}</p>
                </div>
                <div class="comment-body">
                    <p>{{ post.id + '. '}} {{ post.content }}</p>
                </div>
                <div class="comment-actions-container">
                    <span class="message reply" @click="replyTo(post.id)">Reply</span>
                    <span class="message like">Likes: 1</span>
                </div>
            </div>
        </div>

        <div v-if="!post.comments && replyToId === post.id">
            <Form />
        </div>

        <div class="comment-lp vertical-line" v-if="post.comments && post.comments.length > 0" >
            <div v-if="replyToId === post.id">
                <div class="comment-form-wrapper">
                    <Form />
                </div>
            </div>
            <Comment :key="comment.id" v-for="comment in post.comments" :post="comment" />
        </div>
    </div>
<!--        <Comment :key="cmt.id" v-for="cmt in comments" :post="cmt" :collection="cmt.comments" />-->
</template>

<script>
    import Form from "@/components/comment/Form";

    export default {
        name: "Comment",
        components: {
            Form: Form,
        },
        props: {
            post: Object,
            // comments: Array
        },
        data() {
            return {
                replyToId: null,
            }
        },
        computed: {

        },
        methods: {
            getPostComments(postId, collection) {
                if (collection) {
                    return this.collection.filter(p => p.parentId === postId);
                }
            },
            replyTo(toPostId) {
                this.replyToId = this.replyToId ? null: toPostId;
            }
        }
    }
</script>

<style scoped>
    .comment {
        display: flex;
        padding: 20px;
        border: 1px solid #a7b6b3;
        border-radius: 3px;
    }

    .user-image-wrapper {
        border: 1px solid #8E8A84;
        border-radius: 40px;
        height: 43px;
        width: 43px;
        min-width: 37px;
        margin-right: 10px;
        overflow: hidden;
    }
    .user-image {
        height: 100%;
        width: 100%;
        background: url('../../assets/default-user.jpeg') no-repeat center;
    }
    .comment-header {
        display: flex;
        align-items: center;
        width: 100%;
        margin-bottom: 8px;
        color: #7b7f83;
    }
    .username {
        margin-right: 10px;
        color: #373e44;
        font-size: 14px;
        font-weight: 700;
        line-height: 18px;
        /*cursor: pointer;*/
    }
    .posted-at {
        font-size: 11px;
    }

    .comment-body {
        display: flex;
        margin-bottom: 8px;
    }

    .comment-actions-container {
        display: flex;
    }
    .message {
        margin-right: 10px;
        color: #7b7f83;
        font-size: 13px;
        line-height: 18px;
    }
    .reply {
        cursor: pointer;
        user-select: none;
    }

    .comment-lp {
        padding-left: 2.5%;
    }
    .vertical-line {
        border-left: 1px solid #c3c3c6;
    }

    .comment-form-wrapper {
        padding: 5px;
    }
</style>
