import React from "react";
import { FileTextOutlined } from "@ant-design/icons";
import { CloseOutlined } from "@ant-design/icons";

import "../styles/FileInfo.css";

const FileInfo = ({ file, onClear, formatFileSize }) => {
  const getClassName = () => {
    let className = "file-info";
    if (file.status === "done") className += " success";
    if (file.status === "error") className += " error";
    return className;
  };

  return (
    <div className={getClassName()}>
      <FileTextOutlined />
      <span>{file.name}</span>
      {file.size && <span>({formatFileSize(file.size)})</span>}
      <button
        onClick={onClear}
        className="file-clear-btn"
        aria-label="Clear file"
      >
        <CloseOutlined />
      </button>
    </div>
  );
};

export default FileInfo;
