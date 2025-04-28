

<template>
  <div>

    <div>
      <div>
        <img/>

      </div>
      <div>
        <img :src="`http://localhost:1452/`+ productsStore.product_info.images[0]" class="product_img" />
        <h1> {{ productsStore.product_info.name }}</h1>
        <h2> {{ productsStore.product_info.price}}$</h2>
        <h3></h3> 
        <!-- если скидка есть передаем через слот? -->
         <ol>
          <div>
            <img/>
            <p></p>
            <p></p>
          </div>
         </ol>
         <p></p>
         <!-- ограничение по тексту и слово кнопка показать больше?
         а нет - если нажать скролит к следущему диву с деталями? 
         !уточнить на паре
         -->
         <div>
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
        <!-- итерация по продукту -->
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

  const productsStore = useProductsStore()


  // const getProductById = () => {
  //   productsStore.getProductById()
  // }

  onMounted(() => {
  })

</script>

<style scoped>

</style>