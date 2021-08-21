import React, { useEffect, useState } from "react";
import CallAPI from "../../../../until/callAPI";
import SweetAlert from "sweetalert2-react";

const LikeProduct = ({ id }) => {
  const [isLike, setIsLike] = useState();
  const [isLove, setIsLove] = useState({ show: false, content: "" });
  useEffect(async() => {
    const res = await CallAPI("GET", null, `/users/is-like/${id}`);
        if (res.status === 1) {
          setIsLike(res.data);
        }
  });

  const likeCourse = async () => {
    const res = await CallAPI("POST", { course_id: id }, `/users/like-course`);
    if (res.status === 1) {
      setIsLove({ show: true, content: "Add list favorite courses sussess" });
      setIsLike(false);
    } else {
      setIsLove({ show: true, content: "Add list favorite courses fail" })
    }
  };
  const dislikeCourse = async () => {
    const res = await CallAPI("DELETE", null, `/users/dislike-course/${id}`);
    if (res.status === 1) {
      setIsLove({ show: true, content: "Delete list favorite courses sussess" });
      setIsLike(true);
    } else {
      setIsLove({ show: true, content: "Delete list favorite courses fail" });
    }
  };
  return (
    <div>
      {!isLike ? (
        <a id="like-course" className="btn-link mr-3 text-muted" onClick={likeCourse} style={{ marginLeft: 10 }}>
          <i className="fa fa-heart"></i> Like
        </a>
      ) : (
        <a id="dislike-course" className="btn-link mr-3 text-muted" onClick={dislikeCourse} style={{ marginLeft: 10 }}>
          <i className="fas fa-heart-broken"></i> Cancle like
        </a>
      )}
      {/* <SweetAlert
        show={isLove.show}
        title="course"
        text={isLove.content}
        onConfirm={() => {
          setIsLove({ show: false, content: "" });
        }}
      /> */}
    </div>
  );
};
export default LikeProduct;
