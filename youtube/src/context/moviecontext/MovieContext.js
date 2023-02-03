import { MovieReducer } from "./MovieReducer";
import {createContext, useReducer} from 'react'
import { useEffect } from "react";
import React from "react";
import { deleteMoviesStart,getMoviesStart } from "./MovieActions";
const INITIAL_STATE={
    movies:JSON.parse(localStorage.getItem("movies")) || [],
    isFetching:false,
    error:false,
}

export const MovieContext=createContext(INITIAL_STATE)

export const MovieContextProvider=({children})=>{
    const [state,dispatch]=useReducer(MovieReducer,INITIAL_STATE)
    console.log("moviestate",state)
    useEffect(()=>{
     localStorage.setItem("movies",JSON.stringify(state.movies || []))
     
     return ()=> dispatch(getMoviesStart())
    },[state.movies])

    return(
        <MovieContext.Provider
        value={{
            movies:state.movies,
            isFetching:state.isFetching,
            error:state.error,
            dispatch
        }}
        >
            {children}
        </MovieContext.Provider>
    )
};