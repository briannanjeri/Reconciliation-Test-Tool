import React, { useState } from "react";
import {
  Drawer,
  Button,
  Table,
  Badge,
  Typography,
  Space,
  Row,
  Col,
  Menu,
  Divider,
} from "antd";
import {
  CheckCircleOutlined,
  CloseOutlined,
  DatabaseOutlined,
  CreditCardOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

import "../styles/fileViewer.css";
import { FileStatistics } from "./FileStatistics";

const { Title, Text } = Typography;

const FileViewerInterface = ({
  internalData = [],
  providerData = [],
  onStartReconciliation,
  setDrawerVisible,
}) => {
  const [drawerVisible, setInternalDrawerVisible] = useState(true);
  const [selectedFile, setSelectedFile] = useState("internal");

  const currentData = selectedFile === "internal" ? internalData : providerData;

  const getFileInfo = () => {
    return selectedFile === "internal"
      ? {
          name: "Internal System Export",
          description: "Transaction data from your platform",
          icon: <DatabaseOutlined />,
          count: internalData.length,
          type: "internal",
        }
      : {
          name: "Provider Statement",
          description: "Transaction data from payment processor",
          icon: <CreditCardOutlined />,
          count: providerData.length,
          type: "provider",
        };
  };

  const handleCloseDrawer = () => {
    setInternalDrawerVisible(false);
    setDrawerVisible(false);
  };

  const handleReconciliation = () => {
    onStartReconciliation?.();
  };

  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "transaction_id",
      key: "transaction_id",
      width: 150,
    },
    {
      title: "Items Sold",
      dataIndex: "items_sold",
      key: "items_sold",
      width: 120,
      render: (value) => (
        <Badge count={value} showZero style={{ backgroundColor: "#4f46e5" }} />
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: 120,
      render: (amount) => `$${amount.toFixed(2)}`,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 120,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status) => (
        <Badge
          status="success"
          text={status.charAt(0).toUpperCase() + status.slice(1)}
        />
      ),
    },
  ];

  const fileInfo = getFileInfo();

  return (
    <div className="file-viewer-container">
      <Drawer
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <FileTextOutlined style={{ fontSize: "20px", color: "#4f46e5" }} />
            <span>Transaction Files Viewer</span>
          </div>
        }
        placement="right"
        width={800}
        open={drawerVisible}
        onClose={handleCloseDrawer}
        extra={
          <Button
            className="close-drawer-btn"
            icon={<CloseOutlined />}
            onClick={handleCloseDrawer}
          />
        }
      >
        <Row gutter={24}>
          <Col span={8}>
            <div className="sidebar-header">
              <Title level={4} style={{ color: "white", margin: 0 }}>
                Files
              </Title>
              <Text style={{ color: "rgba(255,255,255,0.8)" }}>
                Select a file to view
              </Text>
            </div>

            <Menu
              className="sidebar-menu"
              selectedKeys={[selectedFile]}
              onClick={({ key }) => setSelectedFile(key)}
            >
              <Menu.Item
                key="internal"
                icon={<DatabaseOutlined style={{ fontSize: "18px" }} />}
              >
                <div>
                  <div style={{ fontWeight: "600" }}>Internal System</div>
                  <div style={{ fontSize: "12px", opacity: 0.7 }}>
                    {internalData.length} transactions
                  </div>
                </div>
              </Menu.Item>

              <Menu.Item
                key="provider"
                icon={<CreditCardOutlined style={{ fontSize: "18px" }} />}
              >
                <div>
                  <div style={{ fontWeight: "600" }}>Provider Statement</div>
                  <div style={{ fontSize: "12px", opacity: 0.7 }}>
                    {providerData.length} transactions
                  </div>
                </div>
              </Menu.Item>
            </Menu>

            <Divider />

            <Button
              className="reconcile-btn"
              icon={<CheckCircleOutlined />}
              onClick={handleReconciliation}
            >
              Start Reconciliation
            </Button>
          </Col>

          <Col span={16}>
            <div className="file-info-card">
              <Space align="center" style={{ marginBottom: "16px" }}>
                <span style={{ fontSize: "24px", color: "#4f46e5" }}>
                  {fileInfo.icon}
                </span>
                <div>
                  <Title level={4} style={{ margin: 0 }}>
                    {fileInfo.name}
                  </Title>
                  <Text type="secondary">{fileInfo.description}</Text>
                </div>
              </Space>

              <Text strong>Total Records: {fileInfo.count}</Text>
            </div>

            <FileStatistics data={currentData} type={fileInfo.type} />

            <div className="file-table-container">
              <Table
                columns={columns}
                dataSource={currentData}
                rowKey="transaction_id"
                pagination={{
                  pageSize: 6,
                  showSizeChanger: false,
                  showQuickJumper: true,
                  showTotal: (total, range) =>
                    `${range[0]}-${range[1]} of ${total} records`,
                }}
                scroll={{ y: 300 }}
                size="small"
              />
            </div>
          </Col>
        </Row>
      </Drawer>
    </div>
  );
};

export default FileViewerInterface;
