import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isAuthenticated: false,
    user:{
        userid:-1,
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
            state.user.userid=action.payload.userid
            state.user.name=action.payload.name
            state.user.email=action.payload.email
        },
        logout:(state)=>{
            state.isAuthenticated=false
            state.user.userid=-1
            state.user.name=''
            state.user.email=''
        }
    }
})

export const {login,logout}=authSlice.actions;

export default authSlice.reducer