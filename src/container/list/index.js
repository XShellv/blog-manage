import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Form,
  Tabs,
  Popover,
  Tag,
  Tooltip,
  List,
  Table,
  Button,
  Popconfirm,
  message,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  HighlightOutlined,
  HighlightFilled,
} from "@ant-design/icons";
import { service } from "../../service";
import { useQuery } from "../../hooks/useQuery";
const { TabPane } = Tabs;

export default () => {
  const history = useHistory();
  const { query, getQuery, jumpTo } = useQuery();
  const [list, setList] = useState([]);
  const [key, setKey] = useState("post");
  const [loading, setLoading] = useState(false);
  const pageNo = getQuery("pageNo") * 1 || 1;
  const pageSize = getQuery("pageSize") || 10;
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchList();
  }, [pageNo, pageSize, key]);

  const fetchList = async () => {
    setLoading(true);
    let ret;
    if (key === "post") {
      ret = await service.fetchPosts({ pageSize, pageNo });
    } else {
      ret = await service.fetchDrafts({ pageSize, pageNo });
    }
    if (ret.success) {
      setLoading(false);
      setList(ret.data.rows);
      setCount(ret.data.count);
    }
  };

  const deletePost = async (id) => {
    const ret = await service.deletePost({ id });
    if (ret) {
      message.success("删除成功！");
      fetchList();
    }
  };
  const maskPost = async (values) => {
    const ret = await service.publishPost(values);
    if (ret) {
      message.success("设置成功!");
      fetchList();
    }
  };

  const columns = [
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
      render: (title, row) => {
        return <a href="##" onClick={(e) => {
          e.preventDefault()
          window.open(`//${window.location.host}/article/${row.id}`, "_blank")
        }}>{title}</a>;
      },
    },
    {
      title: "类别",
      dataIndex: "category",
      key: "category",
      render: (text) => {
        if (text === "develop") {
          return "开发类";
        } else if (text === "product") {
          return "产品类";
        } else if (text === "notes") {
          return "笔记";
        }
      },
    },
    {
      title: "标签组",
      dataIndex: "tags",
      key: "tags",
      render: (tags) => (
        <>
          {tags.map((tag, i) => {
            let color = tag.name.length > 5 ? "geekblue" : "green";
            return (
              <Tag color={color} key={tag.name}>
                {tag.name}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "图片链接",
      dataIndex: "post",
      key: "post",
      render: (post) => (
        <Popover content={<img src={post} alt="图片背景" style={{ width: 200 }} />} title={null} trigger="hover" placement="right" >
          <a href={post}> {post}</a>
        </Popover>
      )
    },
    // {
    //   title: "点赞数",
    //   dataIndex: "like",
    //   key: "like",
    // },
    // {
    //   title: "阅读数",
    //   dataIndex: "read",
    //   key: "read",
    // },
    {
      title: "操作",
      key: "op",
      render: (text, row) => (
        <Button.Group>
          <Tooltip title="编辑">
            <Button
              size="small"
              icon={<EditOutlined />}
              onClick={() => {
                history.push(`/edit/${row.status}/${row.id}`);
              }}
            />
          </Tooltip>
          <Tooltip title={row.status !== "draft" ? "标记草稿" : "标记正常"}>
            <Button
              size="small"
              icon={
                row.status === "draft" ? (
                  <HighlightFilled style={{ color: "red" }} />
                ) : (
                    <HighlightOutlined />
                  )
              }
              onClick={() =>
                maskPost({
                  ...row,
                  tags: row.tags.map((tag) => tag.name),
                  status: row.status === "draft" ? "post" : "draft",
                })
              }
            />
          </Tooltip>
          <Tooltip title="删除">
            <Popconfirm
              title="确认删除该篇文章么？"
              placement="right"
              onConfirm={() => deletePost(row.id)}
            >
              <Button size="small" icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Button.Group>
      ),
    },
  ];

  const TableCom = (
    <Table
      columns={columns}
      dataSource={list.map((item) => {
        item.key = item.title;
        return item;
      })}
      expandable={{
        expandedRowRender: (record) => (
          <p style={{ margin: 0, paddingLeft: 50 }}>{record.abstract}</p>
        ),
      }}
      loading={loading}
      pagination={{
        total: count,
        showTotal: (total) => `共 ${total} 篇`,
        pageSize: pageSize,
        current: pageNo,
        // hideOnSinglePage: true,
        size: "small",
        onChange: (pageNo, pageSize) => {
          query.set("pageNo", pageNo + "");
          query.set("pageSize", pageSize + "");
          jumpTo(query);
        },
        onShowSizeChange: (pageNo, pageSize) => {
          query.set("pageNo", pageNo + "");
          query.set("pageSize", pageSize + "");
          jumpTo(query);
        },
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50"],
      }}
      size="small"
    />
  )

  return (
    <Tabs activeKey={key} onChange={(key) => setKey(key)} type="card">
      <TabPane tab="文章" key="post">
        {TableCom}
      </TabPane>
      <TabPane tab="草稿" key="draft">
        {TableCom}
      </TabPane>
    </Tabs>
  );
};
