<template>
    <transition name="fade">
        <div v-if="notAuthorized">
            <NotAuthorized/>
        </div>
        <div class="container" v-else>
            <div class="sub-header">
                <h1 class="title">Course Main Info</h1>
            </div>
            <div class="add-form">
                <form @submit="editCourse">
                    <div class="form-ctrl">
                        <label for="title">Title</label>
                        <input type="text" id="title" v-model="course.title" placeholder="Title.." autocomplete="off">
                        <p v-if="!isObjEmpty(errors) && errors.hasOwnProperty('title')" class="error">{{ errors.title }} </p>
                    </div>
<!--                    <label for="title">Title</label>-->
<!--                    <input type="text" id="title" v-model="course.title" placeholder="Title.." autocomplete="off">-->

                    <div class="form-ctrl">
                        <label for="subtitle">Subtitle</label>
                        <input type="text" id="subtitle" v-model="course.subtitle" placeholder="Subtitle.." autocomplete="off">
                        <p v-if="!isObjEmpty(errors) && errors.hasOwnProperty('subtitle')" class="error">{{ errors.subtitle }} </p>
                    </div>
<!--                    <label for="subtitle">Subtitle</label>-->
<!--                    <input type="text" id="subtitle" v-model="course.subtitle" placeholder="Subtitle.." autocomplete="off">-->

                    <div class="form-ctrl">
                        <p class="description-label">Description</p>
<!--                        <label for="description">Description</label>-->
<!--                        <input type="text" id="description" style="opacity: 0">-->
                        <div class="editor">
                            <froala id="edit" :tag="'textarea'" :config="config" v-model="course.description"></froala>
                        </div>
                        <p v-if="!isObjEmpty(errors) && errors.hasOwnProperty('description')" class="error">{{ errors.description }} </p>
                    </div>
<!--                    <label>Description</label>-->
<!--                    <div class="editor">-->
<!--                        <froala id="edit" :tag="'textarea'" :config="config" v-model="course.description"></froala>-->
<!--                    </div>-->

                    <div class="select-wrapper"> <!--  select-wrapper  -->
                        <div class="select-left">  <!--  select-left  -->
                            <label for="language">Language</label>
                            <select id="language" v-model="course.language" name="language">
                                <option value="Kazakh">Kazakh</option>
                                <option value="Russian">Russian</option>
                                <option value="English">English</option>
                            </select>
                            <p v-if="!isObjEmpty(errors) && errors.hasOwnProperty('language')" class="error">{{ errors.language }} </p>
<!--                            <multiselect id="language" v-model="course.language" :options="languageOptions"-->
<!--                                 :searchable="true" :close-on-select="true" :show-labels="false" placeholder="Pick a value">-->
<!--                            </multiselect>-->
                        </div>
                        <div class="select-right"> <!--  select-right  -->
                            <label for="level">Level</label>
                            <select id="level" v-model="course.level" name="level">
                                <option value="select">--Select--</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                            <p v-if="!isObjEmpty(errors) && errors.hasOwnProperty('level')" class="error">{{ errors.level }} </p>
<!--                            <multiselect id="level" v-model="course.level" :options="levelOptions"-->
<!--                                 :searchable="true" :close-on-select="true" :show-labels="false" placeholder="Pick a value">-->
<!--                            </multiselect>-->
                        </div>
                    </div>

                    <div class="select-wrapper">
                        <div class="select-left">
                            <label for="category">Category</label>
                            <select id="category" name="category" v-model="course.category.parent.name" @change="onCategorySelected($event)">
                                <option value="Development">Development</option>
                                <option value="Business">Business</option>
                                <option value="Design">Design</option>
                            </select>
                            <p v-if="!isObjEmpty(errors) && errors.hasOwnProperty('category')" class="error">{{ errors.category }} </p>
<!--                            <multiselect id="category" v-model="course.category.parent.name" :options="categoryOptions" @select="onCategorySelect"-->
<!--                                 :searchable="false" :close-on-select="true" :show-labels="false" placeholder="Pick a value">-->
<!--                            </multiselect>-->
                        </div>

                        <div class="select-right">
                            <label for="subcategory">Subcategory</label>
                            <select id="subcategory" name="subcategory" v-model="course.category.name" @change="onSubcategorySelected($event)">
                                <template v-if="subcat.length !== 0">
                                    <option v-bind:key="sc.id" v-for="sc in subcat" :value="sc">{{ sc }}</option>
                                </template>
                                <template v-else>
                                    <option :value="course.category.name">Select</option>
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
                                </template>
                            </select>
                            <p v-if="!isObjEmpty(errors) && errors.hasOwnProperty('subcategory')" class="error">{{ errors.subcategory }} </p>
                        </div>
                    </div>
                    <div class="select-wrapper">
                        <div class="select-left">
                            <label for="topic">Topic</label>
                            <select id="topic" name="topic" v-model="course.topic.name">
                                <template v-if="topics.length !== 0">
                                    <option v-bind:key="topic.id" v-for="topic in topics" :value="topic">{{ topic }}</option>
                                </template>
                                <template v-else>
                                    <option :value="course.topic.name">Select</option>
                                    <option value="React">React</option>
                                    <option value="Vue.JS">Vue.JS</option>
                                    <option value="Angular">Angular</option>
                                </template>
                            </select>
                            <p v-if="!isObjEmpty(errors) && errors.hasOwnProperty('topic')" class="error">{{ errors.topic }} </p>
                        </div>
                        <div class="select-right">
                            <label for="price">Price</label>
                            <input type="number" id="price" v-model="course.price" placeholder="Price" autocomplete="off">
                            <p v-if="!isObjEmpty(errors) && errors.hasOwnProperty('price')" class="error">{{ errors.price }}</p>
                        </div>
                    </div>
                    <v-button :onClick="editCourse" myClass="edit-btn green">Edit</v-button>
                </form>
            </div>
        </div>
    </transition>
</template>

<script>
    import {INSTR_COURSE_REQUEST, INSTR_COURSE_UPDATE_REQUEST} from "@/store/actions";
    import { mapGetters } from 'vuex';
    import NotAuthorized from "@/views/NotAuthorized";
    import Button from "@/components/Button";

    export default {
        name: "ICourseInfo",
        components: {
            NotAuthorized,
            'v-button': Button
        },
        notifications: {
            showEditError: {
                title: 'Error',
                message: 'Course Edit Failed',
                type: 'error', // You also can use 'VueNotifications.types.error' instead of 'error'
                timeout: 2000
            },
            showEditSuccess: {
                title: 'Success',
                message: 'Course Edited!',
                type: 'success', // VueNotifications.types.success,
                timeout: 2000
            }
        },
        data() {
            return {
                // Froala editor data
                config: {
                    placeholderText: 'Edit Your Content Here!',
                },
                model: 'das',
                // Other data
                course: {},
                errors: {},
                // languageOptions: ['Kazakh', 'Russian', 'English'],
                // levelOptions: ['Beginner', 'Intermediate', 'Advanced'],
                // categoryOptions: ['Development', 'Business', 'Design'],
                // subcategoryOptions: ['Web Development', 'Mobile App', 'Programming Language', 'Databases', 'Finance', 'Management',
                //     'Strategy', 'Project Management', 'Web Design', 'Graphic Design', 'Game Design', 'Fashion'],
                categories: {
                    Development: ['Web Development', 'Mobile App', 'Programming Language', 'Databases'],
                    Business: ['Finance', 'Management', 'Strategy', 'Project Management'],
                    Design: ['Web Design', 'Graphic Design', 'Game Design', 'Fashion']
                },
                subcategories: {
                    'Web Development': ['Angular', 'React', 'Vue', 'HTML', 'CSS', 'JS', 'PHP', 'Spring'],
                    'Mobile App': ['Flutter', 'React Native', 'Android', 'iOS'],
                    'Programming Language': ['Java', 'C', 'C#', 'C++', 'Python', 'Go'],
                    'Databases': ['PostgreSQL', 'MySQL', 'MS Server', 'SQLite', 'Oracle', 'MongoDB', 'Redis', 'Neo4j', 'Cassandra'],
                    'Finance': ['Finance 1', 'Finance 2'],
                    'Management': ['Management 1', 'Management 2'],
                    'Strategy': ['Strategy 1', 'Strategy 2'],
                    'Project Management': ['PM 1', 'PM 2'],
                    'Web Design': ['Web design 1', 'Web design 2'],
                    'Graphic Design': ['Graphic design 1', 'Graphic design 2'],
                    'Game Design': ['Game design 1', 'Game design 2'],
                    'Fashion': ['Fashion 1', 'Fashion 2']
                },
                subcat: [],
                topics: [],
                // subcatORtopicList: [],
                notAuthorized: false
            }
        },
        created() {
            console.log('ICourseInfo created');
            this.getInstructorCourse();
        },
        methods: {
            isObjEmpty(myObj) {
                return Object.entries(myObj).length === 0 && myObj.constructor === Object
            },
            onCategorySelect(value) { },
            onCategorySelected(e) {
                const selectedCategory = e.target.value;
                this.resolveDependency('category', selectedCategory);
                this.resolveDependency('subcategory', this.course.category.name);
            },
            onSubcategorySelected(e) {
                const selectedSubcategory = e.target.value;
                this.resolveDependency('subcategory', selectedSubcategory);
            },
            resolveDependency(dependency, selected) {
                // console.log('dependency: ' + dependency + '; selected: ' + selected);
                if (dependency === 'category') {
                    const cat = this.categories;
                    let subcat = [];
                    for (let key in cat) {
                        if (cat.hasOwnProperty(selected)) {
                            subcat = cat[selected];
                            break;
                        }
                    }
                    this.subcat = subcat;
                    this.course.category.name = subcat[0];
                } else if (dependency === 'subcategory') {
                    const subcategories = this.subcategories;
                    let topics = [];
                    for (let key in subcategories) {
                        if (subcategories.hasOwnProperty(selected)) {
                            topics = subcategories[selected];
                            break;
                        }
                    }
                    this.topics = topics;
                    this.course.topic.name = topics[0];
                }
            },
            getInstructorCourse() {
                const payload = {
                    instructorID: this.user.id,
                    courseId: this.$route.params.id
                };
                this.$store.dispatch(INSTR_COURSE_REQUEST, payload)
                    .then(res => {
                        console.log(res.data);
                        this.course = res.data;
                        // this.resolveSubcategories(this.course.category.parent.name);
                        this.resolveDependency('category', this.course.category.parent.name);
                        this.resolveDependency('subcategory', this.course.category.name);
                    })
                    .catch(err => {
                        console.log(err);
                        console.log(err.response.data);
                        if (err.response.data === 'Not Instructors Course') {
                            this.$emit('notAuthorized');
                        }
                        if (err.response.status === 404) {
                            this.$emit('notFound');
                        }
                    });
            },
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
                        this.showEditSuccess();
                    })
                    .catch(err => {
                        console.log(err);
                        if (err.response) {
                            console.log(err.response.data);
                            this.errors = err.response.data.errors;
                            this.showEditError({
                                title: 'Course Edit Failed',
                                message: '',
                                type: 'error',
                                timeout: 2000
                            });
                        } else {
                            console.log('Server connection error');
                            this.showToast({
                                title: 'Server connection error',
                                message: '',
                                type: 'error',
                                timeout: 2000
                            });
                        }
                    });
            },
        },
        computed: {
            ...mapGetters(['user', 'instrCourse']),
        }
    }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
    /* Transitions */
    .fade-enter-active {
        transition: all ease .5s;
    }
    .fade-enter, .fade-leave {
        opacity: 0;
    }

    /*  */
    .editor {
        margin: 6px 0 16px 0;
    }

    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        /*padding: 40px 0;*/
        /*margin: 30px 0;*/
        /*background-color: #fff;*/
    }

    .sub-header {
        padding: 20px 10%;
        border-bottom: 1px solid #dedfe0;  /* #fff; #dedfe0   */
        text-align: left;
    }
    .title {
        font-size: 24px;
        font-weight: 300;
    }

    .add-form {
        width: 90%;
        margin: 0 auto;
        padding: 20px 0;
        /*border: 1px solid transparent;*/
        /*border-radius: 5px;*/
        /*background-color: #fff;  !*  #f2f2f2  *!*/
    }

    .form-ctrl {
        margin-bottom: 20px;
    }

    label {
        color: #2c3e50;
        float: left;
        padding-left: 10px;
        padding-bottom: 5px;
        font-weight: 600;
    }
    .description-label {
        color: #2c3e50;
        text-align: left;
        padding-left: 10px;
        padding-bottom: 5px;
        font-weight: 600;
    }

    .select-wrapper {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
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
        /*margin-top: 6px;*/
        /*margin-bottom: 16px;*/
        font-size: 15px;
        resize: vertical
    }

    select {
        background-color: #fff;
    }

    .error {
        color: red;
        font-size: 16px;
        margin-top: 5px;
    }

</style>
