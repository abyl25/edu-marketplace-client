import Vue from 'vue'
import Router from 'vue-router';
import store from './store';
import Home from './views/Home.vue';
import Login from '@/views/auth/Login';
import SignUp from '@/views/auth/SignUp';
import AccountConfirmation from '@/views/auth/AccountConfirmation';
import CarouselContainer from "@/components/carousel/CarouselContainer";
import CourseList from './views/courses/CourseList';
import SearchCourse from "@/views/courses/SearchCourse";
import InstructorCourses from "@/views/instructor/InstructorCourses";
import CreateCourse from "@/views/instructor/CreateCourse";

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
      name: 'CarouselContainer',
      component: CarouselContainer,
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
    {
      path: '/confirm',
      name: 'AccountConfirmation',
      component: AccountConfirmation,

    },
    {
      path: '/courses/search',
      name: 'SearchCourse',
      component: SearchCourse,
    },
    {
      path: '/courses/:category',
      name: 'CoursesCat',
      component: CourseList,
    },
    {
      path: '/courses/:category/:subcategory',
      name: 'Courses',
      component: CourseList,
      meta: {
          guest: true
      }
    },
    {
      path: '/instructor/courses',
      name: 'InstructorCourses',
      component: InstructorCourses
    },
    {
      path: '/course/create',
      name: 'CreateCourse',
      component: CreateCourse
    }
  ]
});

export default router;
