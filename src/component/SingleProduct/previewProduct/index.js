import React, { useState, useEffect } from "react";
import { List, message, Avatar, Spin, Button, Tooltip, Modal } from "antd";
import {
  EyeOutlined,
  VideoCameraOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router";
import CallAPI from "../../../until/callAPI";
import FileViewer from "react-file-viewer";
import { Player } from "video-react";
import { toast } from "react-toastify";
import "./preview.css";
import "../../../../node_modules/video-react/dist/video-react.css";

const PreviewProduct = () => {
  const id = useParams();
  const [isModalVideo, setIsModalVideo] = useState(false);
  const [isModalDocument, setIsModalDocument] = useState(false);
  const [state, setState] = useState({
    data: [],
    loading: false,
    hasMore: true,
  });
  const [lesson, setLesson] = useState("");
  const divStyle = {
    color: "blue",
    textAlign: "center",
  };
  useEffect(() => {
    fetchData((res) => {
      setState({
        data: res,
      });
    });
  }, [id]);
  const onError = (e) => {
    console.log(e, "error in file-viewer");
  };

  const fetchData = async (callback) => {
    const res = await CallAPI("GET", null, `/documents?course_id=${id.id}`);
    if (res.status === 1) {
      callback(res.data);
    } else toast.error("Something went wrong. Try later");
  };


  const showModalVideo = (data) => {
    setLesson(data);
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

  return (
    <React.Fragment>
      <article className="card">
        <div className="cart-body">
          <div className="titleCourses">
            <h4>Lesson Table of Contents</h4>
          </div>
          <div className="lessonTableContent">
            <List
              dataSource={state.data}
              renderItem={(item) => (
                <List.Item key={item.document.id}>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://i.pinimg.com/474x/d4/d3/c0/d4d3c02f855019b7357b6c46da2124da.jpg" />
                    }
                    title={
                      <a href="https://ant.design">Bài {item.document.id}</a>
                    }
                    description={item.document.name}
                  />
                  <div>
                    <Tooltip title="watch document">
                      <Button
                        onClick={() => showModalDocument(item)}
                        type="default"
                        shape="circle"
                        icon={<BookOutlined />}
                      />
                    </Tooltip>
                    <Tooltip title="watch video">
                      <Button
                        onClick={() => showModalVideo(item)}
                        type="default"
                        shape="circle"
                        icon={<VideoCameraOutlined />}
                        danger
                      />
                    </Tooltip>
                  </div>
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
              title={(lesson)?lesson.document.name: "video"}
              visible={isModalVideo}
              onOk={handleVideoOk}
              onCancel={handleVideoCancel}
            >
              <Player
                playauto
                poster="https://toidicodedao.files.wordpress.com/2018/07/react.png"
                src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
              />
            </Modal>
            <Modal
              title={(lesson)?lesson.document.name: "document"}
              visible={isModalDocument}
              onOk={handleDocumentOk}
              onCancel={handleDocumentCancel}
            >
              <div className="row" key={Math.random()}>
                <div className="col-md-1"></div>
                <div className="col-md-10 fileview">
                {(lesson)?lesson.document.url: ""}
                  <FileViewer
                    fileType={(lesson)?"pdf":""}
                    filePath={(lesson)?lesson.document.url: ""}
                    onError={onError}
                    etc
                  />
                  {(lesson)?lesson.document.url: ""}
                </div>
                <div className="col-md-1"></div>
              </div>
            </Modal>
          </div>
        </div>
      </article>
    </React.Fragment>
  );
};
export default PreviewProduct;
