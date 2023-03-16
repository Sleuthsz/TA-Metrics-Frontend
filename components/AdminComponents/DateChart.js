import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";

export default function DateChart({callBackend}) {

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const startStr = `${String(startDate.getFullYear())}-${String(
      startDate.getMonth() + 1
    )}-${String(startDate.getDate())}`;
    const endStr = `${String(endDate.getFullYear())}-${String(
      endDate.getMonth() + 1
    )}-${String(endDate.getDate())}`;
    const url1 = `${process.env.NEXT_PUBLIC_ADMIN_METRICS}?start_date=${startStr}&end_date=${endStr}`;
    const url2 = `${process.env.NEXT_PUBLIC_ADMIN_SUMMARY}?start_date=${startStr}&end_date=${endStr}`;
    callBackend([url1, url2]);
  };

  return (
    <div className="mt-4 ml-6 w-full justify-center m-25 bg-yellow-50">
    <DatePicker
      className="mb-2 border-2 rounded bg-silver"
      selected={startDate}
      closeOnScroll={true}
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
      closeOnScroll={true}
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
  )
}