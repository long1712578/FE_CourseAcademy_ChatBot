import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { useParams } from "react-router";
import Header from "../../component/header";
import Footer from "../../component/footer";
import CallAPI from "../../until/callAPI";
import CallUnAuthorize from "until/callUnAuthorize";
import SweetAlert from "sweetalert2-react";
import "./resgisterCourse.css";
import { useHistory } from 'react-router-dom';

const RegisterProduct = () => {
  const id = useParams();
  const [course, setCourse] = useState("");
  const [notify, setNotify] = useState({ show: false, content: "" });
  const router = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      const res = await CallUnAuthorize("GET", null, `/courses/${id.id}`);
      if (res.status === 1) {
        setCourse(res.data);
      }
    };
    fetchData();
  }, []);
  const addOrder = async () => {
    const res1 = await CallAPI("POST", { courseId: id.id }, `/orders`);
    console.log("res", res1.err);
    if (res1.status === 1) {
      setNotify({show: true, content: "Register suscess..."});

    } else {
      setNotify({show : false, content: "Register fail..."})
    }
  };
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
                      <th scope="col">Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="cart-info">{course.name}</td>
                      <td className="cart-price">
                        <h5>{course.promotion_price}</h5>
                      </td>
                      <td className="cart-active">
                        <Button type="primary" danger>
                          <i className="far fa-trash-alt"></i>
                        </Button>
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
                    <tr className="out_button_area">
                      <td className="d-none-l"></td>
                      <td className></td>
                      <td>
                        <div className="checkout_btn_inner d-flex align-items-center">
                          <a className="gray_btn" href={`/courses/${id.id}`}>
                            Go to
                          </a>
                          <a
                            onClick={addOrder}
                            className="primary-btn ml-2"
                          >
                            Checkout
                          </a>
                          <SweetAlert
                            show={notify.show}
                            title="Register course"
                            text={notify.content}
                            onConfirm={() =>
                              setNotify({ show: false, content: "" })
                            }
                          />
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

export default RegisterProduct;
