<template>
    <div class="qa-container">
        <Form placeholder="Leave comment" @add-comment="comment"/>
        <div class="comment-container">
            <CommentList :posts="arrangedComments" @reply-to-comment="comment"/>
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
                axios.get(`${process.env.VUE_APP_API}/api/lecture/${lectureId}/comments`)
                    .then(res => {
                        console.log(res.data);
                        this.comments = res.data;
                        let postsClone = JSON.parse(JSON.stringify(this.comments));
                        this.arrangedComments = this.arrangeComments(postsClone);
                        console.log(this.arrangedComments);
                    })
                    .catch(err => console.log(err));
            },
            comment(comment) {
                if (!comment.hasOwnProperty('parentId')) {
                    comment.parentId = null;
                }
                comment.userId = this.user.id;

                axios.post(`${process.env.VUE_APP_API}/api/lecture/${this.activeLectureId}/comments`, comment)
                    .then(res => {
                        console.log(res.data);
                        this.comments = [...this.comments, res.data];
                        let postsClone = JSON.parse(JSON.stringify(this.comments));
                        this.arrangedComments = this.arrangeComments(postsClone);
                    })
                    .catch(err => console.log(err));
            },
            // code samples
            getCommentById(commentID, comments_list) {
                for (let j = 0; j < comments_list.length; j++) {
                    if (comments_list[j].id == commentID) {
                        return comments_list[j];
                    }
                }
            },
            getCommentDepth(theComment, comments_list) {
                let depthLevel = 0;
                while (theComment.parentId > 0) {
                    theComment = this.getCommentById(theComment.parentId, comments_list);
                    depthLevel++;
                }
                return depthLevel;
            },
            arrangeComments(commentsList) {
                let maxDepth = 0;
                for (let i = 0; i < commentsList.length; i += 1) {
                    commentsList[i].children = [];
                    // let date = commentsList[i].date.split(" ").join("T").concat("Z");
                    // commentsList[i].date = new Date(date);
                    commentsList[i].comment_depth = this.getCommentDepth(commentsList[i], commentsList);
                    if (this.getCommentDepth(commentsList[i], commentsList) > maxDepth) {
                        maxDepth = this.getCommentDepth(commentsList[i], commentsList);
                    }
                }
                for (let i = maxDepth; i > 0; i--) {
                    for (let j = 0; j < commentsList.length; j++) {
                        if (commentsList[j].comment_depth == i) {
                            for (let k = 0; k < commentsList.length; k++) {
                                if (commentsList[j].parentId == commentsList[k].id) {
                                    commentsList[k].children.push(commentsList[j])
                                }
                            }
                        }
                    }
                }
                for (let i = commentsList.length - 1; i >= 0; i--) {
                    if (commentsList[i].parentId > 0) {
                        commentsList.splice(i, 1);
                    }
                }
                return commentsList;
            }

        }
    }
</script>

<style scoped>
    .comment-container {
        margin-top: 25px;
    }
</style>
