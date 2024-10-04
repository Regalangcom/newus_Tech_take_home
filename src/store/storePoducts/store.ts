import { configureStore } from "@reduxjs/toolkit";
import productReducers from '@eli/store/ProductSlice/ProductDataSlice'
import userReducers from "@eli/store/ProductSlice/UserDataSlice"


const store = configureStore({
    reducer : {
        products : productReducers,
        users : userReducers
    }
})


export type RootState = ReturnType<typeof store.getState>
export type DispatchApp =  typeof store.dispatch

export default store;



// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;