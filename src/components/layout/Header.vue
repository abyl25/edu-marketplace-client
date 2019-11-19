<template>
    <header class="header">
        <div class="Logo">
            <router-link to="/">
                <img class="logoimg" src="../../assets/logo.png" height="35">
            </router-link>
        </div>
        <div class="header-left">
            <div class="header-category">
                <li><a href="#">Categories</a>
                    <ul class="dropdownmenu-1">
                        <li class="cat-development"><router-link to="/courses/development">Development</router-link>
                            <ul class="subcat-development">
                                <li><router-link to="/courses/development/web-development">Web Development</router-link></li>
                                <li><router-link to="/courses/development/mobile-development">Mobile App</router-link></li>
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
            <form class="header-search-box" @submit="searchCourses">
                <input class="search-txt" type="text" name="" placeholder="Type to search" v-model="searchText">
                <a class="search-btn" href="#" @click="searchCourses">
                    <i class="fas fa-search"></i>
                </a>
            </form>
        </div>
        <nav id="navbar">
            <ul>
                <li>
                    <router-link to="/cart" class="cart-link">
                        <div class="cart-badge-container" style="position: relative">
                            <img src="../../assets/icons8-shopping-cart-35-white.png">
                            <span class="badge" v-if="cartItemsLength>0">{{ cartItemsLength }}</span>
                        </div>
                    </router-link>
                </li>
                <template v-if="!this.isAuthenticated">
                    <li><router-link to="/login">Sign in</router-link></li>
                    <li><router-link to="/signup">Sign up</router-link></li>
                </template>
                <template v-if="this.isAuthenticated">
<!--                    <li><span class="username">{{ user.userName }}</span></li>-->
                    <li><router-link to="/home/my-courses">My Courses</router-link></li>
                    <li><router-link :to="{ path: this.homePage }">{{ user.userName }}</router-link></li>
                    <li><p class="logout-btn" @click="logout">Log out</p></li>
                </template>
            </ul>
        </nav>
        <div class="menu-toggle" v-on:click="toggle"> <i class="fa fa-bars" aria-hidden="true"></i></div>
    </header>
</template>

<script>
import { mapGetters } from 'vuex';
import { AUTH_LOGOUT } from '../../store/actions';

export default {
    name: "Header",
    data() {
        return {
            searchText: ''
        }
    },
    methods: {
        toggle(){
            document.getElementById("navbar").classList.toggle('active');
        },
        logout() {
            this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push('/login'));
        },
        searchCourses(e) {
            e.preventDefault();
            if (this.searchText) {
                this.$router.push({ path: '/courses/search', query: { q: this.searchText } });
            }
        }
    },
    computed: {
        ...mapGetters(['isAuthenticated', 'authStatus', 'user', 'isInstructor', 'homePage']),
        cartItemsLength() {
            if (this.user != null) {
                return this.user.cart.cartItems.length;
            }
            return 0;
        }
    }
}
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
        font-family: sans-serif;
    }

    .badge {
        position: absolute;
        right: -6px;
        top: -4px;
        display: inline-block;
        min-width: 9px;
        padding: 1px 4px;
        font-size: 10px;
        font-weight: 700;
        color: #fff;
        line-height: 1.43;
        background-color: #ec5252;
        border: 1px solid #fff;
        border-radius: 15px;
        z-index: 1;
    }

    .cart-badge-container {
        display: flex;
        align-items: center;
    }

    header {
        padding: 0 20px;
        /*background: #EC9F42; !* #6CD867;  #FF5733;  #39CCCC;  #001f3f; #0b98de; *!;  github: #24292e;  #686d6e; */
        background-color:  #737778;  /* #505763;  #29303b;  */
        width: 100%;
        height: 60px;
        box-sizing: border-box;
        display:flex;
        justify-content: space-between;
        align-items: center;
    }

    .Logo {
        align-items: center;
        display: flex;
        font-weight: bold;
    }

    .logoimg {
        color: #fff;
        filter: brightness(0) invert(1);
    }

    .header-left {
        display: flex;
        justify-content: start;
        align-items: center;
        height: 60px;
    }

    .header-category {
        margin-right: 100px;
        height: 100%;
        position: relative;
    }

    .header-category li {
        margin-top: 5px;
        list-style: none;
    }

    .header-category a {
        height: 50px;
        line-height: 50px;
        color: #fff;
        text-decoration: none;
        font-weight: bold;
    }
    
    .dropdownmenu-1 {
        z-index: 100;
        display: none;
        list-style: none;
        margin-top: 5px;
        position: absolute;
        text-align: left;
        background: #8E8A84;
        width: 250px;
    }

    .subcat-development, .subcat-business, .subcat-design {
        display: none;
        top: -5px;
        right: 0;
        transform: translate(100%,0);
        position: absolute;
        text-align: left;
        border-left: 2px solid #FFFFFF;
        background: #8E8A84;
    }

    .dropdownmenu-1 li {
        position: relative;
        padding: 5px 10px;
        border-bottom: 2px solid #ffffff;
    }

    .dropdownmenu-1 li a {
        font-weight: normal;
        color: #FFF;
    }

    .header-category:hover .dropdownmenu-1, .cat-development:hover .subcat-development, .cat-business:hover .subcat-business, .cat-design:hover .subcat-design {
        display: block;
    }

    .header-search-box {
        margin-left: 20px;
        background: #FFF;
        display: flex;
        align-items: center;
    }

    .search-txt {
        border: none;
        background: none;
        outline: none;
        padding: 5px;
        color: #585858;
        font-size: 16px;
        line-height: 30px;
        width: 100%;
    }

    .search-btn {
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
        align-items: center;
        height: 50px;
    }

    header nav ul {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        margin: 0;
        padding: 0;
    }

    header nav ul li {
        display: flex;
        align-items: center;
        list-style: none;
        height: 100%;
    }

    header nav ul li a, header nav ul li p {
        display: block;
        /*height: 100%;*/
        line-height: 50px;
        padding: 0 20px;
        color: #fff;
        cursor: pointer;
        text-decoration: none;
    }

    .logout-btn {
        padding: 0 10px;
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
            width: 500px;
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
            width: 300px;
            /*flex-basis: 90%;*/
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
        .search-txt {
            transition: 0.5s;
            width: 370px;
            /*flex-basis: 90%;*/
        }
        .header-category {
            transition: 0.5s;
            margin-right: 50px;
        }
        header nav ul li a {
            display: block;
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