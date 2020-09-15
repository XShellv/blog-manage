import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Result, Button } from "antd";

export default () => {
  const history = useHistory();
  const location = useLocation();
  let title = "",
    extra = [];
  switch (location.pathname) {
    case "/post/result":
      title = "发布成功！";
      extra = [
        <Button type="primary" key="console">
          查看文章
        </Button>,
        <Button key="buy" onClick={() => history.push("/edit")}>
          继续创作
        </Button>,
      ];
    case "/about/result":
      title = "修改成功！";
      extra = [
        <Button type="primary" key="console">
          查看自我介绍
        </Button>,
        <Button key="buy" onClick={() => history.push("/about")}>
          继续修改
        </Button>,
      ];
  }
  return <Result status="success" title={title} extra={extra} />;
};
