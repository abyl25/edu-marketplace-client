<template>
    <div class="course-manage-container">
        <div class="back-link-wrapper">
            <router-link :to="{ path: '/instructor/home' }" class="back-link">
                <i class="fas fa-chevron-left" style="color: red"></i> Home
            </router-link>
        </div>
        <div class="sidebar">
            <router-link :to="{ path: '/instructor/course/' + this.$route.params.id + '/main' }" class="sidebar-el">
                <i class="fa fa-fw fa-home"></i> Course info
            </router-link>
            <router-link :to="{ path: '/instructor/course/' + this.$route.params.id + '/target' }" class="sidebar-el">
                <img src="../../assets/icons8-goal2-23-6d736f.png" alt="" style="vertical-align: middle"> Course target
            </router-link>
            <router-link :to="{ path: '/instructor/course/' + this.$route.params.id + '/curriculum' }" class="sidebar-el">
                <img src="../../assets/icons8-table-of-content-24.png" alt="" style="vertical-align: middle"> Curriculum
            </router-link>
            <router-link :to="{ path: '/instructor/course/' + this.$route.params.id + '/settings' }" class="sidebar-el">
                <img src="../../assets/icons8-gear-25.png" alt="" style="vertical-align: middle"> Settings
            </router-link>
        </div>
        <div class="main-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ICourseManage",
        created() {
            console.log('ICourseManage created');
        }
    }
</script>

<style scoped>
    .course-manage-container {
        display: flex;
        padding: 50px 70px 50px 50px;
        background-color: #f7f9fa;   /*  #f5f6f7;  #edf2f5;   */
    }

    .sidebar {
        flex-basis: 280px;
        display: flex;
        flex-direction: column;
        border: 1px solid #ddede1;
        border-radius: 3px;
        background-color: #f5f6f7;
        /*background-color: #29303b;  !* #fff;  #edf2f5;  *!*/
        overflow:hidden;
    }

    .sidebar-el {
        border-bottom: 1px solid #ddede1;
        /*border-radius: 3px;*/
        padding: 20px 25px;
        text-decoration: none;
        text-align: left;
        color: #6d736f;
        font-size: 17px;
    }
    /*.sidebar-el:focus {*/
    /*    background-color: #a3c2bd;  !* #8E8A84; #ec5252; *!*/
    /*}*/

    .active {
        background-color: #a3c2bd;
    }

    .main-content {
        flex: 1;
        border: 1px solid transparent;
        border-radius: 3px;
        background-color:  #fff;
        /*background-color: #cfe3df; !* #b5ffe9; *!*/
        box-shadow: 0 2px 8px 2px rgba(20,23,28,.15);
        overflow:hidden;
    }

    .back-link-wrapper {
        /*border: 1px solid #000;*/
        position: absolute;
        top: 75px;
    }
    .back-link {
        /*padding: 5px 10px;*/
        text-decoration: none;
        color: #6d736f;
        font-size: 18px;
    }

</style>