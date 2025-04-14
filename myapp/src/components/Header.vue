

<template>
  
  <div class="header_content">
    <RouterLink to="/" class="link"><img class="logo" :src="logo"/></RouterLink>

    <!-- <div class="search">
      <img class="search_img" :src="searchIco"/>
      <input type="text" placeholder="Search"/>
      выпадающий список с найденым (поверх основного контента?) 
    </div> -->

    <div class="search-container">
      <button class="search-button">
        <img class="search_img" :src="searchIco"/>
      </button>
        <input type="text" placeholder="Search " class="search-input">           
    </div>

    <div class="icons_nav">
      <RouterLink to="/favorite" class="link"><img class="fav_logo" :src="favIco" to="/cart"/></RouterLink>
      <RouterLink to="/cart" class="link"><img class="cart_logo" :src="cartIco"/></RouterLink>
    </div>
  </div>

</template>

<script >
// setup
import logo from "../assets/images/Logo.png"
import favIco from "../assets/images/Favorites.png"
import cartIco from "../assets/images/Cart.png"
import searchIco from "../assets/images/Search.png"

export default {

  data(){
    return{
      logo: logo,
      favIco: favIco,
      cartIco: cartIco,
      searchIco: searchIco
    }
  }
}
      


</script>

<style scoped>

.search-container {
  display: flex;
  align-items: center;

  /* width: 372px; */
  width: 30%;
  height: 56px;
  border-radius: 8px;
  /* padding: 16px; */
  gap: 8px;
  border: none;
  background-color: #F5F5F5;
}

.search-input {
  border: none;
  /* width: 300px; */
  width: 28%;
  height: 45px;
  background-color: #F5F5F5;
}
.search-input:focus {
 outline: none; 
}

.search-button {
  margin-left: 15px;
  width: 24px;
  height: 24px;
  border: none; 
  background-color: #F5F5F5;
}

.search-button img {
  width: 20px;
  height: 20px;
}

.header_content{
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 15px;
}

.fav_logo {
  margin: 10px;
} 
.cart_logo {
  margin: 10px;
}



</style>