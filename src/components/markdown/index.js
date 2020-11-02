import React, { useEffect, useState } from "react";
import Vditor from "vditor";
import editormd from "editor.md/editormd";
import "editor.md/css/editormd.css";
import "./index.scss";

const Markdown = (props) => {
  const [value, setValue] = useState("### Hello Editor.md !");
  //   const triggerChange = (changedValue) => {
  //     const { onChange } = props;
  //     if (onChange) {
  //       onChange(changedValue);
  //     }
  //   };

  // useEffect(() => {
  //   const vditor = new Vditor("vditor", {
  //     height: 360,
  //     tab: "      ",
  //     mode: "sv",
  //     toolbarConfig: {
  //       pin: true,
  //     },
  //     cache: {
  //       enable: false,
  //     },
  //     input: (value, previewElement) => {
  //       //   triggerChange(value);
  //       props.setContent(value);
  //     },
  //     after: () => {
  //       vditor.setValue(props.value);
  //     },
  //   });
  // }, [props.value]);

  useEffect(() => {
    const editor = editormd("editormd", {
      width: "100%",
      // 静态资源文件地址
      // path: "editormd/lib/",
      height: 640,
      path: "../lib/",
      // markdown: md,
      codeFold: true,
      searchReplace: true,
      saveHTMLToTextarea: true, // 保存HTML到Textarea
      htmlDecode: "style,script,iframe|on*", // 开启HTML标签解析，为了安全性，默认不开启
      emoji: true,
      taskList: true,
      tex: true,
      tocm: true, // Using [TOCM]
      autoLoadModules: false,
      previewCodeHighlight: true,
      flowChart: true,
      sequenceDiagram: true,
    });
    console.log(editor);
  }, []);

  return (
    <div id="editormd">
      <textarea
        value={value}
        onChange={() => {}}
        style={{ display: "none" }}
      ></textarea>
    </div>
  );
};

export default Markdown;
