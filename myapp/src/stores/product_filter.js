import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', () => {
    const products = ref([])
    const categories = ref([])
    const sale_products = ref([])
    const product_info = ref([])

    const selectedFilters = ref({
        brand: null,
        batteryCapacity: null,
        screenType: null,
        screenDiagonal: null,
        protectionClass: null,
        builtInMemory: null,
    });

    const searchTerm = ref('');

    const applyFilters = (product) => {
        const characteristics = product.characteristics.reduce((acc, char) => {
            acc[char.characteristic] = char.value;
            return acc;
        }, {});

        return (!selectedFilters.value.brand || product.brand === selectedFilters.value.brand) &&
            (!selectedFilters.value.batteryCapacity || characteristics['Аккумулятор'] === selectedFilters.value.batteryCapacity) &&
            (!selectedFilters.value.screenType || characteristics['Разрешение'] === selectedFilters.value.screenType) &&
            (!selectedFilters.value.screenDiagonal || characteristics['Диагональ'] === selectedFilters.value.screenDiagonal) &&
            (!selectedFilters.value.protectionClass || characteristics['Материал корпуса'] === selectedFilters.value.protectionClass) &&
            (!selectedFilters.value.builtInMemory || characteristics['Объем встроенной памяти'] === selectedFilters.value.builtInMemory) &&
            (product.name.toLowerCase().includes(searchTerm.value.toLowerCase()));
    };

    const filteredProducts = computed(() => {
        return products.value.filter(applyFilters);
    });

    async function getProducts() {
        try {
            let url = 'http://localhost:1452/api/products';
            let res = await fetch(url);
            if (!res.ok) throw new Error('Network response was not ok');
            let data = await res.json();
            products.value = data;
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    async function getCategories() {
        try {
            let url = 'http://localhost:1452/api/category/';
            let res = await fetch(url);
            if (!res.ok) throw new Error('Network response was not ok');
            let data = await res.json();
            categories.value = data;
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }

    async function getProductById(id) {
        try {
            let url = `http://localhost:1452/api/products/${id}`;
            let res = await fetch(url);
            if (!res.ok) throw new Error('Network response was not ok');
            product_info.value = await res.json();
        } catch (error) {
            console.error('Error fetching product by ID:', error);
        }
    }

    async function getDiscountProducts() {
        try {
            let url = 'http://localhost:1452/api/products';
            let res = await fetch(url);
            if (!res.ok) throw new Error('Network response was not ok');
            let data = await res.json();
            sale_products.value = data.filter(item => item.discount_price !== null);
        } catch (error) {
            console.error('Error fetching discount products:', error);
        }
    }

    return { 
        products, 
        selectedFilters, 
        filteredProducts, 
        getProducts, 
        getDiscountProducts, 
        getCategories, 
        categories, 
        getProductById, 
        product_info 
    };
});
