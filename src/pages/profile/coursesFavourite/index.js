import React, { useState, useEffect  } from "react";
import 'antd/dist/antd.css';
import { Table, Space, Button } from 'antd';
import CallAPI from "../../../until/callAPI";
import {
  Link
} from 'react-router-dom';


const CourseFavourite  = ({id})  => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      await CallAPI("GET", null, `/users/${id}/watch-list`).then(
        (res)  => {
          setloading(false);
          setFavourites(
            res.data.map((row) => ({
              key: row.id,
              name: row.name,
              image: row.image,
              price:  row.price,
              rating_average: row.rating_average,
            }))
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
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Rating",
      dataIndex: "rating_average",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/courses/${record.key}`} className="btn btn-primary">Detail</Link>
          <Button type="primary" danger>Delete</Button>
        </Space>
      ),
    },
  ];
  return (
    <Table columns={columns} dataSource={favourites} />
  );
};
export default CourseFavourite;
