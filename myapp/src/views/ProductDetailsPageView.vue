
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
.product_page {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.product_main {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.product_images {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.product_img {
  width: 100%;
  max-width: 300px;
  border-radius: 8px;
}

.product_info {
  flex: 2;
}

.discounted_price {
  color: red;
  margin-right: 10px;
}

.line-through {
  text-decoration: line-through;
  color: gray;
}

.product_actions button {
  margin-right: 10px;
  padding: 8px 15px;
  cursor: pointer;
}

.product_details {
  margin-bottom: 30px;
}

.characteristic {
  margin-bottom: 8px;
}

.related_products ol {
  display: flex;
  gap: 15px;
  padding: 0;
  list-style: none;
}

.related_item {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  width: 160px;
  text-align: center;
}

.related_item img {
  max-width: 100%;
  border-radius: 6px;
  margin-bottom: 5px;
}

.related_item button {
  margin-top: 5px;
  cursor: pointer;
  background: none;
  border: none;
  font-size: 18px;
}
</style>

<!-- <template>
  <div>

    <div>
      <div>
        <img/>

      </div>
      <div>
        <img :src="`http://localhost:1452/`+ productsStore.product_info.images" class="product_img" />
        <h1> {{ productsStore.product_info.name }}</h1>
        <h2> {{ productsStore.product_info.price}}$</h2>
        <h3></h3>  -->
        <!-- если скидка есть передаем через слот? -->
         <!-- <ol>
          <div>
            <img/>
            <p></p>
            <p></p>
          </div>
         </ol>
         <p></p> -->
         <!-- ограничение по тексту и слово кнопка показать больше?
         а нет - если нажать скролит к следущему диву с деталями? 
         !уточнить на паре
         -->
         <!-- <div>
          <button>Add to Wishlist</button>
          <button>Add to Card</button>
         </div>
         
         <ol>
          <img/>
          <p></p>
          <p></p>
         </ol>
      </div>
    </div>

    <div>
      <h3>Details</h3>
      <p></p>
      <div>
        итерация по продукту
         <h4></h4>
         <h4>count</h4>
         <br>
      </div>

    </div>

    <div>
      <h1></h1>
      <p></p>
      <img />
    </div>

  <div class="">
    <h4>Related Products</h4>
    <ol>
       <li>
        <div>
          <button>fav</button>
          <img/>
          <p>text</p>
          <p>cost</p>
          <button>Buy Now</button>
        </div>
      </li>
    </ol>

    </div> 
  </div>


</template>

<script setup>
import { useProductsStore } from '@/stores/products'
import { onMounted } from 'vue'

  const productsStore = useProductsStore() -->

<!-- 
  // const getProductById = () => {
  //   productsStore.getProductById()
  // }

//   onMounted(() => {
//   })

// </script> -->

<!-- // <style scoped>

// </style> -->