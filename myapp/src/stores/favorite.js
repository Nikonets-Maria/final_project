import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useFavProductsStore = defineStore('fav_products', () => {
    const favorite = ref([])

    function addToFav() {

    }

    function delleteFromFav() {

    }


  return {favorite, addToFav, delleteFromFav}
})
