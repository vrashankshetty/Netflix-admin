import { AuthReducer } from "./AuthReduce";
import {createContext, useReducer,useState} from 'react'
import React from "react";
import { useEffect } from "react";
const INITIAL_STATE={
    user:JSON.parse(localStorage.getItem("user"))||null,
    isFetching:false,
    error:false,
}

export const AuthContext=createContext(INITIAL_STATE)

export const AuthContextProvider=({children})=>{
    const [state,dispatch]=useReducer(AuthReducer,INITIAL_STATE)
    const [count,setCount]=useState(1);
    useEffect(()=>{
     localStorage.setItem("user",JSON.stringify(state.user))
     console.log("userdetails",state)
     return () => dispatch([{}])

    },[state.user])

    return(
        <AuthContext.Provider
        value={{
            user:state.user,
            isFetching:state.isFetching,
            error:state.error,
            dispatch,
            count,
            setCount
        }}
        >
            {children}
        </AuthContext.Provider>
    )
};