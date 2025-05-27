<script setup>
import { computed, onMounted } from 'vue'
import { useFavProductsStore } from '@/stores/favorite'
import { useProductsStore } from '@/stores/products'

const productsStore = useProductsStore()
const favStore = useFavProductsStore()

onMounted(() => {
  productsStore.getProducts()
})

// Список избранных продуктов
const favoriteProducts = computed(() =>
  productsStore.products.filter(product => favStore.favorite.includes(product.id))
)

// Проверка, в избранном ли продукт
const isFavorite = (productId) => favStore.favorite.includes(productId)

// Переключение избранного
const toggleFavorite = (productId) => {
  if (isFavorite(productId)) {
    favStore.deleteFromFav(productId)
  } else {
    favStore.addToFav(productId)
  }
}
</script>

<template>
  <div>
    <h4>Favorite</h4>
    <ol class="products_list">
      <li v-for="product in favoriteProducts" :key="product.id" class="product_item">
        <div>
          <img :src="`http://localhost:1452/${product.images[0]}`" alt="product image" class="product_img" />
          <button @click="toggleFavorite(product.id)" aria-label="Toggle favorite">
            <span v-if="isFavorite(product.id)">❤️</span>
            <span v-else>🤍</span>
          </button>
        </div>

        <RouterLink :to="`/product/${product.id}`" class="link">
          <p>{{ product.name }}</p>
          <p>${{ product.price }}</p>
        </RouterLink>

        <button class="buy_now_btn">Buy Now</button>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.products_list {
  list-style: none;
  padding: 0;
}

.product_item {
  margin-bottom: 1em;
  border: 1px solid #ccc;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.product_img {
  max-width: 150px;
  display: block;
}

.buy_now_btn {
  margin-top: 10px;
}
</style>
