<template>
    <div class="qa-container">
        <Form placeholder="Leave comment" @add-comment="comment"/>
        <div class="comment-container">
            <CommentList :posts="comments" @reply-to-comment="comment" @delete-comment="onDeleteComment" @edit-comment="editComment"/>
        </div>
    </div>
</template>

<script>
    import Form from "@/components/comment/Form";
    import CommentList from "@/components/comment/CommentList";
    import axios from "axios";
    import {mapGetters} from "vuex";

    export default {
        name: "QA",
        components: {
            Form: Form,
            CommentList: CommentList,
        },
        props: {
            activeLectureId: Number
        },
        data() {
            return {
                comments: [],
                arrangedComments: [],
            }
        },
        computed: {
            ...mapGetters(['user']),
        },
        notifications: {
            showToast: {
                title: 'Success',
                message: 'Success',
                type: 'success',
                timeout: 2000
            }
        },
        created() {
            this.getCommentsByLecture(this.activeLectureId);
        },
        methods: {
            getCommentsByLecture(lectureId) {
                axios.get(`${process.env.VUE_APP_API}/api/lecture/${lectureId}/root-comments`)
                    .then(res => {
                        console.log(res.data);
                        this.comments = res.data;
                    })
                    .catch(err => console.log(err));
            },
            comment(newComment, parentComment) {
                console.log(newComment);
                console.log(parentComment);
                if (!newComment.hasOwnProperty('parentId')) {
                    newComment.parentId = null;
                }
                newComment.userId = this.user.id;

                axios.post(`${process.env.VUE_APP_API}/api/lecture/${this.activeLectureId}/comments`, newComment)
                    .then(res => {
                        console.log(res.data);
                        if (parentComment) {
                            parentComment.children.push(res.data);
                        } else {
                            this.comments.push(res.data);
                        }
                    })
                    .catch(err => console.log(err));
            },
            onDeleteComment(comment) {
                this.comments = this.comments.filter(c => c.id !== comment.id);
                axios.delete(`${process.env.VUE_APP_API}/api/comments/${comment.id}`)
                    .then(res => {
                        console.log(res.data);
                        this.showToast({
                            title: '', message: 'Comment deleted', type: 'success', timeout: 2000
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        this.showToast({
                            title: '', message: 'Comment deletion failed', type: 'error', timeout: 2000
                        });
                    });
            },
            editComment(editComment) {
                const comment = {
                    parentId: editComment.parentId,
                    userId: editComment.user.id,
                    title: editComment.title,
                    content: editComment.content
                };
                axios.put(`${process.env.VUE_APP_API}/api/comments/${editComment.id}`, comment)
                    .then(res => {
                        console.log(res.data);
                        this.showToast({
                            title: '', message: 'Comment edited', type: 'success', timeout: 2000
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        this.showToast({
                            title: '', message: 'Comment edit failed', type: 'error', timeout: 2000
                        });
                    });
            }
        }
    }
</script>

<style scoped>
    .comment-container {
        margin-top: 25px;
    }
</style>
