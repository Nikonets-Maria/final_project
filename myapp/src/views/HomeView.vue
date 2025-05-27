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
        <!-- Можно добавить логику фильтрации -->
        <a href="#" class="filter_link" @click.prevent="filterProducts('new')">New Arrival</a>
        <a href="#" class="filter_link" @click.prevent="filterProducts('bestseller')">Bestseller</a>
        <a href="#" class="filter_link" @click.prevent="filterProducts('featured')">Featured Products</a>
      </nav>

      <div class="product_list">
        <ul class="product_list_content">
          <li v-for="product in filteredProducts" :key="product.id" class="product_item">
            <div>
              <img :src="`http://localhost:1452/${product.images[0]}`" :alt="product.name" class="product_img" />
              <button @click="toggleFavorite(product.id)" aria-label="Toggle favorite">
                <span v-if="isFavorite(product.id)">❤️</span>
                <span v-else>🤍</span>
              </button>
            </div>
            <p>{{ product.name }}</p>
            <p>${{ product.price }}</p>
            <button class="buy_now_btn">Buy Now</button>
          </li>
        </ul>
      </div>
    </div>

    <!-- Discount Section -->
    <div class="discount_section">
      <h4>Discounts up to -50%</h4>
      <ul class="discount_products">
        <li v-for="sale_product in productsStore.sale_products.slice(0, 4)" :key="sale_product.id" class="discount_product_item">
          <div>
            <button @click="toggleFavorite(sale_product.id)" aria-label="Toggle favorite">
              <span v-if="isFavorite(sale_product.id)">❤️</span>
              <span v-else>🤍</span>
            </button>
            <img :src="`http://localhost:1452/${sale_product.images[0]}`" :alt="sale_product.name" />
            <p>{{ sale_product.name }}</p>
            <p>${{ sale_product.discount_price }}</p>
            <button class="buy_now_btn">Buy Now</button>
          </div>
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

onMounted(() => {
  productsStore.getProducts()
  productsStore.getDiscountProducts()
  productsStore.getCategories()
})

// Фильтрация товаров по типу
const activeFilter = ref('featured')
const filteredProducts = computed(() => {
  switch (activeFilter.value) {
    case 'new':
      return productsStore.products.filter(p => p.isNew).slice(0, 8)
    case 'bestseller':
      return productsStore.products.filter(p => p.isBestSeller).slice(0, 8)
    case 'featured':
    default:
      return productsStore.products.slice(0, 8)
  }
})

const filterProducts = (filterName) => {
  activeFilter.value = filterName
}

const isFavorite = (productId) => favStore.favorite.includes(productId)

const toggleFavorite = (productId) => {
  if (isFavorite(productId)) {
    favStore.deleteFromFav(productId)
  } else {
    favStore.addToFav(productId)
  }
}

// Заглушки для переключения категорий (можно реализовать логику)
const prevCategory = () => {
  // TODO: Реализовать переключение категорий
}
const nextCategory = () => {
  // TODO: Реализовать переключение категорий
}
</script>

<style scoped>
.gray_text {
  color: #909090;
  font-size: 18px;
}

.cover {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: #211c24;
  color: #ffffff;
}

.cover p {
  margin: 5px;
}

.cover h1 {
  font-size: 96px;
}

.shop_now_btn {
  width: 188px;
  height: 56px;
  border: 1px solid #ffffff;
  border-radius: 6px;
  background-color: #211c24;
  color: #ffffff;
  margin: 5px;
  cursor: pointer;
}

.flagman_baner {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  grid-template-rows: 1.5fr 1fr;
  grid-template-areas:
    'item1 item1 item4'
    'item2 item3 item4';
  gap: 10px;
  margin: 20px 0;
}

.banner_item1 {
  grid-area: item1;
  color: #000000;
  display: flex;
}

.banner_item1_content {
  margin-top: 12%;
  width: 30%;
}

.banner_item2 {
  grid-area: item2;
  background-color: #ededed;
  color: #000000;
  display: flex;
  align-items: center;
}

.banner_item3 {
  grid-area: item3;
  background-color: #353535;
  color: #ffffff;
  display: flex;
  align-items: center;
}

.banner_item4 {
  grid-area: item4;
  background-color: #ededed;
  color: #000000;
  display: flex;
  align-items: center;
  justify-content: end;
}

.banner_item4_content {
  width: 40%;
  margin-right: 20%;
}

.sale_banner {
  display: flex;
  justify-content: space-between;
  background: linear-gradient(#2e2e2e, #000000);
  color: #ffffff;
  padding: 20px;
  margin-top: 40px;
}

.content_sale_banner1 {
  display: flex;
  flex-direction: column;
}

.sale_img_yellow {
  margin-bottom: 15%;
}

.sale_phone_img {
  width: 35%;
}

.sale_img_blue {
  width: 70%;
}

.img_content {
  margin-left: 30px;
}

.category_menu {
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
}

.category_swap {
  background-color: #fafafa;
  display: flex;
  justify-content: space-between;
  width: 320px;
  margin-bottom: 10px;
}

.category_swap_btn {
  background-color: #fafafa;
  border: none;
  font-size: 32px;
  margin: 5px;
  cursor: pointer;
}

.category_list {
  background-color: #fafafa;
  display: flex;
  justify-content: center;
  width: 100%;
}

.category_items {
  display: flex;
  gap: 20px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.category_item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 128px;
  border-radius: 15px;
  background-color: #ededed;
  cursor: pointer;
  text-align: center;
}

.category_item img {
  max-width: 80px;
  max-height: 80px;
  object-fit: contain;
  margin-bottom: 10px;
}

.product_list_content_block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
}

.product_filter {
  display: flex;
  align-items: center;
  margin: 5px 0 15px 0;
  gap: 20px;
}

.filter_link {
  cursor: pointer;
  color: #000;
  text-decoration: none;
  font-weight: 600;
}

.filter_link:hover {
  text-decoration: underline;
}

.product_list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.product_list_content {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 0;
  margin: 0;
  list-style: none;
  justify-content: center;
}

.product_item {
  background-color: #f6f6f6;
  border-radius: 9px;
  padding: 10px;
  width: 260px;
  text-align: center;
  position: relative;
}

.product_img {
  width: 100%;
  height: auto;
  border-radius: 6px;
}

.product_item > div {
  position: relative;
}

.product_item button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.buy_now_btn {
  width: 186px;
  height: 48px;
  border: none;
  border-radius: 8px;
  background-color: #000000;
  color: #ffffff;
  margin: 10px auto 0 auto;
  cursor: pointer;
}

.discount_section {
  padding: 20px 0;
}

.discount_products {
  list-style: none;
  display: flex;
  gap: 20px;
  padding: 0;
  margin: 0;
  flex-wrap: wrap;
  justify-content: center;
}

.discount_product_item {
  background-color: #f6f6f6;
  border-radius: 9px;
  padding: 10px;
  width: 220px;
  text-align: center;
  position: relative;
}

.discount_product_item img {
  width: 100%;
  height: auto;
  border-radius: 6px;
}

.discount_product_item button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
</style>
