import React from "react";
import { Table, Input, Buttom, Icon } from "antd";

import "./style.css";
const BuildsList = () => {
  const columns = [
    {
      title: "Build Name",
      dataIndex: "name",
      width: "30%",
      sorter: (a, b) => a.name.length - b.name.length,
      render: (text, record) => (
        <a href={`/builds/build/${record.id}`}>{text}</a>
      ),
      sortDirections: ["descend", "ascend"]
    },
    {
      title: "Type",
      dataIndex: "type",
      width: "10%",
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"]
    },
    {
      title: "Spells",
      dataIndex: "spells",
      width: "40%"
    },
    {
      title: "Likes",
      dataIndex: "likes",
      width: "10%",
      sorter: (a, b) => a.likes - b.likes,
      sortDirections: ["descend", "ascend"]
    },
    {
      title: "Views",
      dataIndex: "views",
      width: "10%",
      sorter: (a, b) => a.views - b.views,
      sortDirections: ["descend", "ascend"]
    }
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      likes: "32",
      views: 527,
      rowClassName: "tableHeader",
      id: 1250185
    },
    {
      key: "2",
      name: "Jim Green",
      likes: "42",
      views: 245,
      rowClassName: "tableHeader"
    },
    {
      key: "3",
      name: "Joe Black",
      likes: "32",
      views: 201,
      rowClassName: "tableHeader"
    },
    {
      key: "4",
      name: "Jim Red",
      likes: "32",
      views: 163,
      rowClassName: "tableHeader"
    }
  ];

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }
  return (
    <div>
      <Table
        className="backupsTable"
        columns={columns}
        dataSource={data}
        onChange={onChange}
        pagination={false}
        theme={"light"}
      />
    </div>
  );
};

export default BuildsList;
