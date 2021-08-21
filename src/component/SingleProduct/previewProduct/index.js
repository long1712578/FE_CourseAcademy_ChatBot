import React, { useState, useEffect } from "react";
import { List, Avatar, Spin, Button, Tooltip, Modal, Tabs } from "antd";
import { VideoCameraOutlined, BookOutlined } from "@ant-design/icons";
import { useParams } from "react-router";
import CallAPI from "../../../until/callAPI";
import FileViewer from "react-file-viewer";
import { Player } from "video-react";
import { toast } from "react-toastify";
import "./preview.css";
import "../../../../node_modules/video-react/dist/video-react.css";
const { TabPane } = Tabs;

const PreviewProduct = () => {
  const id = useParams();
  const [isModalVideo, setIsModalVideo] = useState(false);
  const [isModalDocument, setIsModalDocument] = useState(false);
  const [state, setState] = useState({
    data: [],
    loading: false,
    hasMore: true,
  });
  const [state1, setState1] = useState({
    data: [],
    loading: false,
    hasMore: true,
  });
  const [lesson, setLesson] = useState("");
  const [video, setVideo] = useState("");
  useEffect(() => {
    fetchDoc((res) => {
      setState({
        data: res,
      });
    });
    fetchVideo((res) => {
      console.log('res1', res);
      setState1({
        data: res,
      });
    });
  }, [id]);
  const onError = (e) => {
    console.log(e, "error in file-viewer");
  };

  const fetchDoc = async (callback) => {
    const res = await CallAPI("GET", null, `/documents?course_id=${id.id}`);
    if (res.status === 1) {
      callback(res.data);
    } else toast.error("Something went wrong. Try later");
  };

  const fetchVideo = async (callback) => {
    const res = await CallAPI("GET", null, `/videos/course/${id.id}`);
    if (res.status === 1) {
      console.log('vdeo', res.data);
      callback(res.data);
    } else toast.error("Something went wrong. Try later");
  };

  const showModalVideo = (data) => {
    setVideo(data);
    setIsModalVideo(true);
  };

  const handleVideoOk = () => {
    setIsModalVideo(false);
  };

  const handleVideoCancel = () => {
    setIsModalVideo(false);
  };

  const showModalDocument = (data) => {
    setIsModalDocument(true);
    setLesson(data);
  };

  const handleDocumentOk = () => {
    setIsModalDocument(false);
  };

  const handleDocumentCancel = () => {
    setIsModalDocument(false);
  };
  function callback(key) {
    console.log(key);
  }

  return (
    <React.Fragment>
      <article className="card">
        <div className="cart-body">
          <div className="titleCourses">
            <h4>Lesson Table of Contents</h4>
          </div>
          <div className="lessonTableContent">
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab={<span>VIDEOS</span>} key="1">
                <List
                  dataSource={state1.data}
                  renderItem={(item) => (
                    <List.Item key={item.id}>
                      <List.Item.Meta
                        avatar={
                          <Avatar src="https://thumbs.dreamstime.com/b/print-164210362.jpg" />
                        }
                        title={<h6 href="#"> {item.name}</h6>}
                        //description={item.document.name}
                      />
                      <Tooltip title="watch video">
                        <Button
                          onClick={() => showModalVideo(item)}
                          type="default"
                          shape="round"
                          size="large"
                          icon={<VideoCameraOutlined />}
                        >
                          {" "}
                          Start learning
                        </Button>
                      </Tooltip>
                    </List.Item>
                  )}
                >
                  {state1.loading && state1.hasMore && (
                    <div className="demo-loading-container">
                      <Spin />
                    </div>
                  )}
                </List>
                <Modal
                  key={video ? video.id : -1}
                  title={video ? video.name : "video"}
                  visible={isModalVideo}
                  onOk={handleVideoOk}
                  onCancel={handleVideoCancel}
                >
                  <Player
                     
                    playauto
                    poster="https://ugc.futurelearn.com/uploads/images/4a/12/regular_4a12b6a5-747d-4997-8b4c-bae872272935.png"
                    src={video.url}
                  />
                </Modal>
              </TabPane>
              <TabPane tab={<span>DOCUMENTS</span>} key="2">
                <List
                  dataSource={state.data}
                  renderItem={(item) => (
                    <List.Item key={item.document.id}>
                      <List.Item.Meta
                        avatar={
                          <Avatar src="https://i.pinimg.com/474x/d4/d3/c0/d4d3c02f855019b7357b6c46da2124da.jpg" />
                        }
                        title={<h6 href="#"> {item.document.name}</h6>}
                        //description={item.document.name}
                      />
                      <Tooltip title="watch document">
                        <Button
                          onClick={() => showModalDocument(item)}
                          type="default"
                          shape="round"
                          size="large"
                          icon={<BookOutlined />}
                        >
                          {" "}
                          Start learning
                        </Button>
                      </Tooltip>
                    </List.Item>
                  )}
                >
                  {state.loading && state.hasMore && (
                    <div className="demo-loading-container">
                      <Spin />
                    </div>
                  )}
                </List>
                <Modal
                  key={lesson ? lesson.document.id : -1}
                  title={lesson ? lesson.document.name : "document"}
                  visible={isModalDocument}
                  onOk={handleDocumentOk}
                  onCancel={handleDocumentCancel}
                >
                  <div className="row" key={Math.random()}>
                    <div className="col-md-1"></div>
                    <div className="col-md-10 fileview">
                      <FileViewer
                        fileType={lesson ? "pdf" : ""}
                        filePath={lesson ? lesson.document.url : ""}
                        onError={onError}
                        etc
                      />
                    </div>
                    <div className="col-md-1"></div>
                  </div>
                </Modal>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </article>
    </React.Fragment>
  );
};
export default PreviewProduct;
