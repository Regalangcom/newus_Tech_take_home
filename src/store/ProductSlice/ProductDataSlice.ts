import { createAsyncThunk , createSlice, PayloadAction } from "@reduxjs/toolkit";  
import axios from "axios";
import { ProductsData , ProductState } from "@eli/store/ProductData";

export const fecthDataProduct = createAsyncThunk<ProductsData[]>(
    'products/fecthDataProduct',
    async () => {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}`)
        return response.data
    }
)

const initialState: ProductState = {
    products: [],
    categories : [],
    filteredProducts: [],
    selectedCategory: "",
    loading: false,
    error: null,
} 


const productSlice  = createSlice({ 
    name: 'product',
    initialState,
    reducers : {
        filterData (state , action : PayloadAction<{  searchTerm: string , selectedCategory : string  }> ) {
              const { searchTerm, selectedCategory } = action.payload;
              state.filteredProducts = state.products.filter((product) => {
              const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
              const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
              return matchesSearch && matchesCategory;
            });
        },
        categoryProduct (state , action: PayloadAction<{ searchTerm: string , selectedCategory : string }>) {
              const {selectedCategory} = action.payload;
              state.filteredProducts  = state.products.filter((product) => {
              return selectedCategory ? product.category === selectedCategory : true
               })
        }
    }, 
    extraReducers: (builder) => {
    builder 
    .addCase(fecthDataProduct.pending, (state) => {
        state.loading = true
        state.error = null
    })
    .addCase(fecthDataProduct.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
        state.filteredProducts = action.payload
        state.categories = Array.from(new Set(action.payload.map(product => product.category)));

    })
    .addCase(fecthDataProduct.rejected ,(state , actions) => {
        state.loading = false
        state.error = actions.error.message || "gagal fetch product"
    })
    }
})


export const { filterData, categoryProduct } = productSlice.actions
export default productSlice.reducer

