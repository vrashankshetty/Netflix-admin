import axios from "axios";
import { getMoviesStart, getMoviesSuccess, getMoviesFailure,deleteMoviesStart,deleteMoviesFailure,deleteMoviesSuccess } from "./MovieActions";
import { createMoviesFailure,createMoviesSuccess,createMoviesStart} from "./MovieActions";
import React from "react";
import { baseUrl } from "../../services/baseUrl";
export const getMovies = async (dispatch) => {
  dispatch(getMoviesStart());
  try {
     const res = await axios.get(`${baseUrl}/movies`,{
        headers:{token:"Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
        "Content-Type":"application/json"
      }
    });
    console.log("moviesdata",res.data)
    dispatch(getMoviesSuccess(res.data));
    
  } catch (err) {
    dispatch(getMoviesFailure());
  }
};  

export const createMovies = async (movie,dispatch) => {
  dispatch(createMoviesStart());
  try {
     const res = await axios.post(`${baseUrl}/movies`,movie,{
        headers:{token:"Bearer "+JSON.parse(localStorage.getItem("user")).accessToken}
    });
    dispatch(createMoviesSuccess(res.data));
  } catch (err) {
    dispatch(createMoviesFailure());
  }
};  
export const deleteMovies = async (id,dispatch) => {
    dispatch(deleteMoviesStart());
    try {
       const res = await axios.delete(`${baseUrl}/movies/delete/`+id,{
          headers:{token:"Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,}
      });
      dispatch(deleteMoviesSuccess(res.data.id));
    } catch (err) {
      dispatch(deleteMoviesFailure());
    }
  };  