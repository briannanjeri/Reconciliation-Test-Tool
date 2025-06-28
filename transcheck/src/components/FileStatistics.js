import { Statistic } from "antd";
import { DollarOutlined, NumberOutlined } from "@ant-design/icons";

export const FileStatistics = ({ data, type }) => {
  const totalItems = data.reduce(
    (sum, item) => sum + (item.items_sold || 0),
    0
  );
  const totalAmount = data.reduce((sum, item) => sum + (item.amount || 0), 0);

  return (
    <div className="file-stats">
      <div className="stat-card">
        <div className={`stat-icon ${type}`}>
          <NumberOutlined />
        </div>
        <Statistic
          title="Total Items"
          value={totalItems}
          valueStyle={{ fontSize: "18px", fontWeight: "600" }}
        />
      </div>
      <div className="stat-card">
        <div className={`stat-icon ${type}`}>
          <DollarOutlined />
        </div>
        <Statistic
          title="Total Amount"
          value={`$${totalAmount.toFixed(2)}`}
          valueStyle={{ fontSize: "18px", fontWeight: "600" }}
        />
      </div>
    </div>
  );
};
