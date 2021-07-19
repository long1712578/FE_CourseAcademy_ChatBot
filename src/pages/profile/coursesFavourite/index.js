import React, { useState } from "react";
import 'antd/dist/antd.css';
import { Table } from 'antd';


const CourseFavourite  = ()  => {
    const data = [];
    for (let i = 0; i < 46; i++) {
      data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
      });
    }
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
        },
        {
          title: 'Age',
          dataIndex: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
        },
      ];
  return (
    <Table columns={columns} dataSource={data} />
  );
};
export default CourseFavourite;
