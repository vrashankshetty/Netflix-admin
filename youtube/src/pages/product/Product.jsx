import { Link, useParams } from "react-router-dom";
import "./product.css";
import { Publish } from "@material-ui/icons";
import {useState} from 'react'
import { useEffect,useContext,useRef } from "react";
import React from "react";
import { MovieContext } from "../../context/moviecontext/MovieContext";
export default function Product() {
    const [id,setId]=useState('');
    const filtereddata=useRef();
    const {movies}=useContext(MovieContext);
    const param=useParams();
    const [mov,setMov]=useState({})
    useEffect(()=>{
    filtereddata.current=movies.filter(item=>item._id===param.productId)
    setMov(filtereddata.current[0])
    },[])
    
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
         
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={mov.img} alt="" className="productInfoImg" />
                  <span className="productName">{mov.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">genre</span>
                      <span className="productInfoValue">{mov.genre}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">year</span>
                      <span className="productInfoValue">{mov.year}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">limit</span>
                      <span className="productInfoValue">{mov.limit}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Movie Title</label>
                  <input type="text" placeholder={mov.title} />
                  <label>Year</label>
                  <input type="text" placeholder={mov.year} />
                  <label>Genre</label>
                  <input type="text" placeholder={mov.genre} />
                  <label>Limit</label>
                  <input type="text" placeholder={mov.limit} />
                  <label>Trailer</label>
                  <input type="file" placeholder={mov.trailer} />
                  <label>Video</label>
                  <input type="file" placeholder={mov.video} />
                  
                  
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img src={mov.img} alt="" className="productUploadImg" />
                      <label for="file">
                          <Publish/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}} />
                  </div>
                  <button className="productButton">Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}
