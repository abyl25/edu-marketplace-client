<template>
    <transition name="fade">
        <div v-if="notAuthorized">
            <NotAuthorized/>
        </div>
        <div v-else-if="notFound">
            <NotFound/>
        </div>
        <div class="course-manage-container" v-else>
            <div class="back-link-wrapper">
                <router-link :to="{ path: '/instructor/home' }" class="back-link">
                    <i class="fas fa-chevron-left" style="color: red"></i> Home
                </router-link>
            </div>
            <div class="sidebar">
                <span class="sidebar-el" v-bind:key="item.id" v-for="item in items" :class="{active: activeElementId === item.id}" v-on:click="activate(item.id, item.link)">
                    <img :src="getImageUrl(item.image)" alt="" style="vertical-align: -5px"> {{ item.text }}
                </span>
            </div>
            <div class="main-content">
                <router-view @notAuthorized="handleNotAuthorized" @notFound="handleNotFound"></router-view>
            </div>
        </div>
    </transition>
</template>

<script>
    import axios from 'axios';
    import { mapGetters } from 'vuex';
    import NotAuthorized from "@/views/NotAuthorized";
    import NotFound from "@/views/NotFound";

    export default {
        name: "ICourseManage",
        components: {
            NotAuthorized, NotFound
        },
        data() {
            return {
                notAuthorized: false,
                notFound: false,
                activeElementId: 1,
                items: [{
                    id: 1,
                    text: 'Course info',
                    link: '/instructor/course/' + this.$route.params.id + '/main',
                    image: 'home_24_6d736f.png'
                }, {
                    id: 2,
                    text: 'Course image',
                    link: '/instructor/course/' + this.$route.params.id + '/image',
                    image: 'icons8-image-24.png'
                }, {
                    id: 3,
                    text: 'Course files',
                    link: '/instructor/course/' + this.$route.params.id + '/files',
                    image: 'icons8-image-24.png'
                }, {
                    id: 4,
                    text: 'Course target',
                    link: '/instructor/course/' + this.$route.params.id + '/target',
                    image: 'icons8-goal2-23-6d736f.png'
                }, {
                    id: 5,
                    text: 'Curriculum',
                    link: '/instructor/course/' + this.$route.params.id + '/curriculum',
                    image: 'icons8-table-of-content-24.png'
                }, {
                    id: 6,
                    text: 'My Students',
                    link: '/instructor/course/' + this.$route.params.id + '/students',
                    image: 'icons8-students-24.png'
                }, {
                    id: 7,
                    text: 'Settings',
                    link: '/instructor/course/' + this.$route.params.id + '/settings',
                    image: 'icons8-gear-25.png'
                }]
            }
        },
        created() {
            console.log('ICourseManage created');
            // this.checkIfAuthorized();
        },
        methods: {
            activate(id, link) {
                this.activeElementId = id;
                this.$router.push(link).catch(err => {});
            },
            getImageUrl(img) {
                return require('../../assets/' + img);
            },
            // checkIfAuthorized() {
            //     console.log('checkIfAuthorized()');
            //     axios.get(process.env.VUE_APP_API + `/api/instructor/${this.user.id}/courses/${this.$route.params.id}/checkAccess`)
            //         .then(res =>
            //             console.log(res)
            //         ).catch(err => {
            //             console.log(err.response.data);
            //             if (err.response.data === true) {
            //                 console.log('setting notAuthorized');
            //                 this.notAuthorized = true;
            //                 // this.$emit('notAuthorized');
            //             }
            //             console.log(err);
            //         });
            // },
            handleNotAuthorized() {
                this.notAuthorized = true;
            },
            handleNotFound() {
                this.notFound = true;
            }
        },
        computed: {
            ...mapGetters(['user']),
        }
    }
</script>

<style scoped>
    /* Transitions */
    .fade-enter-active {
        transition: all ease .5s;
    }
    .fade-enter, .fade-leave {
        opacity: 0;
    }

    /*  */
    .course-manage-container {
        display: flex;
        padding: 50px 70px 50px 50px;
        background-color: #f7f9fa;   /*  #f5f6f7;  #edf2f5;   */
    }

    .sidebar {
        /*flex-basis: 280px;*/
        flex: 1;
        display: flex;
        flex-direction: column;
        border: 1px solid #ddede1;
        border-radius: 3px;
        background-color: #f5f6f7;
        /*background-color: #29303b;  !* #fff;  #edf2f5;  *!*/
        overflow:hidden;
    }

    .sidebar-el {
        border-bottom: 1px solid #ddede1;
        /*border-radius: 3px;*/
        padding: 20px 25px;
        text-decoration: none;
        text-align: left;
        color: #57635b;  /*  #6d736f;  */
        font-size: 17px;
        cursor: pointer;
        user-select: none;
    }

    .active {
        background-color: #aaded6;  /* #a3c2bd; */
    }

    .icon {
        color: #6d736f;
    }

    .main-content {
        flex: 3.5;
        flex-shrink: 3;
        border: 1px solid transparent;
        border-radius: 3px;
        background-color:  #fff;
        /*background-color: #cfe3df; !* #b5ffe9; *!*/
        box-shadow: 0 2px 8px 2px rgba(20,23,28,.15);
        overflow:hidden;
    }

    .back-link-wrapper {
        /*border: 1px solid #000;*/
        position: absolute;
        top: 75px;
    }
    .back-link {
        /*padding: 5px 10px;*/
        text-decoration: none;
        color: #6d736f;
        font-size: 18px;
    }

</style>
