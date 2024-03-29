import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Table } from "antd";
import CallAPI from "../../../until/callAPI";

const Order = ({ id }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const res = await CallAPI("GET", null, `/orders?user_id=${id}`).then(
        res  => {
          setloading(false);
          setOrders((res.data)?
            res.data.courseOrders.map((row) => ({
              key: row.id,
              name: row.course.name,
              image: row.course.image,
              price:  row.course.price,
              dateBuy: row.course_order.enroll_at,
            }))
            : []
          )
        }
      );
    };
    fetchData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (text, record) => {
        return (
         <img src={record.image}/>
       );},
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Date buy",
      dataIndex: "dateBuy",
    },
  ];
  return <Table columns={columns} dataSource={orders} />;
};
export default Order;
