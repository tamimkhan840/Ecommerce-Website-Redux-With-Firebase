import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getFireBaseData, onRemoveFromFirebase } from "../../database/firebaseUtils";



    const initialState = {
        isLoading: false,
        isError: false,
        error: '',
        categories: [],
    };


export const getCategories = createAsyncThunk("Categories/getCategories",
    async () =>{
    let data = await getFireBaseData('categories');
    // console.log(data);

    return data
});
export const deleteCategories = createAsyncThunk("Categories/deleteCategories",
    async (id) =>{
    let conn = await onRemoveFromFirebase('categories/' + id);
    console.log(conn);

    return id
});



const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
    builder
        .addCase(getCategories.pending,(state, action) =>{
            state.isError = false;
            state.isLoading = true;
        })
        .addCase(getCategories.fulfilled,(state, action) =>{
            state.isLoading = false;
            state.categories = action.payload;

        })
        .addCase(getCategories.rejected,(state, action) =>{
            state.isError = true;
            state.error = action.payload.error?.message;
        })

    builder

        .addCase(deleteCategories.fulfilled,(state, action) =>{
            const categoryIndex = state.categories.findIndex(item => item.id == action.payload)
            state.categories.splice(categoryIndex, 1)



        })
        .addCase(deleteCategories.rejected,(state, action) =>{
            state.isError = true;
            state.error = action.payload.error?.message;
        })
    }
})

export default categoriesSlice.reducer;