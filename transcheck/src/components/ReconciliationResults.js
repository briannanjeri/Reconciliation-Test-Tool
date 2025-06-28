import React, { useState, useMemo } from "react";
import {
  Table,
  Pagination,
  Button,
  Typography,
  Divider,
  Space,
  Drawer,
} from "antd";
import {
  ArrowLeftOutlined,
  DownloadOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  QuestionCircleOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";

import { StatisticCard } from "../components/StatisticCard";
import {
  processReconciliationData,
  calculateStatistics,
  exportToCSV,
} from "../utils/reconciliationUtils";
import { getTableColumns } from "../config/tableColumns";

const { Title, Text } = Typography;

const ReconciliationResults = ({
  internalData = [],
  providerData = [],
  onClose,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);

  const reconciliationResults = useMemo(
    () => processReconciliationData(internalData, providerData),
    [internalData, providerData]
  );

  const statistics = useMemo(
    () => calculateStatistics(reconciliationResults),
    [reconciliationResults]
  );

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return reconciliationResults.slice(startIndex, startIndex + pageSize);
  }, [reconciliationResults, currentPage, pageSize]);

  const columns = getTableColumns();

  const handleExport = () => {
    exportToCSV(reconciliationResults);
  };

  return (
    <Drawer
      title={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Reconciliation Results</span>
          <Button size="small" icon={<ArrowLeftOutlined />} onClick={onClose}>
            Back
          </Button>
        </div>
      }
      placement="left"
      width={600}
      closable={false}
      onClose={onClose}
      open={true}
      bodyStyle={{ padding: "24px" }}
    >
      <div>
        <Text strong>
          Comparing {internalData.length} internal vs {providerData.length}{" "}
          provider transactions
        </Text>
      </div>

      <Divider />

      <div
        className="stats-grid"
        style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}
      >
        <StatisticCard
          title="Perfect Matches"
          value={statistics.matched}
          icon={
            <CheckCircleOutlined style={{ color: "green", fontSize: 24 }} />
          }
          type="matched"
        />
        <StatisticCard
          title="Discrepancies"
          value={statistics.discrepancies}
          icon={
            <ExclamationCircleOutlined
              style={{ color: "orange", fontSize: 24 }}
            />
          }
          type="discrepancy"
        />
        <StatisticCard
          title="Missing Transactions"
          value={statistics.missing}
          icon={
            <QuestionCircleOutlined style={{ color: "red", fontSize: 24 }} />
          }
          type="missing"
        />
        <StatisticCard
          title="Total Amount"
          value={`$${statistics.totalAmount.toFixed(2)}`}
          icon={
            <DollarCircleOutlined style={{ color: "gold", fontSize: 24 }} />
          }
          type="total"
        />
      </div>

      <Divider />

      <Table
        columns={columns}
        dataSource={currentData}
        pagination={false}
        rowKey="transaction_id"
        scroll={{ x: 1200 }}
        size="small"
      />

      <div style={{ textAlign: "center", marginTop: "16px" }}>
        <Pagination
          current={currentPage}
          total={reconciliationResults.length}
          pageSize={pageSize}
          onChange={setCurrentPage}
          showSizeChanger={false}
          showQuickJumper
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} transactions`
          }
        />
      </div>

      <Divider />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          onClick={handleExport}
          style={{ flex: 1 }}
        >
          Export
        </Button>
        <Button
          icon={<ReloadOutlined />}
          onClick={() => setCurrentPage(1)}
          style={{ flex: 1 }}
        >
          Refresh
        </Button>
      </div>
    </Drawer>
  );
};

export default ReconciliationResults;
