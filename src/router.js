import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from '@/views/Login';
import SignUp from '@/views/SignUp';
import Body from "@/components/Main";
// import CourseList from "@/components/CourseList";
import store from './store';

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next();
        return
    }
    next('/');
};

const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next();
        return
    }
    next('/login');
};

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Body',
      component: Body,
      meta: {
          guest: true
      }
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      beforeEnter: ifAuthenticated,
      // meta: {
      //   requiresAuth: true
      // }
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      meta: {
        guest: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: ifNotAuthenticated,
      meta: {
        guest: true
      }
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
      meta: {
        guest: true
      }
    },
    // {
    //   path: '/courses/:category/:subcategory',
    //   name: 'Courses',
    //   component: CourseList,
    //   meta: {
    //       guest: true
    //   }
    // },
  ]
});


export default router;
