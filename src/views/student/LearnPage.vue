<template>
    <div class="app-column-container">
        <div class="sidebar-column">
            <div class="sidebar-header">
                <h2>Course content</h2>
            </div>
            <div class="sidebar-content">
                <div class="course-section" v-bind:key="section.id" v-for="section in sections">
                    <div class="section-heading" @click="setActiveSection(section.id)">
                        <h3 class="section-title">{{ section.title }}</h3>
                        <span class="section-chevron">
                            <img src="../../assets/chevron-down.png" alt="" class="arrow" :class="{'arrow--rotate': section.id === activeSectionId}">
                        </span>
                        <div class="section-lecture-stats"></div>
                    </div>
                    <transition-group name="fade">
                        <ul v-bind:key="lecture.lecture_id" v-for="lecture in section.lectures" v-show="section.id === activeSectionId ">
                            <router-link :to="lecture.link">{{ lecture.title }}</router-link>
                        </ul>
                    </transition-group>
                </div>
            </div>
        </div>

        <div class="content-column">
            <div class="video-player">
                <vue-plyr>
                    <video poster="../../assets/1.png" src="https://vs2.coursehunter.net/udemy-ru-react-redux/lesson1.mp4">
                    </video>
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
                    <tab prefix="<span class='glyphicon glyphicon-star'></span> "
                         name="Prefix and suffix"
                         suffix=" <span class='badge'>4</span>">
                        A prefix and a suffix can be added
                    </tab>
                </tabs>
            </div>
        </div>

    </div>
</template>

<script>
    import {Tabs, Tab} from 'vue-tabs-component';
    import 'vue-tabs-component/docs/resources/tabs-component.css';

    import QA from "@/views/student/QA";

    export default {
        name: "LearnPage",
        components: {
            Tabs,
            Tab,
            'qa': QA
        },
        data() {
            return {
                showSectionMenuItems: false,
                activeSectionId: null,
                sections: [
                    {
                        id: 1,
                        title: 'Getting started',
                        lectures: [
                            {
                                lecture_id: 1,
                                title: 'Welcome',
                                link: '/course/1/learn/lecture/1'
                            },
                            {
                                lecture_id: 2,
                                title: 'Software',
                                link: '/course/1/learn/lecture/2'
                            },
                            {
                                lecture_id: 3,
                                title: 'Setup',
                                link: '/course/1/learn/lecture/3'
                            }
                        ]
                    },
                    {
                        id: 2,
                        title: 'Hello world',
                        lectures: [
                            {
                                lecture_id: 1,
                                title: 'Intro',
                                link: '/course/1/learn/lecture/4'
                            },
                            {
                                lecture_id: 2,
                                title: 'Render html',
                                link: '/course/1/learn/lecture/5'
                            }
                        ]
                    },
                    {
                        id: 3,
                        title: 'Product Component'
                    },
                    {
                        id: 4,
                        title: 'Templates'
                    },
                ]
            }
        },
        methods: {
            tabClicked (selectedTab) {
                // console.log('Current tab re-clicked:' + selectedTab.tab.name);
            },
            tabChanged (selectedTab) {
                // console.log('Tab changed to:' + selectedTab.tab.name);
            },
            setActiveSection(sectionId) {
                this.activeSectionId = this.activeSectionId === sectionId ? null : sectionId;
            }
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

    .app-column-container {
        display: flex;
    }

    .sidebar-column {
        width: 350px;
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


    .video-player {
        /*width: 70%;*/
    }

    .menu-tab-container {
        margin: 3em 1em;
    }

    /* vue-tabs-component css override */
    .tabs-component {
        margin: 0;
    }

</style>
