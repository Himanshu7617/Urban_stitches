import { Prisma } from "@prisma/client";


export interface Product {
    name : string,
    description : string,
    price : string,
    images? : string[]
    quantity : number
}

export interface Address {
    userId : string,
    local? : string, 
    city? : string, 
    state? : string, 
    country? : string, 
    pincode : number
}

export interface User {
    name? : string,
    email : string,
    password : string,
    address?: Prisma.AddressCreateNestedOneWithoutUserInput, // ✅ Use Prisma's input type
    cart? : Prisma.UserCartCreateNestedManyWithoutUserInput,
    order? : Prisma.OrderCreateNestedManyWithoutUserInput,

}

export interface Order {
    userId : string,
    productId : string, 
    quantity : number,
    totalPrice : number,
    status? : Status

}

export enum Status {
    PENDING, 
    COMPLETED
}

export interface UserCart {
    userId : string, 
    productId : string,
}