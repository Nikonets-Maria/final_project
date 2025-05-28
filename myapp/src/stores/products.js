import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  const categories = ref([])
  const sale_products = ref([])
  const product_info = ref({}) // Изменено на объект

  async function getProducts() {
    try {
      const url = 'http://localhost:1452/api/products'
      const res = await fetch(url)
      if (!res.ok) throw new Error('Network response was not ok')
      const data = await res.json()
      products.value = data
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  async function getCategories() {
    try {
      const url = 'http://localhost:1452/api/category/'
      const res = await fetch(url)
      if (!res.ok) throw new Error('Network response was not ok')
      const data = await res.json()
      categories.value = data
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  async function getProductsFromCategory(id) {
    try {
      const url = `http://localhost:1452/api/category/${id}`
      const res = await fetch(url)
      if (!res.ok) throw new Error('Network response was not ok')
      const data = await res.json()
      return data // Возвращаем данные, чтобы использовать их в компоненте
    } catch (error) {
      console.error('Error fetching products from category:', error)
    }
  }

  async function getProductById(id) {
    try {
      const url = `http://localhost:1452/api/products/${id}`
      const res = await fetch(url)
      if (!res.ok) throw new Error('Network response was not ok')
      product_info.value = await res.json()
    } catch (error) {
      console.error('Error fetching product by ID:', error)
    }
  }

  async function getDiscountProducts() {
    try {
      const url = 'http://localhost:1452/api/products'
      const res = await fetch(url)
      if (!res.ok) throw new Error('Network response was not ok')
      const data = await res.json()
      sale_products.value = data.filter(item => item.discount_price !== null)
    } catch (error) {
      console.error('Error fetching discount products:', error)
    }
  }

  async function getFilterProducts() {
    try {
      const url = 'http://localhost:1452/api/products'
      const res = await fetch(url)
      if (!res.ok) throw new Error('Network response was not ok')
      const data = await res.json()
      // Здесь можно добавить фильтрацию, если это необходимо
    } catch (error) {
      console.error('Error fetching filtered products:', error)
    }
  }

  return { 
    products, 
    getProducts, 
    getDiscountProducts, 
    sale_products, 
    getCategories, 
    categories, 
    getProductById, 
    product_info, 
    getProductsFromCategory 
  }
})
