<template>
    <div class="qa-container">
        <Form placeholder="Leave comment" @add-comment="comment"/>
        <div class="comment-container">
            <CommentList :posts="comments" @reply-to-comment="comment"/>
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
                if (!newComment.hasOwnProperty('parentId')) {
                    newComment.parentId = null;
                }
                newComment.userId = this.user.id;

                axios.post(`${process.env.VUE_APP_API}/api/lecture/${this.activeLectureId}/comments`, newComment)
                    .then(res => {
                        console.log(res.data);
                        parentComment.children.push(res.data);
                    })
                    .catch(err => console.log(err));
            },
        }
    }
</script>

<style scoped>
    .comment-container {
        margin-top: 25px;
    }
</style>
