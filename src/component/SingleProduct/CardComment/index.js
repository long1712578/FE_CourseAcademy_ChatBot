import React, { useState, useEffect } from "react";
import CallAPI from "../../../until/callAPI";
import CallUnAuthorize from "../../../until/callUnAuthorize";
// import ReactStars from "react-rating-stars-component";
import StarRatings from 'react-star-ratings';
// import SweetAlert from "sweetalert2-react";
import {toast, ToastContainer} from "react-toastify";
import { useForm } from "react-hook-form";
import "./comment.css";

const CardComment = ({ courseId }) => {
  const [listFeedback, setListFeedback] = useState([]);
  const { register, handleSubmit } = useForm();
  const [rating, setRating] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const res = await CallUnAuthorize("GET", null, `/comments/course/${courseId}`);
      if (res.status === 1) {
        setListFeedback(res.data.cmd)
      } else {
        setListFeedback([]);
      }
    };
    fetchData();
  }, []);
  const ratingChanged = (newRating) => {
    console.log(newRating);
    setRating(newRating);
  };
  const onSubmit = (data, e) => {
    createReview(data.comment, e);
  }
  const createReview = async (comment, e) => {
    const res = await CallAPI(
      "POST",
      {
        comment,
        courseId: parseInt(courseId),
        rating,
      },
      `/comments`
    );
    if (res.status === 1) {
      setRating(0);
      document.getElementById('txtComment').value='';
      toast.success("Comment success", {toastId: 10, autoClose: 2000});
      const res = await CallUnAuthorize("GET", null, `/comments/course/${courseId}`);
      if (res.status === 1) {
        setListFeedback(res.data.cmd);
        setRating(0);
      } else {
        setListFeedback([]);
      }
    } else {
      document.getElementById('txtComment').value='';
      setRating(0);
      return toast.error("Comment fail, because you had comment!", {
        toastId: -10,
        autoClose: 2000,
    });
    }
  };

  return (
    <article className="card mt-5">
      <div className="container mt-5">
        <div className="row d-flex justify-content-center mb-4">
          <div className="col-md-8 comment">
            <div className="headings d-flex justify-content-between align-items-center mb-3">
              <div className="buttons">
                {" "}
                <span className="badge bg-white d-flex flex-row align-items-center">
                  {" "}
                  <span className="text-primary">Comments "ON"</span>
                </span>
              </div>
            </div>
            {listFeedback.length > 0 ? (
              listFeedback.map((data, index) => {
                return (
                  <div className="card p-3" key={index}>
                    <div className="card header">{data.user.fullname}</div>
                    <div className="d-flex justify-content-between align-items-center">
                      <span style={{ marginLeft: 18 }}>
                        {" "}
                        {data.rating.comment}
                      </span>
                      <div className="user d-flex flex-row align-items-center"></div>
                      <small>{data.rating.create_at}</small>
                    </div>
                    <div className="action d-flex justify-content-between mt-2 align-items-center">
                      <div style={{marginLeft: 20}} className="icons align-items-center">
                        {data.rating.rating}
                        <i className="fa fa-star text-warning"></i>{" "}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <>
                <h6 style={{ textAlign: "center" }}>No comment</h6>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row d-flex justify-content-center mb-4">
          <div className="col-md-8">
            <div className="headings d-flex justify-content-between align-items-center mb-3">
              <div className="review">
                <div className="review_box">
                  <div className="content-review">
                    <StarRatings
                        rating={rating}
                        starRatedColor="yellow"
                        changeRating={ratingChanged}
                        numberOfStars={5}
                        name='rating'
                    />
                  <form
                    className="row contact_form"
                    id="contactForm"
                    noValidate="novalidate"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="col-md-12">
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          id="txtComment"
                          rows={2}
                          placeholder="Comment"
                          defaultValue={""}
                          {...register("comment", { required: true })}
                        />
                      </div>
                    </div>
                    <div className="col-md-12 text-right">
                      <button type="submit" className="btn primary-btn">
                        Comment
                      </button>
                    </div>
                  </form>
                  </div>
                  {/* <SweetAlert
                    show={checkReview.show}
                    title="Review"
                    text="Sucess!!!"
                    onConfirm={() => setCheckReview({ show: false })}
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-center"/>
    </article>
  );
};
export default CardComment;
