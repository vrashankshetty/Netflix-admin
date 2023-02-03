import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../services/baseUrl";
import React from "react";
import { useState } from "react";
export default function WidgetSm() {
   const [user,setUser]=useState([])
  useEffect(async ()=>{
    try{
      const res=await axios.get(`${baseUrl}/users?new=true`,{
        headers:{
          "Content-type":"application/json",
          token:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYzkzMzQ1ZDgxNjUzOTVmOTUzYTc3NSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NDMwMDA2OCwiZXhwIjoxNjc0NzMyMDY4fQ.1WbPvll06mZHCPoyGDHawmCGuPn300Hb2JdXmBzZtNk"
        }
      })
      console.log(res.data)
      setUser(res.data)
    }catch(e){

    }
  },[9])
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        
          {user.map((u)=>{
            return(
              <>
              <li className="widgetSmListItem">
          <img
            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{u.username}</span>
            <span className="widgetSmUserTitle">Software Engineer</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        </>
            )
  }
  )
      }
      </ul>  
    </div>
  );
}
