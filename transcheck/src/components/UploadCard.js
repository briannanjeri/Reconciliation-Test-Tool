import React, { useRef } from 'react';
import { message } from 'antd';
import { FileTextOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import UploadArea from './UploadArea';
import FileInfo from './FileInfo';
import StatusMessage from './StatusMessage';
import { formatFileSize } from '../utils/fileUtils';
import '../styles/UploadCard.css';

const UploadCard = ({ 
  type, 
  title, 
  subtitle, 
  icon, 
  file, 
  error, 
  onFileUpload, 
  onClearFile 
}) => {
  const inputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('dragover');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const uploadFile = files[0];
      if (uploadFile.type === 'text/csv' || uploadFile.name.endsWith('.csv')) {
        onFileUpload(uploadFile, type);
      } else {
        message.error('Please upload a CSV file');
      }
    }
  };

  const handleFileSelect = (e) => {
    const uploadFile = e.target.files?.[0];
    if (uploadFile) {
      onFileUpload(uploadFile, type);
    }
  };

  const handleAreaClick = () => {
    inputRef.current?.click();
  };

  const handleClearFile = (e) => {
    e.stopPropagation();
    onClearFile(type);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="upload-card">
      <div className="upload-card-title">
        <span className="upload-card-icon">{icon}</span>
        {title}
      </div>

      <UploadArea
        file={file}
        error={error}
        subtitle={subtitle}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleAreaClick}
      />

      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        className="hidden-input"
        onChange={handleFileSelect}
      />

      {file && (
        <FileInfo
          file={file}
          onClear={handleClearFile}
          formatFileSize={formatFileSize}
        />
      )}

      {error && (
        <StatusMessage
          type="error"
          icon={<ExclamationCircleOutlined style={{ marginRight: '8px' }} />}
          message={error}
        />
      )}
    </div>
  );
};

export default UploadCard;