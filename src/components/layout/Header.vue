<template>
    <header class="header">
        <div id = "main">
            <nav>
                <router-link to="/"><img src="../../assets/logo.png" width="40" height="40"></router-link>
                <div class="search-box">
                    <input class="search-txt" type="text" name="" placeholder="Search courses">
                    <a class="search-btn" href="#">
                      <i class="fas fa-search"></i>
                    </a>
                </div>
                <ul>
<!--                    <li><router-link to="/">Main</router-link></li>-->
                    <li><a href="#">Category</a></li>
                    <li><router-link to="/about">About</router-link></li>
                    <template v-if="!values.authenticated">
                        <li><router-link to="/login">Sign in</router-link></li>
                        <li><router-link to="/signup">Sign up</router-link></li>
                    </template>
                    <template v-if="values.authenticated">  <!--  v-if="authenticated"  -->
                        {{ values.username }}
                        <button @click="logout">Logout</button>
                    </template>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script>
export default {
    name: "Header",
    data() {
        return {
            // authenticated: this.checkAuthenticated,
            // token: localStorage.getItem("token"),
            // username: localStorage.getItem("username")
        }
    },
    props: ["values"],
    methods: {
        // checkAuthenticated() {
        //     console.log('token == null', localStorage.getItem("token") == null);  // eslint-disable-line
        //     this.authenticated = (localStorage.getItem("token") != null);
        // },
        logout() {
            console.log("logout clicked"); // eslint-disable-line
            localStorage.clear();
            // this.checkAuthenticated();
            this.$router.push('login');
        }
    },
    // mounted() {
    //     this.checkAuthenticated();
    // },
    // updated() {
    //     this.checkAuthenticated();
    // }
}
</script>

<style scoped>
    .search-btn i {
        color: #e84118;
    }

    .header{
        background: #389;
        color: #fff;
        text-align: center;
        padding: 10px;

    }

    .header a{
        color: #fff;
        padding-right: 0px;
    }

    nav{
        width: 100%;
        height: 40px;
    }

    nav ul{
        float: right;
        margin-right: 6%;
        margin-top: 12px;
    }
    nav ul li{
        list-style-type: none;
        display: inline-block;
    }

    nav ul li a{
        text-decoration: none;
        color: #fff;
        padding: 25px;
    }

    img {
        float: left;
        margin-left: 5%;
    }

    .search-box{
        position: absolute;
        margin-left: 60%;
        transform: translate(-100%,0%);
        background: #EBEBEB;
        height: 30px;
        border-radius: 30px;
        padding: 10px;
        margin-top: -4px;
    }
    .search-btn{
        color: #e84118;
        float: right;
        width: 30px;
        height: 30px;
        border-radius:40px;
        background: #EBEBEB;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .search-txt{
        border: none;
        background: none;
        outline: none;
        float: left;
        padding: 0;
        color: white;
        font-size: 16px;
        transition: 0.4s;
        line-height: 30px;
        width: 0px; 
    }

    .search-box:hover > .search-txt{
        width: 300px;
        padding: 0 6px;
    }

</style>