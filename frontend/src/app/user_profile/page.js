"use client";
import React, { useState } from "react";
import UserProfile from "./subParts/profilePart";
import UpdatePart from "./subParts/updatePart";
import PasswordRecovery from "../components/passwordRecovery";
import Portal from "@/utils/portal";
import "./subParts/subParts.css";
export default function userProfile() {
  const [select, setSelect] = useState(0);
 const [isOpenPasswordRecovery, setIsOpenPasswordRecovery] = useState(true);
  const updateSelect = (pre) => {
    setSelect(() => {
      return pre;
    });
    if(pre===2){
        setIsOpenPasswordRecovery(true)
    }
  };
  const openPasswordRecovery = () => {
    setIsOpenPasswordRecovery(!isOpenPasswordRecovery);
    updateSelect(0)

    
  };
  

  


  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="user_profile_heading">
          <h2 className="uph_content">Setting</h2>
        </div>
        <div className="top">
          <div className="top_navigation_container">
            <div
              className={select === 0 ? "tnc_tiles_selected" : "tnc_tiles"}
              onClick={() => updateSelect(0)}
            >
              Profile
            </div>
            <div
              className={select === 1 ? "tnc_tiles_selected" : "tnc_tiles"}
              onClick={() => updateSelect(1)}
            >
              Edit Profile
            </div>
            <div
              className={select === 2 ? "tnc_tiles_selected" : "tnc_tiles"}
              onClick={() => updateSelect(2)}
            >
              update Password
            </div>
            <div
              className={select === 3 ? "tnc_tiles_selected" : "tnc_tiles"}
              onClick={() => updateSelect(3)}
            >
            Upcoming Features
            </div>
          </div>
        </div>
 
        <div className="bottom_area">
          {select===0&&<UserProfile />}
          {select===1&&<UpdatePart/>}
          {select===2&&isOpenPasswordRecovery&&( <Portal
              close={openPasswordRecovery}
              component={<PasswordRecovery />}
            />)}
          {select===3&&(<><h1>upcoming</h1></>)}

        </div>
      </div>
    </>
  );
}
