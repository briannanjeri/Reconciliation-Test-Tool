import React from 'react';
import {
  CheckCircleOutlined,
  LoadingOutlined,
  CloseCircleOutlined,
  FolderOpenOutlined,
} from '@ant-design/icons';

import '../styles/UploadArea.css';

const UploadArea = ({ 
  file, 
  error, 
  subtitle, 
  onDragOver, 
  onDragLeave, 
  onDrop, 
  onClick 
}) => {
const getUploadIcon = () => {
  if (file?.status === 'done')
    return <CheckCircleOutlined style={{ color: 'green', fontSize: 20 }} />;
  if (file?.status === 'uploading')
    return <LoadingOutlined style={{ color: 'blue', fontSize: 20 }} spin />;
  if (error)
    return <CloseCircleOutlined style={{ color: 'red', fontSize: 20 }} />;
  return <FolderOpenOutlined style={{ color: 'gray', fontSize: 20 }} />;
};


  const getUploadTitle = () => {
    if (file?.status === 'done') return 'File Uploaded Successfully';
    if (file?.status === 'uploading') return 'Uploading...';
    if (error) return 'Upload Failed';
    return 'Drop CSV file here';
  };

  const getUploadHint = () => {
    if (file?.status === 'done') return `${file.records} records loaded`;
    return 'Drag & drop or click to browse';
  };

  const getClassName = () => {
    let className = 'upload-area';
    if (file?.status === 'done') className += ' has-file';
    if (error) className += ' error';
    return className;
  };

  return (
    <div 
      className={getClassName()}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={onClick}
    >
      <div className="upload-icon">
        {getUploadIcon()}
      </div>
      <div className="upload-title">
        {getUploadTitle()}
      </div>
      <div className="upload-subtitle">{subtitle}</div>
      <div className="upload-hint">
        {getUploadHint()}
      </div>
    </div>
  );
};

export default UploadArea;