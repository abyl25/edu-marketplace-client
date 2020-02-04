<template>
    <div>
<!--        <h2>ICourseCurriculum</h2>-->
        <div class="sub-header">
            <h1 class="title">Course Curriculum</h1>
        </div>
        <div class="container">
            <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
                <h3>Upload images</h3>
                <div class="image-container">
                    <img id="my_image" class="preview-image" src="" alt="">
                </div>
                <div class="dropbox">
                    <input type="file" class="input-file" :name="uploadFieldName" :disabled="isSaving"
                       @change="onFileSelected($event); preview($event)"
                       accept="image/*" >
<!--  multiple  @change="filesChange($event.target.name, $event.target.files); preview($event); fileCount = $event.target.files.length"   -->
                    <p v-if="isInitial">
                        Drag your file(s) here to begin<br> or click to browse
                    </p>
                    <p v-if="isSaving">
                        Uploading {{ fileCount }} files...
                    </p>
                </div>
                <button type="button" @click="onUpload">Upload</button>
            </form>
        </div>
    </div>
</template>

<script>
// const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;
// import axios from 'axios';

export default {
    name: "ICourseCurriculum",
    data() {
        return {
            // selectedFile: null,
            // uploadedFiles: [],
            // uploadError: null,
            // currentStatus: null,
            // uploadFieldName: 'photos'
        }
    },
    created() {
        console.log('ICourseCurriculum created');
    },
    mounted() {
        // this.reset();
    },
    methods: {
        // reset() {
        //     this.currentStatus = STATUS_INITIAL;
        //     this.uploadedFiles = [];
        //     this.uploadError = null;
        // },
        // onFileSelected(e) {
        //     console.log('onFileSelected');
        //     this.selectedFile = e.target.files[0];
        // },
        // preview(e) {
        //     console.log('previewing');
        //     const reader = new FileReader();
        //     reader.onload = function(){
        //         const my_image = document.getElementById('my_image');
        //         my_image.src = reader.result;
        //     };
        //     reader.readAsDataURL(e.target.files[0]);
        // },
        // onUpload() {
        //     console.log('onUpload');
        //     const fd = new FormData();
        //     fd.append('file', this.selectedFile, this.selectedFile.name);
        //     axios.post(`${process.env.VUE_APP_API}/api/files/upload`, fd)
        //         .then(res => {
        //             console.log('uploaded');
        //             console.log(res.data);
        //         })
        //         .catch(err => console.log(err.response.data));
        // },

        // save(formData) {
        //     // upload data to the server
        //     this.currentStatus = STATUS_SAVING;
        //     this.upload(formData)
        //         .then(x => {
        //             this.uploadedFiles = [].concat(x);
        //             this.currentStatus = STATUS_SUCCESS;
        //         })
        //         .catch(err => {
        //             this.uploadError = err.response;
        //             this.currentStatus = STATUS_FAILED;
        //         });
        // },
        // filesChange(fieldName, fileList) {
        //     const formData = new FormData();
        //     if (!fileList.length) return;
        //     // append the files to FormData
        //     Array.from(Array(fileList.length).keys())
        //         .map(x => {
        //             formData.append(fieldName, fileList[x], fileList[x].name);
        //         });
        //
        //     // this.save(formData);
        // },
        // upload(formData) {
        //     const url = `${process.env.VUE_APP_API}/files/upload`;
        //     axios.post(url, formData)
        //         .then(x => x.data)
        //         // add url field
        //         .then(x => x.map(img => Object.assign({},
        //             img, { url: `${process.env.VUE_APP_API}/images/${img.id}` })));
        // }
    },
    computed: {
        // isInitial() {
        //     return this.currentStatus === STATUS_INITIAL;
        // },
        // isSaving() {
        //     return this.currentStatus === STATUS_SAVING;
        // },
        // isSuccess() {
        //     return this.currentStatus === STATUS_SUCCESS;
        // },
        // isFailed() {
        //     return this.currentStatus === STATUS_FAILED;
        // }
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


    /*.container {*/
    /*    padding: 20px;*/
    /*}*/

    /*.image-container {*/
    /*    text-align: left;*/
    /*}*/

    /*.preview-image {*/
    /*    width: 120px;*/
    /*    height: 100px;*/
    /*    border: 1px solid #a3c2bd;*/
    /*    border-radius: 5px;*/
    /*}*/

    /*.dropbox {*/
    /*    border: 1px solid transparent;*/
    /*    border-radius: 5px;*/
    /*    outline: 2px dashed grey; !* the dash box *!*/
    /*    outline-offset: -10px;*/
    /*    background: lightcyan;*/
    /*    color: dimgray;*/
    /*    padding: 10px 10px;*/
    /*    width: 98%;*/
    /*    min-height: 200px; !* minimum height *!*/
    /*    position: relative;*/
    /*    cursor: pointer;*/
    /*}*/

    /*.input-file {*/
    /*    opacity: 0; !* invisible but it's there! *!*/
    /*    display: block;*/
    /*    width: 98%;*/
    /*    height: 200px;*/
    /*    position: absolute;*/
    /*    cursor: pointer;*/
    /*}*/

    /*.dropbox:hover {*/
    /*    background: lightblue; !* when mouse over to the drop zone, change color *!*/
    /*}*/

    /*.dropbox p {*/
    /*    font-size: 1.2em;*/
    /*    text-align: center;*/
    /*    padding: 50px 0;*/
    /*}*/
</style>
