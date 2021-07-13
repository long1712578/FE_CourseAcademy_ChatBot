import React from "react";
import "./description.css";
import { Tabs } from "antd";
import ReactStars from "react-rating-stars-component";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}
const ratingChanged = (newRating) => {
    console.log(newRating);
  };

function Description() {
  return (
    <section className="product_description_area">
      <div className="container">
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Command" key="1">
            <div className="row">
              <div className="col-lg-6">
                <div className="comment_list">
                  <div className="review_item">
                    <div className="media">
                      <div className="d-flex">
                        <img src="https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-users-icon-png-image_4144740.jpg" alt="" />
                      </div>
                      <div className="media-body">
                        <h4>Blake Ruiz</h4>
                        <h5>12th Feb, 2018 at 05:56 pm</h5>
                        <a className="reply_btn" href="#">
                          Reply
                        </a>
                      </div>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo
                    </p>
                  </div>
                  <div className="review_item reply">
                    <div className="media">
                      <div className="d-flex">
                        <img src="https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-users-icon-png-image_4144740.jpg" alt="" />
                      </div>
                      <div className="media-body">
                        <h4>Blake Ruiz</h4>
                        <h5>12th Feb, 2018 at 05:56 pm</h5>
                        <a className="reply_btn" href="#">
                          Reply
                        </a>
                      </div>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo
                    </p>
                  </div>
                  <div className="review_item">
                    <div className="media">
                      <div className="d-flex">
                        <img src="https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-users-icon-png-image_4144740.jpg" alt="" />
                      </div>
                      <div className="media-body">
                        <h4>Blake Ruiz</h4>
                        <h5>12th Feb, 2018 at 05:56 pm</h5>
                        <a className="reply_btn" href="#">
                          Reply
                        </a>
                      </div>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="review_box">
                  <h4>Post a comment</h4>
                  <form
                    className="row contact_form"
                    action="contact_process.php"
                    method="post"
                    id="contactForm"
                    noValidate="novalidate"
                  >
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          placeholder="Your Full name"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          placeholder="Email Address"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="number"
                          name="number"
                          placeholder="Phone Number"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          name="message"
                          id="message"
                          rows={1}
                          placeholder="Message"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                    <div className="col-md-12 text-right">
                      <button
                        type="submit"
                        value="submit"
                        className="btn primary-btn"
                      >
                        Submit Now
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane tab="Review" key="2">
            <div className="review">
              <div className="review_box">
                <h4>Add a Review</h4>
                <p>Your Rating:</p>
                <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={24}
                    activeColor="#ffd700"
                />
                <p>Outstanding</p>
                <form action="#/" className="form-contact form-review mt-3">
                  <div className="form-group">
                    <input
                      className="form-control"
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      name="email"
                      type="email"
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      name="subject"
                      type="text"
                      placeholder="Enter Subject"
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      className="form-control different-control w-100"
                      name="textarea"
                      id="textarea"
                      cols={30}
                      rows={5}
                      placeholder="Enter Message"
                      defaultValue={""}
                    />
                  </div>
                  <div className="form-group text-center text-md-right mt-3">
                    <button
                      type="submit"
                      className="button button--active button-review"
                    >
                      Submit Now
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </section>
  );
}

export default Description;
