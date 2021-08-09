import React, {useState} from "react";
import ReactStars from "react-rating-stars-component";
import SweetAlert from "sweetalert2-react";
import { useForm } from "react-hook-form";
import CallAPI from "../../../until/callAPI";

const CardReview = ({ courseId}) => {
  const { register, handleSubmit } = useForm();
  const [rating, setRating] = useState(0);
  const [checkReview, setCheckReview] = useState({ show: false });
  const ratingChanged = (newRating) => {
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
      setCheckReview({ show: true });
    } else {
      setCheckReview({ show: false });
    }
  };
  return (
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
        <form
                    className="row contact_form"
                    id="contactForm"
                    noValidate="novalidate" onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-md-12">
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          id="comment"
                          rows={2}
                          placeholder="Comment"
                          defaultValue={""}
                          {...register("comment", {required: true})}
                        />
                      </div>
                    </div>
                    <div className="col-md-12 text-right">
                      <button
                        type="submit"
                        className="btn primary-btn"
                      >
                        Comment Now
                      </button>
                    </div>
                  </form>
        <SweetAlert
          show={checkReview.show}
          title="Review"
          text="Sucess!!!"
          onConfirm={() => setCheckReview({ show: false })}
        />
      </div>
    </div>
  );
};
export default CardReview;
