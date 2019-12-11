<template>
    <div class="app-content">
        <div class="sub-header">
            <h1 class="title">Target your students</h1>
        </div>
<!--        <transition name="loader-fade">-->
<!--            <div v-if="!fetched">-->
<!--                <img src="../../assets/load-dribbble.gif" alt="" width="250" height="187.5">-->
<!--            </div>-->
<!--        </transition>-->
        <transition name="fade">
            <div class="form-container" v-if="fetched">
                <form @submit="saveCourseTarget">
                    <div class="form-group">
                        <p>What will students learn in your course?</p>
                        <div class="input-wrapper" v-for="(input,k) in goalInputs" :key="k" style="height: 46px;">
                            <input type="text" class="form-input" placeholder="Course goals" v-model="input.name">
                            <span class="remove-btn" @click="removeGoal($event, k, input.name)">
                                <i class="far fa-trash-alt fa-lg"></i>
                                <!--  v-show="k || (!k && goalInputs.length > 1)"  -->
                            </span>
                        </div>
                        <button type="button" id="1" class="btn" @click="addAnswerInput">
                            <span class="plus-sign"><i class="fas fa-plus"></i></span>Add answer
                        </button>
                    </div>

                    <div class="form-group">
                        <p>What are course requirements?</p>
                        <div class="input-wrapper" v-for="(input,k) in reqInputs" :key="k" style="height: 46px;">
                            <input type="text" class="form-input" placeholder="Course reqs" v-model="input.name">
                            <span class="remove-btn" @click="removeReq($event, k, input.name)">
                                <i class="far fa-trash-alt fa-lg" ></i>
                                <!--  v-show="k || (!k && goalInputs.length > 1)"  -->
                            </span>
                        </div>
                        <button type="button" id="2" class="btn" @click="addAnswerInput">
                            <span class="plus-sign"><i class="fas fa-plus"></i></span>Add answer
                        </button>
                    </div>
                    <button type="submit" class="save-btn">Save</button>
                </form>
            </div>
        </transition>
    </div>
</template>

<script>
    import {
        INSTR_COURSE_TARGET_REQUEST, INSTR_CREATE_COURSE_TARGET_REQUEST, INSTR_DELETE_COURSE_REQ_GOAL_REQUEST
    } from "@/store/actions";
    import { mapGetters } from "vuex";

    export default {
        name: "CourseTarget",
        data() {
            return {
                fetched: false,
                goalInputs: [{
                    name: ''
                }],
                reqInputs: [{
                    name: ''
                }]
            }
        },
        created() {
            console.log('CourseTarget created');
            this.getCourseTarget();
        },
        methods: {
            getCourseTarget() {
                const payload = {
                    courseId: this.$route.params.id
                };
                this.$store.dispatch(INSTR_COURSE_TARGET_REQUEST, payload)
                    .then(res => {
                        console.log(res.data);
                        if(res.data.target.reqs.length !== 0 || res.data.target.goals.length !== 0) {
                            this.populateInputs(res.data.target);
                        }
                        this.fetched = true;
                    })
                    .catch(err => {
                        console.log(err);
                        console.log(err.response.data);
                        this.fetched = true;
                    });
            },
            clearInputs() {
                this.goalInputs.length = 0;
                this.reqInputs.length = 0;
            },
            populateInputs(target) {
                this.clearInputs();
                target.goals.forEach(i => this.goalInputs.push({ name: i.name }));
                target.reqs.forEach(i => this.reqInputs.push({ name: i.name }));
            },
            addAnswerInput(e) {
                const id = e.target.id;
                if (id == 1) {
                    const el = this.goalInputs[this.goalInputs.length-1];
                    if (el.name) {
                        this.goalInputs.push({ name: '' });
                    }
                } else if (id == 2) {
                    const el = this.reqInputs[this.reqInputs.length-1];
                    if (el.name) {
                        this.reqInputs.push({ name: '' });
                    }
                }
            },
            removeGoal(e, index, goalName) {
                if (index === 0 && goalName === '') {
                    return;
                }
                this.goalInputs.splice(index, 1);
                if (index === 0 && goalName !== '') {
                    this.goalInputs.push({ name: '' });
                }
                if (goalName) {
                    const payload = {
                        courseId: this.$route.params.id,
                        goalName: goalName
                    };
                    console.log(payload);
                    this.$store.dispatch(INSTR_DELETE_COURSE_REQ_GOAL_REQUEST, payload)
                        .then(res => console.log(res.data))
                        .catch(err => { console.log(err); console.log(err.response.data); });
                }
            },
            removeReq(e, index, reqName) {
                if (index === 0 && reqName === '') {
                    return;
                }
                this.reqInputs.splice(index, 1);
                if (index === 0 && reqName !== '') {
                    this.reqInputs.push({ name: '' });
                }
                if (reqName) {
                    const payload = {
                        courseId: this.$route.params.id,
                        reqName: reqName
                    };
                    this.$store.dispatch(INSTR_DELETE_COURSE_REQ_GOAL_REQUEST, payload)
                        .then(res => console.log(res.data))
                        .catch(err => { console.log(err); console.log(err.response.data); });
                }
            },
            saveCourseTarget(e) {
                e.preventDefault();
                const goals = this.goalInputs.map(i => i.name).filter(r => r !== '');
                const reqs = this.reqInputs.map(i => i.name).filter(r => r !== '');

                if (goals.length === 0 || reqs.length === 0) {
                    alert('Goals or requirements are empty');
                    return;
                }
                const payload = {
                    courseId: this.$route.params.id,
                    reqs,
                    goals
                };
                console.log(payload);
                this.$store.dispatch(INSTR_CREATE_COURSE_TARGET_REQUEST, payload)
                    .then(res => console.log(res.data))
                    .catch(err => { console.log(err); console.log(err.response.data); });
            }
        },
        computed: {
            ...mapGetters(['instrCourse'])
        }
    }
</script>

<style scoped>
    /* Transitions */
    .fade-enter-active {
        transition: all ease .6s;
    }
    .fade-enter, .fade-leave  {
        opacity: 0;
    }

    /* .loader-fade-enter-leave {
        transition: all ease 5s;
    }
    .loader-fade-enter, .loader-fade-leave-to {
        opacity: 0;
    }  */

    /**/
    .app-content {
        /*font-family: open sans,helvetica neue,Helvetica,Arial,sans-serif;*/
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

    .form-container {
        padding: 0 50px;
    }

    .form-group {
        width: 100%;
        margin: 35px 0;
    }

    .input-wrapper {
        margin: 10px 0;
    }

    .form-input {
        /*border: 1px solid #babfbe;*/
        border: 1px solid #cacbcc;
        border-radius: 3px;
        width: 90%;
        margin-top: 5px;
        padding: 10px 12px;
        font-size: 16px;
        box-shadow: none;
        /*outline: none;*/
    }

    .btn {
        border: 1px solid #686f7a;
        border-radius: 2px;
        margin-top: 10px;
        padding: 7px 10px;
        color: #007791;
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        user-select: none;
        outline: none;
    }

    .save-btn {
        border: none;
        border-radius: 2px;
        margin-top: 5px;
        padding: 12px 40px;
        background-color: #4CAF50;
        color: #fff;
        font-size: 17px;
        font-weight: 500;
        cursor: pointer;
    }

    .plus-sign {
        margin-right: 5px;
    }

    .remove-btn {
        margin-left: 10px;
    }

    .remove-btn:hover {
        cursor: pointer;
    }

</style>