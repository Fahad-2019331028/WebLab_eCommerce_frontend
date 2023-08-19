import React, { useState, useEffect } from "react";
import "./UserUIDCheck.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { findBankUser } from "../../actions/userAction_Bank";

export default function UserUIDCheck() {
  const userState = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userState;
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const dispatch = useDispatch();
  setTimeout(() => dispatch(findBankUser(currentUser.email)), 4000);

  return (
    <div className="root_lcontainer">
      <div className="load_container">
        <div className="red-box">
          <p id="Checktext_2">Please Wait!</p>
          <p id="Checktext">Checking user's bank details</p>
        </div>
      </div>
    </div>
  );
}
