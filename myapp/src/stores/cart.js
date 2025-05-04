import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCartProductsStore = defineStore('cart_products', () => {
    const cart = ref([])

    function addToCart() {

    }

    function delleteFromCart() {

    }


  return {cart, addToCart, delleteFromCart}
})
