<template>
    <div class="qa-container">
        <Form/>
        <div class="comment-container">
            <CommentList :posts="posts" />
        </div>
    </div>
</template>

<script>
    import Form from "@/components/comment/Form";
    import CommentList from "@/components/comment/CommentList";

    export default {
        name: "QA",
        components: {
            Form: Form,
            CommentList: CommentList,
        },
        data() {
            return {
                posts: [
                    {
                        id: 1, parentId: null, user: 'Abylay Tastanbekov', content: 'Good post!', postedAt: '16 Aug',
                        comments: [
                            {
                                id: 3, parentId: 1, user: 'Abylay Tastanbekov', content: 'Thanks for that', postedAt: '19 Aug' ,
                                comments: [
                                    {
                                        id: 4, parentId: 3, user: 'Abylay Tastanbekov', content: 'Yes, that is awesome', postedAt: '20 Aug',
                                        comments: [
                                            {
                                                id: 9, parentId: 3, user: 'Abylay Tastanbekov', content: 'Wds sda', postedAt: '20 Aug',
                                            },
                                        ]
                                    },
                                ]
                            },
                            {
                                id: 5, parentId: 1, user: 'Abylay Tastanbekov', content: 'Thanks!', postedAt: '22 Aug'
                            },
                            {
                                id: 6, parentId: 1, user: 'Abylay Tastanbekov', content: 'Waiting for next post', postedAt: '23 Aug'
                            },
                        ]
                    },
                    { id: 2, parentId: null, user: 'Abylay Tastanbekov', content: 'Keep up good work', postedAt: '18 Aug',
                        comments: [
                            {
                                id: 7, parentId: 2, user: 'Abylay Tastanbekov', content: 'fd sdf asd', postedAt: '24 Aug',
                                comments: [
                                    { id: 8, parentId: 7, user: 'Abylay Tastanbekov', content: 'fwiof j fkl ds dx', postedAt: '26 Aug' },
                                ]
                            },
                        ]
                    },
                ]

            }
        },
        computed: {
        },
        methods: {
            askQuestion() {
            }
        }
    }
</script>

<style scoped>
    .comment-container {
        margin-top: 25px;
    }
</style>
