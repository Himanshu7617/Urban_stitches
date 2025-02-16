import { createSlice } from "@reduxjs/toolkit";


export type User = {
    id : string, 
    name : string, 
    email : string
}

const allUsers : User[] = []


export const userSlice = createSlice({
    name : "user", 
    initialState : allUsers, 
    reducers : {

    }
})

export default userSlice.reducer