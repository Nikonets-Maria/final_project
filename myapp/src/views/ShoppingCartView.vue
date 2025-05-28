<script setup>

</script>

<template>

<div>
  
<div>
  <h3>Shopping Cart</h3>
  <ol>
    <li>
      <img/>
      <p></p>
      <div>
        <button>-</button>
        <div>
          <p></p>
        </div>
        <button>+</button>
        <h5>$</h5>
        <button>delete</button>

      </div>
    </li>
  </ol>
  <br>
</div>

<div>
  <h3>Order Summary</h3>

  <form>
    <!-- во вью есть специальные формы посмотреть реп на тему-->
     <label for="">
      <input type="text">
     </label>

     <label for="">
      <input type="text">
     </label>

    <div>
      <h6></h6>
      <h6>cost</h6>
    </div>
    <div>
      <h6></h6>
      <h6>cost</h6>
    </div>
    <div>
      <h6></h6>
      <h6>cost</h6>
    </div>
    <div>
      <h5>Total</h5>
      <h6>cost</h6>
    </div>

    <button>Checkout</button>

  </form>
</div>

</div>

</template>

<style scoped>

</style>


<!-- <script setup>
import { ref, computed } from 'vue'

// Пример данных корзины (в реальном приложении берите из стора)
const cartItems = ref([
  {
    id: 1,
    name: 'Product 1',
    price: 20,
    quantity: 2,
    image: 'http://localhost:1452/product1.jpg',
  },
  {
    id: 2,
    name: 'Product 2',
    price: 15,
    quantity: 1,
    image: 'http://localhost:1452/product2.jpg',
  },
])

// Увеличить количество
const increment = (item) => {
  item.quantity++
}

// Уменьшить количество, минимум 1
const decrement = (item) => {
  if (item.quantity > 1) {
    item.quantity--
  }
}

// Удалить товар из корзины
const removeItem = (item) => {
  cartItems.value = cartItems.value.filter(i => i.id !== item.id)
}

// Вычисляемая сумма по товару
const itemTotal = (item) => item.price * item.quantity

// Итоговая сумма корзины
const totalCost = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
)

// Данные формы заказа
const customerName = ref('')
const customerEmail = ref('')

// Обработка отправки формы
const submitOrder = () => {
  if (!customerName.value.trim() || !customerEmail.value.trim()) {
    alert('Please fill in all fields')
    return
  }
  alert(`Order placed by ${customerName.value} (${customerEmail.value}) for $${totalCost.value.toFixed(2)}`)
  // Здесь можно добавить логику отправки данных на сервер
}
</script>

<template>
  <div>
    <div>
      <h3>Shopping Cart</h3>
      <ol>
        <li v-for="item in cartItems" :key="item.id" style="margin-bottom: 20px; list-style: none;">
          <img :src="item.image" :alt="item.name" width="100" />
          <p>{{ item.name }}</p>
          <div style="display: flex; align-items: center; gap: 10px;">
            <button @click="decrement(item)">-</button>
            <div>
              <p>{{ item.quantity }}</p>
            </div>
            <button @click="increment(item)">+</button>
            <h5>${{ itemTotal(item).toFixed(2) }}</h5>
            <button @click="removeItem(item)">Delete</button>
          </div>
        </li>
        <li v-if="cartItems.length === 0">Your cart is empty.</li>
      </ol>
      <br />
    </div>

    <div>
      <h3>Order Summary</h3>

      <form @submit.prevent="submitOrder" style="display: flex; flex-direction: column; gap: 15px; max-width: 300px;">
        <label>
          Name:
          <input type="text" v-model="customerName" required />
        </label>

        <label>
          Email:
          <input type="email" v-model="customerEmail" required />
        </label>

        <div style="display: flex; justify-content: space-between;">
          <h6>Items Total:</h6>
          <h6>${{ totalCost.toFixed(2) }}</h6>
        </div>

        //Если есть доставка, налоги и т.п., можно добавить сюда

        <div style="display: flex; justify-content: space-between; font-weight: bold;">
          <h5>Total:</h5>
          <h6>${{ totalCost.toFixed(2) }}</h6>
        </div>

        <button type="submit" :disabled="cartItems.length === 0">Checkout</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
button {
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
</style> -->
