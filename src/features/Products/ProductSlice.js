import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getFireBaseData } from "../../database/firebaseUtils";


const initialState = {
    products: [],
    isLoading: false,
    isError: false,
    error: null
}

export const getProducts = createAsyncThunk("products/getProducts",
    async () =>{
    let data = await getFireBaseData();
    // console.log(data);

    return data
});
const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(getProducts.pending,(state, action) =>{
            state.isError = false;
            state.isLoading = true;
        })
        builder.addCase(getProducts.fulfilled,(state, action) =>{
            state.isLoading = false;
            console.log(action);

        })
        builder.addCase(getProducts.rejected,(state, action) =>{
            state.isError = true;
            state.error = action.payload.error?.message;
        })
    }
})

export default productSlice.reducer;