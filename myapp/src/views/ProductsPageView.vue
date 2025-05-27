<template>
  <div class="products_page_content">

    <!-- Фильтр -->
    <div class="filtr_menu">
      <h4>Filter Name</h4>
      <button @click="toggleFilterOptions">{{ showFilters ? '˄' : '˅' }}</button>

      <div v-if="showFilters" class="filter_options">
        <input type="text" placeholder="Search" v-model="searchQuery" />

        <ul>
          <li v-for="filter in filterOptions" :key="filter.id">
            <label>
              <input type="checkbox" v-model="selectedFilters" :value="filter.value" />
              {{ filter.label }}
            </label>
          </li>
        </ul>
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
            <button @click.stop="toggleFavorite(product.id)" aria-label="Toggle favorite">
              <span v-if="isFavorite(product.id)">❤️</span>
              <span v-else>🤍</span>
            </button>
          </div>

          <RouterLink :to="`/product/${product.id}`" class="link">
            <p>{{ product.name }}</p>
            <p>${{ product.price }}</p>
          </RouterLink>

          <button class="buy_now_btn">Buy Now</button>
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
import { RouterLink } from 'vue-router'

const productsStore = useProductsStore()
const favStore = useFavProductsStore()

// Данные для фильтров
const filterOptions = ref([
  { id: 1, label: 'Category 1', value: 'cat1' },
  { id: 2, label: 'Category 2', value: 'cat2' },
  { id: 3, label: 'Category 3', value: 'cat3' },
])

const selectedFilters = ref([])
const searchQuery = ref('')
const sortOrder = ref('asc')
const showFilters = ref(true)

// Пагинация
const currentPage = ref(1)
const itemsPerPage = 15

const toggleFilterOptions = () => {
  showFilters.value = !showFilters.value
}

// Фильтрация и сортировка
const filteredProducts = computed(() => {
  let filtered = productsStore.products

  // Фильтр по выбранным категориям (если есть)
  if (selectedFilters.value.length) {
    filtered = filtered.filter(p =>
      selectedFilters.value.some(f => p.category === f)
    )
  }

  // Поиск по названию
  if (searchQuery.value.trim()) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // Сортировка по цене
  filtered = filtered.slice().sort((a, b) => {
    if (sortOrder.value === 'asc') return a.price - b.price
    else return b.price - a.price
  })

  return filtered
})

// Пагинация
const totalPages = computed(() =>
  Math.ceil(filteredProducts.value.length / itemsPerPage)
)

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

// Показываем максимум 5 страниц в пагинации с текущей в центре
const visiblePages = computed(() => {
  const total = totalPages.value
  let start = Math.max(currentPage.value - 2, 1)
  let end = Math.min(start + 4, total)

  if (end - start < 4) {
    start = Math.max(end - 4, 1)
  }

  const pages = []
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
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

const getProductById = (id) => {
  productsStore.getProductById(id)
}

onMounted(() => {
  productsStore.getProducts()
  productsStore.getDiscountProducts()
  productsStore.getCategories()
})
</script>

<style scoped>
.products_page_content {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.filtr_menu {
  margin-bottom: 20px;
}

.filter_options input[type='text'] {
  width: 100%;
  padding: 6px;
  margin-bottom: 10px;
}

.filter_options ul {
  list-style: none;
  padding: 0;
}

.filter_options li {
  margin-bottom: 5px;
}

.products_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.product_list_content {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 0;
  margin: 0;
  list-style: none;
  justify-content: center;
}

.product_item {
  background: #f6f6f6;
  border-radius: 9px;
  width: 260px;
  padding: 10px;
  cursor: pointer;
  position: relative;
  text-align: center;
}

.product_item div {
  position: relative;
}

.product_img {
  width: 100%;
  border-radius: 6px;
}

.product_item button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.buy_now_btn {
  width: 186px;
  height: 48px;
  border: none;
  border-radius: 8px;
  background-color: #000000;
  color: #ffffff;
  margin: 10px auto 0 auto;
  cursor: pointer;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 20px;
}

.pagination button {
  border: none;
  background: #eee;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 4px;
}

.pagination button.active {
  background: #000;
  color: #fff;
}

.pagination button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
