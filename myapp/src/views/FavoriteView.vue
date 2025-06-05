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

</script>

<template>
  <div class="fav_content">
    <h4>Favorite</h4>
    <ol class="favorite_products">
      <li v-for="product in favoriteProducts" :key="product.id" class="product_item">
        <hr>
        <RouterLink :to="`/product/${product.id}`" class="link">
          <div>
              <img v-if="product.images.length > 0" :src="`http://localhost:1452/${product.images[0]}`" alt="product image" class="product_img" />
          </div>
          <p>{{ product.name }}</p>
        </RouterLink>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.fav_content{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.favorite_products {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  align-items: center;
  justify-content: center;
}

.product_item {
  background-color: #f6f6f6;
  border-radius: 0.5rem; 
  padding: 0.6rem;
  width: 70%;
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.product_img {
  border-radius: 0.375rem;
}


</style>
