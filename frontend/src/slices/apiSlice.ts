import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product, NewProduct } from "./productSlice";




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
        })
    })  
})

export const { useGetAdminProductsQuery, useAddNewProductMutation, useGetProductByIdQuery }  = apiSlice;