import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import jwt_decode from "jwt-decode";
import CallAPI from "../../until/callAPI";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import Header from "../../component/header";
import Footer from "../../component/footer";
import Description from "./DescriptionProduct/index";
import Loader from "../../component/loader";
import CardProduct from "../../component/SingleProduct/CardProduct";
import moment from "moment";
import CardTeacher from "../../component/SingleProduct/CardTeacher";
import CardSameCourse from "../../component/SingleProduct/CardSameCourse";
import CardComment from "../../component/SingleProduct/CardComment";
import CardReview from "../../component/SingleProduct/CartReview";
const Product = () => {
  const [course, setCourse] = useState();
  const [rating, setRating] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [mostBuySameCategory, setMostBuySameCategory] = useState();
  const [teacher, setTeacher] = useState();
  const [listFeedback, setListFeedback] = useState([]);
  const id = useParams();
  const { TabPane } = Tabs;
  const user = JSON.parse(localStorage.getItem("user"));
  const accessToken = user.accessToken;
  const decode = jwt_decode(accessToken);
  const userId = decode.userId;


function callback(key) {
  console.log(key);
}
  useEffect(() => {
    const fetchData = async () => {
      const res = await CallAPI(
        "GET",
        null,
        `/guest-course/information/${id.id}`
      );
      if (res.status === 1) {
        setCourse(res.data.course[0]);
        setRating(res.data.countRate);
        setMostBuySameCategory(res.data.mostBuySameCategory);
        setTeacher(res.data.teacher[0]);
        setListFeedback(res.data.listFeedback);
        setIsLoading(false);
      } else toast.error("Something went wrong. Try later");
    };
    fetchData();
  }, [id]);
  console.log(listFeedback);
  if (isLoading)
    return (
      <React.Fragment>
        <Header />
        <div style={{ marginLeft: "200px" }}>
          <Loader />
        </div>
      </React.Fragment>
    );
  return (
    <React.Fragment>
      <Header />
      <section className="section-content padding-y bg">
        <div className="container">
          <CardProduct
            id = {course.id}
            img={course.image}
            name={course.name}
            summary={course.summary}
            description={course.description}
            rating={course.rating_average}
            numberOfRating={rating.length}
            numberOfEnrroled={rating.length}
            promotionPrice={course.promotion_price}
            price={course.price}
            lastUpdate={moment(course.last_update)
              .format("YYYY-MM-DD hh:mm:ss")
              .toString()}
          />
          <CardTeacher teacher={teacher} />
          <CardSameCourse mostBuySameCategory={mostBuySameCategory} />
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Command" key="1">
                <CardComment courseId={id.id} />
            </TabPane>
            <TabPane tab="Review" key="2">
              <CardReview
               courseId = {id.id}
               userId = {userId}
              />
            </TabPane>
          </Tabs>
        </div>
      </section>
      <Footer />
    </React.Fragment>
  );
};
export default Product;
