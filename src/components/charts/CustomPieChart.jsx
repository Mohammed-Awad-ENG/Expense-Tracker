import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import CustomToolTip from "./CustomToolTip";
import CustomLegend from "./CustomLegend";
function CustomPieChart({ data, title, totalAmount, colors, showTextAnchor }) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="amount"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={130}
                    innerRadius={100}
                    labelLine={false}
                >
                    {data.map((entry, i) => (
                        <Cell
                            key={`cell-${i}`}
                            fill={colors[i % colors.length]}
                        />
                    ))}
                </Pie>
                <Tooltip content={CustomToolTip} />
                <Legend content={CustomLegend} />
                {showTextAnchor && (
                    <>
                        <text
                            x="50%"
                            y="50%"
                            dy={-25}
                            textAnchor="middle"
                            fill="#666"
                            fontSize="14px"
                        >
                            {title}
                        </text>

                        <text
                            x="50%"
                            y="50%"
                            dy={8}
                            textAnchor="middle"
                            fill="#333"
                            fontSize="24px"
                            fontWeight="semi-bold"
                        >
                            {totalAmount}
                        </text>
                    </>
                )}
            </PieChart>
        </ResponsiveContainer>
    );
}
export default CustomPieChart;
