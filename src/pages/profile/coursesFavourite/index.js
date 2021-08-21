import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Table, Space, Button } from "antd";
import CallAPI from "../../../until/callAPI";
import { useHistory } from 'react-router-dom';

const CourseFavourite = ({ id }) => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setloading] = useState(true);
  const router = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      await CallAPI("GET", null, `/users/${id}/watch-list`).then((res) => {
        setloading(false);
        setFavourites((res.data)?
        res.data.map((row) => ({
          key: row.id,
          name: row.name,
          image: row.image,
          price: row.price,
          status: (row.course_status_id === 1) ?"Incomplete" : "Complete"
        }))
        :[]
          );
      });
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
         <img  style={{height: 80, width: 120}}src={record.image} alt=""/>
       );},
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  return (
    <Table  onRow={(r) => ({
      onClick: () => {
        router.push(`/courses/${r.key}`)
      }
    })} columns={columns} dataSource={favourites} />
  );
};
export default CourseFavourite;
