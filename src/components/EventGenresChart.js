import { PieChart, Pie, ResponsiveContainer, Cell, Legend, Tooltip } from 'recharts';
import { useState, useEffect } from 'react';

const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];
const EventGenresChart = ({ events }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const data = genres.map(genre => {
            const filteredEvents = events.filter(event => event.summary.includes(genre));
            return {
                name: genre,
                value: filteredEvents.length
            };
        });

        setData(data);
    }, [events]);

    const COLORS = ['#FF5733', '#8E44AD', '#1ABC9C', '#F39C12', '#3498DB'];

    const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, innerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;

        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        return percent ? (
            <text
                x={x}
                y={y}
                fill="black"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
            >
                {` ${(percent * 100).toFixed(0)}%`}
            </text>
        ) : null;
    };

    return (
        <ResponsiveContainer width="99%" height={400}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    fill="#8884d8"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    cx="50%" cy="50%"
                    outerRadius={140}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Legend layout="horizontal" align="center" verticalAlign="bottom" />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default EventGenresChart;