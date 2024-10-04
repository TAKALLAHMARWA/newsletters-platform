"use client";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface MonthData {
  month: string;
  count: number;
}

interface SubscribersAnalyticsData {
  last7Months: MonthData[];
}

const SubscribersChart = () => {
  const [subscribersData, setSubscribersData] = useState<SubscribersAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscribersAnalytics = async () => {
      try {
        const response = await fetch('http://localhost:5000/subscribers'); // Remplace ce chemin par le bon chemin de ton API
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: SubscribersAnalyticsData = await response.json();
        setSubscribersData(data);
      } catch (error) {
        console.error("Error fetching subscribers analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribersAnalytics();
  }, []);

  const data: MonthData[] = [];

  if (subscribersData) {
    subscribersData.last7Months.forEach((item) => {
      data.push({
        month: item.month,
        count: item.count,
      });
    });
  }

  return (
    <div className="my-5 p-5 border rounded bg-white w-full md:h-[55vh] xl:h-[60vh]">
      <div className="w-full flex">
        <h3 className="font-medium">Active Subscribers</h3>
      </div>
      <div className="flex w-full items-center justify-between">
        <p className="opacity-[.5]">Shows all active subscribers</p>
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-[#EB4898]" />
          <span className="pl-2 text-sm opacity-[.7]">Subscribers</span>
        </div>
      </div>
      {loading ? (
        <div className="h-[85%] flex items-center justify-center w-full">
          <h5>Loading...</h5>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={"85%"} className={"mt-5"}>
          <LineChart
            data={data}
            syncId="anyId"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#EB4898"
              fill="#EB4898"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default SubscribersChart;
