import { useState, useEffect } from "react";
import AdminChart from "./AdminComponents/AdminChart";
import AdminTable from "./AdminComponents/AdminTable";
import DateChart from "./AdminComponents/DateChart";

export default function AdminView({ data, callBackend }) {
  const [showChart, setShowChart] = useState(false);

<<<<<<< HEAD
  const hours = [
    "9 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM",
    "5 PM",
    "6 PM",
    "7 PM",
    "8 PM",
    "9 PM",
  ];


=======
>>>>>>> 37f83d60238345ce740e3e0ab4dae21eff98b079
  const toggleChart = () => {
    setShowChart((prev) => !prev);
  };

<<<<<<< HEAD
  const handleSubmit = (event) => {
    event.preventDefault();
    const startStr = `${String(startDate.getFullYear())}-${String(
      startDate.getMonth() + 1
    )}-${String(startDate.getDate())}`;
    const endStr = `${String(endDate.getFullYear())}-${String(
      endDate.getMonth() + 1
    )}-${String(endDate.getDate())}`;
    const url1 = `${process.env.NEXT_PUBLIC_TA_METRICS}?start_date=${startStr}&end_date=${endStr}`;
    const url2 = `${process.env.NEXT_PUBLIC_TA_SUMMARY}?start_date=${startStr}&end_date=${endStr}`;
    callBackend([url1, url2]);
  };


=======
>>>>>>> 37f83d60238345ce740e3e0ab4dae21eff98b079
  return (
    <div className="bg-yellow-50">
      <h1 className="text-4xl mt-2 font-bold text-center">TA-Metrics</h1>

      <h3 className="mt-4 ml-6">Input Dates:</h3>
<<<<<<< HEAD
      <div className="mt-4 ml-6">
        <DatePicker
          className="mb-2 border-2 rounded bg-silver"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          maxDate={Date.now()}
        />
        <DatePicker
          className="border-2 rounded bg-silver"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          maxDate={Date.now()}
        />
        <button
          className="p-1 mt-2 text-white border-2 rounded bg-metal"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
        className="p-1 mt-2 text-white border-2 rounded bg-metal"
        onClick={toggleChart}
        >
        {showChart ? "Show Table" : "Show Chart"}
      </button>
      </div>
=======
      <DateChart callBackend={callBackend} />
      <button
        className="p-1 mt-2 text-white border-2 rounded bg-metal"
        onClick={toggleChart}
      >
        {showChart ? "Show Table" : "Show Chart"}
      </button>
>>>>>>> 37f83d60238345ce740e3e0ab4dae21eff98b079

      {data.length > 0 && data[0].length > 0 && showChart && (
        <AdminChart data={data} />
      )}
      {data.length > 0 && !showChart && <AdminTable data={data} />}
    </div>
  );
}