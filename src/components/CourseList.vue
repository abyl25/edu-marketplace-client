<template>
    <div class="course-container">
        <div class="filter"></div>
        <div class="course-card">
            <a href="">
                <div class="course-card-container">
                    <div class="course-card-image">
                    </div>
                    <div class="course-card-content">
                        <div class="course-card-title">
                            <h4>Web developer bootcamp</h4>
                        </div>
                        <div class="course-card-subtitle">
                            <span>
                                The only course you need to learn web development - HTML, CSS, JS, Node, and More!
                            </span>
                            <span>Colt Steele</span>
                        </div>
                    </div>

                </div>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CourseList"
    }
</script>

<style scoped>
    .course-container {
        padding: 20px;
    }

    .course-card {
        border: 1px solid #000;
    }

    .course-card a {
        text-decoration: none;
    }
    /*.course-card a:hover {*/
    /*    text-decoration: none;*/
    /*    color: #003845;*/
    /*}*/

    .course-card-content {
        position: relative;
        padding: 0 16px;
    }

    .course-card-title h4 {
        font-size: 15px;
    }


</style>