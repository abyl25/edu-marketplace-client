<template>
    <header class="header">
        <div class="Logo">
            <router-link to="/">Logo</router-link>
        </div>
        <div class="header-left">
            <div class="header-category">
                <li><a href="#">Categories</a>
                    <ul class="dropdownmenu-1">
                        <li class="cat-development"><router-link to="/courses/development">Development</router-link>
                            <ul class="subcat-development">
                                <li><router-link to="/courses/development/web-development">Web Development</router-link></li>
                                <li><router-link to="/courses/development/mobile-apps">Mobile App</router-link></li>
                                <li><router-link to="/courses/development/programming-languages">Programming Language</router-link></li>
                                <li><router-link to="/courses/development/databases">Databases</router-link></li>
                            </ul>
                        </li>
                        <li class="cat-business"><router-link to="/courses/business">Business</router-link>
                            <ul class="subcat-business">
                                <li><router-link to="/courses/business/finance">Finance</router-link></li>
                                <li><router-link to="/courses/business/management">Management</router-link></li>
                                <li><router-link to="/courses/business/strategy">Strategy</router-link></li>
                                <li><router-link to="/courses/business/project-management">Project Management</router-link></li>
                            </ul>
                        </li>
                        <li class="cat-design"><router-link to="/courses/design">Design</router-link>
                            <ul class="subcat-design">
                                <li><router-link to="/courses/design/web-design">Web Design</router-link></li>
                                <li><router-link to="/courses/design/graphic-design">Graphic Design</router-link></li>
                                <li><router-link to="/courses/design/game-design">Game Design</router-link></li>
                                <li><router-link to="/courses/design/fashion">Fashion</router-link></li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </div>
            <div class="header-search-box">
                    <input class="search-txt" type="text" name="" placeholder="Type to search">
                    <a class="search-btn" href="#">
                      <i class="fas fa-search"></i>
                    </a>
            </div>
        </div>
        <nav id="navbar">
            <ul>
                <li><router-link to="/about">About</router-link></li>
                <li><router-link to="/cart">Cart</router-link></li>
                <template v-if="!isAuthenticated">
                    <li><router-link to="/login">Sign in</router-link></li>
                    <li><router-link to="/signup">Sign up</router-link></li>
                </template>
                <template v-if="isAuthenticated">
<!--                    <li><router-link to="#">{{ values.username }}</router-link></li>-->
                    <li><span class="username">{{ username }}</span></li>
                    <li><p class="logout-btn" @click="logout">Log out</p></li>
                </template>
            </ul>
        </nav>
        <div class="menu-toggle" v-on:click="toggle"> <i class="fa fa-bars" aria-hidden="true"></i></div>
    </header>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { AUTH_LOGOUT } from '../../store/actions';

export default {
    name: "Header",
    methods: {
        logout() {
            console.log("logout clicked"); // eslint-disable-line
            this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push('/login'));
        },
        toggle(){
            document.getElementById("navbar").classList.toggle('active');
        }
    },
    computed: {
        ...mapGetters(['isAuthenticated', 'authStatus', 'username']),
    },
}
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
        font-family: sans-serif;
    }

    header{
        padding: 0 100px;
        background: #EC9F42; /* #6CD867 #FF5733 */ 
        width: 100%;
        height: 60px;
        box-sizing: border-box;
        display:flex;
        justify-content: space-between;
        align-items: center;
    }

    .Logo {
        color: #fff;
        height: 50px;
        line-height: 50px;
        font-size: 24px;
        display: flex;
        font-weight: bold;
    }

    .Logo a {
        text-decoration: none;
    }

    .header-left{
        display: flex;
        justify-content: start;
        align-items: center;
        height: 60px;
    }

    .header-category{
        margin-right: 100px; 
        height: 100%;
        position: relative;
    }

    .header-category li {
        margin-top: 5px;
        list-style: none;
    }

    .header-category a{
        height: 50px;
        line-height: 50px;
        color: #fff;
        text-decoration: none;
        font-weight: bold;
    }
    
    .dropdownmenu-1{
        z-index: 100;
        display: none;
        list-style: none;
        margin-top: 5px;
        position: absolute;
        text-align: left;
        background: #8E8A84;
        width: 250px;
    }

    .subcat-development, .subcat-business, .subcat-design{
        display: none;
        top: -5px;
        right: 0;
        transform: translate(101%,0);
        position: absolute;
        text-align: left;
        background: #8E8A84;
    }

    .dropdownmenu-1 li{
        position: relative;
        padding: 5px 10px;
        border-bottom: 2px solid #ffffff;
    }

    .dropdownmenu-1 li a{
        font-weight: normal;
        color: #FFF;
    }

    .header-category:hover .dropdownmenu-1, .cat-development:hover .subcat-development, .cat-business:hover .subcat-business, .cat-design:hover .subcat-design{
        display: block;
    }


    .header-search-box{
        margin-left: 20px;
        background: #FFF;
        display: flex;
        align-items: center;
    }

    .search-txt{
        border: none;
        background: none;
        outline: none;
        padding: 5px;
        color: #585858;
        font-size: 16px;
        line-height: 30px;
        width: 500px;
    }

    .search-btn{
        color: #EC9F42;
        width: 30px;
        height: 30px;
        /* border-radius:40px; */
        background: #FFF;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    header nav {
        display: flex;
    }

    header nav ul {
        margin: 0;
        padding: 0;
        display: flex;
    }

    header nav ul li {
        List-style: none;
    }

    header nav ul li a, .username, .logout-btn {
        display: block;
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
        color: #fff;
        cursor: pointer;
        text-decoration: none;
    }

    header nav ul li:hover {
        color: #fff;
        background: #2196f3;
    }

    .menu-toggle {
        color: #fff;
        float: right;
        Line-height: 50px;
        font-size: 24px;
        cursor: pointer;
        display: none;
    }

    /*@media (max-width: 1400px) {*/
    /*    .search-txt{*/
    /*        transition: 0.5s;*/
    /*        width: 300px;*/
    /*    }*/
    /*    .header-category{*/
    /*        transition: 0.5s;*/
    /*        margin-right: 50px;*/
    /*    }*/
    /*    header nav ul li a{*/
    /*        transition: 0.5s;*/
    /*        padding: 0 15px;*/
    /*    }*/
    /*}*/

    /*@media (min-width: 1400px) {*/
    /*    .search-txt{*/
    /*        transition: 0.5s;*/
    /*        width: 500px;*/
    /*    }*/
    /*    .header-category{*/
    /*        transition: 0.5s;*/
    /*        margin-right: 100px; */
    /*    }*/
    /*    header nav ul li a{*/
    /*        transition: 0.5s;*/
    /*        padding: 0 20px;*/
    /*    }*/
    /*}*/

    @media (max-width: 1200px) {
        .search-txt{
            transition: 0.5s;
            width: 300px;
        }
        .header-category{
            transition: 0.5s;
            margin-right: 50px;
        }
        header nav ul li a{
            transition: 0.5s;
            padding: 0 10px;
        }
    }

    @media (min-width: 1200px) {
        .search-txt{
            transition: 0.5s;
            width: 400px;
        }
        .header-category{
            transition: 0.5s;
            margin-right: 80px;
        }
        header nav ul li a{
            transition: 0.5s;
            padding: 0 15px;
        }
    }

    @media (max-width: 1040px) {
        .search-txt{
            transition: 0.5s;
            width: 150px;
        }
        .header-category{
            transition: 0.5s;
            margin-right: 20px;
        }
        header nav ul li a{
            transition: 0.5s;
            padding: 0 5px;
        }
    }

    @media (min-width: 1040px) {
        .search-txt{
            transition: 0.5s;
            width: 300px;
        }
        .header-category{
            transition: 0.5s;
            margin-right: 50px;
        }
        header nav ul li a{
            transition: 0.5s;
            padding: 0 10px;
        }
    }


    @media (max-width: 800px){
        header{
            padding: 0 20px;
        }
        .menu-toggle{
            display: block;
        }
        .header-left{
            display: none;
        }
        header nav{
            position: absolute;
            width: 100%;
            height: calc(100vh-50px);
            background: #333;
            top: 60px; 
            left: -100%;
            transition: 0.5s;
            justify-content: center;
        }
        header nav.active{
            left: 0%;
            z-index: 100;
        }
        header nav ul{
            display: block;
            /*z-index: 100;*/
        }

        header nav ul li a{
            border-bottom: 1px solid #ffffff;
        }
    }
</style>