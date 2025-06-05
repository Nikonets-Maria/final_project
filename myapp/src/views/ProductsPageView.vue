<template>
  <div class="products_page_content">
    <!-- Фильтр -->
    <div>
      <div class="filtr_menu" v-for="filter in filterOptions" :key="filter.id">
        <h4>{{ filter.label }}</h4>
        <button @click="toggleFilterOptions(filter.id)">{{ showFilters[filter.id] ? '˄' : '˅' }}</button>
        <hr>
        <div v-if="showFilters[filter.id]" class="filter_options">
          <input type="text" placeholder="Search" v-model="searchQuery[filter.label]" />
          <ul>
            <li v-for="option in filter.options" :key="option.id">
              <label>
                <input type="checkbox" v-model="selectedFilters[filter.label]" :value="option.value" />
                {{ option.label }}
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Список продуктов -->
    <div class="products_list">
      <div class="products_header">
        <div>
          <h5>Selected Products: {{ filteredProducts.length }}</h5>
        </div>
        <div>
          <label>
            <input type="radio" value="asc" v-model="sortOrder" />
            Price Asc
          </label>
          <label>
            <input type="radio" value="desc" v-model="sortOrder" />
            Price Desc
          </label>
          <label>
            <input type="radio" value="rating" v-model="sortOrder" />
            Rating
          </label>
          <label>
            <input type="radio" value="deliveryDate" v-model="sortOrder" />
            Delivery Date
          </label>
        </div>
      </div>

      <ol class="product_list_content">
        <li
          v-for="product in paginatedProducts"
          :key="product.id"
          class="product_item"
          @click="getProductById(product.id)"
        >
          <div>
            <img
              :src="`http://localhost:1452/${product.images[0]}`"
              :alt="product.name"
              class="product_img"
            />
            <button @click.stop="toggleFavorite(product.id)" aria-label="Toggle favorite" class="fav_button">
              <span v-if="isFavorite(product.id)">❤️</span>
              <span v-else>🤍</span>
            </button>
          </div>

          <RouterLink :to="`/product/${product.id}`" class="link">
            <p>{{ product.name }}</p>
            <p>${{ product.price }}</p>
          </RouterLink>

          <button class="buy_now_btn" @click.stop="addToCart(product)">Add to Cart</button>
        </li>
      </ol>
    </div>

    <!-- Пагинация -->
    <div class="pagination">
      <button :disabled="currentPage === 1" @click="prevPage">‹</button>

      <button
        v-for="page in visiblePages"
        :key="page"
        :class="{ active: currentPage === page }"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>

      <button :disabled="currentPage === totalPages" @click="nextPage">›</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProductsStore } from '@/stores/products'
import { useFavProductsStore } from '@/stores/favorite'
import { useCartProductsStore } from '@/stores/cart'
import { RouterLink } from 'vue-router'

const productsStore = useProductsStore()
const favStore = useFavProductsStore()
const cartStore = useCartProductsStore()

// Данные для фильтров
const filterOptions = ref([
  { id: 1, label: 'Brand', options: [{ id: 1, label: 'Apple', value: 'Apple' }, { id: 2, label: 'Samsung', value: 'Samsung' }] },
  { id: 2, label: 'Battery capacity', options: [{ id: 1, label: '2000', value: '2000' }, { id: 2, label: '3000', value: '3000' }] },
  { id: 3, label: 'Screen Type', options: [{ id: 1, label: 'LCD', value: 'LCD' }, { id: 2, label: 'OLED', value: 'OLED' }] },
  { id: 4, label: 'Screen Diagonal', options: [{ id: 1, label: '4.7', value: '4.7' }, { id: 2, label: '6.0', value: '6.0' }] },
  { id: 5, label: 'Protection Class', options: [{ id: 1, label: 'стекло/алюминий', value: 'стекло/алюминий' }, { id: 2, label: 'пластик', value: 'пластик' }] },
  { id: 6, label: 'Built-in Memory', options: [{ id: 1, label: '64', value: '64' }, { id: 2, label: '128', value: '128' }] },
])

const selectedFilters = ref({
  Brand: [],
  'Battery capacity': [],
  'Screen Type': [],
  'Screen Diagonal': [],
  'Protection Class': [],
  'Built-in Memory': [],
})

const searchQuery = ref({})

const sortOrder = ref('asc')

const showFilters = ref({})

// Инициализация видимости фильтров
filterOptions.value.forEach(filter => {
  showFilters.value[filter.id] = false
})

const toggleFilterOptions = (filterId) => {
  showFilters.value[filterId] = !showFilters.value[filterId]
}

// Фильтрация и сортировка
const filteredProducts = computed(() => {
  let filtered = productsStore.products

  // Функция для получения характеристики по названию
  const getCharValue = (product, charName) => {
    const char = product.characteristics.find(c => c.characteristic === charName)
    return char ? char.value : null
  }

  // Применяем фильтры
  filtered = filtered.filter(product => {
    // Проверка по Brand
    if (selectedFilters.value.Brand.length > 0 && !selectedFilters.value.Brand.includes(product.brand)) {
      return false
    }
    // Battery capacity (Аккумулятор)
    if (
      selectedFilters.value['Battery capacity'].length > 0 &&
      !selectedFilters.value['Battery capacity'].includes(getCharValue(product, 'Аккумулятор'))
    ) {
      return false
    }
    // Screen Type (Разрешение)
    if (
      selectedFilters.value['Screen Type'].length > 0 &&
      !selectedFilters.value['Screen Type'].includes(getCharValue(product, 'Разрешение'))
    ) {
      return false
    }
    // Screen Diagonal (Диагональ)
    if (
      selectedFilters.value['Screen Diagonal'].length > 0 &&
      !selectedFilters.value['Screen Diagonal'].includes(getCharValue(product, 'Диагональ'))
    ) {
      return false
    }
    // Protection Class (Материал корпуса)
    if (
      selectedFilters.value['Protection Class'].length > 0 &&
      !selectedFilters.value['Protection Class'].includes(getCharValue(product, 'Материал корпуса'))
    ) {
      return false
    }
    // Built-in Memory (Объем встроенной памяти)
    if (
      selectedFilters.value['Built-in Memory'].length > 0 &&
      !selectedFilters.value['Built-in Memory'].includes(getCharValue(product, 'Объем встроенной памяти'))
    ) {
      return false
    }

    // Поиск по названию (если есть)
    for (const filterLabel in searchQuery.value) {
      if (
        searchQuery.value[filterLabel] &&
        !product.name.toLowerCase().includes(searchQuery.value[filterLabel].toLowerCase())
      ) {
        return false
      }
    }

    return true
  })

  // Сортировка
  if (sortOrder.value === 'asc') {
    filtered = filtered.slice().sort((a, b) => a.price - b.price)
  } else if (sortOrder.value === 'desc') {
    filtered = filtered.slice().sort((a, b) => b.price - a.price)
  } else if (sortOrder.value === 'rating') {
    filtered = filtered.slice().sort((a, b) => b.rating - a.rating)
  } else if (sortOrder.value === 'deliveryDate') {
    filtered = filtered.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  return filtered
})

// Пагинация
const currentPage = ref(1)
const itemsPerPage = 15

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredProducts.value.slice(start, start + itemsPerPage)
})

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}
const goToPage = (page) => {
  currentPage.value = page
}

// Пагинация видимых страниц (максимум 5)
const visiblePages = computed(() => {
  const total = totalPages.value
  let start = Math.max(currentPage.value - 2, 1)
  let end = Math.min(start + 4, total)
  if (end - start < 4) {
    start = Math.max(end - 4, 1)
  }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

// Избранное
const isFavorite = (id) => favStore.favorite.includes(id)
const toggleFavorite = (id) => {
  if (isFavorite(id)) {
    favStore.deleteFromFav(id)
  } else {
    favStore.addToFav(id)
  }
}

// Получить продукт по ID
const getProductById = (id) => {
  productsStore.getProductById(id)
}

// Добавить в корзину
const addToCart = (product) => {
  cartStore.addToCart(product)
}

onMounted(() => {
  productsStore.getProducts()
  productsStore.getDiscountProducts()
  productsStore.getCategories()
})
</script>


<style scoped>
/* ProductsPageView.vue (scoped styles) */

.products_page {
  padding: 1.25rem;
}

.product_filter {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}

.product_list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.25rem; /* 20px */
}

.product_item {
  background-color: #f6f6f6;
  border-radius: 0.563rem; /* 9px */
  padding: 0.625rem;
  width: 16.25rem; /* 260px */
  text-align: center;
  position: relative;
}

.product_img {
  max-width: 100%;
  height: auto;
  border-radius: 0.375rem;
}

/* .buy_now_btn {
  composes: btn btn-buy;
  margin-top: 0.625rem;
} */

</style>
