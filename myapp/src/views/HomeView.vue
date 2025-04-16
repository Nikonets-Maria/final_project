

<template>

  <div class="home_content">

    <div class="cover">
      <div class="cover_info">
        <p class="gray_text">Pro.Beyond.</p>
        <h1>IPhone 14 Pro</h1>
        <p class="gray_text">Created to change everything for the better. For everyone</p>
        <button class="shop_now_btn">Shop Now</button>
      </div>

      <img :src="iphoneImg" alt="iphone image" class="cover_img"/>
    </div>
   
    <div class="flagman_baner"> 
      <!-- грид сетка? -->
       <div class="banner_item1">
        <img :src="playStationImg" class=""/>
        <div class="banner_item1_content">
          <h2>Playstation 5</h2>
          <p class="gray_text">Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.</p>
        </div>
       </div>

       <div class="banner_item2">
        <img :src="airPodsImg"/>
        <div>
          <h2>Apple AirPods Max</h2>
          <p class="gray_text">Computational audio. Listen, it's powerful</p>      
        </div>
       </div>

       <div  class="banner_item3">
        <img :src="visionProImg"/>
        <div>
          <h2>Apple Vision Pro</h2>
          <p class="gray_text">An immersive way to experience entertainment</p>       
        </div>
        </div>

       <div class="banner_item4">
        <div class="banner_item4_content">
          <h2>Macbook Air</h2>
          <p class="gray_text">The new 15‑inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display.</p>
          <button class="shop_now_btn" >Shop Now</button>         
        </div>
        <img :src="macbookImg"/>
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
        <p class="gray_text"></p>
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
       <div class="content_sale_banner1">
        <div class="img_content">
          <img :src="tabletScreenImg" class="sale_img_viol"/>
          <img :src="laptopImg" class="sale_img_yellow"/>
        </div>
        <img :src="tabletImg" class="sale_img_blue"/>
       </div>
      <div>
        <h1>Big Summer Sale</h1>
        <p class="gray_text">Commodo fames vitae vitae leo mauris in. Eu consequat.</p>
        <button class="shop_now_btn" >Shop Now</button>
      </div>
      <div class="content_sale_banner2">
        <img :src="watchImg"/>
        <img :src="phoneImg" class="sale_phone_img"/>
      </div>

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
  
  .cover{
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    background-color: #211C24;
    color: #FFFFFF;

    p{
      margin: 5px;
    }

    h1{
      font-size: 96px;
    }
  }

  .shop_now_btn{
    width: 188px;
    height: 56px;
    border: 1px solid #FFFFFF;
    border-radius: 6px;
    background-color: #211C24;
    color: #FFFFFF;
    margin: 5px;

  }

  .flagman_baner{
    display: grid;
    grid-template-columns: 1fr 1fr 2fr;
    grid-template-rows: 1.5fr 1fr;

   grid-template-areas:
    "item1 item1 item4"
    "item2 item3 item4"
  }

  .banner_item1{
    grid-area: item1;

    color: #000000;
    display: flex;
    /* align-items: center; */
  }
  .banner_item1_content{
    margin-top: 12%;
    width: 30%;
  }
  .banner_item2{
    grid-area: item2;

    background-color: #EDEDED;
    color: #000000;
    display: flex;
    align-items: center;

  }
  .banner_item3{
    grid-area: item3; 
    
    background-color: #353535;
    color: #FFFFFF;
    display: flex;
    align-items: center;
  }
  .banner_item4{
    grid-area: item4;

    background-color: #EDEDED;
    color: #000000;
    display: flex;
    align-items: center;
    justify-content: end;
  }
  .banner_item4_content{
    width: 40%;
    margin-right: 20%;
  }

  /* доделаем */
  .sale_banner{
    display: flex;
    justify-content: space-between;
    background: linear-gradient(#2E2E2E, #000000);
    color: #FFFFFF;
  }
  .content_sale_banner1{
    display: flex;
    flex-direction: column;
  }
  .sale_img_yellow{
    margin-bottom: 15%;
  }
  .sale_phone_img{
    width: 35%;
  }
  .sale_img_blue{
    width: 70%;
  }
  .img_content{
    margin-left: 30px;
  }



  

  .gray_text{
    color: #909090;
    font-size: 18px;
  }

</style>