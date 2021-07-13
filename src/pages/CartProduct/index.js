import React from "react";
import { Button } from 'antd';
import Header from "../../component/header";
import Footer from "../../component/footer";
import './cart.css';

const CartProduct = () => {
  return (
    <div>
      <React.Fragment>
        <Header />
        <div className="cart-course">
          <div className="container">
            <div className="cart_inner">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" >Course</th>
                      <th scope="col" >Price</th>
                      <th scope="col" >Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="cart-info">
                        <div className="media">
                          <div className="d-flex">
                            <img src="./images/logo-course.jpg" alt="" />
                          </div>
                          <div className="media-body">
                            <p>React </p>
                          </div>
                        </div>
                      </td>
                      <td className="cart-price">
                        <h5>$360.00</h5>
                      </td>
                      <td className="cart-active">
                      <Button type="primary" danger><i class="far fa-trash-alt"></i></Button>
                      </td>
                    </tr>
                    <tr className="bottom_button">
                      <td>
                        <a className="button" href="#">
                          Update Cart
                        </a>
                      </td>
                      <td></td>
                      <td>
                        <div className="cupon_text d-flex align-items-center">
                          <input type="text" placeholder="Coupon Code" />
                          <a className="primary-btn cartupdate" href="#">
                            Apply
                          </a>
                          <a className="button cartupdate" href="#">
                            Have a Coupon?
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        <h5>Subtotal</h5>
                      </td>
                      <td>
                        <h5>$2160.00</h5>
                      </td>
                    </tr>
                    <tr className="out_button_area">
                      <td className="d-none-l"></td>
                      <td className></td>
                      <td>
                        <div className="checkout_btn_inner d-flex align-items-center">
                          <a className="gray_btn" href="#">
                            Continue Shopping
                          </a>
                          <a className="primary-btn ml-2" href="#">
                            Proceed to checkout
                          </a>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    </div>
  );
};

export default CartProduct;
