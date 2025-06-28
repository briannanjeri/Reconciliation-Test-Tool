import React from 'react';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { selectInternalData, selectProviderData } from '../reducers/reconciliationSlice';

import { EyeOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { setInternalData, setProviderData } from '../reducers/reconciliationSlice';

const ActionSection = ({
  actualInternalData,
  actualProviderData,
  onClearAll,
  showClearAll,
  setDrawerVisible,
}) => {
  const dispatch = useDispatch();
 const internalData = useSelector(selectInternalData);
  const providerData = useSelector(selectProviderData);
  console.log('internalData',internalData)
    console.log('providerData',providerData)
  const handleViewFiles = () => {
    dispatch(setInternalData(actualInternalData));
    dispatch(setProviderData(actualProviderData));
    setDrawerVisible(true);
  };

  return (
    <div className="action-section" style={{ textAlign: 'center' }}>
      <Button
        className="view-files-btn"
        icon={<EyeOutlined />}
        onClick={handleViewFiles}
        disabled={actualInternalData.length === 0 || actualProviderData.length === 0}
      >
        View Uploaded Files
      </Button>

      {showClearAll && (
        <Button
          type="secondary"
          onClick={onClearAll}
          style={{ marginLeft: '16px' }}
        >
          Clear All
        </Button>
      )}
    </div>
  );
};

export default ActionSection;
