import Footer from "component/footer";
import Header from "component/header";
import React, { useState, useEffect } from "react";
import { List, message, Avatar, Spin, Button, Tooltip } from "antd";
import { EyeOutlined } from '@ant-design/icons';
import { useParams } from "react-router";
import InfiniteScroll from "react-infinite-scroller";
import CallAPI from "../../until/callAPI";
import DownloadLink from "react-download-link";
import FileViewer from "react-file-viewer";
import { Player } from "video-react";
import { toast } from "react-toastify";
import "./preview.css";
import "../../../node_modules/video-react/dist/video-react.css";

const PreviewProduct = () => {
  const id = useParams();
  const type = "png";
  const [state, setState] = useState({
    data: [],
    loading: false,
    hasMore: true,
  });
  const [lesson, setLesson] = useState("");
  const divStyle = {
    color: 'blue',
    textAlign: 'center'
  };
  useEffect(() => {
    fetchData((res) => {
      setState({
        data: res,
      });
      setLesson(res[0]? res[0] : "");
    });
  }, [id]);
  const getDataFromURL = (url) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        fetch(url)
          .then((response) => response.text())
          .then((data) => {
            resolve(data);
          });
      });
    }, 2000);
  const onError = e => {
    console.log(e, "error in file-viewer");
  };

  const fetchData = async (callback) => {
    const res = await CallAPI("GET", null, `/documents?course_id=${id.id}`);
    if (res.status === 1) {
      callback(res.data);
    } else toast.error("Something went wrong. Try later");
  };

  const handleLesson = (data) => {
    setLesson(data);
  }

  const handleInfiniteOnLoad = () => {
    let { data } = state;
    setState({
      loading: true,
    });
    if (data.length > 14) {
      message.warning("Infinite List loaded all");
      setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    fetchData((res) => {
      data = res;
      setState({
        data,
        loading: false,
      });
    });
  };
  return (
    <React.Fragment>
      <Header />
      <div className="Preview">
        <div className="row">
          <div id="divPlayer" className="col-md-7">
            <div className="sidebar-course-intro">
              <div className="video-course-intro">
                <div className="inner">
                  <div className="video-place">
                    <Player
                      playsInline
                      poster="/assets/poster.png"
                      src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                    />
                  </div>
                  {/* <div className="video embed-responsive embed-responsive-16by9"></div> */}
                </div>
                <div className="info-course">
                  <div className="row">
                    <div className="col-md-6 col-xs-6 mt10">Lesson: {lesson?lesson.document.name : null}</div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-xs-6 mt10">
                      <span>DownLoad: </span>
                      <DownloadLink
                        label="Document"
                        filename="long.pdf"
                        exportFile={() =>
                          Promise.resolve(
                            getDataFromURL(`${lesson?lesson.document.url:null}`)
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="divOutline" className="col-md-5">
            <div className="tit-section xsm">
              <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                loadMore={handleInfiniteOnLoad}
                hasMore={!state.loading && state.hasMore}
                useWindow={false}
              >
                <List
                  dataSource={state.data}
                  renderItem={(item) => (
                    <List.Item key={item.document.id}>
                      <List.Item.Meta
                        avatar={
                          <Avatar src="https://i.pinimg.com/474x/d4/d3/c0/d4d3c02f855019b7357b6c46da2124da.jpg" />
                        }
                        title={
                          <a href="https://ant.design">
                            Bài {item.document.id}
                          </a>
                        }
                        description={item.document.name}
                      />
                      <div>
                        <Tooltip title="watch lesson">
                          <Button 
                            onClick = {() => handleLesson(item)}
                            type="primary"
                            shape="circle"
                            icon={<EyeOutlined />}
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
              </InfiniteScroll>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-6 fileview">
          <FileViewer fileType="pdf" filePath="http://localhost:5000/documents/GT.pdf" onError={onError} />
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};
export default PreviewProduct;
