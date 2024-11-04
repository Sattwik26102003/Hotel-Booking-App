import React, { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { login,logout } from "../authSlice";
import axios from 'axios'

const useAuthCheck = ()=>{
    const dispatch=useDispatch();
    const {isAuthenticated,user}=useSelector(state=>state.auth)
    useEffect(()=>{
        const verify= async ()=>{
            try {
                const response= await axios.get('http://localhost:4000/profile',{
                    withCredentials:true
                })
                dispatch(login(response.data.name))
            } catch (error) {
                console.log(error);
            } 
        }
        verify();
    },[])
}

export default useAuthCheck;