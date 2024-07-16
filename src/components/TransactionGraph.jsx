import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TransactionGraph = ({ customerId }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (customerId) {
      axios
        .get(`http://localhost:4000/transactions?customer_id=${customerId}`)
        .then((response) => setTransactions(response.data))
        .catch((error) => console.error("Error fetching transactions:", error));
    }
  }, [customerId]);

  const data = transactions.reduce((acc, transaction) => {
    const date = transaction.date;
    if (!acc[date]) acc[date] = 0;
    acc[date] += transaction.amount;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "Total Transaction Amount",
        data: Object.values(data),
        fill: false,
        backgroundColor: "#009879",
        borderColor: "#009879",
      },
    ],
  };

  return (
    <div>
      <h2>Transaction Graph</h2>
      <Line data={chartData} />
    </div>
  );
};

export default TransactionGraph;
