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
                        <div class="section" v-bind:key="section.sectionID" v-for="(section, i) in sections">
                            <div class="add-section-container" v-if="activeSection === section.sectionID">
                                <p class="section-label">New section:</p>
                                <input type="text" class="form-control" v-model="section.title" placeholder="Enter a title"/>
                                <div class="buttons-container">
                                    <button @click="saveSection(section, i)" class="save-section-btn btn-sm">Save</button>
                                    <!-- <v-button :onClick="saveSection(section)" myClass="save-section-btn btn-sm">Save</v-button>-->
                                    <v-button :onClick="cancelSection" myClass="btn-tertiary btn-sm">Cancel</v-button>
                                </div>
                            </div>
                            <div class="section-list" v-else>
                                <div class="section-header" @mouseover="sectionHoveredId=section.sectionID" @mouseleave="sectionHoveredId=0">
                                    <span class="handle">
                                        <svg v-if="sectionHoveredId === section.sectionID" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 172 172"
                                            style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#535961"><path d="M86,0l-28.66667,43h21.5v35.83333h-35.83333v-21.5l-43,28.66667l43,28.66667v-21.5h35.83333v35.83333h-21.5l28.66667,43l28.66667,-43h-21.5v-35.83333h35.83333v21.5l43,-28.66667l-43,-28.66667v21.5h-35.83333v-35.83333h21.5z"></path></g></g></svg>
                                    </span>
                                    <span class="section-id">Section {{ section.sectionID }}: </span>
                                    <span class="section-title">{{ section.title }}</span>
                                    <template v-if="sectionHoveredId === section.sectionID">
                                        <span class="section-control-btn">
                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 172 172"
                                                 style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#686f7a"><path d="M121.38542,7.61458l-93.61458,93.61458l-20.07227,63.07226l63.07227,-20.07226l93.61458,-93.61458c0,0 -0.71667,-15.05717 -14.33333,-28.66667c-13.61667,-13.61667 -28.66667,-14.33333 -28.66667,-14.33333zM124.07292,19.26042c7.68267,1.462 13.7993,4.71645 18.51855,9.56022c4.71925,4.84377 8.04111,11.27686 10.14811,19.10645l-12.98958,12.98958l-28.66667,-28.66667l10.30208,-10.30208zM35.67936,108.40983c0.08473,0.02134 8.61749,2.17868 17.1748,10.736c9.31667,8.6 10.75,16.48893 10.75,16.48893l0.30794,0.36393l-25.43327,8.18848l-10.722,-10.72201z"></path></g></g></svg>
                                        </span>
                                        <span class="section-control-btn">
                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 172 172"
                                                 style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#686f7a"><path d="M72.76923,-0.20673c-5.53004,0 -10.95673,1.08534 -14.88462,4.96154c-3.92788,3.87621 -5.16827,9.38041 -5.16827,15.09135h-26.25481c-3.64363,0 -6.61538,2.97176 -6.61538,6.61538h-6.61538v13.23077h145.53846v-13.23077h-6.61538c0,-3.64363 -2.97176,-6.61538 -6.61538,-6.61538h-26.25481c0,-5.71094 -1.24038,-11.21514 -5.16827,-15.09135c-3.92788,-3.8762 -9.35456,-4.96154 -14.88462,-4.96154zM72.76923,13.4375h26.46154c3.61779,0 4.75481,0.85276 5.16827,1.24038c0.41346,0.38762 1.24038,1.47296 1.24038,5.16827h-39.27885c0,-3.69531 0.82692,-4.78065 1.24038,-5.16827c0.41346,-0.38762 1.55048,-1.24038 5.16827,-1.24038zM26.46154,46.30769v105.84615c0,10.93089 8.91526,19.84615 19.84615,19.84615h79.38462c10.93089,0 19.84615,-8.91526 19.84615,-19.84615v-105.84615zM52.92308,66.15385h13.23077v79.38462h-13.23077zM79.38462,66.15385h13.23077v79.38462h-13.23077zM105.84615,66.15385h13.23077v79.38462h-13.23077z"></path></g></g></svg>
                                        </span>
                                    </template>
                                </div>
                                <draggable tag="ul" :list="section.lectures" class="list-group" handle=".handle1">
                                    <li class="list-group-item" v-for="(lecture, idx) in section.lectures" :key="lecture.name" @mouseover="lectureHoveredId=lecture.id" @mouseleave="lectureHoveredId=0">
                                        <svg v-if="lectureHoveredId === lecture.id" class="handle1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 172 172"
                                             style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#535961"><path d="M86,0l-28.66667,43h21.5v35.83333h-35.83333v-21.5l-43,28.66667l43,28.66667v-21.5h35.83333v35.83333h-21.5l28.66667,43l28.66667,-43h-21.5v-35.83333h35.83333v21.5l43,-28.66667l-43,-28.66667v21.5h-35.83333v-35.83333h21.5z"></path></g></g></svg>
                                        <span class="text">{{ lecture.name }} </span>
                                        <input type="text" class="form-control" v-model="lecture.text" />
<!--                                        <i class="fa fa-times close" @click="removeAt(idx)"></i>-->
                                        <span class="remove-lecture-btn">
                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 172 172"
                                                 style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#686f7a"><path d="M72.76923,-0.20673c-5.53004,0 -10.95673,1.08534 -14.88462,4.96154c-3.92788,3.87621 -5.16827,9.38041 -5.16827,15.09135h-26.25481c-3.64363,0 -6.61538,2.97176 -6.61538,6.61538h-6.61538v13.23077h145.53846v-13.23077h-6.61538c0,-3.64363 -2.97176,-6.61538 -6.61538,-6.61538h-26.25481c0,-5.71094 -1.24038,-11.21514 -5.16827,-15.09135c-3.92788,-3.8762 -9.35456,-4.96154 -14.88462,-4.96154zM72.76923,13.4375h26.46154c3.61779,0 4.75481,0.85276 5.16827,1.24038c0.41346,0.38762 1.24038,1.47296 1.24038,5.16827h-39.27885c0,-3.69531 0.82692,-4.78065 1.24038,-5.16827c0.41346,-0.38762 1.55048,-1.24038 5.16827,-1.24038zM26.46154,46.30769v105.84615c0,10.93089 8.91526,19.84615 19.84615,19.84615h79.38462c10.93089,0 19.84615,-8.91526 19.84615,-19.84615v-105.84615zM52.92308,66.15385h13.23077v79.38462h-13.23077zM79.38462,66.15385h13.23077v79.38462h-13.23077zM105.84615,66.15385h13.23077v79.38462h-13.23077z"></path></g></g></svg>
                                        </span>
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
    import axios from 'axios';
    import Button from "@/components/Button";

    export default {
        name: "ICourseCurriculum",
        components: {
            draggable,
            'v-button': Button
        },
        data() {
            return {
                sections: [
                    {
                        sectionID: 1,
                        title: 'section 1',
                        objective: 'objective 1',
                        lectures: [
                            { name: "lectures 1", text: "", id: 1 },
                            { name: "lectures 2", text: "", id: 2 },
                            { name: "lectures 3", text: "", id: 3 },
                        ]
                    },
                    {
                        sectionID: 2,
                        title: 'section 2',
                        objective: 'objective 2',
                        lectures: [
                            { name: "lectures 4", text: "", id: 4 },
                            { name: "lectures 5", text: "", id: 5 },
                            { name: "lectures 6", text: "", id: 6 },
                        ]
                    }
                ],
                dragging: false,
                creatingNewSection: false,
                activeSection: 0,
                sectionHoveredId: 0,
                lectureHoveredId: 0
            }
        },
        computed: {
            getLastSection() {
                return this.sections[this.sections.length-1];
            }
        },
        methods: {
            addSectionInput() {
                // console.log('adding section input');
                if (this.sections.length === 0) {
                    const newInput = { sectionID: 1, title: '', objective: ''};
                    this.sections = this.sections.concat([newInput]);
                    this.activeSection = this.getLastSection.sectionID;
                } else {
                    let lastSection = this.getLastSection;
                    if (lastSection.title) {
                        const newInput = { sectionID: lastSection.sectionID + 1, title: '', objective: ''};
                        this.sections = this.sections.concat([newInput]);
                        this.activeSection = lastSection.sectionID + 1;
                    }
                }
            },
            addLectureInput(section) {
                console.log(section);
                const lastLecture = section.lectures[section.lectures.length-1];
                console.log(lastLecture);
                const newLectureInput = { id: 1, title: '', objective: ''};
                // sections.lectures
            },
            saveSection(section) {
                if (section.title) {
                    this.activeSection = 0;
                }
            },
            cancelSection() {
                this.sections = this.sections.slice(0, this.sections.length-1);
                this.activeSection = 0;
            }
        }
    }
</script>

<style scoped>
    .sub-header {
        padding: 20px 7%;
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
        height: 40px;
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

    /*    */
    .list-group {
        display: flex;
        flex-direction: column;
        padding: 0 4%;
        list-style: none;
    }

    .list-group-item {
        position: relative;
        display: block;
        padding: .5em 1.25rem;
        margin-bottom: -1px;
        background-color: #fff;
        border: 1px solid rgba(0,0,0,.125);
    }

    .form-control {
        display: inline-block;
        width: 70%;
        height: calc(1.5em + 2px);
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

    /**/
    .remove-lecture-btn {
        cursor: pointer;
        float: right;
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
    .handle1 {
        position: absolute;
        top: 9px;
        left: 1%;
        padding: 1%;
        border-radius: 2px;
    }
    .handle:hover, .handle1:hover {
        background-color: #fff;
        cursor: move;
    }

    .add-lecture-btn-container {
        padding: 3% 4% 0 4%;
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
    .save-section-btn {
        margin-top: 10px;
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
</style>
