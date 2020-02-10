<template>
<!--    <uploader :options="options" class="uploader-example">-->
<!--        <uploader-unsupport></uploader-unsupport>-->
<!--        <uploader-drop>-->
<!--            <p>Drop files here to upload or</p>-->
<!--            <uploader-btn>select files</uploader-btn>-->
<!--            <uploader-btn :attrs="attrs">select images</uploader-btn>-->
<!--            <uploader-btn :directory="true">select folder</uploader-btn>-->
<!--        </uploader-drop>-->
<!--        <uploader-list></uploader-list>-->
<!--    </uploader>-->
    <div>
        <input type="file" class="input-file" @change="onFileSelected($event)"  >
        <button type="button" class="upload-btn" @click="onUpload">Upload</button>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "FileUpload",
        data () {
            return {
                // options: {
                //     // https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js
                //     target: '//localhost:3000/upload',
                //     testChunks: false
                // },
                // attrs: {
                //     accept: 'image/*'
                // },
                selectedFile: null,
            }
        },
        methods: {
            onFileSelected(e) {
                console.log('onFileSelected');
                this.selectedFile = e.target.files[0];
            },
            onUpload() {
                console.log('onUpload');
                // const headers = {
                //     'Content-Type': 'application/x-www-form-urlencoded',
                //     'session_id': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5ZXJhc3N5bC5kYW5heSIsInJvbGVzIjpbIkluc3RydWN0b3IiXSwiaWF0IjoxNTgxMzEyMTI0LCJleHAiOjE1ODEzOTg1MjR9.1jjZBn3ad5FIVEAsNuIQsifWeGPp4pI3OMlF4LUXTIA'
                // };
                const config = {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'session_id': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5ZXJhc3N5bC5kYW5heSIsInJvbGVzIjpbIkluc3RydWN0b3IiXSwiaWF0IjoxNTgxMzEyMTI0LCJleHAiOjE1ODEzOTg1MjR9.1jjZBn3ad5FIVEAsNuIQsifWeGPp4pI3OMlF4LUXTIA'
                    }
                };
                const fd = new FormData();
                fd.append('uploadFile', this.selectedFile, this.selectedFile.name);

                axios.post('http://192.168.43.59:6010/api/upload/image?referer=course&course_id=2', fd, config) //
                    .then(res => {
                        console.log(res);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }
    }
</script>

<style scoped>
    /*.uploader-example {*/
    /*    width: 880px;*/
    /*    padding: 15px;*/
    /*    margin: 40px auto 0;*/
    /*    font-size: 12px;*/
    /*    box-shadow: 0 0 10px rgba(0, 0, 0, .4);*/
    /*}*/
    /*.uploader-example .uploader-btn {*/
    /*    margin-right: 4px;*/
    /*}*/
    /*.uploader-example .uploader-list {*/
    /*    max-height: 440px;*/
    /*    overflow: auto;*/
    /*    overflow-x: hidden;*/
    /*    overflow-y: auto;*/
    /*}*/
</style>
