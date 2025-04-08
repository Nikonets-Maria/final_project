

<template>

  <div class="footer_content">
    <div class="main_footer_content">
      <div class="info">
        <h3>cyber</h3>
        <p>We are a residential interior design firm located in Portland. Our boutique-studio offers more than</p>
      </div>

      <div class="services">
        <h5 class="info_name">Services</h5>
        <p class="info_link">Bonus program</p>
        <p class="info_link">Gift cards</p>
        <p class="info_link">Credit and payment</p>
        <p class="info_link">Service contracts</p>
        <p class="info_link">Non-cash account</p>
        <p class="info_link">Payment</p>
      </div>

      <div class="to_buyer">
        <h5 class="info_name">Assistance to the buyer</h5>
        <p class="info_link">Find an order</p>
        <p class="info_link">Terms of delivery</p>
        <p class="info_link">Exchange and return of goods</p>
        <p class="info_link">Guarantee</p>
        <p class="info_link">Frequently asked questions</p>
        <p class="info_link">Terms of use of the site</p>
      </div>

    </div>

    <div class="social_media">
      <img class="media_img" :src="twitterIco"/>
      <img class="media_img" :src="facebookIco"/>
      <img class="media_img" :src="tiktokIco"/>
      <img class="media_img" :src="instaIco"/>
    </div>
  
  </div>

</template>

<script setup>
import twitterIco from "../assets/images/Twitter.png"
import facebookIco from "../assets/images/Facebook.png"
import tiktokIco from "../assets/images/TikTOk.png"
import instaIco from "../assets/images/Instagram.png"

</script>

<style scoped>

.footer_content{
  background-color: black;
  height: 500px;
  color: white;
  width: 100%;
  position: absolute;
  bottom: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
}

.info{
  width: 30%;
}

.main_footer_content{
  display: flex;
  justify-content: space-around;
}

.info_link{
  font-size: 14px;
  color: #CFCFCF;
}

.info_name{
  font-size: 16px;
}

.services{
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.social_media{
  margin-left: 5%;
}
 .media_img{
  margin: 10px;
 }

</style>