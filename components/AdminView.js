import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AdminChart from "./AdminChart";
import AdminTable from "./AdminTable";

export default function AdminView({ data, callBackend }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showChart, setShowChart] = useState(false);

  async function callBackend(url) {
    try {
      const response = await fetch(url);
      const responseJSON = await response.json();
      console.log(responseJSON);
      setData(responseJSON);
    } catch (err) {
      console.log(err);
    }
  }
  // useEffect(() => {
  //   callBackend();
  // },[]);

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

  const handleSubmit = () => {
    const startStr = `${String(startDate.getFullYear())}-${String(
      startDate.getMonth() + 1
    )}-${String(startDate.getDate())}`;
    const endStr = `${String(endDate.getFullYear())}-${String(
      endDate.getMonth() + 1
    )}-${String(endDate.getDate())}`;
    const url = `${process.env.NEXT_PUBLIC_TA_METRICS}?start_date=${startStr}&end_date=${endStr}`;
    callBackend(url);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const startStr = `${String(startDate.getFullYear())}-${String(
      startDate.getMonth() + 1
    )}-${String(startDate.getDate())}`;
    const endStr = `${String(endDate.getFullYear())}-${String(
      endDate.getMonth() + 1
    )}-${String(endDate.getDate())}`;
    const url = `${process.env.NEXT_PUBLIC_TA_SUMMARY}?start_date=${startStr}&end_date=${endStr}`;
    callBackend(url);
  };

  const getData = (e) => {
    e.preventDefault();
    handleSubmit();
    handleSubmitSummary();
  };

  // function getClassForWaitTime(waitTime) {
  //   const delta = data.average_time_delta;

  //   if (waitTime > delta) {
  //     return "bg-red-500";
  //   } else if (waitTime < delta) {
  //     return "bg-green-500";
  //   } else {
  //     return "bg-yellow-500";
  //   }
  // }

  return (
    <div>
      <h1 className="text-4xl mt-2 font-bold text-center">TA-Metrics</h1>

      <h3 className="mt-4 ml-6">Input Dates:</h3>
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
      </div>
      {showChart ? "Show Table" : "Show Chart"}
      {data.length > 0 && data[0].length > 0 && showChart && (
        <AdminChart data={data} />
      )}
      {data.length > 0 && !showChart && <AdminTable data={data} />}
      <button
        className="p-1 mt-2 text-white border-2 rounded bg-metal"
        onClick={toggleChart}
      >

      </button>
    </div>
  );
}
