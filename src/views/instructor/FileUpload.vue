<template>
    <div class="file-upload-container">
        <file-pond
                name="file"
                ref="pond"
                label-idle="Drop or select a file"
                :allow-multiple="true"
                server="http://localhost:8081/api/static/files/v2"
                :files="myFiles"
                @init="handleFilePondInit"/>
<!--        accepted-file-types="image/jpeg, image/png" -->
    </div>
</template>

<script>
    import vueFilePond from 'vue-filepond';
    import 'filepond/dist/filepond.min.css';
    import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
    import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
    import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

    const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);

    export default {
        name: "FileUpload",
        components: {
            FilePond
        },
        data () {
            return {
                myFiles: [],
            }
        },
        methods: {
            handleFilePondInit: function() {
                console.log('FilePond has initialized');
                // FilePond instance methods are available on `this.$refs.pond`
                this.$refs.pond.getFiles();
            }
        }
    }
</script>

<style scoped>
    .file-upload-container {
        padding: 20px;
        cursor: pointer;
    }
    .filepond--wrapper {

    }
</style>
