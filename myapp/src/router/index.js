import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsPageView from '@/views/ProductsPageView.vue'
import ProductDetailsPageView from '../views/ProductDetailsPageView.vue'
import ShoppingCartView from '@/views/ShoppingCartView.vue'
import FavoriteView from '@/views/FavoriteView.vue'
import NotFounPageView from '../views/NotFounPageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
    }, 
    {
      path: '/products',
      component: ProductsPageView
    },
    {
      path: '/product/:id?',
      component: ProductDetailsPageView
    },
    {
      path: '/cart',
      component: ShoppingCartView
    },
    {
      path: '/favorite',
      component: FavoriteView
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFounPageView
    }
  ],
})

export default router
