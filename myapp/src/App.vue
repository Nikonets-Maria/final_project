<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

</script>

<template>
  <Header></Header>

    <div class="wrapper">
      <nav>
        <RouterLink to="/" class="link">Home</RouterLink>
        <RouterLink to="/products" class="link">products</RouterLink>
        <RouterLink to="/product/1" class="link">product/:id?</RouterLink>
        <RouterLink to="/cart" class="link">cart</RouterLink>
        <RouterLink to="/favorite" class="link">favorite</RouterLink>
        <RouterLink to="/vdfvkz" class="link">not found page</RouterLink>
      </nav>
    </div>
    
  <RouterView class="main_content"/>

  <Footer></Footer>

</template>

<style scoped> 
.link{
  margin: 5px;
}
.main_content{
  min-height: 49vh;
}
</style>
