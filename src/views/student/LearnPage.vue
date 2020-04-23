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
                            <img src="../../assets/chevron-down.png" alt="" class="arrow" :class="{'arrow--rotate': isSectionActive(section.id)}" draggable="false">
                        </span>
                        <div class="section-lecture-stats"></div>
                    </div>

                    <transition-group name="items">
                        <ul class="section-lecture-list" v-bind:key="lecture.id" v-for="(lecture, i) in section.lectures" v-show="isSectionActive(section.id)">
                            <li class="section-lecture-list-item" :class="{'active-lecture': lecture.id === activeLectureId}" @click="setActiveLecture(lecture.id)">
                                <router-link class="item-link" to="">  <!--  :to="lecture.link"  -->
                                    <p class="lecture-title">{{ i+1 + '. ' + lecture.name }}</p>
                                    <div class="lecture-type-container">
                                        <span class="lecture-type">
                                            <img src="../../assets/icons8-play-14.png" alt="" style="vertical-align: -2px">
                                        </span>
                                        <span class="lecture-duration">{{ getVideoDuration(lecture.video.duration) }}</span>
                                    </div>
                                </router-link>
                                <span class="checkmark-icon-wrapper">
                                    <input type="checkbox" :id="lecture.id" class="inp-cbx" style="display: none;" :value="lecture.id" v-model="completedLectureIds" @change="toggleComplete($event, lecture)"/>
                                    <label class="cbx" :for="lecture.id" title="mark complete">
                                        <span class="cbx-span">
                                            <svg width="12px" height="9px" viewbox="0 0 12 9"><polyline points="1 5 4 8 11 1"></polyline></svg>
                                        </span>
                                    </label>
                                </span>
                            </li>
                            <li class="files-content" :key="file.id" v-for="file in lecture.files">
                                <img src="../../assets/file-02.png" height="25px" width="25px" alt="" draggable="false" style="user-select: none">
                                <a :href="getFileLink(course.title, file.fileName, file.fileFormat)" target="_blank" :title="`${file.fileName}.${file.fileFormat}`">{{ `${file.fileName}.${file.fileFormat}` }}</a>
                            </li>
                        </ul>
                    </transition-group>
                </div>
            </div>

            <div class="rating-wrapper">
                <template v-if="courseFetched">
                    <Rating :courseId="this.$route.params.course_id" :review="this.course.reviewDto"/>
                </template>
                <template class="cert-wrapper" v-if="courseFetched && canGetCertificate()">
                    <a :href="getCertificateLink()" class="cert-link">Get certificate</a>
                </template>
            </div>

            <sweet-modal ref="modal" overlay-theme="dark">
                <div class="cert-wrapper">
                    <h2>Congratulations! You have finished the course</h2>
                    <a :href="getCertificateLink()" class="cert-link-2" @click="closeCertificateModal">Get your certificate</a>
                </div>
            </sweet-modal>
        </div>

        <div class="content-column">
            <div class="video-player">
                <vue-plyr ref="player" >
                    <transition name="video">
                        <video :poster="this.activeVideoThumbnail" :src="this.activeVideoLink"></video>
                    </transition>
                </vue-plyr>
            </div>

            <div class="menu-tab-container">
                <tabs :options="{ useUrlFragment: false, defaultTabHash: 'qa' }" @clicked="tabClicked" @changed="tabChanged">
                    <tab name="Overview">
                        The First tab
                    </tab>
                    <tab id="qa" name="Q&A">
                        <template v-if="activeLectureId">
                            <qa :activeLectureId="activeLectureId"></qa>
                        </template>
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
    import { SweetModal } from 'sweet-modal-vue';
    import QA from "@/views/student/QA";
    import Rating from "@/components/Rating";
    import {COURSE_REQUEST} from "@/store/actions";
    import { mapGetters } from "vuex";
    import axios from 'axios';

    export default {
        name: "LearnPage",
        components: {
            Tabs, Tab, SweetModal,
            'qa': QA,
            Rating,
        },
        data() {
            return {
                course: {},
                courseFetched: false,
                showSectionMenuItems: false,
                activeSectionId: null,
                activeSectionIds: JSON.parse(localStorage.getItem("activeSectionIds")) || [],
                activeLectureId: null,
                settingVideoLink: false,
                activeVideoLink: '',
                activeVideoThumbnail: '',
                completedLectureIds: [],
            }
        },
        computed: {
            ...mapGetters(['user']),
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
        methods: {
            getCourseDetails() {
                const courseId = this.$route.params.course_id;
                axios.get(`${process.env.VUE_APP_API}/api/user/${this.user.id}/courses/${courseId}`)
                    .then(res => {
                        console.log(res.data);
                        this.course = res.data;
                        this.initializeReviewDto();
                        this.setFirstLectureActive();
                        this.setFirstVideoLecture();
                        this.completedLectureIds = this.course.completedLectures;
                        this.courseFetched = true;
                    })
                    .catch(err => {
                        console.log(err);
                        console.log(err.response.data);
                    });
            },
            isSectionActive(sectionId) {
                return this.activeSectionIds.includes(sectionId);
            },
            setActiveSection(sectionId) {
                // this.activeSectionId = this.activeSectionId === sectionId ? null : sectionId;
                if (this.isSectionActive(sectionId)) {
                    this.activeSectionIds = this.activeSectionIds.filter(s => s !== sectionId);
                } else {
                    this.activeSectionIds = this.activeSectionIds.concat([sectionId]);
                }
                localStorage.setItem("activeSectionIds", JSON.stringify(this.activeSectionIds));
            },
            setActiveLecture(lectureId) {
                if (this.activeLectureId === lectureId) return;
                this.settingVideoLink = true;
                this.activeLectureId = lectureId;
                localStorage.setItem("activeLectureId", this.activeLectureId);

                let lecture = this.lectures.filter(l => l.id === lectureId)[0];
                this.activeVideoLink = this.getVideoLink(this.course.title, lecture);
                this.activeVideoThumbnail = this.getThumbnailLink(this.course.title, lecture.video.thumbnail);
                this.settingVideoLink = false;
            },
            setFirstLectureActive() {
                if (localStorage.getItem("activeLectureId") == null) {
                    localStorage.setItem("activeLectureId", this.lectures[0].id);
                    this.activeLectureId = this.lectures[0].id;
                }
                if (localStorage.getItem("activeSectionId") == null) {
                    localStorage.setItem("activeSectionId", this.sections[0].id);
                    this.activeSectionId = this.sections[0].id;
                }
            },
            setFirstVideoLecture() {
                let firstVideoLecture = this.lectures[0];
                this.activeVideoLink = this.getVideoLink(this.course.title, firstVideoLecture);
                this.activeVideoThumbnail = this.getThumbnailLink(this.course.title, firstVideoLecture.video.thumbnail);
            },
            getVideoLink(title, lecture) {
                return `${process.env.VUE_APP_API}/${title}/videos/${lecture.video.name}.${lecture.video.extension}`;
            },
            getThumbnailLink(title, videoThumbnail) {
                return `${process.env.VUE_APP_API}/${title}/videos/${videoThumbnail}`;
            },
            getFileLink(title, fileName, fileFormat) {
                return `${process.env.VUE_APP_API}/${title}/files/${fileName}.${fileFormat}`;
            },
            getVideoDuration(duration) {
                // let duration = this.$refs.player.player.media.duration;
                let hours = Math.floor(duration / 3600);
                let minutes = Math.floor((duration % 3600) / 60);
                let seconds = Math.floor(duration % 60);
                return minutes + ':' + seconds;
            },
            //
            toggleComplete(e, lecture) {
                if (e.target.checked) {
                    console.log('checked id: ' + lecture.id);
                } else {
                    console.log('unchecked id: ' + lecture.id);
                }
                axios.post(`${process.env.VUE_APP_API}/api/user/${this.user.id}/lectures/${lecture.id}`)
                    .then(res => {
                        console.log(res.data);
                        if (this.canGetCertificate()) {
                            this.openCertificateModal();
                        }
                    })
                    .catch(err => console.log(err));
            },
            getCompletedLectures() {
                axios.get(`${process.env.VUE_APP_API}/api/user/${this.user.id}/course/${this.course.id}/lectures`)
                    .then(res => {
                        console.log(res.data);
                        this.completedLectureIds = res.data;
                        console.log(this.getLecturesCount());
                    })
                    .catch(err => console.log(err));
            },
            getLecturesCount() {
                let count = 0;
                this.course.sections.forEach(s => {
                    count += s.lectures.length;
                })
                return count;
            },
            initializeReviewDto() {
                if (this.course.reviewDto === null) {
                    this.course.reviewDto = {
                        id: 0,
                        content: '',
                        rating: 0
                    }
                }
            },
            mapCompletedLectures() {
                this.completedLectureIds = this.user.completedLectures.map(l => l.id);
            },
            isLectureCompleted(lectureId) {
                return this.completedLectureIds.filter(l => l.id === lectureId).length !== 0;
            },
            canGetCertificate() {
                return this.completedLectureIds.length === this.getLecturesCount();
            },
            getCertificateLink() {
                return `${process.env.VUE_APP_API}/api/user/${this.user.id}/courses/${this.course.id}/certificate`;
            },
            // modal
            openCertificateModal() {
                this.$refs.modal.open();
            },
            closeCertificateModal() {
                this.$refs.modal.close();
            },
            // tabs
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
        min-width: 200px;
        /*width: 350px;*/
        /*overflow-y: auto;*/
    }

    .sidebar-header {
        font-size: 16px;
        font-weight: 600;
        line-height: 1.5em;
        display: flex;
        justify-content: space-between;
        padding: 12px 16px;
        border: 1px solid #dedfe0;
        border-right: none;
    }

    .sidebar-header h2 {
        font-size: 16px;
        line-height: 1.5em;
    }

    .sidebar-content {
        max-height: 80vh;
        /*z-index: 1;*/
        /*background-color: #fff;*/
        border: 1px solid #e8e9eb;
        overflow-y: auto;
        /*overflow-x: hidden;*/
    }

    .course-section {
        border-bottom: 1px solid #dedfe0;
        overflow: hidden;
    }

    .section-heading {
        position: relative;
        display: flex;
        justify-content: space-between;
        /*align-items: center;*/
        flex-wrap: wrap;
        flex-direction: column;
        /*height: 70px;*/
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
        line-height: 1.5em;
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
        user-select: none;
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
        display: flex;
        /*flex: 2;*/
        /*flex-basis: ;*/
        color: #14171c;
        padding: 8px 7.5%;
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

    /**/
    .item-link {
        flex: 2;
        display: block;
        text-decoration: none;
        text-align: left;
    }
    /*.item-link:hover {*/
    /*    background-color: #cbece7;*/
    /*    cursor: pointer;*/
    /*}*/

    .lecture-title {
        color: #14171c;
        /*text-align: left;*/
    }

    .lecture-duration {
        margin-left: 3px;
        color: #007791;
        font-size: 14px;
    }

    .checkmark-icon-wrapper {
        /*display: flex;*/
        /*align-items: flex-start;*/
        /*padding: 7px;*/
        /*vertical-align: -5px;*/
        position: relative;
        top: 2px;
    }

    /* checkbox style */
    .cbx {
        -webkit-user-select: none;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
        cursor: pointer;
    }
    .cbx span {
        display: inline-block;
        vertical-align: middle;
        transform: translate3d(0, 0, 0);
    }
    .cbx span {
        position: relative;
        width: 23px;
        height: 23px;
        border-radius: 50%;
        transform: scale(1);
        vertical-align: middle;
        border: 1px solid #B9B8C3;
        transition: all 0.2s ease;
    }
    .cbx span svg {
        position: absolute;
        z-index: 1;
        top: 6px;
        left: 5px;
        fill: none;
        stroke: white;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-dasharray: 16px;
        stroke-dashoffset: 16px;
        transition: all 0.3s ease;
        transition-delay: 0.1s;
        transform: translate3d(0, 0, 0);
    }
    .cbx span:before {
        content: "";
        width: 100%;
        height: 100%;
        background: #506EEC;
        display: block;
        transform: scale(0);
        opacity: 1;
        border-radius: 50%;
        transition-delay: 0.2s;
    }
    .cbx:hover span {
        border-color: #3c53c7;
    }
    .inp-cbx:checked + .cbx span {
        border-color: #3c53c7;
        background: #3c53c7;
        animation: check 0.6s ease;
    }
    .inp-cbx:checked + .cbx span svg {
        stroke-dashoffset: 0;
    }
    .inp-cbx:checked + .cbx span:before {
        transform: scale(2.2);
        opacity: 0;
        transition: all 0.6s ease;
    }
    @keyframes check {
        50% {
            transform: scale(1.2);
        }
    }
    /* checkbox style end */

    .active-lecture {
        background-color: #d5f5f0;
    }

    .files-content {
        display: flex;
        align-items: center;
        padding: 5px 6%;
    }
    .files-content:hover {
        background-color: #cbece7;
        cursor: pointer;
    }
    .files-content a {
        text-decoration: none;
        color: #253e44;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .rating-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 15px 5px;
    }

    .cert-link {
        display: block;
        border: 1px solid #8e9e9b;
        border-radius: 2px;
        width: 135px;
        margin-top: 10px;
        padding: 7px 10px;
        color: #13428a;
        font-size: 15px;
        text-decoration: none;
    }
    .cert-wrapper h2 {
        margin-bottom: 20px;
    }
    .cert-link-2 {
        border: 1px solid #039BE5;  /*  #8e9e9b;  */
        border-radius: 2px;
        padding: 10px 15px;
        color: #22334c;;
        text-decoration: none;
    }
    .cert-link-2:hover {
        color: #0e356f;
        background-color: #f1f1f1;
        transition: .1s;
    }

    /*  */
    .content-column {
        width: 100%;
        padding: 20px 1.5% 30px 5px;
    }

    .video-player {
        width: 100%;
        /*height: 90vh;*/
        border-radius: 3px;
        overflow: hidden;
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
    .tabs-component-panels {
        padding: 10px;
    }

</style>
