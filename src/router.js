import Vue from 'vue'
import Router from 'vue-router';
import store from './store';
import Home from '@/views/instructor/Home.vue';
import StudentHome from "@/views/student/StudentHome";
import Login from '@/views/auth/Login';
import SignUp from '@/views/auth/SignUp';
import AccountConfirmation from '@/views/auth/AccountConfirmation';
import CourseList from '@/views/courses/CourseList';
import CourseDetails from "@/views/courses/CourseDetails";
import SearchCourse from "@/views/courses/SearchCourse";
import CreateCourse from "@/views/instructor/CreateCourse";
import ICourseManage from "@/views/instructor/ICourseManage";
import ICourseInfo from "@/views/instructor/ICourseInfo";
import CourseTarget from "@/views/instructor/CourseTarget";
import ICourseCurriculum from "@/views/instructor/ICourseCurriculum";
import ICourseSetting from "@/views/instructor/ICourseSetting";
import Cart from "@/views/student/Cart";
import Checkout from "@/views/student/Checkout";
import MyCourses from "@/views/student/MyCourses";
import ICourseStudent from "@/views/instructor/ICourseStudent";
import ImageUpload from "@/views/instructor/ImageUpload";
import NotFound from "@/views/NotFound";
import NotAuthorized from "@/views/NotAuthorized";
import LearnPage from "@/views/student/LearnPage";
import Auth from "@/views/auth/Auth";
import Carousel from "@/components/Carousel";
import Rating from "@/components/Rating";

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Carousel',
      component: Carousel,
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
    // {
    //   path: '/login',
    //   name: 'Login',
    //   component: Login,
    //   meta: {
    //     guest: true
    //   },
    //   beforeEnter: (to, from, next) => {
    //     if (store.getters.isAuthenticated) {
    //       next('/');
    //     } else {
    //       next();
    //     }
    //   }
    // },
    // {
    //   path: '/signup',
    //   name: 'SignUp',
    //   component: SignUp,
    //   meta: {
    //     guest: true
    //   }
    // },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth,
      meta: {
        guest: true
      },
    },
    {
      path: '/confirm',
      name: 'AccountConfirmation',
      component: AccountConfirmation,
      meta: {
        guest: true
      },
    },
    {
      path: '/courses/search',
      name: 'SearchCourse',
      component: SearchCourse,
      meta: {
        guest: true
      }
    },
    {
      path: '/courses/:category',
      name: 'CoursesCat',
      component: CourseList,
      meta: {
        guest: true
      }
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
      meta: {
        guest: true
      }
    },
    {
      path: '/course/:course_id/lecture/:lecture_id',
      name: 'LearnPage',
      component: LearnPage,
      meta: {
        requiresAuth: true,
        isStudent: true
      }
    },
    {
      path: '/instructor/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true,
        isInstructor: true
      },
    },
    {
      path: '/instructor/course/create',
      name: 'CreateCourse',
      component: CreateCourse,
      meta: {
        requiresAuth: true,
        isInstructor: true
      },
    },
    {
      path: '/instructor/course/:id',
      component: ICourseManage,
      meta: {
        requiresAuth: true,
        isInstructor: true
      },
      children: [
        {
          path: 'main',
          component: ICourseInfo
        },
        {
          path: 'image',
          component: ImageUpload
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
          path: 'students',
          component: ICourseStudent
        },
        {
          path: 'settings',
          component: ICourseSetting
        }
      ]
    },
    {
      path: '/home',
      name: 'StudentHome',
      component: StudentHome,
      // get component() {
      //   if (store.getters.user.roles[0].name === 'Student') {
      //     return StudentHome;
      //   } else {
      //     return Home;
      //   }
      // },
      meta: {
        requiresAuth: true,
        isStudent: true
      }
    },
    {
      path: '/home/my-courses',
      name: 'MyCourses',
      component: MyCourses,
      meta: {
        requiresAuth: true,
        isStudent: true
      }
    },
    {
      path: '/cart/checkout',
      name: 'Checkout',
      component: Checkout,
      meta: {
        requiresAuth: true,
        isStudent: true
      }
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart,
      meta: {
        requiresAuth: true,
        isStudent: true
      }
    },
    {
      path: '/403',
      name: 'NotAuthorized',
      component: NotAuthorized,
      meta: {
        guest: true
      }
    },
    {
      path: '/404',
      name: 'NotFound',
      component: NotFound,
      meta: {
        guest: true
      }
    },
    // {
    //   path: '*',
    //   redirect: '/404'
    // }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next({
        // path: '/login',
        path: '/auth',
        query: { redirect: to.fullPath }
      });
    } else {
      if (to.matched.some(record => record.meta.isStudent)) {
        if (store.getters.user.roles[0].name === 'Student'){
          next();
        } else{
          next({ path: '/403'})
        }
      } else if (to.matched.some(record => record.meta.isInstructor)) {
        if (store.getters.user.roles[0].name === 'Instructor'){
          next();
        } else {
          next('/403');
        }
      } else if (to.matched.some(record => record.meta.isAdmin)) {
        if (store.getters.user.roles[0].name === 'Admin'){
          next();
        } else {
          next('/403');
        }
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
      if (to.path === '/auth' && store.getters.isAuthenticated) {
        next('/' );
      } else {
        next();
      }
  }
});

export default router;
