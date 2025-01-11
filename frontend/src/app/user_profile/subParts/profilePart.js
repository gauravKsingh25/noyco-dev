


import React from 'react';
import './subParts.css';
import emaiIcon from "../../../assets/email_542638.png"
import roleIcon from "../../../assets/contact_8233506.png"
import locationIcon from "../../../assets/location_6764537.png"
import Image from "next/image";
export default function ProfilePart() {
  return (
    <div className="user-profile-container">
      {/* Top section with customizable color */}
      <div className="user-profile-top"></div>

      {/* Circular profile picture centered between top and bottom */}
      <div className="user-profile-circular-pic">
        <img
          src="https://png.pngtree.com/png-vector/20221203/ourmid/pngtree-cartoon-style-female-user-profile-icon-vector-illustraton-png-image_6489286.png" // replace with actual image path or prop
          alt="User Profile"
        />
      </div>

{console.log(emaiIcon.src)}
      {/* Bottom section with user info */}
      <div className="user-profile-bottom">
        <div className="user-name">
          <span className="user-name-text">Anoop Yadav</span>
          <span className="saved-ai">
            <img
              style={{width:'30px', height:"30px"}}
              src="https://w7.pngwing.com/pngs/860/512/png-transparent-instagram-social-media-save-instagram-instagram-save-social-media-logo-icon-thumbnail.png" // replace with actual save icon path
              alt="Save Icon"
            />
          
          </span>
        </div>
        <div className="user-info-tiles">
          <div className="user-tile">
            {/* <img
              src={emaiIcon} 
              alt="Email Icon"
            /> */}
            <Image
          src={emaiIcon}
          alt={`user email}`}
          className="w-6 h-6 object-contain"
          style={{ maxHeight: "256px", maxWidth: "100%" }}
        />
            <span>email@example.com</span>
          </div>
          <div className="user-tile">
          <Image
          src={roleIcon}
          alt={`user email}`}
          className="w-full h-full object-cover"
          style={{ maxHeight: "256px", maxWidth: "100%" }}
        />
            <span>Role</span>
          </div>
          <div className="user-tile">
          <Image
          src={locationIcon}
          alt={`user email}`}
          className="w-6 h-6 object-contain"
          style={{ maxHeight: "256px", maxWidth: "100%" }}
        />
            <span>Delhi, IN</span>
          </div>
        </div>
        <div style={{color:"black" , paddingTop:'7px'}}>
            <strong>Bio: </strong> We have detected a new login to your Gumroad account. Please enter this authentication token in the challenge page to continue
        </div>
      </div>
    </div>
  );
}

