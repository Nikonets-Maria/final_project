<script setup>

</script>

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

    <ol>
      <div>
        <h1></h1>
        <p></p>
        <button>Shop Now</button>
      </div>
    </ol>

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

<style scoped>

</style>