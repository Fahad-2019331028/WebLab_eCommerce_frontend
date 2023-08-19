import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUID } from "./actions/uidlogin";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  const dispatch = useDispatch();
  const { loadingx, successx, currentBankUser } = useSelector(
    (state) => state.loginUIDReducer
  );
  console.log(currentBankUser);

  function loginWithUID() {
    if (!password || (email && !email.match(/.+@.+/))) {
      return toast.warning("Fill the Details Properly", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1800,
      });
    }
    const bankuser = { email, password };
    console.log(bankuser);

    dispatch(loginUID(bankuser));
  }

  function logout() {
    localStorage.removeItem("currentBankUser");
    window.location.href = "/";
  }
  const pp = localStorage.getItem("currentBankUser");
  console.log(pp + "       x" + currentBankUser);

  // useEffect(()=>{

  //   if(email && password){

  //   const bankuser = { email, password }
  //   dispatch(loginUID(bankuser))

  //   }

  // },[])
  // useEffect(() => {
  //   const bankuser = { email, password };
  //   let timer1 = setTimeout(() => dispatch(loginUID(bankuser)), 5000);

  //   return () => {
  //     clearTimeout(timer1);
  //   };
  // });

  return (
    <div className="App">
      <ToastContainer limit={2} />

      {!currentBankUser ? (
        <div>
          <form class="login">
            <t1>BANK LOGIN</t1>
            <input
              type="text"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPass(e.target.value)}
              required
            />
            <button
              type="button"
              id="log"
              onClick={loginWithUID}
              onsubmit="return false"
            >
              Login
            </button>
          </form>
        </div>
      ) : (
        ////////////////////////////////////////////////////////////

        <div className="padding wow">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body little-profile text-center">
                <div className="pro-img">
                  <h1>Bank details</h1>
                </div>

                <div className="row text-center m-t-20">
                  {/* Centering the white container */}
                  <div className="bank-details-wrapper">
                    {/* White Bank details container */}
                    <div className="bank-details-container">
                      <div className="bank-details-text">
                        <b>Email:</b> {currentBankUser.email}
                      </div>
                      <div className="bank-details-text">
                        <b>Account Number:</b> {currentBankUser.bankUID}
                      </div>
                      <div className="bank-details-text">
                        <b>Balance:</b> {currentBankUser.bdt} BDT
                      </div>
                    </div>
                  </div>

                  {/* Logout button */}
                  <div className="logout">
                  <button
                    type="button"
                    id="log"
                    onClick={logout}
                  >
                    Log Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
