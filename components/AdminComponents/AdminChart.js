import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { hours } from '../../data/sharedData'

const formatData = (data) => {
  const formattedData = data[0].map((item) => {
    let totalTickets = 0;
    let totalWait = 0.0;
    const hourlyData = hours.map((hour) => {
      const hourlyTickets = item["hours"][hour]["tickets"];
      const hourlyWait = parseFloat((item["hours"][hour]["time"] / 60).toFixed(1));
      totalTickets += hourlyTickets;
      totalWait += hourlyWait;
      const date = item.date;
      const time = hour;

      return {
        date,
        time,
        hourlyTickets,
        hourlyWait,
        totalTickets,
        totalWait,
      };
    });

    return hourlyData;
  });

  return formattedData.flat();
};

export default function AdminChart({ data }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      setChartData(formatData(data));
    }
  }, [data]);

 return (
    <div>
      {chartData.length > 0 && (
        <BarChart width={800} height={600} data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" interval="preserveStartEnd" />
          <YAxis yAxisId="left" interval="preserveStartEnd" />
          <YAxis yAxisId="right" orientation="right" interval="preserveStartEnd" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="totalTickets" fill="#8884d8" name="Tickets" />
          <Bar yAxisId="right" dataKey="totalWait" fill="#82ca9d" name="Wait Time(minutes)" />
        </BarChart>
      )}
    </div>
  );
}