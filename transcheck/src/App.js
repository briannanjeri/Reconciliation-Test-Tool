import React, {useState} from 'react';
import { ConfigProvider } from 'antd';
import CSVReconciliationApp from './components/CSVReconciliationApp';
import FileViewerInterface from './components/FileViewerInterface';
import ReconciliationResults from './components/ReconciliationResults';
import { useSelector } from 'react-redux';
import { selectInternalData, selectProviderData } from './reducers/reconciliationSlice';

import './styles/App.css';

function App() {
  const [drawerVisibleRight, setDrawerVisibleRight] = useState(false); 
  const [drawerVisibleLeft, setDrawerVisibleLeft] = useState(false);  

  const internalData = useSelector(selectInternalData);
  const providerData = useSelector(selectProviderData);
  return (
    <ConfigProvider>
      <div className="App">
        <CSVReconciliationApp
          setDrawerVisible={setDrawerVisibleRight}
          setShowResultsDrawer={setDrawerVisibleLeft}
        />

        {drawerVisibleRight && (
          <FileViewerInterface
            internalData={internalData}
            providerData={providerData}
            setDrawerVisible={setDrawerVisibleRight}
            onStartReconciliation={() => setDrawerVisibleLeft(true)}
          />
        )}

        {drawerVisibleLeft && (
          <ReconciliationResults
            internalData={internalData}
            providerData={providerData}
            onClose={() => setDrawerVisibleLeft(false)}
          />
        )}
      </div>
    </ConfigProvider>
  );
}

export default App;