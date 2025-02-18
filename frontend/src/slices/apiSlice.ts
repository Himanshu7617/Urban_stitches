import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product, NewProduct } from "./productSlice";

export type RazorPayOptions = {
    amount : number, 
    currency : string, 
    receipt : string,
}

export type PaymentValidationParameters = {
    razorpay_order_id : string, 
    razorpay_payment_id : string, 
    razorpay_signature : string
}


export const apiSlice = createApi({   
    reducerPath : 'api',
    baseQuery : fetchBaseQuery({baseUrl : 'http://localhost:3334'}),
    tagTypes : ['Product'],
    endpoints : (builder) => ({
        getAdminProducts : builder.query<Product[], void>({
            query : () => '/admin/product',
            providesTags : ['Product']
        }),
        addNewProduct : builder.mutation<Product,NewProduct> ({
            query : (initialProduct) => ({
                url : '/admin/product', 
                method: 'POST', 
                body : initialProduct
            }),
            invalidatesTags : ['Product']
        }),
        getProductById : builder.query<Product, string> ({
            query : (id) => ({
                url : `user/product/${id}`,
            }),
        }),
        getOrderId : builder.mutation<any, RazorPayOptions>({
            query : (options) => ({
                url : '/user/razorpay', 
                method: 'POST', 
                body : options
            }),
        }),
        validatePayment : builder.mutation<any, PaymentValidationParameters>({
            query: (options) => ({
                url : '/razorpay/validate', 
                method : "POST", 
                body : options
            }),
        }) 
    })  
})

export const { useGetAdminProductsQuery, useAddNewProductMutation, useGetProductByIdQuery, useGetOrderIdMutation , useValidatePaymentMutation}  = apiSlice;