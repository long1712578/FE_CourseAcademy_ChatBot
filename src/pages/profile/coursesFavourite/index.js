import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Table, Space, Button } from "antd";
import CallAPI from "../../../until/callAPI";
import { Link } from "react-router-dom";
import ProductCart from '../../../component/Product/index';

const CourseFavourite = ({ id }) => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      await CallAPI("GET", null, `/users/${id}/watch-list`).then((res) => {
        setloading(false);
        setFavourites(res.data);
        console.log(favourites);
      });
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="row">
        {favourites.length > 0 ? (
          favourites.map((data, index) => {
            return (
              <div className="col-md-4" key={index}>
                <ProductCart
                  idCourse={data.id}
                  nameCourse={data.name}
                  nameTeacher={""}
                  price={data.price}
                  promotionPrice={data.promotion_price}
                  rating={data.rating_average}
                ></ProductCart>
              </div>
            );
          })
        ) : (
          <>
            <div
              style={{
                textAlign: "center",
                backgroundColor: "#364d79",
                width: "100%",
                height: "260px",
                lineHeight: "260px",
                marginBottom: "20px",
              }}
              className="flex-row justify-content-center"
            >
              <p style={{ fontSize: 30, fontWeight: 350 }}>
                There are no recently courses!
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default CourseFavourite;
