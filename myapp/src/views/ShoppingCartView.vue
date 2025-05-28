<script setup>
import { onMounted } from 'vue'
import { useCartProductsStore } from '@/stores/cart' // Импортируйте ваш store для корзины

const cartStore = useCartProductsStore()

// Увеличить количество товара
const incrementQuantity = (item) => {
  item.quantity += 1
}

// Уменьшить количество товара
const decrementQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity -= 1
  } else {
    removeFromCart(item)
  }
}

// Удалить товар из корзины
const removeFromCart = (item) => {
  cartStore.delleteFromCart(item.id)
}

// Запрос содержимого корзины при монтировании
onMounted(() => {
  // Здесь можно добавить код для запроса данных, если это необходимо
})
</script>

<template>
  <div>
    <h3>Shopping Cart</h3>
    <ol>
      <li v-for="item in cartStore.cart" :key="item.id">
        <img :src="`http://localhost:1452/${item.image}`" alt="Product Image" />
        <p>{{ item.name }}</p>
        <div>
          <button @click="decrementQuantity(item)">-</button>
          <div>
            <p>{{ item.quantity }}</p>
          </div>
          <button @click="incrementQuantity(item)">+</button>
          <h5>\${{ item.price.toFixed(2) }}</h5>
          <button @click="removeFromCart(item)">Delete</button>
        </div>
      </li>
    </ol>
    <br>

    <div>
      <h3>Order Summary</h3>
      <form @submit.prevent>
        <label for="discount-code">
          <input type="text" placeholder="Discount code" />
        </label>
        <label for="promo-code">
          <input type="text" placeholder="promo code" />
          <button>Aply</button>
        </label>

        <div>
          <h6>Subtotal</h6>
          <h6>{{ cartStore.subtotal.toFixed(2) }}</h6>
        </div>
        <div>
          <h6>Estimated Tax</h6>
          <h6>{{ cartStore.estimatedTax.toFixed(2) }}</h6>
        </div>
        <div>
          <h6>Estimated Shipping & Handling</h6>
          <h6>{{ cartStore.estimatedShipping }}</h6>
        </div>
        <div>
          <h5>Total</h5>
          <h6>{{ cartStore.total.toFixed(2) }}</h6>
        </div>

        <button>Checkout</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Добавьте стили для вашей страницы корзины */
</style>
