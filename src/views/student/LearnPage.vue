<template>
    <div class="app-column-container">
        <div class="sidebar-column">
            <div class="sidebar-header">
                <h2>Course content</h2>
            </div>
            <div class="sidebar-content">
<!--                <template v-if="this.course."></template>-->
                <div class="course-section" v-bind:key="section.id" v-for="section in this.course.sections">
                    <div class="section-heading" @click="setActiveSection(section.id)">
                        <h3 class="section-title">{{ section.name }}</h3>
                        <span class="section-chevron">
                            <img src="../../assets/chevron-down.png" alt="" class="arrow" :class="{'arrow--rotate': section.id === activeSectionId}">
                        </span>
                        <div class="section-lecture-stats"></div>
                    </div>
                    <transition-group name="items">
                        <ul class="section-lecture-list" v-bind:key="lecture.id" v-for="lecture in section.lectures" v-show="section.id === activeSectionId ">
                            <li class="section-lecture-list-item" :class="{'active-lecture': lecture.id === activeLectureId}" @click="setActiveLecture(lecture.id)">
                                <router-link class="item-link" to="">  <!--  :to="lecture.link"  -->
                                    <p class="lecture-title">{{ lecture.name }}</p>
                                    <div class="lecture-type-container">
                                        <span class="lecture-type">
                                            <img src="../../assets/icons8-play-14.png" alt="" style="vertical-align: -2px">
                                        </span>
                                        <span class="lecture-duration">2min</span>
                                    </div>
                                </router-link>
                            </li>
                        </ul>
                    </transition-group>
                </div>
            </div>
        </div>

        <div class="content-column">
            <div class="video-player">
                <vue-plyr ref="player" >
                    <transition name="video">
<!--                        <video src="https://vs2.coursehunter.net/udemy-ru-react-redux/lesson1.mp4"></video>-->
<!--                        <video src="http://localhost:8081/api/static/video1/lesson1.mp4"></video>-->
                        <video src="http://localhost:8081/api/static/video/sample"></video>
                        <!-- <video poster="../../assets/1.png" :src="activeVideoLink"></video>-->
                    </transition>
                </vue-plyr>
            </div>

            <div class="menu-tab-container">
                <tabs :options="{ useUrlFragment: false }" @clicked="tabClicked" @changed="tabChanged">
                    <tab name="Overview">
                        The First tab
                    </tab>
                    <tab name="Q&A">
                        The second tab
                        <qa></qa>
                    </tab>
                    <tab name="Announcements">
                        The third tab
                    </tab>
<!--                    <tab prefix="<span class='glyphicon glyphicon-star'></span> "-->
<!--                         name="Prefix and suffix"-->
<!--                         suffix=" <span class='badge'>4</span>">-->
<!--                        A prefix and a suffix can be added-->
<!--                    </tab>-->
                </tabs>
            </div>
        </div>

    </div>
</template>

<script>
    import {Tabs, Tab} from 'vue-tabs-component';
    import 'vue-tabs-component/docs/resources/tabs-component.css';
    import QA from "@/views/student/QA";
    import sectionData from "@/data/sectionData";
    import {COURSE_REQUEST} from "@/store/actions";

    export default {
        name: "LearnPage",
        components: {
            Tabs,
            Tab,
            'qa': QA
        },
        data() {
            return {
                course: {},
                showSectionMenuItems: false,
                activeSectionId: null,
                activeLectureId: null,
                settingVideoLink: false,
                activeVideoLink: 'https://vs2.coursehunter.net/udemy-ru-react-redux/lesson1.mp4',
                // sections: sectionData.sections
            }
        },
        computed: {
            sections() {
                return this.course.sections;
            },
            nestedLectures() {
                return this.sections.map(s => s.lectures);
            },
            lectures() {
                return this.nestedLectures.flat();
            }
        },
        created() {
            this.activeSectionId = parseInt(localStorage.getItem("activeSectionId"));
            this.activeLectureId = parseInt(localStorage.getItem("activeLectureId"));
            this.getCourseDetails();
        },
        mounted() {
            let player = this.$refs.player.player;
            // console.log(player);
        },
        methods: {
            getCourseDetails() {
                const courseId = this.$route.params.course_id;
                // this.course = this.courses.filter(c => c.id == courseId);
                this.$store.dispatch(COURSE_REQUEST, courseId)
                    .then(res => {
                        console.log(res.data);
                        this.course = res.data;
                    })
                    .catch(err => {
                        console.log(err);
                        console.log(err.response.data);
                    });
            },
            getVideoLink(title, lecture) {
                return `${process.env.VUE_APP_API}/${title}/videos/${lecture.videoName}.${lecture.videoFormat}`;
            },
            setActiveSection(sectionId) {
                this.activeSectionId = this.activeSectionId === sectionId ? null : sectionId;
                localStorage.setItem("activeSectionId", this.activeSectionId);
            },
            setActiveLecture(lectureId) {
                if (this.activeLectureId === lectureId) return;
                this.settingVideoLink = true;
                this.activeLectureId = lectureId;
                localStorage.setItem("activeLectureId", this.activeLectureId);

                // let nestedLectures = this.nestedLectures;
                // console.log(nestedLectures);
                let lecture = this.lectures.flat().filter(l => l.id === lectureId)[0];
                console.log(lecture);
                this.activeVideoLink = lecture.video_link;

                let player = this.$refs.player.player;
                player.media.src = this.getVideoLink(this.course.title, lecture);
                this.settingVideoLink = false;
            },
            tabClicked (selectedTab) {
                // console.log('Current tab re-clicked:' + selectedTab.tab.name);
            },
            tabChanged (selectedTab) {
                // console.log('Tab changed to:' + selectedTab.tab.name);
            },
        }
    }
</script>

<style scoped>
    /* Transitions */
    .fade-enter-active {
        transition: all ease-in-out .3s;
    }
    .fade-enter, .fade-leave {
        opacity: 0;
    }
    /* */
    .items-enter-active, .items-leave-active {
        transition: all ease-in-out .3s;
    }
    .items-enter, .items-leave-to {
        height: 0;
        opacity: 0;
        /*transform: translateY(-5px);*/
        /*transform: scaleY(0);  */
    }
    /* */
    .video-enter-active {
        transition: all ease-in-out .5s;
    }
    .video-enter, .video-leave {
        opacity: 0;
    }

    /* */
    .app-column-container {
        display: flex;
    }

    .sidebar-column {
        width: 30%;
        /*width: 350px;*/
    }

    .sidebar-header {
        font-size: 16px;
        font-weight: 600;
        line-height: 1.5em;
        display: flex;
        justify-content: space-between;
        padding: 16px;
        border: 1px solid #dedfe0;
        border-right: none;
    }

    .sidebar-content {
        /*z-index: 1;*/
        /*background-color: #fff;*/
        border: 1px solid #e8e9eb;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .course-section {
        border-bottom: 1px solid #dedfe0;
    }

    .section-heading {
        position: relative;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        flex-direction: column;
        padding: 16px;
        background-color: #f7f8fa;
        user-select: none;
    }
    .section-heading:hover {
        cursor: pointer;
        background-color: #e6eaed;
    }

    .section-title {
        text-align: left;
        font-size: 15px;
        font-weight: 600;
        line-height: 1.43em;
        max-width: 100%;
        margin-right: 24px;
    }

    .section-chevron {
        position: absolute;
        right: 16px;
    }

    .arrow {
        max-height: 8px;
        transition: transform 0.2s ease-in-out;
    }
    .arrow--rotate {
        transform: rotate(180deg);
    }

    /**/
    .section-lecture-list {
        list-style: none;
        /*transition: transform .5s ease-in-out;*/
    }

    .section-lecture-list-item {
        color: #14171c;
        padding: 8px 16px 8px 30px;
    }
    .section-lecture-list-item:hover {
        background-color: #cbece7;
        cursor: pointer;
    }

    .curriculum-item {
        /*display: flex;*/
        /*justify-content: space-between;*/
        /*color: #14171c;*/
        /*padding: 8px 16px;*/
    }

    .item-link {
        display: block;
        text-decoration: none;
        text-align: left;
    }

    .lecture-title {
        color: #14171c;
        /*text-align: left;*/
    }

    .lecture-duration {
        margin-left: 3px;
        color: #007791;
        font-size: 14px;
    }

    .active-lecture {
        background-color: #d5f5f0;
    }

    /**/
    .video-player {
        width: 100%;
    }

    .video_placeholder {
        height: 85vh;
    }

    .menu-tab-container {
        margin: 3em 1em;
    }

    /* vue-tabs-component css override */
    .tabs-component {
        margin: 0;
    }

</style>
