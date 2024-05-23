// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/user/Index.vue';
import BestDeals from '../views/user/BestDeals.vue';
import WhatweDo from '../views/user/WhatweDo.vue';
import Contact from '../views/user/Contact.vue';
// import UserLogin from '../pages/UserLogin.vue';
// import UserRegister from '../pages/UserRegister.vue';
import AdminLogin from '../views/admin/AdminLogin.vue';
// import UserDashboard from '../components/UserDashboard.vue';
import AdminDashboard from '../views/admin/AdminDashboard.vue';
// import FlightList from '../components/FlightList.vue';
// import store from '../store';

const routes = [
  { path: '/',  name: 'Home', component: Home },
  { path: '/bestdeal',  name: 'BestDeals', component: BestDeals },
  { path: '/whatwedo',  name: 'WhatweDo', component: WhatweDo },
  { path: '/contact',  name: 'Contact', component: Contact },
//   { path: '/login', component: UserLogin },
//   { path: '/register', component: UserRegister },
  { path: '/admin-login', component: AdminLogin },
//   { 
//     path: '/dashboard', 
//     component: UserDashboard,
//     meta: { requiresAuth: true, role: 'user' },
//   },
  { 
    path: '/admin', 
    component: AdminDashboard,
    meta: { requiresAuth: true, role: 'admin' },
  },
//   { path: '/flights', component: FlightList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.isAuthenticated;
  const userRole = store.state.userRole;

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ path: '/login' });
    } else if (to.meta.role && to.meta.role !== userRole) {
      next({ path: '/' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
