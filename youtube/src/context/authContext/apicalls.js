import React from "react";
import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthAction";
import { baseUrl } from "../../services/baseUrl";
export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${baseUrl}/auth/login`, user);
    res.data.isAdmin && dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};