import { MovieReducer } from "./MovieReducer";
import {createContext, useReducer} from 'react'
import { useEffect } from "react";
import React from "react";
import { deleteMoviesStart } from "./MovieActions";
const INITIAL_STATE={
    movies:JSON.parse(localStorage.getItem("movies"))||null,
    isFetching:false,
    error:false,
}

export const MovieContext=createContext(INITIAL_STATE)

export const MovieContextProvider=({children})=>{
    const [state,dispatch]=useReducer(MovieReducer,INITIAL_STATE)
    useEffect(()=>{
     localStorage.setItem("movies",JSON.stringify(state.movies))
     
     return ()=> dispatch([{}])
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