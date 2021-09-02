import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter)


const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')


const routes = [
  {
    path: '',
    redirect: '/Home'
  },
  {
    path: '/Home',
    component: Home
  },
  {
    path : '/Category',
    component: Category
  },
  {
    path : '/Cart',
    component: Cart
  },
  {
    path : '/Profile',
    component: Profile
  },
  {
    path:'/Detail/:iid',
    component: Detail
  },
]

const router = new VueRouter({
  routes ,
  mode: 'history'
})

export default router
