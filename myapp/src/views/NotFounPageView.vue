<script setup>
import not_found_img from '../assets/images/NotFound.png'

</script>

<template>
  <div class="not_found_content">
    <h1>Not fount page</h1>
    <img :src="not_found_img" alt="Not Found" />
  </div>
</template>

<style scoped>
  .not_found_content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #EDEDED;
  }
</style>