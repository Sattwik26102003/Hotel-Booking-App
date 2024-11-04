import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isAuthenticated: false,
    user:{
        name:'',
        email:''
    }
}

export const authSlice= createSlice({
    name:'auth',
    initialState,
    reducers: {
        login: (state,action)=>{
            state.isAuthenticated=true,
            state.user.name=action.payload.name
            state.user.email=action.payload.name
        },
        logout:(state)=>{
            state.isAuthenticated=true,
            state.user.name='',
            state.user.email=''
        }
    }
})

export const {login,logout}=authSlice.actions;

export default authSlice.reducer