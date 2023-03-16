import { useState, useEffect } from "react";
import AdminChart from "./AdminComponents/AdminChart";
import AdminTable from "./AdminComponents/AdminTable";
import DateChart from "./AdminComponents/DateChart";

export default function AdminView({ data, callBackend }) {
  const [showChart, setShowChart] = useState(false);

  const toggleChart = () => {
    setShowChart((prev) => !prev);
  };

  return (
    <div className="bg-yellow-50">
      <h1 className="text-4xl mt-2 font-bold text-center">TA-Metrics</h1>

      <h3 className="mt-4 ml-6">Input Dates:</h3>
      <DateChart callBackend={callBackend} />
      <button
        className="p-1 mt-2 text-white border-2 rounded bg-metal"
        onClick={toggleChart}
      >
        {showChart ? "Show Table" : "Show Chart"}
      </button>

      {data.length > 0 && data[0].length > 0 && showChart && (
        <AdminChart data={data} />
      )}
      {data.length > 0 && !showChart && <AdminTable data={data} />}
    </div>
  );
}
