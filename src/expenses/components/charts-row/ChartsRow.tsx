import type { PieDataItem } from "../../../models/pie-data-item";
import ExpensePieChart from "../expense-pie-chart/ExpensePieChart";
import "./ChartsRow.css";

interface ChartsRowProps {
  expensePieData: PieDataItem[];
  incomePieData: PieDataItem[];
}

function ChartsRow({ expensePieData, incomePieData }: ChartsRowProps) {
  return (
    <div className="charts-row">
      <div className="card chart-card">
        <div className="card-header">
          <span className="card-title">Spending Breakdown</span>
        </div>
        <div className="card-body">
          <ExpensePieChart pieData={expensePieData} />
        </div>
      </div>
      <div className="card chart-card">
        <div className="card-header">
          <span className="card-title">Income Breakdown</span>
        </div>
        <div className="card-body">
          <ExpensePieChart pieData={incomePieData} />
        </div>
      </div>
    </div>
  );
}

export default ChartsRow;
