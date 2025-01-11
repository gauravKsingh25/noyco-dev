// pages/updateProfile.js
import React, { useState } from 'react';

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "Yoshikage",
    lastName: "Kira",
    email: "YoshikageKira@gmail.com",
    phone: "+84 789 373 568",
    country: "Vietnam",
    city: "Hai Phong",
    address: "Hong Bang",
    zipCode: "180000",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Information:", formData);
  };

  return (
    <div className="update-profile-container flex w-full justify-between ">

<div className="profile-picture-section w-[20%]">
          <img
            src="https://png.pngtree.com/png-vector/20221203/ourmid/pngtree-cartoon-style-female-user-profile-icon-vector-illustraton-png-image_6489286.png"
            alt="Profile"
            className="profile-picture"
          />
          <div className="profile-edit-icon">🖉</div>
        </div>
      <form className="update-profile-form w-[80%]" onSubmit={handleSubmit}>
     

        <div className="form-row">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
          <label>Email Address</label>
          <input
            style={{backgroundColor:"#f3f4f6"}}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={true}
          />
        </div>
        
        </div>

       

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
            <label>Bio</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

        <h3>Personal Address</h3>

        <div className="form-row">
          <div className="form-group">
            <label>Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Zip Code</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="save-button">Save Changes</button>
      </form>
    </div>
  );
};

export default UpdateProfile;