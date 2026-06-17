import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CATEGORY_COLORS } from "../../constants/categories";
import "./ExpensePieChart.css";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#1e2330",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 8,
          padding: "8px 12px",
          fontSize: "0.85rem",
          color: "#f0f2f7",
        }}
      >
        <strong>{payload[0].name}</strong>
        <div>
          ₹
          {Number(payload[0].value).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      </div>
    );
  }
  return null;
};

export default function ExpensePieChart({ expenses }) {
  if (!expenses || expenses.length === 0) {
    return (
      <div
        style={{
          height: 240,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#5c6378",
          fontSize: "0.9rem",
        }}
      >
        No data to display
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Pie
          data={expenses}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={90}
          paddingAngle={3}
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
          labelLine={true}
        >
          {expenses.map((entry) => (
            <Cell
              key={`cell-${entry.name}`}
              fill={
                CATEGORY_COLORS[entry.name.toLowerCase()] ||
                CATEGORY_COLORS.other
              }
              stroke="transparent"
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: "0.78rem", color: "#9ba3b7" }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
