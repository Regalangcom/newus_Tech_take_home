import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";  
import axios from "axios";
import { ProductsData , ProductState } from "@eli/store/ProductData";




export const fecthDataProduct = createAsyncThunk<ProductsData[]>(
    'products/fecthDataProduct',
    async () => {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}`)
        return response.data
    }
)

// =====================================================================================



const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
} 




const productSlice  = createSlice({ 
    name: 'product',
    initialState,
    reducers : {}, /* sementara kosong sebab belum perlu ada nya action disini */
    extraReducers: (builder) => {
    builder 
    .addCase(fecthDataProduct.pending, (state) => {
        state.loading = true
        state.error = null
    })
    .addCase(fecthDataProduct.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
    })
    .addCase(fecthDataProduct.rejected ,(state , actions) => {
        state.loading = false
        state.error = actions.error.message || "gagal fetch product"
    })
    }
})



export default productSlice.reducer

