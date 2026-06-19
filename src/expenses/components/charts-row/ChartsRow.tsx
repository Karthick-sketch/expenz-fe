import ExpensePieChart from "../expense-pie-chart/ExpensePieChart";
import "./ChartsRow.css";

function ChartsRow({ pieData, incomePieData }) {
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
