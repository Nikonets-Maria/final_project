

<template>

  <div class="home_content">

    <div class="cover">
      <div class="cover_info">
        <p>Pro.Beyond.</p>
        <h1>IPhone 14 Pro</h1>
        <p>Created to change everything for the better. For everyone</p>
        <button class="shop_now_btn">Shop Now</button>
      </div>

      <img :src="iphoneImg" alt="iphone image" class="cover_img"/>
    </div>
   
    <div class=""> 
      <!-- грид сетка? -->
       <div class="">
        <img :src="playStationImg" class=""/>
        <h2>Playstation 5</h2>
        <p>Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.</p>
       </div>

       <div>
        <img :src="airPodsImg" class=""/>
        <h2>Apple AirPods Max</h2>
        <p>Computational audio. Listen, it's powerful</p>
       </div>

       <div>
        <img :src="visionProImg" class=""/>
        <h2>Apple Vision Pro</h2>
        <p>An immersive way to experience entertainment</p>
       </div>

       <div>
        <img :src="macbookImg" class=""/>
        <h2>Macbook Air</h2>
        <p>The new 15‑inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display.</p>
        <button class="shop_now_btn" >Shop Now</button>
       </div>
      </div>

    <div class="category_menu">
      <div>
        <div>
          <h4>Browse by category</h4>
          <button><</button>
          <button>></button>
        </div>
       <div>
        <!-- цикл для формирования ? если в данных есть изображение категории -->
        <ol v-for="item in productsStore.categories" :key="item.id">
          <li>
            <img/>
            <h5>{{ item.name }}</h5>
          </li>
        </ol>
       </div>
      </div>
    </div>
    
    <div class="">
      <div>
        <div>
          <!-- фильтрация -->
          <button>New Arrival</button>
          <button>Bestseller</button>
          <button>Featured Products</button>
        </div>

        <div>
          <!-- цикл для карточек товара -->
           <ol v-for="product in productsStore.products.slice(0,8)" :key="product.id">
            <li>
              <div>
                <button>fav</button>
                <img/>
                <p>{{ product.name }}</p>
                <p>cost</p>
                <button>Buy Now</button>
              </div>
            </li>
           </ol>
        </div>
      </div>


    </div>

    <div class=""> 
      <!-- цикл из популярных? -->
       <!-- сделать сортировку по рейтингу и вывести первые четыре? 
        а как без повторов? -> 
        сделать из каждой категории или просто убрать совподающие неймы?-->
       <div>
        <img />
        <h2></h2>
        <p></p>
        <button class="shop_now_btn" >Shop Now</button>
      </div>
    </div>

    <div class="">
      <h4>Discouts up to -50%</h4>

      <ol v-for="sale_product in productsStore.sale_products.slice(0,4)" :key="sale_product.id">
        <li>
          <div>
            <button>fav</button>
            <img/>
            <p>text {{ sale_product.name }}</p>
            <p>cost {{ sale_product.discount_price }}</p>
            <button class="buy_now_btn" >Buy Now</button>
          </div>
        </li>
      </ol>

    </div> 

    <div class="sale_banner">
      <!-- градиент в css -->
      <img :src="laptopImg"/>
      <img :src="tabletScreenImg"/>
      <img :src="tabletImg"/>

      <div>
        <h1>Big Summer Sale</h1>
        <p>Commodo fames vitae vitae leo mauris in. Eu consequat.</p>
        <button class="shop_now_btn" >Shop Now</button>
      </div>
      <img :src="phoneImg"/>
      <img :src="watchImg"/>

    </div>
    

  </div>

</template>

<script setup>
import iphoneImg from "../assets/images/Iphone.png"
import playStationImg from "../assets/images/PlayStation.png"
import airPodsImg from "../assets/images/Headphones.png"
import visionProImg from "../assets/images/SomeTech.png"
import macbookImg from "../assets/images/Screen.png"
import tabletScreenImg from "../assets/images/TabletScreen.png"
import phoneImg from "../assets/images/Phone.png"
import laptopImg from "../assets/images/Laptop.png"
import tabletImg from "../assets/images/Tablet.png"
import watchImg from "../assets/images/Watch.png"
import { onMounted } from 'vue';
import { useProductsStore } from "@/stores/products"

const productsStore = useProductsStore()

const getProducts = () => {
    productsStore.getProducts()

}

const getDiscountProducts = () => {
  productsStore.getDiscountProducts()
}

const getCategories = () => {
  productsStore.getCategories()
}

onMounted(() => {
  getProducts()
  getDiscountProducts()
  getCategories()
})


</script>

<style scoped>

</style>