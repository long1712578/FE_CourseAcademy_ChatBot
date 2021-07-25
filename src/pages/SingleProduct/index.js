import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import CallAPI from "../../until/callAPI";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import Header from "../../component/header";
import Footer from "../../component/footer";
import Description from "./DescriptionProduct/index";
import Loader from "../../component/loader";
import { Select, Button, Modal } from "antd";
import "./index.css";
const Product = () => {
  const [course, setCourse] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isLike, setIsLike] = useState(false);
  const [like, setLike] = useState(false);
  const [disLike, setDisLike] = useState(false);
  const [token, setToken] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  // modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    getDocuments();
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  //       end modal
  const courseId = useParams();
  let decode = null;
  let userId = null;
  const user = JSON.parse(localStorage.getItem("user"));
  const accessToken = user.accessToken;
  const { Option } = Select;
  const Data = ["document", "video"];
  const Chapter = {
    document: ["doc 1", "doc 2", "doc 3"],
    video: ["video 1", "video 2", "video 3"],
  };
  const [chapters, setChapters] = React.useState(Chapter[Data[0]]);
  const [values, setValues] = React.useState(Chapter[Data[0]][0]);
  const handleDataChange = (value) => {
    setChapters(Chapter[value]);
    setValues(Chapter[value][0]);
  };

  const onValueOfChapterChange = (value) => {
    setValues(value);
  };
  decode = jwt_decode(accessToken);
  userId = decode.userId;
  useEffect(() => {
    const fetchData = async () => {
      const res = await CallAPI(
        "GET",
        null,
        `/guest-course/information/${courseId.id}`
      );
      if (res.status === 1) {
        setCourse(res.data);
        setIsLoading(false);
      } else toast.error("Something went wrong. Try later");
    };
    fetchData();
    if (userId) {
      setToken(true);
    }
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const res = await CallAPI(
        "GET",
        null,
        `/users/${userId}/is-like/${courseId.id}`
      );
      if (res.status === 1) {
        console.log("like", res.data);
        setIsLike(res.data);
      } else setIsLike(false);
    };
    fetchData();
    if (userId) {
      setToken(true);
    }
  }, []);
  const getDocuments = async () => {
    const res = await CallAPI(
      "GET",
     null,
      `/documents/${courseId.id}`
    );
    if (res.status === 1) {
      setContent(res.data.url);
      setTitle(res.data.name);
    } else {
      setContent("");
      setTitle("");
    }
  };
  const getVideos = async () => {
    const res = await CallAPI(
      "GET",
     null,
      `/videos/${courseId.id}`
    );
    if (res.status === 1) {
      setContent(res.data.url);
      setTitle(res.data.name);
    } else {
      setContent("");
      setTitle("");
    }
  };
  const likeCourse = async () => {
    const res = await CallAPI(
      "POST",
      { course_id: courseId.id },
      `/users/${userId}/like-course`
    );
    if (res.status === 1) {
      setLike(true);
      setIsLike(false);
    } else {
      setLike(false);
    }
  };
  const dislikeCourse = async () => {
    const res = await CallAPI(
      "DELETE",
      { course_id: courseId.id },
      `/users/${userId}/dislike-course`
    );
    if (res.status === 1) {
      setDisLike(true);
      setIsLike(true);
    } else {
      setDisLike(false);
    }
  };
  if (isLoading)
    return (
      <React.Fragment>
        <div style={{ marginLeft: "200px" }}>
          <Loader />
        </div>
      </React.Fragment>
    );
  return (
    // <React.Fragment>
    <div>
      <Header></Header>
      <section className="section-content padding-y bg">
        <div className="container">
          <article className="card">
            <div className="card-body">
              <div className="row">
                <aside className="col-md-6">
                  <article className="gallery-wrap">
                    <div className="card img-big-wrap">
                      <a href="#">
                        {""}
                        <img
                          className="image-detail"
                          src={course.course[0].image}
                        />
                      </a>
                    </div>
                  </article>
                </aside>
                <main className="col-md-6">
                  <article>
                    <a href="#" className="text-primary btn-link">
                      Course
                    </a>
                    <h3 className="title">{course.course[0].name}</h3>
                    <div>
                      <ul className="rating-stars"></ul>
                      <span className="label-rating mr-3 text-muted">
                        {course.course[0].rating_average}
                        <span className="fa fa-star checked"></span>
                      </span>
                      {token && (
                        <div>
                          {!isLike ? (
                            <a
                              href="/profile"
                              className="btn-link  mr-3 text-muted"
                              onClick={likeCourse}
                            >
                              <i className="fas fa-thumbs-up"></i> Save to watch
                              list{" "}
                            </a>
                          ) : (
                            <a
                              href="/profile"
                              className="btn-link  mr-3 text-muted"
                              onClick={dislikeCourse}
                            >
                              <i className="fas fa-thumbs-down"></i> Delete to
                              watch list{" "}
                            </a>
                          )}
                        </div>
                      )}
                    </div>

                    <hr />

                    <div className="mb-3">
                      <h6>Course Description</h6>
                      <ul className="list-dots mb-0">
                        <li>{course.course[0].description}</li>
                      </ul>
                    </div>

                    <div className="form-group">
                      <label className="text-muted">Available sizes</label>
                      <div>
                        <label className="js-check btn btn-check active mr-1">
                          <input
                            type="radio"
                            name="option_size"
                            value="option1"
                            checked=""
                          />
                          <span>Small</span>
                        </label>
                        <label className="js-check btn btn-check mr-1">
                          <input
                            type="radio"
                            name="option_size"
                            value="option1"
                          />
                          <span>Medium</span>
                        </label>
                        <label className="js-check btn btn-check mr-1">
                          <input
                            type="radio"
                            name="option_size"
                            value="option1"
                          />
                          <span>Large</span>
                        </label>
                        <label className="js-check btn btn-check disabled">
                          <input
                            type="radio"
                            name="option_size"
                            disabled=""
                            value="option1"
                          />
                          <span>Babies</span>
                        </label>
                      </div>
                    </div>

                    <div className="mb-3">
                      <var className="price h4">$ {course.course[0].price}</var>{" "}
                      <br />
                      <span className="monthly">
                        $32.00 / monthly{" "}
                        <a href="#" className="btn-link">
                          installment{" "}
                        </a>
                      </span>
                    </div>

                    <div className="mb-4">
                      <div>
                        <a href="#" className="btn btn-primary mr-1">
                          Buy now
                        </a>
                      </div>
                      <div>
                        <Select
                          defaultValue={Data[0]}
                          style={{ width: 120 }}
                          onChange={handleDataChange}
                        >
                          {Data.map((value) => (
                            <Option key={value}>{value}</Option>
                          ))}
                        </Select>
                        <Select
                          style={{ width: 120 }}
                          value={values}
                          onChange={onValueOfChapterChange}
                        >
                          {chapters.map((chapter) => (
                            <Option key={chapter}>{chapter}</Option>
                          ))}
                        </Select>
                        <Button type="primary" onClick={showModal}>Preview</Button>
                        <Modal
                          title={title}
                          visible={isModalVisible}
                          onOk={handleOk}
                          onCancel={handleCancel}
                        >
                          <p>{content}...</p>
                        </Modal>
                      </div>
                    </div>
                  </article>
                </main>
              </div>
            </div>
          </article>
          <article className="card mt-5">
            <div className="card-body">
              <div className="row">
                <aside className="col-md-6">
                  <h5>Parameters</h5>
                  <dl className="row">
                    <dt className="col-sm-3">Display</dt>
                    <dd className="col-sm-9">
                      13.3-inch LED-backlit display with IPS
                    </dd>

                    <dt className="col-sm-3">Processor</dt>
                    <dd className="col-sm-9">2.3GHz dual-core Intel Core i5</dd>

                    <dt className="col-sm-3">Camera</dt>
                    <dd className="col-sm-9">720p FaceTime HD camera</dd>

                    <dt className="col-sm-3">Memory</dt>
                    <dd className="col-sm-9">8 GB RAM or 16 GB RAM</dd>

                    <dt className="col-sm-3">Graphics</dt>
                    <dd className="col-sm-9">Intel Iris Plus Graphics 640</dd>
                  </dl>
                </aside>
                <aside className="col-md-6">
                  <h5>Features</h5>
                  <ul className="list-check">
                    <li>Best performance of battery</li>
                    <li>5 years warranty for this product</li>
                    <li>Amazing features and high quality</li>
                    <li>Best performance of battery</li>
                    <li>5 years warranty for this product</li>
                  </ul>
                </aside>
              </div>
              <hr />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </article>
        </div>
      </section>
      <Description courseId ={courseId.id} userId ={userId}></Description>
      <Footer />
    </div>
    // </React.Fragment>
  );
};
export default Product;
