import React, { useState } from "react";
import { message } from "antd";

import { CheckCircleOutlined } from "@ant-design/icons";
import Header from "./Header";
import UploadGrid from "./UploadGrid";
import ActionSection from "./ActionSection";
import StatusMessage from "./StatusMessage";
import { parseCSVFile, validateCSVStructure } from "../utils/csvUtils";
import "../styles/CSVReconciliationApp.css";

const CSVReconciliationApp = ({ setDrawerVisible }) => {
  const [internalFile, setInternalFile] = useState(null);
  const [providerFile, setProviderFile] = useState(null);
  const [internalData, setInternalData] = useState([]);
  const [providerData, setProviderData] = useState([]);
  const [internalError, setInternalError] = useState("");
  const [providerError, setProviderError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = async (file, type) => {
    const setFile = type === "internal" ? setInternalFile : setProviderFile;
    const setData = type === "internal" ? setInternalData : setProviderData;
    const setError = type === "internal" ? setInternalError : setProviderError;

    try {
      setError("");
      setFile({ name: file.name, size: file.size, status: "uploading" });

      const data = await parseCSVFile(file);
      validateCSVStructure(data, file.name);

      setData(data);
      setFile({
        name: file.name,
        size: file.size,
        status: "done",
        records: data.length,
      });

      message.success(
        `${
          type === "internal" ? "Internal" : "Provider"
        } file uploaded successfully! (${data.length} records)`
      );
    } catch (error) {
      console.error("Upload error:", error);
      setError(error.message || "Failed to parse CSV file");
      setFile({ name: file.name, size: file.size, status: "error" });
      message.error(`Error uploading ${type} file: ${error.message}`);
    }

    return false;
  };

  const clearFile = (type) => {
    if (type === "internal") {
      setInternalFile(null);
      setInternalData([]);
      setInternalError("");
    } else {
      setProviderFile(null);
      setProviderData([]);
      setProviderError("");
    }
  };

  const clearAllFiles = () => {
    clearFile("internal");
    clearFile("provider");
    message.info("All files cleared");
  };

  return (
    <div className="container">
      <div className="main-card">
        <Header />

        <div className="content">
          <UploadGrid
            internalFile={internalFile}
            providerFile={providerFile}
            internalError={internalError}
            providerError={providerError}
            onFileUpload={handleFileUpload}
            onClearFile={clearFile}
          />

          <ActionSection
            actualInternalData={internalData}
            actualProviderData={providerData}
            setDrawerVisible={setDrawerVisible}
            onClearAll={clearAllFiles}
            showClearAll={internalData.length > 0 || providerData.length > 0}
          />

          {internalData.length > 0 && providerData.length > 0 && (
            <StatusMessage
              type="success"
              icon={<CheckCircleOutlined style={{ marginRight: "8px" }} />}
              message={`Ready to reconcile ${internalData.length} internal transactions with ${providerData.length} provider transactions`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CSVReconciliationApp;
