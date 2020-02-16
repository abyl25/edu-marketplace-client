<template>
    <div class="container">
        <div class="back-link-wrapper">
            <router-link :to="{ path: '/instructor/home' }" class="back-link">
                <i class="fas fa-chevron-left" style="color: red"></i> Back
            </router-link>
        </div>
        <div class="add-form">
            <form @submit="addCourse">
                <div class="form-ctrl">
                    <label for="title">Title</label>
                    <input type="text" id="title" v-model="title" placeholder="Title.." autocomplete="off">
                    <p v-if="!isObjEmpty(errors) && errors.hasOwnProperty('title')" class="error">{{ errors.title }} </p>
                </div>

                <div class="form-ctrl">
                    <label for="subtitle">Subtitle</label>
                    <input type="text" id="subtitle" v-model="subtitle" placeholder="Subtitle.." autocomplete="off">
                    <p v-if="!isObjEmpty(errors) && errors.hasOwnProperty('subtitle')" class="error">{{ errors.subtitle }} </p>
                </div>

                <div class="form-ctrl">
                    <p class="description-label">Description</p>
                    <div class="editor">
                        <froala id="edit" :tag="'textarea'" :config="config" v-model="description"></froala>
                    </div>
                    <p v-if="!isObjEmpty(errors) && errors.hasOwnProperty('description')" class="error">{{ errors.description }} </p>
                </div>

<!--                <div class="form-ctrl">-->
<!--                    <label for="price">Price</label>-->
<!--                    <input type="number" id="price" v-model="price" placeholder="Price" autocomplete="off">-->
<!--                    <p v-if="!isObjEmpty(errors) && errors.hasOwnProperty('price')" class="error">{{ errors.price }} </p>-->
<!--                </div>-->

                <div class="select-wrapper">
                    <div class="select-left">
                        <label for="language">Language</label>
                        <select id="language" v-model="language" name="language">
<!--                            <option :value="language">&#45;&#45;Select&#45;&#45;</option>-->
                            <option value="Kazakh">Kazakh</option>
                            <option value="Russian">Russian</option>
                            <option value="English">English</option>
                        </select>
                        <p v-if="!isObjEmpty(errors) && errors.hasOwnProperty('language')" class="error">{{ errors.language }} </p>
                    </div>
                    <div class="select-right">
                        <label for="level">Level</label>
                        <select id="level" v-model="level" name="level">
<!--                            <option :value="level">&#45;&#45;Select&#45;&#45;</option>-->
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                        <p v-if="!isObjEmpty(errors) && errors.hasOwnProperty('level')" class="error">{{ errors.level }} </p>
                    </div>
                </div>

                <div class="select-wrapper">
                    <div class="select-left">
                        <label for="category">Category</label>
                        <select id="category" v-model="category" name="category" @change="onCategorySelected($event)">
<!--                            <option :value="category">&#45;&#45;Select&#45;&#45;</option>-->
                            <option value="Development">Development</option>
                            <option value="Business">Business</option>
                            <option value="Design">Design</option>
                        </select>
                        <p v-if="!isObjEmpty(errors) && errors.hasOwnProperty('category')" class="error">{{ errors.category }} </p>
                    </div>
                    <div class="select-right">
                        <label for="subcategory">Subcategory</label>
                        <select id="subcategory" class="subcte" v-model="subcategory" name="subcategory" @change="onSubcategorySelected($event)">
                            <template v-if="subcat.length !== 0">
                                <option v-bind:key="sc.id" v-for="sc in subcat" :value="sc">{{ sc }}</option>
                            </template>
                            <template v-else>
<!--                                <option :value="subcategory">&#45;&#45;Select&#45;&#45;</option>-->
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
<!--                            <option value="Web Development">Web Development</option>-->
<!--                            <option value="Mobile App">Mobile App</option>-->
<!--                            <option value="Programming Language">Programming Language</option>-->
<!--                            <option value="Databases">Databases</option>-->
<!--                            <option value="Finance">Finance</option>-->
<!--                            <option value="Management">Management</option>-->
<!--                            <option value="Strategy">Strategy</option>-->
<!--                            <option value="Project Management">Project Management</option>-->
<!--                            <option value="Web Design">Web Design</option>-->
<!--                            <option value="Graphic Design">Graphic Design</option>-->
<!--                            <option value="Game Design">Game Design</option>-->
<!--                            <option value="Fashion">Fashion</option>-->
                        </select>
                        <p v-if="!isObjEmpty(errors) && errors.hasOwnProperty('subcategory')" class="error">{{ errors.subcategory }} </p>
                    </div>
                </div>

                <div class="select-wrapper">
                    <div class="select-left">
                        <label for="topic">Topic</label>
                        <select id="topic" v-model="topic" name="topic">
                            <template v-if="topics.length !== 0">
                                <option v-bind:key="topic.id" v-for="topic in topics" :value="topic">{{ topic }}</option>
                            </template>
                            <template v-else>
    <!--                            <option :value="topic">&#45;&#45;Select&#45;&#45;</option>-->
                                <option value="React">React</option>
                                <option value="Vue.JS">Vue.JS</option>
                                <option value="Angular">Angular</option>
                            </template>
    <!--                        <option value="select">&#45;&#45;Select&#45;&#45;</option>-->
    <!--                        <option value="React">React</option>-->
    <!--                        <option value="Vue.JS">Vue.JS</option>-->
    <!--                        <option value="Angular">Angular</option>-->
                        </select>
                        <p v-if="!isObjEmpty(errors) && errors.hasOwnProperty('topic')" class="error">{{ errors.topic }} </p>
                    </div>
                    <div class="select-right">
                        <label for="price">Price</label>
                        <input type="number" id="price" v-model="price" placeholder="Price" autocomplete="off">
                        <p v-if="!isObjEmpty(errors) && errors.hasOwnProperty('price')" class="error">{{ errors.price }}</p>
                    </div>
                </div>

                <input type="submit" value="Create">
            </form>
        </div>
    </div>
</template>

<script>
  import axios from 'axios';
  import { INSTR_COURSE_CREATE_REQUEST } from "@/store/actions";
  import { mapGetters } from 'vuex';

  export default {
    name: 'CreateCourse',
    components: {
    },
    data() {
      return {
        // Froala editor data
        config: {
          placeholderText: 'Edit Your Content Here!',
        },
        model: '',
        // other data
        title: '',
        subtitle: '',
        description: '',
        language: '',
        level: '',
        category: '',
        subcategory: '',
        topic: '',
        price: '',
        errors: {},
        // vue-select
        value: [],
        options: [
          {
            language: 'Javascript',
            libs: [
              { name: 'Vue.js', category: 'Front-end' },
              { name: 'Adonis', category: 'Backend' }
            ]
          },
          {
            language: 'Ruby',
            libs: [
              { name: 'Rails', category: 'Backend' },
              { name: 'Sinatra', category: 'Backend' }
            ]
          },
          {
            language: 'Other',
            libs: [
              { name: 'Laravel', category: 'Backend' },
              { name: 'Phoenix', category: 'Backend' }
            ]
          }
        ],
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
        notAuthorized: false

      }
    },
    notifications: {
        showToast: {
            title: 'Success',
            message: 'Course Edited!',
            type: 'success', // VueNotifications.types.success,
            timeout: 2000
        }
    },
    methods: {
        isObjEmpty(myObj) {
          return Object.entries(myObj).length === 0 && myObj.constructor === Object
        },
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
        addCourse(e) {
            e.preventDefault();
            const newCourse = {
                instructorId: this.user.id,
                title: this.title,
                subtitle: this.subtitle,
                description: this.description,
                price: this.price,
                language: this.language,
                level: this.level,
                category: this.subcategory,
                topic: this.topic
            };
            console.log(newCourse);
            this.$store.dispatch(INSTR_COURSE_CREATE_REQUEST, newCourse)
                .then(res => {
                    console.log(res.data);
                    this.$router.push('/instructor/home');
                    this.showToast({
                        title: 'Success',
                        message: 'Course Created',
                        type: 'success',
                        timeout: 2500
                    });
                })
                .catch(err => {
                    console.log(err);
                    if (err.response) {
                        console.log(err.response.data);
                        this.errors = err.response.data.errors;
                        this.showToast({
                            title: 'Course Create Failure',
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
        }
    },
    computed: {
        ...mapGetters(['user'])
    },
  }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
    .container {
        display: flex;
        justify-content: center;
        margin: 60px 0;
    }

    .back-link-wrapper {
        /*border: 1px solid #000;*/
        position: absolute;
        top: 80px;
        left: 13%;
    }
    .back-link {
        /*padding: 5px 10px;*/
        text-decoration: none;
        color: #6d736f;
        font-size: 18px;
    }

    .add-form {
        width: 70%;
        border-radius: 5px;
        padding: 20px;
        background-color: #f2f2f2;
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
    /*label:after { */
    /*    content: ": " */
    /*}*/
    .description-label {
        color: #2c3e50;
        text-align: left;
        padding-left: 10px;
        padding-bottom: 5px;
        font-weight: 600;
    }

    input[type=text], input[type=number], select, textarea {
        width: 100%;
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
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
    }

    .error {
        color: red;
        font-size: 16px;
        margin-top: 5px;
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

    .catsubcat {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
    }

    .cat {
        flex: 1;
        margin-right: 80px;
    }

    .subcat {
        flex: 1;
    }

    select {
        background-color: #fff;
    }

</style>
