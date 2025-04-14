import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  
  async function getProducts() {
    let url = 'http://localhost:1452/api/products'
    let res = await fetch(url)
    let data = await res.json()
    // products.value = data.products
    products.value = data

    console.log(products.value)
  }
  function someFunk(){
    
  }

  return { products, getProducts, }
})
