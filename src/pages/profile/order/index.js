import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Table } from "antd";
import CallAPI from "../../../until/callAPI";
import { useHistory } from 'react-router-dom';

const Order = ({ id }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setloading] = useState(true);
  const router = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      await CallAPI("GET", null, `/orders?user_id=${id}`).then(
        res  => {
          // setloading(false);
          setOrders((res.data)?
            res.data.courseOrders.map((row) => ({
              key: row.course.id,
              name: row.course.name,
              image: row.course.image,
              price:  row.course.price,
              dateBuy: row.course_order.enroll_at,
              status: (row.course.course_status_id === 1) ?"Incomplete" : "Complete"
            }))
            : []
          )
        }
      );
    };
    fetchData();
  }, [id]);

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
         <img src={record.image} alt=""/>
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
    {
      title: "Status",
      dataIndex: "status",
    },
  ];
  return <Table  onRow={(r) => ({
    onClick: () => {
      router.push(`/courses/${r.key}`)
    }
  })} columns={columns} dataSource={orders} />;
};
export default Order;
