import { createSlice } from "@reduxjs/toolkit";

export type Product = {
    id : string, 
    name : string, 
    description? : string, 
    price : string, 
    quantity: number, 
    images: string[]
}

export type NewProduct = {
    name : string, 
    description? : string, 
    price : string, 
    quantity: number, 
    images? : File[]
}
const allProduct : Product[] = [];
export const productSlice = createSlice({
    name : "product", 
    initialState : allProduct,
    reducers : {

    }
})

export default productSlice.reducer