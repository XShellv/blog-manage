import React from "react";
import { useHistory } from "react-router-dom";
import { Result, Button } from "antd";

export default () => {
  const history = useHistory();
  return (
    <Result
      status="success"
      title="发布成功！"
      extra={[
        <Button type="primary" key="console">
          查看文章
        </Button>,
        <Button key="buy" onClick={() => history.push("/edit")}>
          继续创作
        </Button>,
      ]}
    />
  );
};
