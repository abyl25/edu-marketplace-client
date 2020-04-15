<template>
    <header class="header">
        <div class="Logo">
            <router-link to="/">
                <img class="logoimg" src="../../assets/logo.png" height="35" draggable="false">
            </router-link>
        </div>
        <div class="header-left">
            <category-drop></category-drop>
            <form class="header-search-box" @submit="searchCourses">
                <input class="search-txt" type="text" name="" placeholder="Type to search" v-model="searchText">
                <a class="search-btn" href="#" @click="searchCourses">
                    <i class="fas fa-search"></i>
                </a>
            </form>
        </div>
        <nav id="navbar">
            <ul>
                <template v-if="!this.isAuthenticated">
                    <li>
                        <!-- login -->
                        <router-link to="/auth">
                            <svg class="glow" height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
                                <path d="m218.667969 240h-202.667969c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h202.667969c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"/>
                                <path d="m138.667969 320c-4.097657 0-8.191407-1.558594-11.308594-4.691406-6.25-6.253906-6.25-16.386719 0-22.636719l68.695313-68.691406-68.695313-68.671875c-6.25-6.253906-6.25-16.386719 0-22.636719s16.382813-6.25 22.636719 0l80 80c6.25 6.25 6.25 16.382813 0 22.636719l-80 80c-3.136719 3.132812-7.234375 4.691406-11.328125 4.691406zm0 0"/>
                                <path d="m341.332031 512c-23.53125 0-42.664062-19.136719-42.664062-42.667969v-384c0-18.238281 11.605469-34.515625 28.882812-40.511719l128.171875-42.730468c28.671875-8.789063 56.277344 12.480468 56.277344 40.578125v384c0 18.21875-11.605469 34.472656-28.863281 40.488281l-128.214844 42.753906c-4.671875 1.449219-9 2.089844-13.589844 2.089844zm128-480c-1.386719 0-2.558593.171875-3.816406.554688l-127.636719 42.558593c-4.183594 1.453125-7.210937 5.675781-7.210937 10.21875v384c0 7.277344 7.890625 12.183594 14.484375 10.113281l127.636718-42.558593c4.160157-1.453125 7.210938-5.675781 7.210938-10.21875v-384c0-5.867188-4.777344-10.667969-10.667969-10.667969zm0 0"/>
                                <path d="m186.667969 106.667969c-8.832031 0-16-7.167969-16-16v-32c0-32.363281 26.300781-58.667969 58.664062-58.667969h240c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16h-240c-14.699219 0-26.664062 11.96875-26.664062 26.667969v32c0 8.832031-7.167969 16-16 16zm0 0"/>
                                <path d="m314.667969 448h-85.335938c-32.363281 0-58.664062-26.304688-58.664062-58.667969v-32c0-8.832031 7.167969-16 16-16s16 7.167969 16 16v32c0 14.699219 11.964843 26.667969 26.664062 26.667969h85.335938c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"/>
                            </svg>
                            <svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
                                <path d="m218.667969 240h-202.667969c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h202.667969c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"/>
                                <path d="m138.667969 320c-4.097657 0-8.191407-1.558594-11.308594-4.691406-6.25-6.253906-6.25-16.386719 0-22.636719l68.695313-68.691406-68.695313-68.671875c-6.25-6.253906-6.25-16.386719 0-22.636719s16.382813-6.25 22.636719 0l80 80c6.25 6.25 6.25 16.382813 0 22.636719l-80 80c-3.136719 3.132812-7.234375 4.691406-11.328125 4.691406zm0 0"/>
                                <path d="m341.332031 512c-23.53125 0-42.664062-19.136719-42.664062-42.667969v-384c0-18.238281 11.605469-34.515625 28.882812-40.511719l128.171875-42.730468c28.671875-8.789063 56.277344 12.480468 56.277344 40.578125v384c0 18.21875-11.605469 34.472656-28.863281 40.488281l-128.214844 42.753906c-4.671875 1.449219-9 2.089844-13.589844 2.089844zm128-480c-1.386719 0-2.558593.171875-3.816406.554688l-127.636719 42.558593c-4.183594 1.453125-7.210937 5.675781-7.210937 10.21875v384c0 7.277344 7.890625 12.183594 14.484375 10.113281l127.636718-42.558593c4.160157-1.453125 7.210938-5.675781 7.210938-10.21875v-384c0-5.867188-4.777344-10.667969-10.667969-10.667969zm0 0"/>
                                <path d="m186.667969 106.667969c-8.832031 0-16-7.167969-16-16v-32c0-32.363281 26.300781-58.667969 58.664062-58.667969h240c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16h-240c-14.699219 0-26.664062 11.96875-26.664062 26.667969v32c0 8.832031-7.167969 16-16 16zm0 0"/>
                                <path d="m314.667969 448h-85.335938c-32.363281 0-58.664062-26.304688-58.664062-58.667969v-32c0-8.832031 7.167969-16 16-16s16 7.167969 16 16v32c0 14.699219 11.964843 26.667969 26.664062 26.667969h85.335938c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"/>
                            </svg>
                        </router-link>
                    </li>
<!--                    <li><router-link to="/auth" @click.native="setAuthIndex(2)">{{ $t('message.signup') }}</router-link></li>-->
                </template>
                <template v-if="this.isAuthenticated">
                    <template v-if="isStudent"> <!--  -->
                        <li><router-link to="/cart" class="cart-link">
                            <div class="cart-badge-container">
                                <img src="../../assets/icons8-shopping-cart-35-white.png">
                                <span class="badge" v-if="cartItemsLength > 0">{{ cartItemsLength }}</span>
                            </div>
                        </router-link></li>
<!--                        <li><router-link to="/home/my-courses">My Courses</router-link></li>-->
                        <Dropdown :name="user.userName" :items="studentItems" :onClick="onClick" />
                    </template>
<!--                    <template v-if="isStudent">-->
<!--                        <Dropdown :name="user.userName" :items="studentItems" :onClick="onClick" />-->
<!--                    </template>-->
                    <template v-else>
                        <Dropdown :name="user.userName" :items="instructorItems" :onClick="onClick" />
                    </template>
                </template>
<!--                <template>-->
<!--                    <select id="locale" v-model="$root.$i18n.locale" @change="onLocaleSelected($event)">-->
<!--                        <option v-for="(lang, i) in languages" :key="`Lang${i}`" :value="lang">{{ lang }}</option>-->
<!--                    </select>-->
<!--                </template>-->
            </ul>
        </nav>
        <div class="menu-toggle" v-on:click="toggle"><i class="fa fa-bars" aria-hidden="true"></i></div>
    </header>
<!--    <vue-navigation-bar :options="navbarOptions" />-->
</template>

<script>
import { mapGetters } from 'vuex';
import { AUTH_LOGOUT } from '../../store/actions';
import Dropdown from "@/components/layout/Dropdown";
import categoryDrop from "../CategoryDrop"

export default {
    name: "NewHeader",
    components: {
        // "vue-navigation-bar": VueNavigationBar,
        Dropdown,
        categoryDrop
    },
    data() {
        return {
            languages: ['en', 'kz', 'ru'],
            searchText: '',
            studentItems: [
                {
                    text: 'Home',
                    link: '/home'
                }, {
                    text: 'Profile',
                    link: '/profile'
                }, {
                    text: 'My Courses',
                    link: '/home/my-courses'
                }, {
                    text: 'Cart',
                    link: '/cart'
                }, {
                    text: 'Log out',
                    // text: $t('message.logout'),
                    link: '/logout'
                }
            ],
            instructorItems: [
                {
                    text: 'Home',
                    link: '/instructor/home'
                }, {
                    text: 'Profile',
                    link: '/instructor/profile'
                }, {
                    text: 'Log out',
                    link: '/logout'
                }
            ]
        }
    },
    methods: {
        onClick(item) {
            if (item.link === '/logout') {
                this.logout();
            } else {
                this.$router.push(item.link);
            }
        },
        toggle(){
            document.getElementById("navbar").classList.toggle('active');
        },
        logout() {
            this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push('/auth'));
        },
        setAuthIndex(index) {
            localStorage.setItem('authTab', index);
        },
        searchCourses(e) {
            e.preventDefault();
            if (this.searchText) {
                this.$router.push({ path: '/courses/search', query: { q: this.searchText } });
            }
        },
        onLocaleSelected(e) {
            localStorage.setItem('locale', e.target.value);
        }
    },
    computed: {
        ...mapGetters(['isAuthenticated', 'authStatus', 'user', 'isInstructor', 'homePage']),
        cartItemsLength() {
            if (this.user != null) { // && this.user.cart != null ??
                return this.user.cart.cartItems.length;
            }
            return 0;
        },
        isStudent() {
            return this.user.roles[0].name === 'Student';
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
        position: relative;
        display: flex;
        align-items: center;
    }

    header {
        padding: 0 20px;
        /*background: #EC9F42; !* #6CD867;  #FF5733;  #39CCCC;  #001f3f; #0b98de; *!;  github: #24292e;  #686d6e; */
        background-color: #323b40;  /* #2b3a42;  #435b71;   #505763;  #29303b;  */
        width: 100%;
        height: 60px;
        box-sizing: border-box;
        display: flex;
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
        border-radius: 4px;
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
        color: #0ebac7;
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

    /* header nav ul li:hover {
        color: #fff;
        background: #2196f3;
    } */

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


header nav ul li a {
    border-bottom: 0px solid rgba(0, 0, 0, 0.95);
    border-radius: 4px;
    box-shadow: inset 0 -3px 0 0 rgba(0, 0, 0, 0), 0 6px 8px rgba(0, 0, 0, 0), 0 24px 24px rgba(0, 0, 0, 0), 0 36px 36px rgba(0, 0, 0, 0), 0 64px 64px rgba(0, 0, 0, 0), 0 64px 128px rgba(0, 0, 0, 0), 0 120px 0 rgba(0, 0, 0, 0), 0 86px 8px 6px rgba(0, 0, 0, 0);
    display: inline-block;
    height: 20px;
    padding: 30px;
    padding-right: 45px;
    position: relative;
    -webkit-transition: 0.2s ease-in;
    transition: 0.2s ease-in;
    width: 30px;
  }
  header nav ul li a svg {
    left: 20px;
    position: absolute;
    top: 20px;
    height: 25px;
    width: 30px;
  }
  
  svg {
    left: 20px;
    /* position: absolute; */
    top: 20px;
    height: 30px;
    width: 30px;
  }
  
  svg.glow path {
    fill: rgba(0, 0, 0, 0);
  }
  
  svg path {
    fill: #0096a1;
    -webkit-transition: 0.2s ease-in;
    transition: 0.2s ease-in;
  }
  
  header nav ul li a:hover {
    -webkit-transform: translateY(-4px);
            transform: translateY(-4px);
    box-shadow: inset 0 -3px 0 0 rgba(0, 0, 0, 0.1), 0 6px 8px rgba(0, 0, 0, 0.05), 0 24px 24px rgba(0, 0, 0, 0.05);
  }
  
  header nav ul li a:hover svg.glow {
    filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><f…ter id="filter"><feGaussianBlur stdDeviation="10" /></filter></svg>#filter');
    -webkit-filter: blur(2px);
            filter: blur(2px);
  }
  
  header nav ul li a:hover svg.glow path{
    fill: rgba(14, 186, 199, 0.6);
  }
  
  header nav ul li a:hover svg path{
    fill: #0ebac7;
  }

</style>
