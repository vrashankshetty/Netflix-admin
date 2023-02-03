import { useState,useContext} from "react";
import "./newProduct.css";
import { MovieContext } from "../../context/moviecontext/MovieContext";
import React from "react";
import storage from "../../Firebase"
import { createMovies } from "../../context/moviecontext/apicalls";
export default function NewProduct() {
const [movie,setMovie]=useState(null)
const [img,setImg]=useState(null)
const [imgtitle,setImgtitle]=useState(null)
const [trailer,setTrailer]=useState(null)
const [video,setVideo]=useState(null)
const [uploaded,setUploaded]=useState(0)
const {dispatch}=useContext(MovieContext)
const handlechange=(e)=>{
  const value=e.target.value;
  setMovie({...movie,[e.target.name]:value})
}

const upload =(items)=>{
  items.forEach((item)=>{
    const fileName=new Date().getTime()+item.file.name;
    const uploadTask=storage.ref(`/items/${fileName}`).put(item);
    uploadTask.on("state_changed",snapshot=>{
      const progress=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
      console.log("upload is"+progress+" %done")
    },(err)=>{console.log(err)},()=>{
      uploadTask.snapshot.ref.getDownloadURL().then(url=>{
        setMovie((prev)=>{
          return {...prev,[item.label]:url};
        })
        setUploaded((prev)=>prev+1)
      })
    })
  })
}
console.log("movie=",movie)
const handleUpload=(e)=>{
  e.preventDefault();
  upload([
    {file:img,label:"img"},
    {file:imgtitle,label:"imgTitle"},
    {file:trailer,label:"trailer"},
    {file:video,label:"video"},
  ])
}
const handleSubmit=(e)=>{
  e.preventDefault();
  createMovies(movie,dispatch)
}
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="img" name='img'onChange={e=>setImg(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Title image</label>
          <input type="file" id='imgTitle' name='titleimg'onChange={e=>setImgtitle(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Name</label>
          <input type="text" id='name' name='name'onChange={handlechange}/>
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input type="text" id='desc' name='desc'onChange={handlechange}/>
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input type="text" id='year' name="year"onChange={handlechange}/>
        </div>
        <div className="addProductItem">
          <label>Limit</label>
          <input type="text" id='limit' name='limit' onChange={handlechange}/>
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input type="text" id='genre' name='genre'onChange={handlechange}/>
        </div>
        <div className="addProductItem">
          <label>Duration</label>
          <input type="text" id='duration' name='duration'onChange={handlechange} />
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input type="file" id='trailer' name='trailer'onChange={e=>setTrailer(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input type="file" id='video' name='video' onChange={e=>setVideo(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>IsSeries?</label>
          <select name='isSeries' id='isSeries' onChange={handlechange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>{uploaded===4?(
        <button className="addProductButton" onClick={handleSubmit}>Create</button>
        ): <button className="addProductButton" onClick={handleUpload}>Upload</button>}
      </form>
    </div>
  );
}
