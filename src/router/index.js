import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Front/Home.vue'
import Dashboard from '../views/Back/Dashboard.vue'
import Index from '../views/Front/Index.vue'
import Login from '../views/Front/Login.vue'
import ProductManage from '../views/Back/ProductManage.vue'
import Material from '../views/Front/Material.vue'
import Floor from '../views/Front/Floor.vue'
import Paint from '../views/Front/Paint.vue'
import ProductDetail from '../views/Front/ProductDetail.vue'
import New from '../views/Front/New.vue'
import Discount from '../views/Front/Discount.vue'
import Favorite from '../views/Front/Favorite.vue'
import CouponManage from '../views/Back/CouponManage.vue'
import ArticleManage from '../views/Back/ArticleManage.vue'
import Article from '../views/Front/Article.vue'
import ArticleContent from '../views/Front/ArticleContent.vue'
import CheckoutConfirm from '../views/Front/CheckoutConfirm.vue'
import CheckoutInfo from '../views/Front/CheckoutInfo.vue'
import CheckoutPay from '../views/Front/CheckoutPay.vue'
import OrderManage from '../views/Back/OrderManage.vue'
import OrderSearch from '../views/Front/OrderSearch.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/',
        name: Index,
        component: Index
      },
      {
        path: '/login',
        name: Login,
        component: () => import('../views/Front/Login.vue')
      },
      {
        path: '/product/material/:material',
        name: Material,
        component: () => import('../views/Front/Material.vue')
      },
      {
        path: '/product/floor/:floor',
        name: Floor,
        component: () => import('../views/Front/Floor.vue')
      },
      {
        path: '/product/paint/:paint',
        name: Paint,
        component: () => import('../views/Front/Paint.vue')
      },
      {
        path: '/product/:id',
        name: ProductDetail,
        component: () => import('../views/Front/ProductDetail.vue')
      },
      {
        path: '/new',
        name: New,
        component: () => import('../views/Front/New.vue')
      },
      {
        path: '/discount',
        name: Discount,
        component: () => import('../views/Front/Discount.vue')
      },
      {
        path: '/favorite',
        name: Favorite,
        component: () => import('../views/Front/Favorite.vue')
      },
      {
        path: '/article',
        name: Article,
        component: () => import('../views/Front/Article.vue')
      },
      {
        path: '/article/content/:id',
        name: ArticleContent,
        component: () => import('../views/Front/ArticleContent.vue')
      },
      {
        path: '/checkoutConfirm',
        name: CheckoutConfirm,
        component: () => import('../views/Front/CheckoutConfirm.vue')
      },
      {
        path: '/checkoutInfo',
        name: CheckoutInfo,
        component: () => import('../views/Front/CheckoutInfo.vue')
      },
      {
        path: '/checkoutPay/:id',
        name: CheckoutPay,
        component: () => import('../views/Front/CheckoutPay.vue')
      },
      {
        path: '/orderSearch',
        name: OrderSearch,
        component: () => import('../views/Front/OrderSearch.vue')
      }
    ]
  },
  {
    path: '/admin',
    name: Dashboard,
    component: Dashboard,
    children: [
      {
        path: 'productManage',
        name: ProductManage,
        component: () => import('../views/Back/ProductManage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'couponManage',
        name: CouponManage,
        component: () => import('../views/Back/CouponManage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'articleManage',
        name: ArticleManage,
        component: () => import('../views/Back/ArticleManage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'orderManage',
        name: OrderManage,
        component: () => import('../views/Back/OrderManage.vue'),
        meta: { requiresAuth: true }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkExactActiveClass: 'active',
  scrollBehavior () {
    return {
      left: 0, top: 0
    }
  }
})

export default router
