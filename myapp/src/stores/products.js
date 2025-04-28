import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  const categories = ref([])
  const cart = ref([])
  const favorite = ref([])
  const sale_products = ref([])
  const product_info = ref([])


  async function getProducts() {
    let url = 'http://localhost:1452/api/products'
    let res = await fetch(url)
    let data = await res.json()
    products.value = data
    // products.value = data.slice(0,7) //чтобы не выводить все сразу \(Ю_Ю)/

    // console.log(products.value)
  }
  async function getCategories() {
    // export type ProuductCategories = 'phone' | 'tablet' | 'headphones' | 'computer' | 'accessories'
    let url = 'http://localhost:1452/api/category/'
    let res = await fetch(url)
    let data = await res.json()
    categories.value = data

    // console.log(categories.value)
  }

  async function getProductsFromeCategory() {
    let url = 'http://localhost:1452/api/category/{id}'
    let res = await fetch(url)
    let data = await res.json()
  }

  async function getProductById(id) {
    let url = 'http://localhost:1452/api/products/'+id
    let res = await fetch(url)
    product_info.value = await res.json()
    console.log(product_info.value)
  }

  async function getDiscountProducts() {
    let url = 'http://localhost:1452/api/products'
    let res = await fetch(url)
    let data = await res.json()
    sale_products.value = data.filter(item => item.discount_price !== null)
    
    // console.log(sale_products.value)
}

//   async function getFavoriteProducts() {
//     let url = 'http://localhost:1452/api/products'
//     let res = await fetch(url)
//     let data = await res.json()
//   }

//   async function getShoppingCart() {
//     let url = 'http://localhost:1452/api/products'
//     let res = await fetch(url)
//     let data = await res.json()
//   }

//просто иттерация по существуещему массиву

  async function getFilterProducts() {
    let url = 'http://localhost:1452/api/products'
    let res = await fetch(url)
    let data = await res.json()
  }


  return { products, getProducts, getDiscountProducts, sale_products, getCategories, categories, getProductById, product_info}
})
