import React, { useEffect, useState } from "react";
import { Form, Input, Radio, Tag, Tooltip, List, Table, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { service } from "../../service";
import { useQuery } from "../../hooks/useQuery";

debugger;
export default () => {
  const { query, getQuery, jumpTo } = useQuery();
  const [list, setList] = useState([]);
  const pageNo = getQuery("pageNo") * 1 || 1;
  const pageSize = getQuery("pageSize") || 10;

  useEffect(() => {
    fetchList();
  });

  const fetchList = async () => {
    debugger
    const ret = await service.fetchList({ pageSize, pageNo });
    debugger;
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (tags) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{
        total: list.count,
        showTotal: (total) => `共 ${total} 篇`,
        pageSize: pageSize,
        current: pageNo,
        hideOnSinglePage: true,
        size: "small",
        // onChange: (pageNo, pageSize) => {
        //   query.set("pageNo", pageNo + "");
        //   query.set("pageSize", pageSize + "");
        //   jumpTo(query);
        // },
        // onShowSizeChange: (pageNo, pageSize) => {
        //   query.set("pageNo", pageNo + "");
        //   query.set("pageSize", pageSize + "");
        //   jumpTo(query);
        // },
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50"],
      }}
      size="small"
    />
  );
};
