<template>
    <div>
        <div class="sub-header">
            <h1 class="title">Course Curriculum</h1>
        </div>
        <div class="main-content-container">
            <div class="sections-container">
                    <div class="empty-section" v-if="sections.length === 0"></div>
                    <template v-else>
                        <div class="list-group section" v-bind:key="section.sectionID" v-for="(section, i) in sections">
                            <template v-if="activeSection === section.sectionID">
                                <p class="section-label">New section:</p>
                                <input type="text" class="form-control" v-model="section.title" placeholder="Enter a title"/>
                                <div class="buttons-container">
                                    <button @click="saveSection(section, i)" class="save-section-btn btn-sm">Save</button>
                                    <!-- <v-button :onClick="saveSection(section)" myClass="save-section-btn btn-sm">Save</v-button>-->
                                    <v-button :onClick="cancelSection" myClass="btn-tertiary btn-sm">Cancel</v-button>
                                </div>
                            </template>
                            <div v-else>
                                <p>{{ section.title }}</p>
                            </div>
                        </div>
                    </template>
                <draggable :list="sections"></draggable>
<!--                <draggable tag="ul" :list="myArray" class="list-group" handle=".handle">-->
<!--                    <li class="list-group-item" v-for="(element, idx) in myArray" :key="element.name">-->
<!--                        <i class="fa fa-align-justify handle"></i>-->
<!--                        <span class="text">{{ element.name }} </span>-->
<!--                        <input type="text" class="form-control" v-model="element.text" />-->
<!--                        <i class="fa fa-times close" @click="removeAt(idx)"></i>-->
<!--                    </li>-->
<!--                </draggable>-->
                <v-button :onClick="addSectionInput" myClass="add-answer-btn" >
                    <span class="plus-sign"><i class="fas fa-plus"></i></span>Section
                </v-button>
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
                    // {
                    //     sectionID: 1,
                    //     title: 'section 1',
                    //     objective: 'objective 1',
                    //     lectures: []
                    // }
                ],
                myArray: [
                    { name: "John", text: "", id: 0 },
                    { name: "Joao", text: "", id: 1 },
                    { name: "Jean", text: "", id: 2 }
                ],
                dragging: false,
                creatingNewSection: false,
                activeSection: 0
            }
        },
        computed: {
            getLastSection() {
                return this.sections[this.sections.length-1];
            }
        },
        methods: {
            addSectionInput() {
                console.log('adding section input');
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
            addLectureInput() {
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
        padding: 20px 50px;
        border-bottom: 1px solid #dedfe0;  /* #fff; #dedfe0   */
        text-align: left;
    }
    .title {
        font-size: 24px;
        font-weight: 300;
    }

    .main-content-container {
        padding: 30px 1em;
    }

    .sections-container {
    }

    .empty-section {
        height: 40px;
        border: 1px solid #cacbcc;
        background-color: #f2f3f5;
    }

    .section {
        margin-bottom: 30px;
        padding: 20px;
        border: 1px solid #cacbcc;
        background-color: #f2f3f5;
    }

    .section-label {
        margin-bottom: 5px;
        text-align: left;
        /*font-size: 15px;*/
        /*letter-spacing: -1px;*/
    }

    /*    */
    .list-group {
        display: flex;
        flex-direction: column;
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
        /*width: 50%;*/
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

    .buttons-container {
        display: flex;
    }

    .handle {
        float: left;
        padding-top: 8px;
        padding-bottom: 8px;
    }
    .handle:hover {
        cursor: move;
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
        margin-top: 5px;
        border: 1px solid transparent;
        color: #fff;
        background-color: #007791;
        transition: background-color 0.15s;
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

</style>
