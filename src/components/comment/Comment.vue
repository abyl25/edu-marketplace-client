<template>
    <div class="comment-tree-container">
        <div class="comment">
            <div class="user-image-wrapper">
                <img src="../../assets/default-user.jpeg" alt="" class="user-image" draggable="false">
            </div>
            <div class="comment-main">
                <div class="comment-header">
                    <p class="username">{{ post.user.firstName + ' ' + post.user.lastName }}</p>
                    <p class="posted-at">{{ parseTime(post.date) }}</p>
                </div>
                <div class="comment-body">
                    <p>{{ post.id + '. '}} {{ post.content }}</p>
                </div>
                <div class="comment-actions-container">
                    <span class="message reply" @click="setReplyToId(post.id)">Reply</span>
                    <span class="message like">Likes: 1</span>
                </div>
            </div>
        </div>

        <div class="comment-lp vertical-line">  <!-- v-if="post.children && post.children.length > 0" -->
            <div class="comment-form-wrapper" v-if="replyToId === post.id">
                <Form placeholder="Reply" setTextAreaWH="true" @add-comment="replyToComment($event, post.id)"/>
            </div>
            <Comment :key="comment.id" v-for="comment in post.children" :post="comment" @reply-to-comment="reply"/>
        </div>
    </div>
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
                monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                replyToId: null,
            }
        },
        computed: {
        },
        methods: {
            setReplyToId(toPostId) {
                this.replyToId = this.replyToId ? null: toPostId;
            },
            replyToComment(comment, toCommentId) {
                const replyComment = {
                    parentId: toCommentId,
                    userId: null,
                    title: comment.title,
                    content: comment.content
                };
                this.$emit('reply-to-comment', replyComment);
                this.setReplyToId(toCommentId);
            },
            reply(replyComment) {
                this.$emit('reply-to-comment', replyComment);
            },
            parseTime(postTime) {
                let time = new Date(postTime);
                return time.getHours() + ':' + time.getMinutes() + ', ' + this.monthNames[time.getMonth()].substring(0, 3) + ' '  + time.getDate() + ', ' + time.getFullYear();
            }
        }
    }
</script>

<style scoped>
    .comment {
        display: flex;
        /*align-items: center;*/
        padding: 12px 15px;
        border: 1px solid #a7b6b3;
        border-radius: 3px;
    }

    .user-image-wrapper {
        /*display: flex;*/
        border: 1px solid #8E8A84;
        border-radius: 40px;
        height: 40px;
        width: 40px;
        min-width: 37px;
        margin-right: 10px;
        overflow: hidden;
    }
    .user-image {
        height: 100%;
        width: 100%;
        user-select: none;
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
        font-size: 13px;
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
        padding-left: 3%;
    }
    .vertical-line {
        border-left: 1px solid #e0e0e5;
    }

    .comment-form-wrapper {
        padding: 10px 30px;
        margin-bottom: 10px;
    }
</style>
