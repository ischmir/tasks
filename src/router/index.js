import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home',
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: 'Login',
      },
    },
    {
      component: () => import('../views/PetListView.vue'),
      path: '/pets',
      name: 'pets',
      meta: {
        title: 'Pets',
      },
    },
    {
      component: () => import('../views/PetDetailView.vue'),
      path: '/petdetails?petId=:petId',
      name: 'petsDetails',
      meta: {
        title: 'Pet Details',
      },
    },
    {
      component: () => import('@/views/AdminAddPetView.vue'),
      path: '/adminpanel',
      name: 'adminPanel',
      meta: {
        requireAuth: true,
        title: 'Admin panel',
      },
    },
  ]
})

router.beforeEach((to, from, next) => {
  console.log('before each', to.meta);
  if(to.meta.requireAuth === true && !localStorage.getItem('token')) {
     router.push('/login');
  }
  next();
});

export default router
