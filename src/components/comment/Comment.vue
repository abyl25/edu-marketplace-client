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
                    <p>{{ post.content }}</p>
                </div>
                <div class="comment-actions-container">
                    <span class="message reply" @click="setReplyToId(post.id)">Reply</span>
                    <span class="message like">Likes: 0</span>
                    <span class="delete-icon" v-if="this.user.id === post.user.id" @click="setEditCommentId(post.id)">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 172 172"
                            style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#686f7a"><path d="M121.38542,7.61458l-93.61458,93.61458l-20.07227,63.07226l63.07227,-20.07226l93.61458,-93.61458c0,0 -0.71667,-15.05717 -14.33333,-28.66667c-13.61667,-13.61667 -28.66667,-14.33333 -28.66667,-14.33333zM124.07292,19.26042c7.68267,1.462 13.7993,4.71645 18.51855,9.56022c4.71925,4.84377 8.04111,11.27686 10.14811,19.10645l-12.98958,12.98958l-28.66667,-28.66667l10.30208,-10.30208zM35.67936,108.40983c0.08473,0.02134 8.61749,2.17868 17.1748,10.736c9.31667,8.6 10.75,16.48893 10.75,16.48893l0.30794,0.36393l-25.43327,8.18848l-10.722,-10.72201z"></path></g></g></svg>
                    </span>
                    <span class="delete-icon" v-if="this.user.id === post.user.id" @click="onDeleteComment(post, parent)">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 172 172"
                             style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#686f7a"><path d="M72.76923,-0.20673c-5.53004,0 -10.95673,1.08534 -14.88462,4.96154c-3.92788,3.87621 -5.16827,9.38041 -5.16827,15.09135h-26.25481c-3.64363,0 -6.61538,2.97176 -6.61538,6.61538h-6.61538v13.23077h145.53846v-13.23077h-6.61538c0,-3.64363 -2.97176,-6.61538 -6.61538,-6.61538h-26.25481c0,-5.71094 -1.24038,-11.21514 -5.16827,-15.09135c-3.92788,-3.8762 -9.35456,-4.96154 -14.88462,-4.96154zM72.76923,13.4375h26.46154c3.61779,0 4.75481,0.85276 5.16827,1.24038c0.41346,0.38762 1.24038,1.47296 1.24038,5.16827h-39.27885c0,-3.69531 0.82692,-4.78065 1.24038,-5.16827c0.41346,-0.38762 1.55048,-1.24038 5.16827,-1.24038zM26.46154,46.30769v105.84615c0,10.93089 8.91526,19.84615 19.84615,19.84615h79.38462c10.93089,0 19.84615,-8.91526 19.84615,-19.84615v-105.84615zM52.92308,66.15385h13.23077v79.38462h-13.23077zM79.38462,66.15385h13.23077v79.38462h-13.23077zM105.84615,66.15385h13.23077v79.38462h-13.23077z"></path></g></g></svg>
                    </span>
                </div>
            </div>
        </div>

        <div class="comment-lp vertical-line">
            <div class="comment-form-wrapper" v-if="replyToId === post.id">
                <Form placeholder="Reply" setTextAreaWH="true" @add-comment="replyToComment($event, post)"/>
            </div>
            <div class="comment-form-wrapper" v-else-if="editId === post.id">
                <Form placeholder="Edit" setTextAreaWH="true" :editComment="post" @edit-comment="editComment"/>
            </div>
            <Comment :key="comment.id" v-for="comment in post.children" :post="comment" :parent="post" @reply-to-comment="reply" @delete-comment="onDeleteComment" @edit-comment="editComment" />
        </div>
    </div>
</template>

<script>
    import Form from "@/components/comment/Form";
    import {mapGetters} from "vuex";

    export default {
        name: "Comment",
        components: {
            Form: Form,
        },
        props: {
            post: Object,
            parent: Object,
            // comments: Array
        },
        data() {
            return {
                monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                replyToId: null,
                editId: null
            }
        },
        computed: {
            ...mapGetters(['user']),
        },
        methods: {
            setReplyToId(toPostId) {
                this.replyToId = this.replyToId ? null: toPostId;
            },
            replyToComment(comment, parentComment) {
                const newComment = {
                    parentId: parentComment.id,
                    userId: null,
                    title: comment.title,
                    content: comment.content
                };
                this.$emit('reply-to-comment', newComment, parentComment);
                this.setReplyToId(parentComment.id);
            },
            reply(newComment, parentComment) {
                this.$emit('reply-to-comment', newComment, parentComment);
            },
            onDeleteComment(comment, parent) {
                if (parent) {
                    for (let i = 0; i < parent.children.length; i++) {
                        if (parent.children[i].id === comment.id) {
                            parent.children.splice(i, 1);
                        }
                    }
                }
                this.$emit('delete-comment', comment);
            },
            setEditCommentId(commentId) {
                this.editId = this.editId ? null : commentId;
            },
            editComment(editComment) {
                this.$emit('edit-comment', editComment);
                this.setEditCommentId(editComment.id);
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
        align-items: center;
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

    .delete-icon {
        border-radius: 2px;
        padding: 2px 4px 0 4px;
    }
    .delete-icon:hover {
        background-color: #eeeeee;
        cursor: pointer;
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
