import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// фильтры какие :
// brand 
// data.filter(item => item.brand == проп)

// battery capacity
// data.filter(item => item.characteristic[2] == проп)

// screen type
// data.filter(item => item.characteristic[7] == проп)

// screen diagonal
// data.filter(item => item.characteristic[6] == проп)

// protection class
// data.filter(item => item.characteristic[4] == проп)

// built-in memory
// data.filter(item => item.characteristic[1] == проп)

// общая функция с пропапами на вид фильтра ?
// data.filter(item => item.characteristics == characteristics) указать нужную
    // {
    //   "characteristic": "Диагональ",
    //   "unit_type": "дюйма",
    //   "value": "4.7"
    // },


export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  const categories = ref([])
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


  async function getProductById(id) {
    let url = 'http://localhost:1452/api/products/'+id
    let res = await fetch(url)
    product_info.value = await res.json()
  }

  async function getDiscountProducts() {
    let url = 'http://localhost:1452/api/products'
    let res = await fetch(url)
    let data = await res.json()
    sale_products.value = data.filter(item => item.discount_price !== null)
    
}


  async function getFilterProducts() {
    let url = 'http://localhost:1452/api/products'
    let res = await fetch(url)
    let data = await res.json()
  }


  return { products, getProducts, getDiscountProducts, sale_products, getCategories, categories, getProductById, product_info}
})
