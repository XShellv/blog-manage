import React, { useEffect } from "react";
import Vditor from "vditor";
import "./index.scss";

const Markdown = (props) => {
  const triggerChange = (changedValue) => {
    const { onChange } = props;
    if (onChange) {
      onChange(changedValue);
    }
  };

  useEffect(() => {
    const vditor = new Vditor("vditor", {
      height: 360,
      tab: "      ",
      mode: "sv",
      toolbarConfig: {
        pin: true,
      },
      cache: {
        enable: false,
      },
      input: (value, previewElement) => {
        //   triggerChange(value);
        props.setContent(value);
      },
      after: () => {
        debugger;
        vditor.setValue(props.value);
      },
    });
    return () => vditor && vditor.destroy();
  }, [props.value]);

  return <div id="vditor"></div>;
};

export default Markdown;
