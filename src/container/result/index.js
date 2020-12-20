import React from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Result, Button } from "antd";

export default () => {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  let title = "",
    extra = [];
  switch (location.pathname) {
    case "/post/result":
      title = "发布成功！";
      extra = [
        <Button
          type="primary"
          key="console"
          onClick={() =>
            window.open(
              `//www.xshellv.com/article/${location.state.id || ""}`,
              "_blank"
            )
          }
        >
          查看原文
        </Button>,
        <Button key="buy" onClick={() => history.push("/list")}>
          返回列表
        </Button>,
      ];
      break;
    case "/about/result":
      title = "修改成功！";
      extra = [
        <Button
          type="primary"
          key="console"
          onClick={() =>
            window.open(
              `//www.xshellv.com/about`,
              "_blank"
            )
          }
        >
          查看自我介绍
        </Button>,
        <Button key="buy" onClick={() => history.push("/about")}>
          继续修改
        </Button>,
      ];
  }
  return <Result status="success" title={title} extra={extra} />;
};
