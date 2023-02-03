import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import React from "react";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useState } from "react";
import { useEffect,useContext } from "react";
import axios from "axios"
import {baseUrl} from "../../services/baseUrl"
import { useMemo } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
export default function Home() {
  const MONTHS=useMemo(()=>[
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],[]);
  const [userState,setUserState]=useState([])
  useEffect(()=>{
  const getStats=async()=>{
    try{
     const res=await axios.get(`${baseUrl}/users/stats`,{
      headers:{
        "Content-type":"application/json",
        token:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYzkzMzQ1ZDgxNjUzOTVmOTUzYTc3NSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NDMwMDA2OCwiZXhwIjoxNjc0NzMyMDY4fQ.1WbPvll06mZHCPoyGDHawmCGuPn300Hb2JdXmBzZtNk"
     }
     })
     res.data.map((item)=>{
      setUserState((prev)=>[
        ...prev,
        {name:MONTHS[item._id-1],"New User":item.total},
      ]
       
      )
     })
     
    }catch(e){
      console.log(e)
    }
  }
  getStats()
  },[MONTHS])
  console.log(userState)

  return (
  
    <div className="home">
      <FeaturedInfo />
      <Chart data={userState} title="User Analytics" grid dataKey="New User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
