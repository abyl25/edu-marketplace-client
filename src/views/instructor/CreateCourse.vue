<template>
    <div class="container">
        <div class="add-form">
            <form @submit="addCourse">
                <label for="title">Title</label>
                <input type="text" id="title" v-model="title" placeholder="Title.." autocomplete="off">

                <label for="subtitle">Subtitle</label>
                <input type="text" id="subtitle" v-model="subtitle" placeholder="Subtitle.." autocomplete="off">

                <label>Description</label>
                <div class="editor">
                    <froala id="edit" :tag="'textarea'" :config="config" v-model="description"></froala>
                </div>
                <label for="price">Price</label>
                <input type="number" id="price" v-model="price" placeholder="Price" autocomplete="off">

                <div class="langlev">
                    <div class="lang">
                        <label for="language">Language</label>
                        <select id="language" v-model="language" name="language">
                            <option value="select" selected>--Select--</option>
                            <option value="Kazakh">Kazakh</option>
                            <option value="Russian">Russian</option>
                            <option value="English">English</option>
                        </select>
                    </div>
                    <div class="lev">
                        <label for="level">Level</label>
                        <select id="level" v-model="level" name="level">
                            <option value="select">--Select--</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>
                </div>

                <div class="catsubcat">
                    <div class="cat">
                        <label for="category">Category</label>
                        <select id="category" v-model="category" name="category">
                            <option value="select">--Select--</option>
                            <option value="Development">Development</option>
                            <option value="Business">Business</option>
                            <option value="Design">Design</option>
                        </select>
                    </div>

                    <div class="subcat">
                        <label for="subcategory">Subcategory</label>
                        <select id="subcategory" class="subcte" v-model="subcategory" name="subcategory">
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
                <div class="topic">
                    <label for="topic">Topic</label>
                    <select id="topic" v-model="topic" name="topic">
                        <option value="select">--Select--</option>
                        <option value="React">React</option>
                        <option value="Vue.JS">Vue.JS</option>
                        <option value="Angular">Angular</option>
                    </select>
                </div>
                <div>
<!--                    <multiselect v-model="value" :options="options"></multiselect>-->
                    <multiselect v-model="value" :options="options" :multiple="true" group-values="libs" group-label="language"
                        :group-select="true" placeholder="Type to search" track-by="name" label="name">
                        <span slot="noResult">Oops! No elements found. Consider changing the search query.</span>
                    </multiselect>
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
        ]

      }
    },
    methods: {
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
          })
          .catch(err => {
              console.log(err);
              console.log(err.response.data);
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
    .editor {
        margin: 6px 0 16px 0;
    }

    .container {
        display: flex;
        justify-content: center;
        margin: 30px 0;
    }
    
    .add-form {
        width: 60%;
        border-radius: 5px;
        padding: 20px;
        background-color: #f2f2f2;
    }

    .langlev {
        display: flex;
        justify-content: space-between;
    }

    .lang {
        flex: 1;
        margin-right: 80px;
    }

    .lev {
        flex: 1;
    }

    .catsubcat {
        display: flex;
        justify-content: space-between;
    }

    .cat {
        flex: 1;
        margin-right: 80px;
    }

    .subcat {
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
    }

</style>
