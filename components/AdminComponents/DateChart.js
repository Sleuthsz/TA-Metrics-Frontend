import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";

export default function DateChart({ callBackend }) {
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
    <div className="flex flex-col items-center">
      <button
        className="w-1/6 mt-10 px-4 py-2 text-white bg-metal border-2 border-transparent rounded-lg shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        onClick={handleSubmit}
      >
        Submit
      </button>
      <div className="flex justify-center w-1/6 mt-10">
        <div className="flex flex-col items-center w-full md:w-1/2">
          <p className="font 3xl text-center font-bold">Start Date</p>
          <DatePicker
            portalId="root-portal"
            className="w-full p-2 border-2 border-black rounded-lg bg-gray-100 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            selected={startDate}
            closeOnScroll={true}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            maxDate={Date.now()}
          />
        </div>
        <div className="flex flex-col items-center w-full md:w-1/2">
        <p className="font 3xl text-center font-bold">End Date</p>
          <DatePicker
            portalId="root-portal"
            className="w-full p-2 border-2 border-black rounded-lg bg-gray-100 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            closeOnScroll={true}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            maxDate={Date.now()}
          />
        </div>
      </div>
    </div>
  );
}
