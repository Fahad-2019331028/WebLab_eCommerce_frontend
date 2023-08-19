import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { addToCart, deleteFromCart } from "../actions/cartActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "react-bootstrap";
import { checkUser } from "./Homescreen";
import Checkout from "../components/Checkout/Checkout";

export default function CartScreen() {
  checkUser();
  const notify = (callId, msg) => {
    toast.clearWaitingQueue({ containerId: "default" });
    if (callId === "limit") {
      return toast.info(msg, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    }
    toast("Default!", { position: toast.POSITION.BOTTOM_LEFT });
  };
  const cartState = useSelector((state) => state.cartReducer);
  const cartItems = cartState.cartItems;

  const dispatch = useDispatch();

  function increaseCount(item) {
    if (item.quantity === 20)
      return notify("limit", "We deliver maximum of 20 quantities ");
    dispatch(addToCart(item, Math.min(item.quantity + 1, 20)));
  }
  function decreaseCount(item) {
    if (item.quantity === 1)
      return notify("limit", "Can't Order Less than 1 quantities");
    dispatch(addToCart(item, Math.max(item.quantity - 1, 1)));
  }
  function removeItemCart(item) {
    dispatch(deleteFromCart(item));
  }

  var subtotal = cartItems.reduce((x, item) => item.quantity * item.prices, 0);

  return (
    <div id="basic_container">
      <ToastContainer limit={1} containerId="default" />
      <div className="row justify-content-center" id="consumeBody">
        <div className="back_container">
          <i
            className="fas fa-chevron-circle-left goback  "
            aria-hidden="true"
            onClick={() => window.location.replace("/")}
          ></i>
        </div>
        <div className="col-md-6 cartContainer">
          <h4 id="myCartText">
            <b>My Cart</b>
          </h4>
          <hr id="allhr"></hr>

          {cartItems.length == 0 ? (
            <div id="noItemDiv" className="button-container">
              <Button href="/" className="red-button">
                Homepage
              </Button>
              <Button href="/orders" className="red-button">
                My Orders
              </Button>
            </div>
          ) : (
            cartItems.map((item) => {
              const defaultPrize = item.prices;

              return (
                <div className="flex-container">
                  <div className="UnitpriceFlex m-1 w-100 text-left">
                    <custom_h1 className="type1_text">
                      {item.name}[{item.prices}]<br></br>
                    </custom_h1>

                    <custom_h1 className="type2_text">
                      Price : <></>
                      {item.prices}* {item.quantity} Unit ={" "}
                      {JSON.stringify(item.price) != "null"
                        ? item.price
                        : defaultPrize * item.quantity}
                    </custom_h1>

                    <div className="type2_text">
                      <custom_h1 id="cartPage_defQ">Quantity :&nbsp;</custom_h1>
                      <i
                        className="fa fa-plus "
                        id="cartPageIconPlus"
                        aria-hidden="true"
                        onClick={() => increaseCount(item)}
                      ></i>
                      &nbsp; &nbsp;
                      <b id="cartPageQuantity_text">{item.quantity}</b>
                      &nbsp;&nbsp;&nbsp;
                      <i
                        className="fa fa-minus"
                        id="cartPageIconMinus"
                        aria-hidden="true"
                        onClick={() => decreaseCount(item)}
                      ></i>
                      <hr />
                    </div>
                  </div>
                  <div>
                    <img
                      className="m-1 w-100"
                      id="cartPageProdImg"
                      src={item.image}
                    ></img>
                  </div>

                  <div>
                    <i
                      className=" fa fa-trash  mt-5 w-100 "
                      id="cartPageIconTrash"
                      aria-hidden="true"
                      onClick={() => removeItemCart(item)}
                    ></i>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {cartItems.length != 0 && (
          <div className="col-md-4 flex-container subtotal text-right">
            <h1 className="type3_text subt">
              <b>Subtotal: </b> {subtotal} BDT{" "}
            </h1>
            <Checkout subtotal={subtotal} />
          </div>
        )}
      </div>
    </div>
  );
}
