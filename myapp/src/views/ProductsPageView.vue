

<template>

<div class="products_page_content">

  <div class="filtr_menu">
    <!-- сделать вывод фильтров через цикл, итерация из стейта, подготовить массив фильтр опций -->
    <h4>Filter Name</h4>
    <button>></button>

    <div>
      <input type="text" placeholder="search">
    </div>

    <ol>
      <input type="checkbox">
    </ol>

    <br>

  </div>

  <div class="products_list">
    <div class="products_header">
      <div>
        <h5>Selected Products: </h5>
        <h5>count</h5>
      </div>
      <input type="radio">
      <!-- упорядочивание изменить инпут на правильное -->
    </div>

    <div class="product_list">
      <ol v-for="product in productsStore.products.slice(0,15)" :key="product.id" class="product_list_content">
        <!-- <ol v-for="product in productsStore.products.slice(0,8)" :key="product.id" class="product_list_content"> -->
            <li class="product_item" @click="getProductById(product.id)">
                <div>
                  <img>
                  <button @click="toggleFavorite(product.id)">
                    <span v-if="isFavorite(product.id)">❤️</span>
                    <span v-else>🤍</span>
                  </button>
                </div>
                <RouterLink to="/product/:{{ product.id }}" class="link"> 

                <img :src="`http://localhost:1452/`+product.images[0]" class="product_img"/>
                <p>{{ product.name }}</p>
                <p>${{ product.price }}</p>
                </RouterLink>

                <button class="buy_now_btn">Buy Now</button>
            </li>
          <!-- <router-view :id="product.id"></router-view> -->
          </ol>
        </div>

  </div>

  <div>
    <button><</button>
    <!-- вычисляем колличество страниц исходя из колличества товара в сторе в режиме 
     реального времени (посмотреть вью репы занятий) 
     доступны для нажатия кнопки сейчас +1 и последняя
     -->
     <div>
      <ol>
        <p>count</p>
        <p>....</p>
        <p>count</p>
      </ol>
     </div>
    <button>></button>
  </div>

</div>

</template>

<script setup>
import { useFavProductsStore } from '@/stores/favorite'
import { useProductsStore } from '@/stores/products'
import { onMounted } from 'vue'


  const productsStore = useProductsStore()
  const favStore = useFavProductsStore()

  const addToFav = () => {
    favStore.addToFav()
  }

    const deleteFromFav = () => {
    favStore.deleteFromFav()
  }

  const isFavorite = () => {
    favStore.isFavorite()
  }

  const toggleFavorite = (productId) => {
      if (favStore.isFavorite(productId).value) {
        favStore.deleteFromFav(productId)
      } else {
        favStore.addToFav(productId)
      }
    }

  const getProducts = () => {
    productsStore.getProducts()
  }

  const getDiscountProducts = () => {
    productsStore.getDiscountProducts()
  }

  const getCategories = () => {
    productsStore.getCategories()
  }

  const getProductById = (id) => {
    productsStore.getProductById(id)
  }

  onMounted(() => {
    getProducts()
    getDiscountProducts()
    getCategories()
  })

</script>

<style scoped>

.shop_now_btn{
    width: 188px;
    height: 56px;
    border: 1px solid #FFFFFF;
    border-radius: 6px;
    background-color: #211C24;
    color: #FFFFFF;
    margin: 5px;

  }

  
  .product_img{
    width: 260px;
  }
  .buy_now_btn{
    width: 186px;
    height: 48px;
    border: none;
    border-radius: 8px;
    background-color: #000000;
    color: #FFFFFF;
    margin: 5px;

  }

  .product_list_content_block{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .product_list{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 920px;

    justify-content: center;
    align-items: center;
  }

  .product_list_content{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .product_item{
    /* height: 456px; */
    margin: 10px;
    list-style-type: none;
    background-color: #F6F6F6;
    border: none;
    border-radius: 9px;
  }

</style>