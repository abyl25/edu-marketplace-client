import Vue from 'vue'
import Router from 'vue-router';
import store from './store';
import Home from '@/views/instructor/Home.vue';
import StudentHome from "@/views/student/StudentHome";
import Login from '@/views/auth/Login';
import SignUp from '@/views/auth/SignUp';
import AccountConfirmation from '@/views/auth/AccountConfirmation';
import CarouselContainer from "@/components/carousel/CarouselContainer";
import CourseList from '@/views/courses/CourseList';
import CourseDetails from "@/views/courses/CourseDetails";
import SearchCourse from "@/views/courses/SearchCourse";
import CreateCourse from "@/views/instructor/CreateCourse";
import ICourseManage from "@/views/instructor/ICourseManage";
import ICourseInfo from "@/views/instructor/ICourseInfo";
import CourseTarget from "@/views/instructor/CourseTarget";
import ICourseCurriculum from "@/views/instructor/IcourseCurriculum";
import ICourseSetting from "@/views/instructor/ICourseSetting";
import Cart from "@/views/student/Cart";

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
      path: '/about',
      name: 'About',
      component: () => import('./views/About.vue'),
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
      path: '/course/:id',
      name: 'CourseDetails',
      component: CourseDetails,
    },
    {
      path: '/instructor/home',
      name: 'Home',
      component: Home,
      // beforeEnter: ifAuthenticated,
    },
    {
      path: '/instructor/course/create',
      name: 'CreateCourse',
      component: CreateCourse,
    },
    {
      path: '/instructor/course/:id',
      component: ICourseManage,
      children: [
        // {
        //   path: '',
        //   component:
        // },
        {
          path: 'main',
          component: ICourseInfo
        },
        {
          path: 'target',
          component: CourseTarget
        },
        {
          path: 'curriculum',
          component: ICourseCurriculum
        },
        {
          path: 'settings',
          component: ICourseSetting
        }
      ]
    },
    {
      path: '/student/home',
      name: 'StudentHome',
      component: StudentHome,
      // beforeEnter: ifAuthenticated,
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart,
    }

  ]
});

export default router;
