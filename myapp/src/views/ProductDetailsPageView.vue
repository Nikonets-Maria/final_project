
<template>
  <div class="product_page">

    <div class="product_main">
      <div class="product_images">
        <img :src="`http://localhost:1452/`+ productsStore.product_info.images" class="product_img" />
      </div>

      <div class="product_info">
        <h1>{{ productsStore.product_info.name }}</h1>

        <h2>
          <span v-if="productsStore.product_info.discount_price" class="discounted_price">
            ${{ productsStore.product_info.discount_price }}
          </span>
          <span :class="{ 'line-through': productsStore.product_info.discount_price }">
            ${{ productsStore.product_info.price }}
          </span>
        </h2>

        <p>Brand: {{ productsStore.product_info.brand }}</p>
        <p>Category: {{ productsStore.product_info.category }}</p>
        <p>Color: {{ productsStore.product_info.color }}</p>
        <p>Availability: {{ productsStore.product_info.is_available ? 'In stock' : 'Out of stock' }}</p>
        <p>Rating: {{ productsStore.product_info.rating }} ({{ productsStore.product_info.count_review }} reviews)</p>

        <div class="product_actions">
          <button @click="addToWishlist">Add to Wishlist</button>
          <button @click="addToCart">Add to Cart</button>
        </div>
      </div>
    </div>

    <div class="product_details">
      <h3>Details</h3>
      <div v-for="(char, index) in productsStore.product_info.characteristics" :key="index" class="characteristic">
        <strong>{{ char.characteristic }}:</strong>
        <span>{{ char.value }} {{ char.unit_type !== 'значение' ? char.unit_type : '' }}</span>
      </div>
    </div>

    <div class="related_products">
      <h4>Related Products</h4>
      <ol>
        <li v-for="related in relatedProducts" :key="related.id" class="related_item">
          <button @click="toggleFavorite(related.id)">
            {{ isFavorite(related.id) ? '❤️' : '🤍' }}
          </button>
          <!-- <img :src="`http://localhost:1452/`+ productsStore.product_info.images" class="product_img" /> -->
          <img :src="`http://localhost:1452/`+ related.images[0]" :alt="related.name" />
          <p>{{ related.name }}</p>
          <p>${{ related.price }}</p>
          <button @click="buyNow(related.id)">Buy Now</button>
        </li>
      </ol>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProductsStore } from '@/stores/products'
import { useFavProductsStore } from '@/stores/favorite'

const productsStore = useProductsStore()
const favStore = useFavProductsStore()

// Пример связанных продуктов (в реальном приложении получать из стора или API)
const relatedProducts = ref([
  {
    id: 2,
    name: 'iPhone 13',
    price: 45000,
    images: ['image/iphone_13.jpg'],
  },
  {
    id: 3,
    name: 'iPhone 12',
    price: 35000,
    images: ['image/iphone_12.jpg'],
  },
])

const addToWishlist = () => {
  // Логика добавления в избранное
  alert(`Added "${productsStore.product_info.name}" to wishlist`)
}

const addToCart = () => {
  // Логика добавления в корзину
  alert(`Added "${productsStore.product_info.name}" to cart`)
}

const toggleFavorite = (id) => {
  if (favStore.favorite.includes(id)) {
    favStore.deleteFromFav(id)
  } else {
    favStore.addToFav(id)
  }
}

const isFavorite = (id) => favStore.favorite.includes(id)

const buyNow = (id) => {
  alert(`Buy now product id: ${id}`)
}

onMounted(() => {
  productsStore.getProductById(/* передай id продукта */)
  // Загрузка других данных если нужно
})
</script>

<style scoped>
/* ProductDetailsPage.vue (scoped styles) */

.product_details {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product_img {
  max-width: 100%;
  height: auto;
  border-radius: 0.375rem;
}

.product_info {
  margin-top: 1.25rem;
  text-align: center;
}

.product_title {
  font-size: 2rem; /* 32px */
  margin-bottom: 0.625rem; /* 10px */
}

.product_price {
  font-size: 1.5rem; /* 24px */
  color: #28a745; /* green */
}

/* .buy_now_btn {
  composes: btn btn-green;
  margin-top: 1rem;
} */

</style>
