import moment from "moment";
import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import CallAPI from "../../../until/callAPI";
import CallUnAuthorize from "until/callUnAuthorize";
import { useHistory } from "react-router-dom";
import SweetAlert from "sweetalert2-react";
import { Player } from "video-react";
import "../../../../node_modules/video-react/dist/video-react.css";
import LikeProduct from "./LikeProduct";
import PreviewProduct from "../previewProduct";

const CardProduct = ({
  login,
  id,
  img,
  name,
  summary,
  description,
  rating,
  promotionPrice,
  price,
  lastUpdate,
  numberOfRating,
  numberOfEnrroled,
  course_status,
}) => {
  const [isOrder, setIsOrder] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [preview, setPreview] = useState("");
  const [isMute, setIsMute] = useState(false);
  const [notify, setNotify] = useState({ show: false, content: "" });
  const router = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      if (login) {
        const res1 = await CallAPI("GET", null, `/orders/${id}`);
        if (res1.status === 1 && res1.data.id) {
          setIsOrder(true);
        }
      }
      const res2 = await CallUnAuthorize("GET", null, `/videos/preview/${id}`);
      if (res2.status === 1) {
        setPreview(res2.data);
      }
    };
    fetchData();
  },[]);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsMute(true);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsMute(true);
    setIsModalVisible(false);
  };
  const handleOrder = async () => {
    if (!login) {
      router.push("/login");
    } else {
      const res1 = await CallAPI("POST", { courseId: id }, `/orders`);
      if (res1.status === 1) {
        setIsOrder(true);
        setNotify({ show: true, content: "Register suscess..." });
      } else {
        setNotify({ show: true, content: "Register fail..." });
      }
    }
  };
  return (
    <article className="card">
      <div className="card-body">
        <div className="row">
          <aside className="col-md-6">
            <article className="gallery-wrap">
              <div className="card img-big-wrap">
                <a href="#">
                  {" "}
                  <img src={`${img}`} />
                </a>
              </div>
            </article>
          </aside>
          <main className="col-md-6">
            <article>
              <h3 className="title">{name}</h3>
              <div className="mb-3">
                <h6>Summary:</h6>
                <ul className="list-dots mb-0">
                  <li>{summary}</li>
                </ul>
              </div>
              <hr />
              <div>
                {numberOfRating > 0 ? (
                  <span className="label-rating mr-3 text-muted">
                    Rating: {rating}{" "}
                    <span className="fa fa-star checked"></span>
                  </span>
                ) : (
                  <>
                    <span style={{ marginLeft: 5, color: "red" }}>
                      No one has rated it yet
                    </span>
                  </>
                )}
              </div>
              <div>
                <span className="label-rating mr-3 text-muted">
                  Number of ratings: {numberOfRating}
                </span>
              </div>
              <div>
                <span className="label-rating mr-3 text-muted">
                  Number of students enrolled: {numberOfEnrroled}
                </span>
              </div>
              <div>
                { (course_status ===1) ?
                  <span className="label-rating mr-3 text-muted">
                    Completed
                  </span>
                  : 
                  <span className="label-rating mr-3 text-muted">
                    Not completed
                  </span>
                }
              </div>
              {isOrder ? <LikeProduct id={id} /> : <div></div>}
              <hr />
              <div className="mb-3">
                <h6>Decription:</h6>
                <ul className="list-dots mb-0">
                  <li>{description}</li>
                </ul>
              </div>
              <hr />

              <div className="mb-3">
                <var className="price h4">{promotionPrice}</var> <br />
                <del className="price-old">{price}</del>
              </div>

              <div className="mb-4">
                {isOrder ? (
                  <a />
                ) : (
                  <div>
                    <a onClick={handleOrder} className="btn btn-primary mr-1">
                      Register now
                    </a>
                    <a onClick={showModal} className="btn btn-success ">
                      Preview
                    </a>
                    <SweetAlert show={notify.show} title="Register course" 
                    text={notify.content} onConfirm={() => setNotify({ show: false, content: "" })} />
                  </div>
                )}
                <Modal
                  title="Preview course"
                  visible={isModalVisible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <Player
                    playauto
                    muted={isMute}
                    poster="https://ugc.futurelearn.com/uploads/images/4a/12/regular_4a12b6a5-747d-4997-8b4c-bae872272935.png"
                    src={preview.url}
                  />
                </Modal>
              </div>
              <div>Last update: {lastUpdate}</div>
            </article>
          </main>
        </div>
      </div>
      { isOrder &&
         <PreviewProduct />
      }
    </article>
  );
};
export default CardProduct;
