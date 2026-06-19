import type { PieDataItem } from "../../../models/pie-data-item";
import ExpensePieChart from "../expense-pie-chart/ExpensePieChart";
import "./ChartsRow.css";

interface ChartsRowProps {
  pieData: PieDataItem[];
  incomePieData: PieDataItem[];
}

function ChartsRow({ pieData, incomePieData }: ChartsRowProps) {
  return (
    <div className="charts-row">
      <div className="card chart-card">
        <div className="card-header">
          <span className="card-title">Spending Breakdown</span>
        </div>
        <div className="card-body">
          <ExpensePieChart expenses={pieData} />
        </div>
      </div>
      <div className="card chart-card">
        <div className="card-header">
          <span className="card-title">Income Breakdown</span>
        </div>
        <div className="card-body">
          <ExpensePieChart expenses={incomePieData} />
        </div>
      </div>
    </div>
  );
}

export default ChartsRow;
