<template>
    <div class="settings-container">
        <div class="sub-header">
            <h1 class="title">Course Settings</h1>
        </div>
        <div class="course-status">
            <h4>Course Status:</h4>
            <p>Not published</p>
        </div>
        <div class="course-control">
            <v-button class="std-btn green" :onClick="submitForReview">Submit for Review</v-button>
            <v-button class="std-btn grey-btn" :onClick="unpublish">Unpublish</v-button>
            <v-button class="std-btn red-btn" :onClick="deleteCourse">Delete</v-button>
        </div>
    </div>
</template>

<script>
    import Button from "@/components/Button";

    export default {
        name: "ICourseSetting",
        components: {
            'v-button': Button
        },
        data() {
            return {}
        },
        methods: {
            submitForReview() {
                console.log('submitForReview');
            },
            unpublish() {
                console.log('unpublish');
            },
            deleteCourse() {
                console.log('deleteCourse');
            }
        }
    }
</script>

<style scoped>
    .settings-container {
        /*padding: 0 50px;*/
    }

    .sub-header {
        padding: 20px 50px;
        border-bottom: 1px solid #dedfe0;  /* #fff; #dedfe0   */
        text-align: left;
    }

    .title {
        font-size: 24px;
        font-weight: 300;
    }

    .course-status {
        display: flex;
        margin-top: 20px;
        padding: 0 50px;
    }

    .course-control {
        display: flex;
        flex-direction: column;
        padding: 0 50px;
    }
</style>
