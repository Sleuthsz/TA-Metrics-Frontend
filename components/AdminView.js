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

      <DateChart callBackend={callBackend} />
      {data.length > 0 ? (
        <div className="flex justify-center m-auto">
        <button
          className="p-1 mt-2 text-white border-2 rounded bg-metal hover:bg-gray-600"
          onClick={toggleChart}
        >
          {showChart ? "Show Table" : "Show Chart"}
        </button>
        
        </div>
        
      ) : (
        <div></div>
      )}

      {data.length > 0 && data[0].length > 0 && showChart && (
        <AdminChart data={data} />
      )}
      {data.length > 0 && !showChart && <AdminTable data={data} />}
    </div>
  );
}
