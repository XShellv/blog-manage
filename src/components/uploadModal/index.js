import React, { useEffect, useState } from "react";
import {
  Upload,
  message,
  Image,
  Button,
  Card,
  Space,
  notification,
  Modal,
} from "antd";
import {
  CopyOutlined,
  EditOutlined,
  InboxOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { service } from "../../service";
import copy from "copy-to-clipboard";
const { Dragger } = Upload;
const limit = 10;
const prefix = "https://cdn.xshellv.com/";

export default function UploadModal({ visible, setVisible }) {
  const [pics, setPics] = useState([]);
  const [marker, setMarker] = useState("");
  const [loading, setLoading] = useState(false);
  const [markerList, setMarkerList] = useState([""]);

  useEffect(() => {
    fetchPics();
  }, []);

  async function fetchPics(prevMarker) {
    debugger;
    setLoading(true);
    const ret = await service.fethcPics({
      limit,
      marker: typeof prevMarker === "string" ? prevMarker : marker,
    });
    if (ret.success) {
      setLoading(false);
      setPics(ret.data.data.items);
      setMarker(ret.data.data.marker || "");
      if (typeof prevMarker === "string") {
        setMarkerList((data) => {
          const findIndex = data.indexOf(prevMarker);
          if (findIndex > -1) {
            return data.filter((item, index) => index < findIndex + 2);
          }
        });
      } else {
        setMarkerList((data) => [...data, ret.data.data.marker]);
      }
    }
  }

  async function delPic(key) {
    const ret = await service.delPic({ key });
    debugger;
    if (ret) {
      fetchPics();
      notification.success({
        message: "消息通知",
        description: "操作成功！",
      });
    } else {
      notification.error({
        message: "消息通知",
        description: "操作失败！",
      });
    }
  }

  function confirmDel(key) {
    Modal.confirm({
      title: "确认删除通知",
      icon: <ExclamationCircleOutlined />,
      content: `确认删除${key}么`,
      onOk: () => delPic(key),
      okText: "确认",
      cancelText: "取消",
    });
  }

  const fetchUploadToken = async () => {
    const ret = await service.fetchUploadToken();
    if (ret.success) {
      return ret.uploadToken;
    }
  };

  const getExtraData = (file) => {
    return {
      token: file.token,
      key: file.name,
    };
  };

  const uploadProps = {
    name: "file",
    multiple: true,
    showUploadList: false,
    action: "https://up-z0.qiniu.com/",
    data: getExtraData,
    beforeUpload: async (file) => {
      file.token = await fetchUploadToken();
      return file;
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        notification.success({
          message: "消息通知",
          description: `${info.file.name} 上传成功。`,
        });
        fetchPics();
      } else if (status === "error") {
        notification.error({
          message: "消息通知",
          description: `${info.file.name} 上传失败。`,
        });
      }
    },
  };

  return (
    <Modal
      title="图片上传"
      visible={visible}
      width={1000}
      onCancel={setVisible}
      maskClosable={false}
    >
      <Card bordered={false} size="small">
        <Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">点击或拖拽图片上传</p>
        </Dragger>
      </Card>
      <Card
        bordered={false}
        size="small"
        loading={loading}
        extra={
          <Space>
            {markerList.length - 3 > -1 && (
              <Button
                loading={loading}
                type="primary"
                ghost={true}
                size="small"
                onClick={() => {
                  const prevMarker = markerList[markerList.length - 3];
                  debugger;
                  fetchPics(prevMarker);
                }}
              >
                上一页
              </Button>
            )}
            {marker && (
              <Button
                loading={loading}
                type="primary"
                size="small"
                onClick={() => fetchPics()}
              >
                下一页
              </Button>
            )}
          </Space>
        }
      >
        <div style={{ display: "flex", flexFlow: "wrap" }}>
          {pics.map((item) => {
            return (
              <div className="img-container" key={item.key}>
                <Image
                  key={item.key}
                  width={200}
                  src={`${prefix}${item.key}`}
                />
                <Space className="ops">
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <EditOutlined />
                  </a>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <CopyOutlined
                      onClick={() => {
                        copy(`${prefix}${item.key}`);
                        message.success("已复制");
                      }}
                    />
                  </a>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      confirmDel(item.key);
                    }}
                  >
                    <DeleteOutlined />
                  </a>
                </Space>
              </div>
            );
          })}
        </div>
      </Card>
    </Modal>
  );
}
