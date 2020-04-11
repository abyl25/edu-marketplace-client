<template>
    <div class="container">
        <div class="sub-header">
            <h1 class="title">Upload Course Image</h1>
        </div>
        <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
            <div class="image-container" v-if="selectedFile != null">
                <img id="my_image" class="preview-image" src="" alt="">
                <p>{{ selectedFile.name }}</p>
            </div>
            <div class="dropbox">
                <input type="file" class="input-file" :name="uploadFieldName" :disabled="isSaving"
                       @change="onFileSelected($event); preview($event)"
                       accept="image/*" >
                <p v-if="isInitial">
                    Drag your file(s) here to begin<br> or click to browse
                </p>
                <p v-if="isSaving">
                    Uploading {{ fileCount }} files...
                </p>
            </div>
            <button type="button" class="upload-btn" @click="onUpload">Upload</button>
        </form>
        <hr>
<!--        <button type="button" @click="downloadImage">Download</button>-->
        <a href="http://localhost:8081/api/static/files/sample.pdf" target="_blank">Open file</a>
        <br>
<!--        <video width="320" height="240" controls>-->
<!--            <source src="http://localhost:8081/api/static/video1/lesson1.mp4" type="video/mp4">-->
<!--            Your browser does not support the video tag.-->
<!--        </video>-->
    </div>
</template>

<script>
    const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;
    import axios from 'axios';

    export default {
        name: "ImageUpload",
        data() {
            return {
                selectedFile: null,
                uploadedFiles: [],
                uploadError: null,
                currentStatus: null,
                uploadFieldName: 'photos',
                uploadFinished: false
            }
        },
        mounted() {
            this.reset();
        },
        methods: {
            reset() {
                this.currentStatus = STATUS_INITIAL;
                this.uploadedFiles = [];
                this.uploadError = null;
            },
            onFileSelected(e) {
                // console.log('onFileSelected');
                this.selectedFile = e.target.files[0];
            },
            preview(e) {
                // console.log('previewing');
                const reader = new FileReader();
                reader.onload = function(){
                    const my_image = document.getElementById('my_image');
                    my_image.src = reader.result;
                };
                reader.readAsDataURL(e.target.files[0]);
            },
            onUpload() {
                console.log('onUpload');
                const fd = new FormData();
                fd.append('file', this.selectedFile, this.selectedFile.name);
                fd.append('type', 'logo');
                fd.append('courseId', this.$route.params.id);

                // const url = `http://10.10.4.27:6010/api/upload/image?referer=course&course_id=${this.$route.params.id}`;
                const url = `${process.env.VUE_APP_API}/api/static/files`;
                const headers = {
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Type': 'application/form-data',
                    // 'Authorization': 'Bearer ' + this.$store.getters.token
                };
                axios({
                    method: 'post',
                    url: url,
                    data: fd,
                    headers: headers
                }).then(res => {
                    console.log('uploaded');
                    console.log(res.data);
                }) .catch(err => {
                    console.log(err.response.data)
                });
            },
            downloadImage() {
                const fileName = "angular.png";
                const fileName2 = "ticket.pdf";
                const video = "lesson1.mp4";
                const url = 'http://localhost:8081/api/static/image/' + fileName;
                const url2 = 'http://localhost:8081/api/static/download/' + fileName;
                const url3 = 'http://localhost:8081/api/static/download/' + fileName2;
                const headers = {
                    'Accept': "*/*"
                };
                axios({
                    method: 'get',
                    url: url3,
                    headers: headers
                }).then(res => {
                    console.log('downloaded');
                    // console.log(res.data);
                }) .catch(err => {
                    console.log(err.response.data)
                });
            }
        },
        computed: {
            isInitial() {
                return this.currentStatus === STATUS_INITIAL;
            },
            isSaving() {
                return this.currentStatus === STATUS_SAVING;
            },
            isSuccess() {
                return this.currentStatus === STATUS_SUCCESS;
            },
            isFailed() {
                return this.currentStatus === STATUS_FAILED;
            }
        }
    }
</script>

<style scoped>
    /*.container {*/
    /*    padding: 20px 50px;*/
    /*}*/

    .sub-header {
        padding: 20px 50px;
        border-bottom: 1px solid #dedfe0;  /* #fff; #dedfe0   */
        text-align: left;
    }

    .title {
        font-size: 24px;
        font-weight: 300;
    }

    form {
        padding: 20px 50px;
    }

    .image-container {
        text-align: left;
    }

    .preview-image {
        width: 120px;
        height: 100px;
        border: 1px solid #a3c2bd;
        border-radius: 5px;
    }

    .dropbox {
        border: 1px solid transparent;
        border-radius: 5px;
        outline: 2px dashed grey; /* the dash box */
        outline-offset: -10px;
        background: lightcyan;
        color: dimgray;
        padding: 10px 10px;
        margin-top: 15px;
        width: 97%;
        min-height: 200px; /* minimum height */
        position: relative;
        cursor: pointer;
    }

    .input-file {
        opacity: 0; /* invisible but it's there! */
        display: block;
        width: 98%;
        height: 200px;
        position: absolute;
        cursor: pointer;
    }

    .dropbox:hover {
        background: lightblue; /* when mouse over to the drop zone, change color */
    }

    .dropbox p {
        font-size: 1.2em;
        text-align: center;
        padding: 50px 0;
    }

    .upload-btn {
        border: none;
        border-radius: 2px;
        margin-top: 10px;
        padding: 12px 40px;
        background-color: #4CAF50;
        color: #fff;
        font-size: 17px;
        font-weight: 500;
        cursor: pointer;
    }
</style>
