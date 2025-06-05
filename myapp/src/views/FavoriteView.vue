<script setup>
import { computed, onMounted } from 'vue'
import { useFavProductsStore } from '@/stores/favorite'
import { useProductsStore } from '@/stores/products'
import { useRouter } from 'vue-router'

const productsStore = useProductsStore()
const favStore = useFavProductsStore()
const router = useRouter()

onMounted(async () => {
  try {
    await productsStore.getProducts()
  } catch (error) {
    console.error('Error fetching products:', error)
  }
})

const favoriteProducts = computed(() =>
  productsStore.products.filter(product => favStore.favorite.includes(product.id))
)

const isFavorite = (productId) => favStore.favorite.includes(productId)

const toggleFavorite = (productId) => {
  if (isFavorite(productId)) {
    favStore.deleteFromFav(productId)
  } else {
    favStore.addToFav(productId)
  }
}

const buyNow = (productId) => {
  router.push(`/checkout/${productId}`)
}
</script>

<template>
  <div>
    <h4>Favorite</h4>
    <ol class="products_list">
      <li v-for="product in favoriteProducts" :key="product.id" class="product_item">
        <div>
          <img v-if="product.images.length > 0" :src="`http://localhost:1452/${product.images[0]}`" alt="product image" class="product_img" />
          <button @click="toggleFavorite(product.id)" aria-label="Toggle favorite">
            <span v-if="isFavorite(product.id)">❤️</span>
            <span v-else>🤍</span>
          </button>
        </div>

        <RouterLink :to="`/product/${product.id}`" class="link">
          <p>{{ product.name }}</p>
          <p>${{ product.price }}</p>
        </RouterLink>

        <button class="buy_now_btn" @click="buyNow(product.id)">Buy Now</button>
      </li>
    </ol>
  </div>
</template>

<style scoped>
/* FavoriteView.vue (scoped styles) */

.favorite_products {
  /* composes: list-reset; */
  display: flex;
  flex-direction: column;
  gap: 1.25rem; /* 20px */
}

.product_item {
  background-color: #f6f6f6;
  border-radius: 0.563rem; /* 9px */
  padding: 0.625rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.product_img {
  max-width: 9.375rem; /* 150px */
  height: auto;
  border-radius: 0.375rem;
}

.remove_btn {
  position: absolute;
  top: 0.625rem;
  right: 0.625rem;
  background: transparent;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
}

</style>
