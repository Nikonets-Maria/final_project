import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useFavProductsStore = defineStore('fav_products', () => {
    const favorite = ref(new Set()) // Используем Set для хранения уникальных ID

    function addToFav(productId) {
        if (!favorite.value.has(productId)) {
            favorite.value.add(productId)
        }
        console.log('fav added')
    }

    function deleteFromFav(productId) {
        if (favorite.value.has(productId)) {
            favorite.value.delete(productId)
        }
      console.log('fav deleted')

    }

    const isFavorite = (productId) => computed(() => favorite.value.has(productId))

    // Массив избранных продуктов для удобства отображения
    const favoriteArray = computed(() => Array.from(favorite.value))

    return { 
        favorite: favoriteArray, // Возвращаем массив для удобства
        addToFav, 
        deleteFromFav, 
        isFavorite 
    }
})
