import React, {useState, useEffect} from "react";
import "./description.css";
import { Tabs } from "antd";
import { useForm } from 'react-hook-form';
import ReactStars from "react-rating-stars-component";
import CallAPI from '../../../until/callAPI';
import SweetAlert from 'sweetalert2-react';

const { TabPane } = Tabs;


function callback(key) {
  console.log(key);
}

function Description({courseId, userId}) {
  const { register, handleSubmit } = useForm();
  const [comments, setComments] = useState("");
  const [rating, setRating] = useState(0);
  const [checkComment, setCheckComment] = useState({show: false});
  const [checkReview, setCheckReview] = useState({show: false});
  useEffect(() => {
    const fetchData = async () => {
        const res = await CallAPI("GET", null, `/comments/course/${courseId}`);
        if(res.status === 1) {
          setComments(res.data.cmd);
        }
        else{
          setComments("");
        }
    }
    fetchData();
  }, []);

  const onSubmit = (data, e) => {
    createComment(data.message_comment, e)
  }

  const createComment = async (cmd, e) => {
    const res = await CallAPI(
      "POST",
      { courseId: parseInt(courseId),
        userId:  parseInt(userId),
        comment: cmd
      },
      `/comments`
    );
    if (res.status === 1) {
      const res = await CallAPI("GET", null, `/comments/course/${courseId}`);
        if(res.status === 1) {
          setComments(res.data.cmd);
        }
        else{
          setComments("");
        }
      setCheckComment({show: true});
      e.target.reset();
    } else {
      setCheckComment({show: false});
    }
  };
  const ratingChanged = (newRating) => {
    setRating(newRating);
  };
  const createReview = async () => {
    const res = await CallAPI(
      "POST",
      { 
        courseId: parseInt(courseId),
        userId:  parseInt(userId),
        rating
      },
      `/comments`
    );
    console.log(res.status)
    if (res.status === 1) {
      console.log('vo day')
      setRating(0);
      setCheckReview({show: true});
    } else {
      setCheckReview({show: false});
    }
  };
  return (
    <section className="product_description_area">
      <div className="container">
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Command" key="1">
            <div className="row">
              <div className="col-lg-6">
                <div className="comment_list">
                  {
                    comments.length > 0 ?
                    comments.map((data, index) => {
                      return (
                        <div className="review_item" key={index}>
                        <div className="media">
                          <div className="d-flex">
                            <img src="https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-users-icon-png-image_4144740.jpg" alt="" />
                          </div>
                          <div className="media-body">
                            <h6>{data.user.fullname}</h6>
                            <h6>{data.rating.create_at}</h6>
                          </div>
                        </div>
                        <p className="content-comment">
                          {data.rating.comment}
                        </p>
                      </div>
                      )
                  }): 
                  <>
                  <div style={{
                      textAlign: "center",
                      backgroundColor: '#364d79',
                      width: '100%',
                      height: '260px',
                      lineHeight: '260px',
                      marginBottom:'20px'
                  }} className="flex-row justify-content-center">
                      <p style={{fontSize: 30, fontWeight: 350}}>No comment!</p>
                  </div>
              </>
                  }
                 </div>
              </div>
              <div className="col-lg-6">
                <div className="review_box">
                  <h4>Post a comment</h4>
                  <form
                    className="row contact_form"
                    id="contactForm"
                    noValidate="novalidate" onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-md-12">
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          id="message"
                          rows={2}
                          placeholder="Message"
                          defaultValue={""}
                          {...register("message_comment", {required: true})}
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
                    show={checkComment.show}
                    title="Comment"
                    text="Sucess!!!"
                    onConfirm={() => setCheckComment({ show: false })}
                  />
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
                    value={rating}
                    activeColor="#ffd700"
                />
                <button
                      type="button"
                      className="button button--active button-review" onClick={createReview}>
                      Review Now
                </button>
                <SweetAlert
                  show={checkReview.show}
                  title="Review"
                  text="Sucess!!!"
                  onConfirm={() => setCheckReview({ show: false })}
                 />
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </section>
  );
}

export default Description;
