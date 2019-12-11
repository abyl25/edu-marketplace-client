<template>
    <div>
        <h2>Course Settings</h2>
        <v-button :onClick="deleteBtn">Delete</v-button>
        <v-button :onClick="editBtn">Edit</v-button>
        <v-button :onClick="editBtn"/>
    </div>
</template>

<script>
    import Button from "@/components/Button";

    export default {
        name: "ICourseSetting",
        components: {
            'v-button': Button
        },
        data() {
            return {}
        },
        methods: {
            deleteBtn() {
                console.log('Delete clicked');
            },
            editBtn() {
                console.log('Edit clicked');
            }
        }
    }
</script>

<style scoped>

</style>