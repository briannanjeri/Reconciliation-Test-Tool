import React from "react";
import UploadCard from "./UploadCard";
import "../styles/UploadGrid.css";
import { BarChartOutlined, CreditCardOutlined } from "@ant-design/icons";

const UploadGrid = ({
  internalFile,
  providerFile,
  internalError,
  providerError,
  onFileUpload,
  onClearFile,
}) => {
  return (
    <div className="upload-grid">
      <UploadCard
        type="internal"
        title="Internal System Export"
        subtitle="Upload your platform transaction data"
        icon={<BarChartOutlined style={{ fontSize: 24, color: "#1890ff" }} />}
        file={internalFile}
        error={internalError}
        onFileUpload={onFileUpload}
        onClearFile={onClearFile}
      />

      <UploadCard
        type="provider"
        title="Provider Statement"
        subtitle="Upload payment processor statement"
        icon={<CreditCardOutlined style={{ fontSize: 24, color: "#52c41a" }} />}
        file={providerFile}
        error={providerError}
        onFileUpload={onFileUpload}
        onClearFile={onClearFile}
      />
    </div>
  );
};

export default UploadGrid;
