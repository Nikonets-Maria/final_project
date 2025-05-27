import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useFavProductsStore = defineStore('fav_products', () => {
    const favorite = ref([])

    function addToFav(productId) {
        if (!favorite.value.includes(productId)) {
            favorite.value.push(productId)
        }
    }

    function deleteFromFav(productId) {
        const index = favorite.value.indexOf(productId)
        if (index !== -1) {
            favorite.value.splice(index, 1)
        }
    }

    const isFavorite = (productId) => computed(() => favorite.value.includes(productId))

    return { favorite, addToFav, deleteFromFav, isFavorite }
})
