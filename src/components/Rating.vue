<template>
    <div class="rating-container">
        <button to="" class="rate-btn" @click="openModal">Rate the course</button>
        <sweet-modal ref="modal" overlay-theme="dark">
            <div class="content">
                <h3>Rate the course</h3>
                <div class="star-rating-wrapper" >
                    <star-rating :increment="0.5" :star-size="40" :glow="1" active-color="#ffc838"  v-model="rating" @rating-selected="setRating"></star-rating>
                </div>
                <h4>Leave review</h4>
                <textarea type="text" v-model="content"></textarea>
                <button class="confirm-btn" @click="submitReview">Submit</button>
            </div>
        </sweet-modal>
    </div>
</template>

<script>
    import StarRating from 'vue-star-rating';
    import { SweetModal } from 'sweet-modal-vue';
    import { mapGetters } from "vuex";
    import axios from 'axios';

    export default {
        name: "Rating",
        components: {
            StarRating,
            SweetModal,
        },
        props: ['courseId', 'review'],
        data() {
            return {
                rating: this.review.rating,
                content: this.review.content,
                myReview: this.review
            }
        },
        computed: {
            ...mapGetters(['user']),
        },
        notifications: {
            showToast: {
                title: 'Success',
                message: 'Course logo uploaded',
                type: 'success',
                timeout: 2000
            }
        },
        methods: {
            setRating(rating) {
                this.rating = rating;
            },
            openModal() {
                this.$refs.modal.open();
            },
            submitReview() {
                const review = {
                    rating: this.rating,
                    content: this.content,
                    studentId: this.user.id,
                    courseId: this.courseId
                };
                axios.post(`${process.env.VUE_APP_API}/api/reviews`, review)
                    .then(res => {
                        console.log(res.data);
                        this.$refs.modal.close();
                        this.showToast({ title: 'Success', message: 'Review saved', type: 'success', timeout: 2000 });
                    })
                    .catch(err => {
                        console.log(err);
                        this.$refs.modal.close();
                        this.showToast({ title: 'Error', message: 'Review failed', type: 'error', timeout: 2000 });
                    });
            }
        }
    }
</script>

<style scoped>
    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .star-rating-wrapper {
        width: 220px;
        margin: 15px 0 15px 0;
    }

    textarea {
        border: 1px solid #aaa9a9;
        border-radius: 4px;
        width: 90%;
        height: 80px;
        margin: 8px 0 15px 0;
        padding: 10px;
        color: #545353;
        outline: none;
        font-size: 16px;
        font-family: Lato;
        resize: vertical;
    }

    .rate-btn {
        /*width: 90px;*/
        padding: 8px 20px;
        border: 1px solid #03a9f4;
        border-radius: 3px;
        color: #fff;
        background: #03a9f4;
        transition: background .2s;
        cursor: pointer;
    }

    .confirm-btn {
        width: 90px;
        padding: 8px 20px;
        border: 1px solid #03a9f4;
        border-radius: 3px;
        color: #fff;
        background: #03a9f4;
        transition: background .2s;
        cursor: pointer;
    }
</style>
