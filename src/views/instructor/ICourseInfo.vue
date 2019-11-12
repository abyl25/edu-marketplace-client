<template>
    <div class="container">
        <div class="add-form">
            <form @submit="editCourse">
                <label for="title">Title</label>
                <input type="text" id="title" v-model="course.title" placeholder="Title.." autocomplete="off">

                <label for="subtitle">Subtitle</label>
                <input type="text" id="subtitle" v-model="course.subtitle" placeholder="Subtitle.." autocomplete="off">

                <label>Description</label>
                <div class="editor">
                    <ckeditor :editor="editor" v-model="course.description" :config="editorConfig"></ckeditor>
                </div>

                <div class="select-wrapper"> <!--  select-wrapper  -->
                    <div class="select-left">  <!--  select-left  -->
                        <label for="language">Language</label>
                        <select id="language" v-model="course.language" name="language">
                            <option value="select" selected>--Select--</option>
                            <option value="Kazakh">Kazakh</option>
                            <option value="Russian">Russian</option>
                            <option value="English">English</option>
                        </select>
                    </div>
                    <div class="select-right"> <!--  select-right  -->
                        <label for="level">Level</label>
                        <select id="level" v-model="course.level" name="level">
                            <option value="select">--Select--</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>
                </div>

                <div class="select-wrapper">
                    <div class="select-left">
                        <label for="category">Category</label>
                        <select id="category" v-model="course.category.parent.name" name="category">
                            <option value="select">--Select--</option>
                            <option value="Development">Development</option>
                            <option value="Business">Business</option>
                            <option value="Design">Design</option>
                        </select>
                    </div>

                    <div class="select-right">
                        <label for="subcategory">Subcategory</label>
                        <select id="subcategory" v-model="course.category.name" name="subcategory">
                            <option value="select">--Select--</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Mobile App">Mobile App</option>
                            <option value="Programming Language">Programming Language</option>
                            <option value="Databases">Databases</option>
                            <option value="Finance">Finance</option>
                            <option value="Management">Management</option>
                            <option value="Strategy">Strategy</option>
                            <option value="Project Management">Project Management</option>
                            <option value="Web Design">Web Design</option>
                            <option value="Graphic Design">Graphic Design</option>
                            <option value="Game Design">Game Design</option>
                            <option value="Fashion">Fashion</option>
                        </select>
                    </div>
                </div>
                <div class="select-wrapper">
                    <div class="select-left">
                        <label for="topic">Topic</label>
                        <select id="topic" v-model="course.topic.name" name="topic">
                            <option value="select">--Select--</option>
                            <option value="React">React</option>
                            <option value="Vue.JS">Vue.JS</option>
                            <option value="Angular">Angular</option>
                        </select>
                    </div>
                    <div class="select-right">
                        <label for="price">Price</label>
                        <input type="number" id="price" v-model="course.price" placeholder="Price" autocomplete="off">
                    </div>
                </div>
                <input type="submit" value="Edit">
            </form>
        </div>
    </div>
</template>

<script>
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    import { mapGetters } from 'vuex';
    import {INSTR_COURSE_REQUEST, INSTR_COURSE_UPDATE_REQUEST} from "@/store/actions";

    export default {
        name: "ICourseInfo",
        data() {
            return {
                editor: ClassicEditor,
                editorData: '',
                editorConfig: {},
                course: {},
            }
        },
        created() {
            console.log('ICourseInfo created');
            const payload = {
                instructorID: this.user.id,
                courseId: this.$route.params.id
            };
            this.$store.dispatch(INSTR_COURSE_REQUEST, payload)
                .then(res => {
                    console.log(res.data);
                    this.course = res.data;
                })
                .catch(err => console.log(err));
        },
        methods: {
            editCourse(e) {
                e.preventDefault();
                const updateCourse = {
                    instructorId: this.user.id,
                    title: this.course.title,
                    subtitle: this.course.subtitle,
                    description: this.course.description,
                    price: this.course.price,
                    language: this.course.language,
                    level: this.course.level,
                    category: this.course.category.name,
                    topic: this.course.topic.name
                };
                const payload = {
                    courseId: this.instrCourse.id,
                    updateCourse
                };
                console.log(payload);
                this.$store.dispatch(INSTR_COURSE_UPDATE_REQUEST, payload)
                    .then(res => {
                        console.log(res.data);
                        // this.$router.push('/instructor/home');
                    })
                    .catch(err => {
                        console.log(err);
                        console.log(err.response.data);
                    });
            }
        },
        computed: {
            ...mapGetters(['user', 'instrCourse'])
        }
    }
</script>

<style scoped>
    .editor {
        margin: 6px 0 16px 0;
    }

    .container {
        display: flex;
        justify-content: center;
        /*margin: 30px 0;*/
    }

    .add-form {
        width: 70%;
        border-radius: 5px;
        padding: 20px;
        background-color: #f2f2f2;
    }

    .select-wrapper {
        display: flex;
        justify-content: space-between;
    }

    .select-left {
        flex: 1;
        margin-right: 80px;
    }

    .select-right {
        flex: 1;
    }

    input[type=text], input[type=number], select, textarea {
        width: 100%;
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        margin-top: 6px;
        margin-bottom: 16px;
        font-size: 15px;
        resize: vertical
    }

    input[type=submit] {
        background-color: #4CAF50;
        color: white;
        width: 30%;
        margin-top: 30px;
        padding: 15px 50px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 18px;
    }

    input[type=submit]:hover {
        background-color: #45a049;
        text-align: center;
    }

    /*.ck.ck-editor__main>.ck-editor__editable:not(.ck-focused) {*/
    /*    margin-bottom: 20px;*/
    /*}*/

    .ck-content .todo-list li {
        /*margin-bottom: 5px;*/
        padding-left: 20px;
    }
</style>