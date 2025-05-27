<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <Header></Header>

  <nav class="wrapper">
    <RouterLink to="/" class="link">Home</RouterLink>
    <RouterLink to="/products" class="link">Products</RouterLink>
    <RouterLink to="/product/1" class="link">Product/:id</RouterLink>
    <RouterLink to="/cart" class="link">Cart</RouterLink>
    <RouterLink to="/favorite" class="link">Favorite</RouterLink>
    <RouterLink to="/vdfvkz" class="link">Not Found Page</RouterLink>
  </nav>

  <RouterView class="main_content" />

  <Footer></Footer>
</template>

<style scoped> 
.link {
  margin: 5px;
  text-transform: capitalize;
}
.main_content {
  min-height: 49vh;
}
.wrapper {
  margin-bottom: 1em;
}
</style>
