import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";  
import axios from "axios";
import {TopLevel, UserAllData } from "@eli/store/ProductData";


export const fetchDataUser = createAsyncThunk<TopLevel[]> (
    'users/fecthDataUser',
    async () => {
        const response = await axios.get(`${import.meta.env.VITE_USER_URL}`)
        return response.data
    }
)
// =====================================================================================


const initialState: UserAllData = {
    users: [],
    loading: false,
    error: null,
} 

const productSlice  = createSlice({ 
    name: 'users',
    initialState,
    reducers : {}, /* sementara kosong sebab belum perlu ada nya action disini */
    extraReducers: (builder) => {
    builder 
    .addCase(fetchDataUser.pending, (state) => {
        state.loading = true
        state.error = null
    })
    .addCase(fetchDataUser.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
    })
    .addCase(fetchDataUser.rejected ,(state , actions) => {
        state.loading = false
        state.error = actions.error.message || "gagal mengambil data"
    })
    }
})



export default productSlice.reducer

