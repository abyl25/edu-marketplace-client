<template>
    <div>
        <div class="create-course-container">
            <div class="create-course-header-text">
                <p>Choose title for your new course</p>
                <div>
                    <input type="text">
                </div>
            </div>
            <div class="create-course-category">
                <h2>Choose category</h2>
                <select name="courseCategory" id="courseCategory">
                    <option value="">Choose category</option>
                    <option value="">Development</option>
                    <option value="">Business</option>
                    <option value="">Design</option>
                </select>
            </div>
            <div>
                <button>Create Course</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AddCourse"
    }
</script>

<style scoped>
    .create-course-container {
        margin: 50px auto;
    }

    .create-course-header-text p {
        color: #29303b;
        font-size: 36px;
        font-weight: 300;
        text-align: center;
    }

    .create-course-header-text input {
        display: block;
        /*width: 100%;*/
        height: 40px;
        padding: 10px 12px;
        font-size: 16px;
        line-height: 1.43;
        color: #29303b;
        background-color: #fff;
        background-image: none;
        border: 1px solid #cacbcc;
        border-radius: 2px;
        box-shadow: none;
        /*transition: border-color*/
    }


</style>