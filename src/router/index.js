import Vue from 'vue'
import VueRouter from 'vue-router'
import home from "./modules/home.js";

Vue.use(VueRouter)

const baseRoutes = [];
const routes = baseRoutes.concat(home);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
