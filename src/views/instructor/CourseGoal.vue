<template>
    <div class="app-content">
        <div class="sub-header">
            <h1 class="title">Target your students</h1>
        </div>
<!--        <hr>-->
        <div class="form-container">
            <form @submit="saveCourseTarget">
                <div class="form-group">
                    <p>What will students learn in your course?</p>
                    <div v-for="(input,k) in goalInputs" :key="k" style="height: 46px;">
                        <input type="text" class="form-input" placeholder="Course goals" v-model="input.name">
                        <span class="remove-btn" @click="removeGoal($event, k)">
                            <i class="far fa-trash-alt fa-lg" v-show="k || (!k && goalInputs.length > 1)"></i>
                        </span>
                    </div>
                    <button type="button" id="1" class="btn" @click="addAnswerInput">
                        <span class="plus-sign"><i class="fas fa-plus"></i></span>Add answer
                    </button>
                </div>

                <div class="form-group">
                    <p>What are course requirements?</p>
                    <div id="dd" v-for="(input,k) in reqInputs" :key="k" style="height: 46px;">
                        <input type="text" class="form-input" placeholder="Course reqs" v-model="input.name">
                        <span class="remove-btn" @click="removeReq($event, k)">
                            <i class="far fa-trash-alt fa-lg" v-show="k || (!k && goalInputs.length > 1)"></i>
                        </span>
                    </div>
                    <button type="button" id="2" class="btn" @click="addAnswerInput">
                        <span class="plus-sign"><i class="fas fa-plus"></i></span>Add answer
                    </button>
                </div>

<!--                <div class="form-group">-->
<!--                    <p>Who are your target students?</p>-->
<!--                    <div v-for="(input,k) in studentInputs" :key="k" style="height: 46px;">-->
<!--                        <input type="text" class="form-input" placeholder="Course students" v-model="input.name">-->
<!--                        <span class="remove-btn" @click="removeStudent($event, k)">-->
<!--                            <i class="far fa-trash-alt fa-lg" v-show="k || (!k && goalInputs.length > 1)"></i>-->
<!--                        </span>-->
<!--                    </div>-->
<!--                    <button type="button" id="3" class="btn" @click="addAnswerInput">-->
<!--                        <span class="plus-sign"><i class="fas fa-plus"></i></span>Add answer-->
<!--                    </button>-->
<!--                </div>-->

                <button type="submit" class="save-btn">Save</button>
            </form>
        </div>

    </div>
</template>

<script>
    import { INSTR_CREATE_COURSE_TARGET_REQUEST } from "@/store/actions";

    export default {
        name: "CourseGoal",
        data() {
            return {
                goalInputs: [{
                    name: ''
                }],
                reqInputs: [{
                    name: ''
                }],
                studentInputs: [{
                    name: ''
                }]
            }
        },
        methods: {
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
            removeGoal(e, index) {
                this.goalInputs.splice(index, 1);
            },
            removeReq(e, index) {
                this.reqInputs.splice(index, 1);
            },
            removeStudent(e, index) {
                this.studentInputs.splice(index, 1);
            },
            saveCourseTarget(e) {
                e.preventDefault();
                const goals = this.goalInputs.map(i => i.name).filter(r => r !== '');
                console.log(goals);
                const reqs = this.reqInputs.map(i => i.name).filter(r => r !== '');
                console.log(reqs);

                if (goals.length === 0 || reqs.length === 0) {
                    alert('Goals or requirements are empty');
                    return;
                }
                const payload = {
                    courseId: this.$route.params.id,  // this.instrCourse.id
                    reqs,
                    goals
                };
                console.log(payload);
                this.$store.dispatch(INSTR_CREATE_COURSE_TARGET_REQUEST, payload)
                    .then(res => {
                        console.log(res.data);
                    })
                    .catch(err => {
                        console.log(err);
                        console.log(err.response.data);
                    });
            }
        }
    }
</script>

<style scoped>
    .app-content {
        /*font-family: open sans,helvetica neue,Helvetica,Arial,sans-serif;*/
        font-family: Helvetica, sans-serif;
        background-color: #cfe3df;
        text-align: left;
        padding-bottom: 30px;
    }

    .sub-header {
        padding: 20px 50px;
        border-bottom: 1px solid #fff;  /*  #dedfe0   */
    }

    .title {
        font-size: 24px;
        font-weight: 300;
    }

    .form-container {
        padding: 0 50px;
    }

    .form-group {
        margin: 30px 0;
    }

    .form-input {
        /*border: 1px solid #babfbe;*/
        border: 1px solid #cacbcc;
        border-radius: 3px;
        width: 80%;
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
        padding: 5px 7px;
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
        padding: 12px 30px;
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
        margin-left: 8px;
    }

    .remove-btn:hover {
        cursor: pointer;
    }

</style>