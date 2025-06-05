<template>
  <div class="home_content">

    <!-- Cover Section -->
    <div class="cover">
      <div class="cover_info">
        <p class="gray_text">Pro.Beyond.</p>
        <h1>IPhone 14 Pro</h1>
        <p class="gray_text">Created to change everything for the better. For everyone</p>
        <button class="shop_now_btn">Shop Now</button>
      </div>
      <img :src="iphoneImg" alt="IPhone 14 Pro" class="cover_img" />
    </div>

    <!-- Flagman Banner Section -->
    <div class="flagman_baner">
      <div class="banner_item1">
        <img :src="playStationImg" alt="Playstation 5" />
        <div class="banner_item1_content">
          <h2>Playstation 5</h2>
          <p class="gray_text">Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.</p>
        </div>
      </div>

      <div class="banner_item2">
        <img :src="airPodsImg" alt="Apple AirPods Max" />
        <div>
          <h2>Apple AirPods Max</h2>
          <p class="gray_text">Computational audio. Listen, it's powerful</p>
        </div>
      </div>

      <div class="banner_item3">
        <img :src="visionProImg" alt="Apple Vision Pro" />
        <div>
          <h2>Apple Vision Pro</h2>
          <p class="gray_text">An immersive way to experience entertainment</p>
        </div>
      </div>

      <div class="banner_item4">
        <div class="banner_item4_content">
          <h2>Macbook Air</h2>
          <p class="gray_text">The new 15‑inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display.</p>
          <button class="shop_now_btn">Shop Now</button>
        </div>
        <img :src="macbookImg" alt="Macbook Air" />
      </div>
    </div>

    <!-- Category Menu -->
    <div class="category_menu">
      <div>
        <div class="category_swap">
          <h4>Browse by category</h4>
          <div>
            <button class="category_swap_btn" aria-label="Previous category" @click="prevCategory">&lt;</button>
            <button class="category_swap_btn" aria-label="Next category" @click="nextCategory">&gt;</button>
          </div>
        </div>
        <div class="category_list">
          <ul class="category_items">
            <li v-for="item in productsStore.categories" :key="item.id" class="category_item">
              <img :src="item.imageUrl || defaultCategoryImg" :alt="item.name" />
              <h5>{{ item.name }}</h5>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Product List Content Block -->
    <div class="product_list_content_block">
      <nav class="product_filter">
        <a href="#" class="filter_link" :class="{ active: activeFilter === 'new' }" @click.prevent="filterProducts('new')">New Arrival</a>
        <a href="#" class="filter_link" :class="{ active: activeFilter === 'bestseller' }" @click.prevent="filterProducts('bestseller')">Bestseller</a>
        <a href="#" class="filter_link" :class="{ active: activeFilter === 'featured' }" @click.prevent="filterProducts('featured')">Featured Products</a>
      </nav>

      <div class="product_list">
        <ol class="product_list_content">
          <li
            v-for="product in paginatedProducts"
            :key="product.id"
            class="product_item"
            @click="getProductById(product.id)"
          >
            <div>
              <img
                :src="`http://localhost:1452/${product.images[0]}`"
                :alt="product.name"
                class="product_img"
              />
              <button @click.stop="toggleFavorite(product.id)" aria-label="Toggle favorite" class="fav_button">
                <span v-if="isFavorite(product.id)">❤️</span>
                <span v-else>🤍</span>
              </button>
            </div>

            <RouterLink :to="`/product/${product.id}`" class="link">
              <p>{{ product.name }}</p>
              <p>${{ product.price }}</p>
            </RouterLink>

            <button class="buy_now_btn" @click.stop="addToCart(product)">Add to Cart</button>
          </li>
        </ol>
      </div>

      <!-- Пагинация -->
      <div class="pagination">
        <button :disabled="currentPage === 1" @click="prevPage">‹</button>
        <button
          v-for="page in visiblePages"
          :key="page"
          :class="{ active: currentPage === page }"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
        <button :disabled="currentPage === totalPages" @click="nextPage">›</button>
      </div>
    </div>

    <!-- Discount Section -->
    <div class="discount_section">
      <h4>Discounts up to -50%</h4>
      <ul class="discount_products">
        <li v-for="sale_product in productsStore.sale_products.slice(0, 4)" :key="sale_product.id" class="product_item">
          <div>
            <img
              :src="`http://localhost:1452/${sale_product.images[0]}`"
              :alt="sale_product.name"
              class="product_img"
            />
            <button @click.stop="toggleFavorite(sale_product.id)" aria-label="Toggle favorite" class="fav_button">
              <span v-if="isFavorite(sale_product.id)">❤️</span>
              <span v-else>🤍</span>
            </button>
          </div>
          <RouterLink :to="`/product/${sale_product.id}`" class="link">
            <p>{{ sale_product.name }}</p>
            <p>${{ sale_product.price }}</p>
          </RouterLink>
          <button class="buy_now_btn" @click.stop="addToCart(sale_product)">Add to Cart</button>
        </li>
      </ul>
    </div>

    <!-- Sale Banner -->
    <div class="sale_banner">
      <div class="content_sale_banner1">
        <div class="img_content">
          <img :src="tabletScreenImg" alt="Tablet Screen" class="sale_img_viol" />
          <img :src="laptopImg" alt="Laptop" class="sale_img_yellow" />
        </div>
        <img :src="tabletImg" alt="Tablet" class="sale_img_blue" />
      </div>
      <div>
        <h1>Big Summer Sale</h1>
        <p class="gray_text">Commodo fames vitae vitae leo mauris in. Eu consequat.</p>
        <button class="shop_now_btn">Shop Now</button>
      </div>
      <div class="content_sale_banner2">
        <img :src="watchImg" alt="Watch" />
        <img :src="phoneImg" alt="Phone" class="sale_phone_img" />
      </div>
    </div>

  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useProductsStore } from '@/stores/products'
import { useFavProductsStore } from '@/stores/favorite'
import { useCartProductsStore } from '@/stores/cart'
import { RouterLink } from 'vue-router'

import iphoneImg from '../assets/images/Iphone.png'
import playStationImg from '../assets/images/PlayStation.png'
import airPodsImg from '../assets/images/Headphones.png'
import visionProImg from '../assets/images/SomeTech.png'
import macbookImg from '../assets/images/Screen.png'
import tabletScreenImg from '../assets/images/TabletScreen.png'
import phoneImg from '../assets/images/Phone.png'
import laptopImg from '../assets/images/Laptop.png'
import tabletImg from '../assets/images/Tablet.png'
import watchImg from '../assets/images/Watch.png'
import defaultCategoryImg from '../assets/images/TikTok.png' // Заглушка для категории без картинки

const productsStore = useProductsStore()
const favStore = useFavProductsStore()
const cartStore = useCartProductsStore()

const activeFilter = ref('featured')
const currentPage = ref(1)
const itemsPerPage = 8

onMounted(() => {
  productsStore.getProducts()
  productsStore.getDiscountProducts()
  productsStore.getCategories()
})

// Фильтрация товаров по типу
const filteredProducts = computed(() => {
  let filtered = []
  switch (activeFilter.value) {
    case 'new':
      filtered = productsStore.products.filter(p => p.isNew)
      break
    case 'bestseller':
      filtered = productsStore.products.filter(p => p.isBestSeller)
      break
    case 'featured':
    default:
      filtered = productsStore.products
  }
  return filtered
})

// Пагинация
const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredProducts.value.slice(start, start + itemsPerPage)
})

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const goToPage = (page) => {
  currentPage.value = page
}

const visiblePages = computed(() => {
  const total = totalPages.value
  let start = Math.max(currentPage.value - 2, 1)
  let end = Math.min(start + 4, total)

  if (end - start < 4) {
    start = Math.max(end - 4, 1)
  }

  const pages = []
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

const filterProducts = (filterName) => {
  activeFilter.value = filterName
  currentPage.value = 1 // Сбросить на первую страницу при смене фильтра
}

const isFavorite = (productId) => favStore.favorite.includes(productId)

const toggleFavorite = (productId) => {
  if (isFavorite(productId)) {
    favStore.deleteFromFav(productId)
  } else {
    favStore.addToFav(productId)
  }
}

const getProductById = (id) => {
  productsStore.getProductById(id)
}

// Метод добавления товара в корзину
const addToCart = (product) => {
  cartStore.addToCart(product)
}

// Заглушки для переключения категорий (реализуйте по необходимости)
const prevCategory = () => {
  // TODO: Реализовать переключение категорий
}
const nextCategory = () => {
  // TODO: Реализовать переключение категорий
}
</script>

<style scoped>



/* Cover */
.cover {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  background-color: #211c24;
  color: #fff;
  padding: 2rem 1rem;
}

.cover p {
  margin: 0.3rem 0;
  font-size: 1rem;
}

.cover h1 {
  font-size: 6rem; /* 96px */
  margin: 0.5rem 0;
  line-height: 1.1;
}

.shop_now_btn {
  width: 11.75rem; /* 188px */
  height: 3.5rem; /* 56px */
  border: 1px solid #fff;
  background-color: #211c24;
  margin: 0.3rem 0;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.shop_now_btn:hover {
  background-color: #3a3240;
}

/* Banner grid */
.flagman_baner {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  grid-template-rows: 1.5fr 1fr;
  grid-template-areas:
    "item1 item1 item4"
    "item2 item3 item4";
  gap: 0.625rem; /* 10px */
  margin: 1.25rem 0;
}

.banner_item1 {
  grid-area: item1;
  display: flex;
  color: #000;
}

.banner_item1_content {
  margin-top: 12%;
  width: 30%;
}

.banner_item2,
.banner_item3,
.banner_item4 {
  display: flex;
  align-items: center;
  padding: 1rem;
}

.banner_item2 {
  grid-area: item2;
  background-color: #ededed;
  color: #000;
}

.banner_item3 {
  grid-area: item3;
  background-color: #353535;
  color: #fff;
}

.banner_item4 {
  grid-area: item4;
  background-color: #ededed;
  color: #000;
  justify-content: flex-end;
}

.banner_item4_content {
  width: 40%;
  margin-right: 20%;
}

/* Sale banner */
.sale_banner {
  display: flex;
  justify-content: space-between;
  background: linear-gradient(#2e2e2e, #000);
  color: #fff;
  padding: 1.25rem;
  margin-top: 2.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.content_sale_banner1 {
  display: flex;
  flex-direction: column;
}

.sale_img_yellow {
  margin-bottom: 15%;
  max-width: 100%;
  height: auto;
}

.sale_phone_img {
  width: 35%;
  max-width: 100%;
  height: auto;
}

.sale_img_blue {
  width: 70%;
  max-width: 100%;
  height: auto;
}

.img_content {
  margin-left: 1.875rem; /* 30px */
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Category menu */
.category_menu {
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.25rem 0;
  width: 100%;
}

.category_swap {
  display: flex;
  justify-content: space-between;
  width: 20rem; /* 320px */
  margin-bottom: 0.625rem;
  background-color: #fafafa;
}

.category_swap_btn {
  background-color: #fafafa;
  border: none;
  font-size: 2rem;
  margin: 0.3125rem;
  cursor: pointer;
}

.category_list {
  background-color: #fafafa;
  display: flex;
  justify-content: center;
  width: 100%;
  overflow-x: auto;
}

.category_items {
  display: flex;
  gap: 1.25rem;
  padding: 0;
  margin: 0;
  list-style: none;
}

.category_item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 10rem; /* 160px */
  height: 8rem; /* 128px */
  border-radius: 0.938rem; /* 15px */
  background-color: #ededed;
  cursor: pointer;
  text-align: center;
  flex-shrink: 0;
}

.category_item img {
  max-width: 5rem; /* 80px */
  max-height: 5rem;
  object-fit: contain;
  margin-bottom: 0.625rem;
}

/* Product list */
.product_list_content_block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.25rem 0;
  width: 100%;
  max-width: 75rem; /* 1200px */
  margin: 0 auto;
}

.product_filter {
  display: flex;
  align-items: center;
  margin: 0.3125rem 0 0.9375rem 0;
  gap: 1.25rem;
}

.filter_link {
  cursor: pointer;
  color: #000;
  text-decoration: none;
  font-weight: 600;
}

.filter_link:hover,
.filter_link.active {
  text-decoration: underline;
}

.product_list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.25rem;
}

.product_list_content {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  padding: 0;
  margin: 0;
  list-style: none;
  justify-content: center;
}

.product_item {

  background-color: #f6f6f6;
  border-radius: 0.563rem; /* 9px */
  padding: 0.625rem;
  width: 16.25rem; /* 260px */
  text-align: center;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product_img {
  width: 100%;
  height: auto;
  border-radius: 0.375rem;
}

.product_item > div {
  position: relative;
  width: 100%;
}

.product_item button {
  right: 0.625rem;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
}

.buy_now_btn {
  /* composes: btn btn-buy; */
  margin: 0.625rem auto 0 auto;
}

/* Discount Section */
.discount_section {
  margin:  1.25rem ;
  padding: 1.25rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.discount_products {
  /* composes: list-reset flex-gap; */
  display: flex;
  flex-wrap: wrap;
}

.discount_product_item {
  background-color: #f6f6f6;
  border-radius: 0.563rem;
  padding: 0.625rem;
  width: 13.75rem; /* 220px */
  text-align: center;
  position: relative;
}

.discount_product_item img {
  width: 100%;
  height: auto;
  border-radius: 0.375rem;
}

.discount_product_item button {
  position: absolute;
  top: 0.625rem;
  right: 0.625rem;
  background: transparent;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
}

/* Pagination */
/* .pagination {
  composes: pagination;
} */

</style>