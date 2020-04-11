<template>
    <div>
        <div class="sub-header">
            <h1 class="title">Course Curriculum</h1>
            <p>{{ $t('message.hello') }}</p>
        </div>
        <div class="main-content-container">
            <div class="sections-container">
                <draggable :list="sections" handle=".handle">
                    <div class="empty-section" v-if="sections.length === 0"></div>
                    <template v-else>
                        <div class="section" :key="section.id" v-for="(section, i) in sections">
                            <!-- Show New Section -->
                            <div class="add-section-container" v-if="activeSection === section.id">
                                <p class="section-label">New section:</p>
                                <input type="text" class="form-control" v-model="section.name" placeholder="Enter a title" @keyup.enter="saveSection(section, i)" @keyup.esc="cancelSection"/>
                                <div class="buttons-container">
                                    <button @click="saveSection(section, i)" class="save-section-btn btn-sm mr-10">Save</button>
                                    <!-- <v-button :onClick="saveSection(section)" myClass="save-section-btn btn-sm">Save</v-button>-->
                                    <v-button :onClick="cancelSection" myClass="btn-tertiary btn-sm">Cancel</v-button>
                                </div>
                            </div>
                            <!-- Show Edit Section -->
                            <div class="add-section-container" v-else-if="editSectionId === section.id">
                                <p class="section-label">Section: {{ i + 1 }}</p>
                                <input type="text" class="form-control" v-model="section.name" placeholder="Enter a title"/>
                                <div class="buttons-container">
                                    <button @click="editSection(section)" class="save-section-btn btn-sm mr-10">Save</button>
                                    <v-button :onClick="cancelEditSection" myClass="btn-tertiary btn-sm">Cancel</v-button>
                                </div>
                            </div>
                            <!-- Course Section List -->
                            <div class="section-list" v-else>
                                <div class="section-header" @mouseover="sectionHoveredId=section.id" @mouseleave="sectionHoveredId=0">
                                    <span class="handle" v-show="sectionHoveredId === section.id">
                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 172 172"
                                            style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#535961"><path d="M86,0l-28.66667,43h21.5v35.83333h-35.83333v-21.5l-43,28.66667l43,28.66667v-21.5h35.83333v35.83333h-21.5l28.66667,43l28.66667,-43h-21.5v-35.83333h35.83333v21.5l43,-28.66667l-43,-28.66667v21.5h-35.83333v-35.83333h21.5z"></path></g></g></svg>
                                    </span>
                                    <span class="section-id">Section {{ i + 1 }}: </span>
                                    <span class="section-title">{{ section.name }}</span>
                                    <template v-if="sectionHoveredId === section.id">
                                        <span class="section-control-btn" @click="showEditSection(section)">
                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 172 172"
                                                 style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#686f7a"><path d="M121.38542,7.61458l-93.61458,93.61458l-20.07227,63.07226l63.07227,-20.07226l93.61458,-93.61458c0,0 -0.71667,-15.05717 -14.33333,-28.66667c-13.61667,-13.61667 -28.66667,-14.33333 -28.66667,-14.33333zM124.07292,19.26042c7.68267,1.462 13.7993,4.71645 18.51855,9.56022c4.71925,4.84377 8.04111,11.27686 10.14811,19.10645l-12.98958,12.98958l-28.66667,-28.66667l10.30208,-10.30208zM35.67936,108.40983c0.08473,0.02134 8.61749,2.17868 17.1748,10.736c9.31667,8.6 10.75,16.48893 10.75,16.48893l0.30794,0.36393l-25.43327,8.18848l-10.722,-10.72201z"></path></g></g></svg>
                                        </span>
                                        <span class="section-control-btn" @click="deleteSection(section)">
                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 172 172"
                                                 style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#686f7a"><path d="M72.76923,-0.20673c-5.53004,0 -10.95673,1.08534 -14.88462,4.96154c-3.92788,3.87621 -5.16827,9.38041 -5.16827,15.09135h-26.25481c-3.64363,0 -6.61538,2.97176 -6.61538,6.61538h-6.61538v13.23077h145.53846v-13.23077h-6.61538c0,-3.64363 -2.97176,-6.61538 -6.61538,-6.61538h-26.25481c0,-5.71094 -1.24038,-11.21514 -5.16827,-15.09135c-3.92788,-3.8762 -9.35456,-4.96154 -14.88462,-4.96154zM72.76923,13.4375h26.46154c3.61779,0 4.75481,0.85276 5.16827,1.24038c0.41346,0.38762 1.24038,1.47296 1.24038,5.16827h-39.27885c0,-3.69531 0.82692,-4.78065 1.24038,-5.16827c0.41346,-0.38762 1.55048,-1.24038 5.16827,-1.24038zM26.46154,46.30769v105.84615c0,10.93089 8.91526,19.84615 19.84615,19.84615h79.38462c10.93089,0 19.84615,-8.91526 19.84615,-19.84615v-105.84615zM52.92308,66.15385h13.23077v79.38462h-13.23077zM79.38462,66.15385h13.23077v79.38462h-13.23077zM105.84615,66.15385h13.23077v79.38462h-13.23077z"></path></g></g></svg>
                                        </span>
                                    </template>
                                </div>

                                <!--  Lectures -->
                                <draggable tag="ul" :list="section.lectures" class="list-group" handle=".handle1">
                                    <li class="list-group-item" v-for="(lecture, idx) in section.lectures" :key="lecture.id" @mouseover="lectureHoveredId=lecture.id" @mouseleave="lectureHoveredId=0">

                                        <!--  New Lecture Input -->
                                        <div class="add-lecture-container" v-if="activeLecture === lecture.id">
                                            <p class="section-label">New lecture:</p>
                                            <input type="text" class="form-control" v-model="lecture.name" placeholder="Enter title" @keyup.enter="saveLecture(lecture, section.id)" @keyup.esc="cancelLecture(section)"/>
                                            <div class="buttons-container">
                                                <button @click="saveLecture(lecture, section.id)" class="save-section-btn btn-sm mr-10">Save</button>
                                                <button @click="cancelLecture(section)" class="btn-tertiary btn-sm">Cancel</button>
                                            </div>
                                        </div>

                                        <!-- Show Edit Lecture -->
                                        <div class="add-section-container" v-else-if="editLectureId === lecture.id">
                                            <p class="section-label">Lecture: {{ i + 1 }}</p>
                                            <input type="text" class="form-control" v-model="lecture.name" placeholder="Enter a title" @keyup.enter="editLecture(lecture, section)" @keyup.esc="cancelEditLecture"/>
                                            <div class="buttons-container">
                                                <button @click="editLecture(lecture, section)" class="save-section-btn btn-sm mr-10">Save</button>
                                                <v-button :onClick="cancelEditLecture" myClass="btn-tertiary btn-sm">Cancel</v-button>
                                            </div>
                                        </div>

                                        <!--  Show Lectures List -->
                                        <div class="lecture-header" v-else @mouseover="lectureHoveredId=lecture.id" @mouseleave="lectureHoveredId=0">
                                            <div class="left-control-container">
                                                <span class="handle1" v-show="lectureHoveredId === lecture.id">
                                                    <svg  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 172 172"
                                                         style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#535961"><path d="M86,0l-28.66667,43h21.5v35.83333h-35.83333v-21.5l-43,28.66667l43,28.66667v-21.5h35.83333v35.83333h-21.5l28.66667,43l28.66667,-43h-21.5v-35.83333h35.83333v21.5l43,-28.66667l-43,-28.66667v21.5h-35.83333v-35.83333h21.5z"></path></g></g></svg>
                                                </span>
                                                <span class="lecture-id">Lecture {{ idx + 1 }}: </span>
                                                <span class="section-title">{{ lecture.name }}</span>

                                                <template class="control-btn-container" v-if="lectureHoveredId === lecture.id"> <!--   -->
                                                    <span class="section-control-btn bg-gr" @click="showEditLecture(lecture)">
                                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 172 172"
                                                             style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#686f7a"><path d="M121.38542,7.61458l-93.61458,93.61458l-20.07227,63.07226l63.07227,-20.07226l93.61458,-93.61458c0,0 -0.71667,-15.05717 -14.33333,-28.66667c-13.61667,-13.61667 -28.66667,-14.33333 -28.66667,-14.33333zM124.07292,19.26042c7.68267,1.462 13.7993,4.71645 18.51855,9.56022c4.71925,4.84377 8.04111,11.27686 10.14811,19.10645l-12.98958,12.98958l-28.66667,-28.66667l10.30208,-10.30208zM35.67936,108.40983c0.08473,0.02134 8.61749,2.17868 17.1748,10.736c9.31667,8.6 10.75,16.48893 10.75,16.48893l0.30794,0.36393l-25.43327,8.18848l-10.722,-10.72201z"></path></g></g></svg>
                                                    </span>
                                                    <span class="section-control-btn bg-gr" @click="deleteLecture(lecture, section)">
                                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 172 172"
                                                             style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#686f7a"><path d="M72.76923,-0.20673c-5.53004,0 -10.95673,1.08534 -14.88462,4.96154c-3.92788,3.87621 -5.16827,9.38041 -5.16827,15.09135h-26.25481c-3.64363,0 -6.61538,2.97176 -6.61538,6.61538h-6.61538v13.23077h145.53846v-13.23077h-6.61538c0,-3.64363 -2.97176,-6.61538 -6.61538,-6.61538h-26.25481c0,-5.71094 -1.24038,-11.21514 -5.16827,-15.09135c-3.92788,-3.8762 -9.35456,-4.96154 -14.88462,-4.96154zM72.76923,13.4375h26.46154c3.61779,0 4.75481,0.85276 5.16827,1.24038c0.41346,0.38762 1.24038,1.47296 1.24038,5.16827h-39.27885c0,-3.69531 0.82692,-4.78065 1.24038,-5.16827c0.41346,-0.38762 1.55048,-1.24038 5.16827,-1.24038zM26.46154,46.30769v105.84615c0,10.93089 8.91526,19.84615 19.84615,19.84615h79.38462c10.93089,0 19.84615,-8.91526 19.84615,-19.84615v-105.84615zM52.92308,66.15385h13.23077v79.38462h-13.23077zM79.38462,66.15385h13.23077v79.38462h-13.23077zM105.84615,66.15385h13.23077v79.38462h-13.23077z"></path></g></g></svg>
                                                    </span>
                                                </template>
                                            </div>

                                            <div class="right-control-container">
<!--                                                <button class="btn btn-default btn-sm pull-right">-->
<!--                                                    <span class="plus-sign"><i class="fas fa-plus"></i></span>Content-->
<!--                                                </button>-->
                                                <span class="chevron" @click="toggleLectureTab(lecture.id)">
                                                    <img src="../../assets/chevron-down.png" alt="" class="arrow" :class="{'arrow--rotate': isLectureTabOpen(lecture.id) }">
                                                </span>
                                            </div>
                                        </div>

                                        <div class="lecture-body" v-show="isLectureTabOpen(lecture.id)">
                                            <div class="lecture-content">
                                                <template v-if="lecture.hasOwnProperty('files')">
                                                    <div :key="file.id" v-for="file in lecture.files">
<!--                                                        <p>lecture: {{ file.fileName }}</p>-->
<!--                                                        <a :href="href + file.fileName" target="_blank">{{ file.fileName }}</a>-->
                                                        <a @click="openFile(file.fileName)">{{ file.fileName }}</a>
                                                    </div>

                                                </template>
                                            </div>

                                            <div class="content-upload-btn-container">
                                                <span class="upload-btn--edit">
                                                    <button class="btn btn-default btn-sm" @click="setUploadFileType(lecture.id, 'videos')">
                                                        <span class="plus-sign"><i class="fas fa-plus"></i></span>Video
                                                    </button>
                                                </span>
                                                <span class="upload-btn--edit">
                                                    <button class="btn btn-default btn-sm" @click="setUploadFileType(lecture.id, 'files')">
                                                        <span class="plus-sign"><i class="fas fa-plus"></i></span>File
                                                    </button>
                                                </span>
                                            </div>

                                            <div class="file-upload-wrapper" v-show="uploadFile.uploadFileType">
                                                <file-pond v-show="uploadFile.uploadFileType === 'videos'"
                                                    name="file"
                                                    ref="pond"
                                                    label-idle="Drop or select a video"
                                                    accepted-file-types="video/*"
                                                    :allow-multiple="false"
                                                    :instant-upload="false"
                                                    :files="myFiles"
                                                    :server="{process}"
                                                    @init="handleFilePondInit"
                                                    @addfile="onAddFile"
                                                    @processfile="processFileFinish"
                                                    @click.native="setUploadFileType(lecture.id, 'videos')"/>
                                                <file-pond v-show="uploadFile.uploadFileType === 'files'"
                                                    name="file"
                                                    ref="pond"
                                                    label-idle="Drop or select a file"
                                                    accepted-file-types="application/pdf, application/msword, application/vnd.ms-powerpoint"
                                                    :allow-multiple="false"
                                                    :instant-upload="false"
                                                    :files="myFiles"
                                                    :server="{process}"
                                                    @init="handleFilePondInit"
                                                    @addfile="onAddFile"
                                                    @processfile="processFileFinish"
                                                    @click.native="setUploadFileType(lecture.id, 'files')"/>
                                            </div>
<!--                                            accepted-file-types="image/jpeg, image/png"-->
                                        </div>
                                    </li>
                                </draggable>

                                <div class="add-lecture-btn-container">
                                    <button @click="addLectureInput(section)" class="save-section-btn plus-sign btn-sm">
                                        <span class="plus-sign"><i class="fas fa-plus"></i></span>Lecture
                                    </button>
                                </div>
                            </div>
                        </div>
                    </template>
                </draggable>

                <div class="add-section-btn-container">
                    <v-button :onClick="addSectionInput" myClass="add-answer-btn" >
                        <span class="plus-sign"><i class="fas fa-plus"></i></span>Section
                    </v-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import draggable from 'vuedraggable';
    import vueFilePond, { setOptions } from 'vue-filepond';
    import 'filepond/dist/filepond.min.css';
    import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
    import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
    import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
    import axios from 'axios';
    import Button from "@/components/Button";
    import {
        ADD_COURSE_LECTURE_REQUEST, ADD_COURSE_SECTION_REQUEST, DELETE_COURSE_SECTION_REQUEST, EDIT_COURSE_SECTION_REQUEST, INSTR_COURSE_REQUEST, EDIT_COURSE_LECTURE_REQUEST, DELETE_COURSE_LECTURE_REQUEST
    } from "@/store/actions";
    import {mapGetters} from "vuex";

    const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);

    export default {
        name: "ICourseCurriculum",
        components: {
            draggable,
            FilePond,
            'v-button': Button
        },
        data() {
            return {
                href: `${process.env.VUE_APP_API}/api/static/files/`,
                course: {},
                sections: [],
                dragging: false,
                creatingNewSection: false,
                activeSection: 0,
                activeLecture: 0,
                editSectionId: 0,
                editLectureId: 0,
                sectionHoveredId: 0,
                lectureHoveredId: 0,
                openTabLectureIds: [],
                selectedFile: null,
                myFiles: [],
                uploadFile: {
                    uploadFileLectureId: 0,
                    uploadFileType: ''
                }
            }
        },
        computed: {
            ...mapGetters(['user', 'instrCourse']),
            getLastSection() {
                return this.sections[this.sections.length-1];
            }
        },
        created() {
            this.getInstructorCourse();
        },
        methods: {
            isObjEmpty(myObj) {
                return Object.entries(myObj).length === 0 && myObj.constructor === Object
            },
            // api request
            getInstructorCourse() {
                const payload = {
                    instructorID: this.user.id,
                    courseId: this.$route.params.id
                };
                this.$store.dispatch(INSTR_COURSE_REQUEST, payload)
                    .then(res => {
                        console.log(res.data);
                        this.course = res.data;
                        this.sections = res.data.sections;
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
            // handle file upload with file pond
            handleFilePondInit() {
                // console.log('FilePond has initialized');
                // this.$refs.pond.getFiles();
            },
            onAddFile(error, file) {
                // console.log('onAddFile');
            },
            process(fieldName, file, metadata, load, error, progress, abort) {
                console.log('processing');
                let formData = new FormData();
                formData.append('file', file);
                formData.append('courseId', this.$route.params.id);
                formData.append('type', this.uploadFile.uploadFileType);
                formData.append('lectureId', this.uploadFile.uploadFileLectureId);
                // ${process.env.VUE_APP_API}
                axios.post(`http://localhost:80/api/static/files`, formData, {
                    onUploadProgress: (e) => {
                        progress(e.lengthComputable, e.loaded, e.total);
                    }
                })
                .then(res => {
                    console.log(res.data);
                    load(res.data);
                }).catch(err => {
                    console.log(err);
                    error(err.response.data);
                });

                return {
                    abort: () => {
                        abort();
                    }
                };
            },
            processFileFinish() {
                // console.log('Finished processing a file');
            },
            openFile(fileName) {
                console.log('opening pdf file in new tab');
                // window.open(this.href + fileName,'_blank');
                axios.get(this.href + fileName, {
                    responseType: 'arraybuffer', // blob
                    headers: {
                        'Accept': 'application/pdf'
                    }
                })
                    .then(res => {
                        // console.log(res.data);

                        // var windowUrl = window.URL || window.webkitURL;
                        // var url = windowUrl.createObjectURL(res.data);
                        // anchor.prop('href', url);
                        // anchor.prop('download', fileName);
                        // anchor.get(0).click();
                        // windowUrl.revokeObjectURL(url);

                        // 1)
                        // let pdfWindow = window.open("");
                        // pdfWindow.document.write(
                        //     "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
                        //     encodeURI(res.data) + "'></iframe>"
                        // );

                        // 2)
                        let file = new Blob([res.data], { type: 'application/pdf' });
                        let fileURL = window.URL.createObjectURL(file);
                        window.open(fileURL, '_blank'); // '_blank'
                    })
            },
            //
            addSectionInput() {
                if (this.sections.length === 0) {
                    const newInput = { id: 1, sectionID: 1, name: '', lectures: [] };
                    this.sections = this.sections.concat([newInput]);
                    this.activeSection = this.getLastSection.id;
                } else {
                    let lastSection = this.getLastSection;
                    if (lastSection.name) {
                        const newInput = { id: lastSection.id + 1, sectionID: lastSection.id + 1, name: '', lectures: [] };
                        this.sections = this.sections.concat([newInput]);
                        this.activeSection = lastSection.id + 1
                    }
                }
            },
            addLectureInput(section) {
                const lastLecture = section.lectures[section.lectures.length-1];
                let newLectureInput;
                if (lastLecture === undefined) {
                    newLectureInput = { id: 1, name: ''}; // , objective: ''
                    section.lectures = section.lectures.concat([newLectureInput]);
                    this.activeLecture = 1;
                } else {
                    if (lastLecture.name) {
                        newLectureInput = { id: lastLecture.id + 1, name: '' };
                        section.lectures = section.lectures.concat([newLectureInput]);
                        this.activeLecture = section.lectures[section.lectures.length-1].id;
                    }
                }
            },
            saveSection(section) {
                if (section.name) {
                    const payload = {
                        courseId: this.$route.params.id,
                        name: section.name
                    };
                    this.$store.dispatch(ADD_COURSE_SECTION_REQUEST, payload)
                        .then(res => {
                            console.log(res.data);
                        })
                        .catch(err => {
                            console.log(err);
                            console.log(err.response.data);
                        });
                    this.activeSection = 0;
                }
            },
            cancelSection() {
                this.sections = this.sections.slice(0, this.sections.length-1);
                this.activeSection = 0;
            },
            showEditSection(section) {
                this.editSectionId = section.id;
            },
            editSection(section) {
                const payload = {
                    courseId: this.$route.params.id,
                    sectionId: section.id,
                    name: section.name
                };
                this.$store.dispatch(EDIT_COURSE_SECTION_REQUEST, payload)
                    .then(res => {
                        console.log(res.data);
                        this.editSectionId = 0;
                    })
                    .catch(err => {
                        console.log(err);
                        console.log(err.response.data);
                    });
            },
            cancelEditSection() {
                this.editSectionId = 0;
            },
            deleteSection(section) {
                this.sections = this.sections.filter(s => s.id !== section.id);
                const payload = {
                    courseId: this.$route.params.id,
                    sectionId: section.id
                };
                this.$store.dispatch(DELETE_COURSE_SECTION_REQUEST, payload)
                    .then(res => {
                        console.log(res.data);
                    })
                    .catch(err => {
                        console.log(err);
                        console.log(err.response.data);
                    });
            },
            // Lecture Methods
            saveLecture(lecture, sectionId) {
                if (lecture.name) {
                    this.activeLecture = 0;
                    const payload = {
                        courseId: this.$route.params.id,
                        sectionId: sectionId,
                        name: lecture.name
                    };
                    this.$store.dispatch(ADD_COURSE_LECTURE_REQUEST, payload)
                        .then(res => {
                            console.log(res.data);
                        })
                        .catch(err => {
                            console.log(err);
                            console.log(err.response.data);
                        });
                }
            },
            cancelLecture(section) {
                section.lectures = section.lectures.slice(0, section.lectures.length-1);
                this.activeLecture = 0;
            },
            showEditLecture(lecture) {
                this.editLectureId = lecture.id;
            },
            editLecture(lecture, section) {
                const payload = {
                    courseId: this.$route.params.id,
                    sectionId: section.id,
                    lectureId: lecture.id,
                    name: lecture.name
                };
                this.$store.dispatch(EDIT_COURSE_LECTURE_REQUEST, payload)
                    .then(res => {
                        console.log(res.data);
                        this.editLectureId = 0;
                    })
                    .catch(err => {
                        console.log(err);
                        console.log(err.response.data);
                    });
            },
            cancelEditLecture() {
                this.editLectureId = 0;
            },
            deleteLecture(lecture, section) {
                section.lectures = section.lectures.filter(l => l.id !== lecture.id);
                const payload = {
                    courseId: this.$route.params.id,
                    sectionId: section.id,
                    lectureId: lecture.id
                };
                this.$store.dispatch(DELETE_COURSE_LECTURE_REQUEST, payload)
                    .then(res => {
                        console.log(res.data);
                    })
                    .catch(err => {
                        console.log(err);
                        console.log(err.response.data);
                    });
            },
            toggleLectureTab(lectureId) {
                if (this.isLectureTabOpen(lectureId)) {
                    this.openTabLectureIds = this.openTabLectureIds.filter(l => l !== lectureId);
                } else {
                    this.openTabLectureIds = this.openTabLectureIds.concat([lectureId]);
                }
            },
            isLectureTabOpen(lectureId) {
                return this.openTabLectureIds.includes(lectureId);
            },
            setUploadFileType(lectureId, type) {
                this.uploadFile.uploadFileLectureId = lectureId;
                this.uploadFile.uploadFileType = type;
            }
        }
    }
</script>

<style scoped>
    .sub-header {
        padding: 20px 6%;
        border-bottom: 1px solid #dedfe0;  /* #fff; #dedfe0   */
        text-align: left;
        transition: all ease-in-out .4s;
    }
    .title {
        font-size: 24px;
        font-weight: 300;
        transition: all ease-in-out .4s;
    }
    @media only screen and (max-width: 800px) {
        .sub-header {
            padding: 18px 5%;
            transition: all ease-in-out .4s;
        }
        .title {
            font-size: 20px;
            transition: all ease-in-out .4s;
        }
    }

    .main-content-container {
        padding: 30px 4% 120px 4%;
    }

    .sections-container {
    }

    .empty-section {
        height: 50px;
        margin-bottom: 20px;
        border: 1px solid #cacbcc;
        background-color: #f2f3f5;
    }

    .section {
        position: relative;
        margin-bottom: 30px;
        padding-bottom: 30px;
        /*padding: 0 30px 20px 30px;*/
        border: 1px solid #cacbcc;
        background-color: #f2f3f5;
    }

    /* create new section */
    .add-section-container {
        display: flex;
        flex-direction: column;
        padding: 10px 5%;
    }
    .section-label {
        margin-bottom: 5px;
        text-align: left;
        /*font-size: 15px;*/
        /*letter-spacing: -1px;*/
    }
    .buttons-container {
        display: flex;
    }

    .add-lecture-container {
        /*position: relative;*/
        display: flex;
        flex-direction: column;
    }

    /*    */
    .list-group {
        display: flex;
        flex-direction: column;
        padding: 0 5%;
        list-style: none;
    }

    .list-group-item {
        position: relative;
        display: block;
        padding: 15px 4.5%;
        margin-bottom: 15px;
        background-color: #fff;
        border: 1px solid rgba(0,0,0,.125);
    }

    .form-control {
        display: inline-block;
        /*width: 70%;*/
        height: calc(2em + 2px);
        padding: .375em .75em;
        font-size: 0.9em;
        font-weight: 400;
        line-height: 1.5;
        color: #495057;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        border-radius: 2px;
    }

    .section-header {
        margin-bottom: 10px;
        padding: 20px 5%;
        text-align: left;
    }
    .section-header:hover {
        cursor: pointer;
    }
    .section-id {
        padding-left: 5px;
        font-weight: 600;
        font-size: 15px;
    }
    .section-title {
        margin: 0 1%;
    }

    /* Section control buttons */
    /* color: #686f7a  */
    .section-control-btn {
        border-radius: 2px;
        padding: 5px 7px;
    }
    .section-control-btn:hover {
        background-color: #fff;
        cursor: pointer;
    }
    .bg-gr:hover {
        background-color: #f0f3f5;
    }

    .lecture-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        /*padding: 5px 3%;*/
        text-align: left;
    }

    .left-control-container {
        flex: 2;
        margin-left: 5px;
    }
    .right-control-container {
    }

    .chevron {
        margin-left: 10px;
        cursor: pointer;
    }
    .arrow {
        max-height: 8px;
        transition: transform 0.2s ease-in-out;
    }
    .arrow--rotate {
        transform: rotate(180deg);
    }

    .lecture-body {
        margin-top: 10px;
        border: 1px solid #cacbcc;
        transition: all 0.6s ease-in-out;
    }
    .content-upload-btn-container {
        display: flex;
        /*flex-direction: column;*/
        /*justify-content: start;*/
        padding: 20px;
    }
    .upload-btn--edit {
        margin-right: 10px;
        align-self: start;
    }

    /**/
    .file-upload-wrapper {
        padding: 0 20px;
        cursor: pointer;
    }
    .file-upload-container {
        padding: 20px;
        text-align: left;
    }
    input[type="file"] {
        /*display: none;*/
        opacity: 0;
        min-width: 14rem;
        margin: 0;
    }
    .custom-file-upload {
        position: relative;
        display: inline-block;
        /*border: 1px solid #ccc;*/
        /*padding: 6px 12px;*/
        height: 2.5rem;
        cursor: pointer;
    }
    .file-custom {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        z-index: 5;
        height: 2.5rem;
        width: 300px;
        padding: .5rem 1rem;
        line-height: 1.5;
        color: #555;
        background-color: #fff;
        border: .075rem solid #ddd;
        border-radius: .25rem;
        box-shadow: inset 0 0.2rem 0.4rem rgba(0,0,0,.05);
        user-select: none;
    }
    .file-custom:before {
        position: absolute;
        top: -.075rem;
        right: -.075rem;
        bottom: -.075rem;
        z-index: 6;
        display: block;
        content: "Browse";
        /*height: 2.5rem;*/
        padding: .5rem 1rem;
        line-height: 1.5;
        color: #555;
        background-color: #eee;
        border: .075rem solid #ddd;
        border-radius: 0 .25rem .25rem 0;
    }
    .file-custom:after {
        content: "Choose file...";
    }

    /**/
    .remove-lecture-btn {
        /*position: absolute;*/
        cursor: pointer;
        /*float: right;*/
        /*vertical-align: -5px;*/
    }

    .handle {
        /*float: left;*/
        position: absolute;
        top: 20px;
        left: 1%;
        padding: 2px 4px;
        border-radius: 2px;
    }
    .handle:hover {
        background-color: #fff;
        cursor: move;
    }
    .handle1 {
        position: absolute;
        top: 20px;
        left: 1%;
        /*margin-left: -2%;*/
        /*margin-right: 5px;*/
        padding: 2px;
        border-radius: 2px;
        /*opacity: 0;*/
    }
    .handle1:hover {
        background-color: #f0f3f5;
        cursor: move;
    }

    .add-lecture-btn-container {
        padding: 3% 5% 0 5%;
        text-align: left;
    }

    .add-section-btn-container {
        padding: 0 1%;
        text-align: left;
    }

    .close {
        float: right;
        padding-top: 8px;
        padding-bottom: 8px;
    }
    .close:hover {
        cursor: pointer;
    }

    .text {
        margin: 20px;
    }

    /* Button */
    .btn {
        display: inline-block;
        margin-bottom: 0;
        font-weight: 600;
        text-align: center;
        vertical-align: middle;
        touch-action: manipulation;
        cursor: pointer;
        background-image: none;
        border: 1px solid transparent;
        white-space: nowrap;
    }
    .btn-default {
        color: #007791;
        background-color: #fff;
        border: 1px solid #007791;
    }
    .save-section-btn {
        border: 1px solid transparent;
        color: #fff;
        background-color: #007791;
        transition: background-color 0.15s;
        cursor: pointer;
    }
    .save-section-btn:hover {
        background-color: #02596b;
    }

    .btn-sm {
        padding: 5px 12px;
        font-size: 15px;
        line-height: 1.35135;
        border-radius: 2px;
    }
    .btn-tertiary {
        margin-top: 10px;
        color: #007791;
        background-color: transparent;
        border: 1px solid transparent;
        transition: background-color 0.15s;
    }
    .btn-tertiary:hover {
        color: #02333d;
        cursor: pointer;
    }
    .add-answer-btn {
        border: 1px solid #686f7a;
        border-radius: 2px;
        /*margin-top: 10px;*/
        padding: 7px 10px;
        color: #007791;
        font-size: 15px;
        font-weight: 600;
        outline: none;
        cursor: pointer;
    }
    .plus-sign {
        margin-right: 5px;
    }
    .mr-10 {
        margin-top: 10px;
    }
</style>
