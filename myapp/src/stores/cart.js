import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCartProductsStore = defineStore('cart_products', () => {
    const cart = ref([])

    function addToCart(product) {
        const existingItem = cart.value.find(item => item.id === product.id)
        if (existingItem) {
            existingItem.quantity += 1
        } else {
            cart.value.push({ ...product, quantity: 1 }) // Добавляем новый продукт с количеством 1
        }
    }

    function delleteFromCart(productId) {
        cart.value = cart.value.filter(item => item.id !== productId) // Удаляем продукт из корзины
    }

    const subtotal = computed(() => {
        return cart.value.reduce((total, item) => total + item.price * item.quantity, 0)
    })

    const estimatedTax = computed(() => {
        return subtotal.value * 0.10 // Например, 10%
    })

    const estimatedShipping = 5 // Например, \$5

    const total = computed(() => {
        return subtotal.value + estimatedTax.value + estimatedShipping
    })

    return { cart, addToCart, delleteFromCart, subtotal, estimatedTax, estimatedShipping, total }
})
