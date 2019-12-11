<template>
    <div class="app-content">
        <div class="sub-header">
            <h1 class="title">My Students</h1>
        </div>
<!--            <div v-if="!fetched">-->
<!--                <img src="../../assets/load-dribbble.gif" alt="" width="250" height="187.5">-->
<!--            </div>-->
        <transition name="fade">
        <div class="students-container" v-if="fetched">
            <h4 class="students-count" v-if="studentsCount === 0">No Students</h4>
            <h4 class="students-count" v-else-if="studentsCount === 1">1 Student</h4>
            <h4 class="students-count" v-else>{{ studentsCount }} Students</h4>
            <div class="column-names" v-if="studentsCount > 0">
                <p class="main-info-text">Basic Info</p>
                <p class="registration-date-text">Registration date</p>
            </div>
            <div class="student" v-bind:key="student.id" v-for="student in this.instrCourseStudents">
                <div class="image-container">
                    <img class="user-image" src="../../assets/default-user.jpeg" alt="">
                </div>
                <div class="student-main-info-wrapper">
                    <p class="student-full-name">{{ student.firstName + ' ' + student.lastName }}</p>
                    <p class="student-email">{{ student.email }}</p>
                </div>
                <div class="student-registration-date">
                    <p class="date-text">{{ parseOrderDate(student.orderDate) }}</p>
                </div>
            </div>
        </div>
        </transition>
    </div>
</template>

<script>
    import { INSTR_STUDENTS_REQUEST } from "@/store/actions";
    import { mapGetters } from "vuex";

    export default {
        name: "ICourseStudent",
        data() {
            return {
                monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                fetched: false
            }
        },
        created() {
            console.log('ICourseStudent created');
            this.getInstructorStudents();
        },
        methods: {
            getInstructorStudents() {
                const payload = {
                    instructorId: this.user.id,
                    courseId: this.$route.params.id
                };
                console.log(payload);
                this.$store.dispatch(INSTR_STUDENTS_REQUEST, payload)
                    .then(res => {
                        console.log(res.data);
                        this.fetched = true;
                    })
                    .catch(err => {
                        console.log(err);
                        console.log(err.response.data);
                        this.fetched = true;
                    });
            },
            parseOrderDate(orderDate) {
                let date = new Date(orderDate);
                return date.getDate() + ' ' + this.monthNames[date.getMonth()].substring(0, 3) + ' ' + date.getFullYear();
            }
        },
        computed: {
            ...mapGetters(['user', 'instrCourseStudents']),
            studentsCount() {
                return this.instrCourseStudents.length;
            }
        }
    }
</script>

<style scoped>
    /* Transitions */
    .fade-enter-active {
        transition: all ease .5s;
    }
    .fade-enter, .fade-leave  {
        opacity: 0;
    }

    /*  */
    .app-content {
        font-family: Helvetica, sans-serif;
        background-color: #fff; /*  #cfe3df;   */
        text-align: left;
        padding-bottom: 30px;
    }

    .sub-header {
        padding: 20px 50px;
        border-bottom: 1px solid #dedfe0;  /* #fff; #dedfe0   */
    }
    .title {
        font-size: 24px;
        font-weight: 300;
    }

    .students-container {
        padding: 20px 200px 20px 50px;
    }

    .column-names {
        display: flex;
        margin: 5px 0;
        font-size: 15px;
    }
    .main-info-text {
        /*flex: 0 1 55%;*/
        margin-left: 50px;
    }
    .registration-date-text {
        /*flex: 0 1 25%;*/
        margin-left: 220px;
    }

    .student {
        display: flex;
        /*justify-content: space-between;*/
        border: 1px solid #8E8A84; /* #6d736f; */
        border-radius: 5px;
        margin-bottom: 10px;
        padding: 5px;
    }

    .image-container {
        /*flex: 1;*/
        /*flex-shrink: 1;*/
        border: 1px solid #8E8A84;
        border-radius: 40px;
        height: 43px;
        width: 43px;
        margin: 0 15px 0 10px;
        overflow: hidden;
    }
    .user-image {
        height: 100%;
        width: 100%;
    }

    .student-main-info-wrapper {
        /*flex: 0 1 40%;*/
        flex-basis: 250px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        margin-right: 20px;
    }

    .student-full-name {
        font-weight: 700;
        /*text-align: left;*/
    }

    .student-email {
        font-size: 14px;
    }

    .student-registration-date {
        /*flex: 2;*/
        display: flex;
        align-items: center;
        font-size: 15px;
    }

</style>