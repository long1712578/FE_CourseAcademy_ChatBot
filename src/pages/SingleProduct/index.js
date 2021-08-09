import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import CallAPI from "../../until/callAPI";
import CallUnAuthorize from "../../until/callUnAuthorize";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import Header from "../../component/header";
import Footer from "../../component/footer";
import Loader from "../../component/loader";
import CardProduct from "../../component/SingleProduct/CardProduct";
import moment from "moment";
import CardTeacher from "../../component/SingleProduct/CardTeacher";
import CardSameCourse from "../../component/SingleProduct/CardSameCourse";
import CardComment from "../../component/SingleProduct/CardComment";
import PreviewProduct from "../../component/SingleProduct/previewProduct";
const Product = () => {
  const [course, setCourse] = useState();
  const [rating, setRating] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isOrder, setIsOrder] = useState(false);
  const [mostBuySameCategory, setMostBuySameCategory] = useState();
  const [teacher, setTeacher] = useState();
  const [listFeedback, setListFeedback] = useState([]);
  const id = useParams();
  const { TabPane } = Tabs;
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      const res = await  CallUnAuthorize(
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
    const fetchOrder = async () => {
      try{
        if(user && user.authenticated){
          const res = await CallAPI("GET", null, `/orders/${id.id}`);
          console.log('res preview', res);
          if (res.status === 1 && res.data.id) {
            setIsOrder(true);
          } else setIsOrder(false);
        }
      }catch(e){
        setIsOrder(false);
      }
    };
    fetchData();
    fetchOrder();
  }, [id]);
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
            login = {user ? user.authenticated : false }
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
          {
            (isOrder)?
            <PreviewProduct />
            :
            <div/>
          }
          <CardTeacher teacher={teacher} />
          <CardSameCourse mostBuySameCategory={mostBuySameCategory} />
          <CardComment courseId={id.id}/>
        </div>
      </section>
      <Footer />
    </React.Fragment>
  );
};
export default Product;
