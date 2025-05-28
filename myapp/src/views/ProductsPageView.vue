<template>
  <div class="products_page_content">
    <!-- Фильтр -->
    <div>
      <div class="filtr_menu" v-for="filter in filterOptions" :key="filter.id">
        <h4>{{ filter.label }}</h4>
        <button @click="toggleFilterOptions(filter.id)">{{ showFilters[filter.id] ? '˄' : '˅' }}</button>
        <hr>
        <div v-if="showFilters[filter.id]" class="filter_options">
          <input type="text" placeholder="Search" v-model="searchQuery[filter.id]" />
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
  { id: 1, label: 'Brand', options: [{ id: 1, label: 'Brand A', value: 'brandA' }, { id: 2, label: 'Brand B', value: 'brandB' }] },
  { id: 2, label: 'Battery capacity', options: [{ id: 1, label: '2000mAh', value: '2000' }, { id: 2, label: '3000mAh', value: '3000' }] },
]);

const selectedFilters = ref({
  Brand: [],
  'Battery capacity': [],
});
const searchQuery = ref({});
const sortOrder = ref('asc')
const showFilters = ref({});

// Инициализация видимости фильтров
filterOptions.value.forEach(filter => {
  showFilters.value[filter.label] = false;
});

// Пагинация
const currentPage = ref(1)
const itemsPerPage = 15

const toggleFilterOptions = (filterId) => {
  showFilters.value[filterId] = !showFilters.value[filterId]
}

// Фильтрация и сортировка
const filteredProducts = computed(() => {
  let filtered = productsStore.products

  // Фильтр по выбранным категориям
  Object.keys(selectedFilters.value).forEach(filterKey => {
    if (selectedFilters.value[filterKey].length) {
      filtered = filtered.filter(product => selectedFilters.value[filterKey].includes(product[filterKey]));
    }
  });

  // Поиск по названию
  Object.keys(searchQuery.value).forEach(filterKey => {
    if (searchQuery.value[filterKey]) {
      filtered = filtered.filter(product => product.name.toLowerCase().includes(searchQuery.value[filterKey].toLowerCase()));
    }
  });

  // Сортировка по цене
  filtered = filtered.slice().sort((a, b) => {
    return sortOrder.value === 'asc' ? a.price - b.price : b.price - a.price;
  });

  return filtered
});

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

const getProductById = (id) => {
  productsStore.getProductById(id)
}

// Метод добавления товара в корзину
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
  display: flex;
  flex-direction: column;
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

.fav_button {
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
