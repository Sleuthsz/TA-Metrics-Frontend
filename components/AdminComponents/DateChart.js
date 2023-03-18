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


  const weekData = () => {
    const date = new Date().toLocaleDateString('en-US', { timeZone: 'America/Los_Angeles' });
    const today = new Date(date)
    const endDate = today.toISOString().slice(0, 10);

    const weekAgo = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);
    const startDate = weekAgo.toISOString().slice(0,10);
    console.log(startDate);

    const url1 = `${process.env.NEXT_PUBLIC_ADMIN_METRICS}?start_date=${startDate}&end_date=${endDate}`;
    const url2 = `${process.env.NEXT_PUBLIC_ADMIN_SUMMARY}?start_date=${startDate}&end_date=${endDate}`;
    console.log(`url1: ${url1}`);
    console.log(`url2: ${url2}`);
    callBackend([url1, url2]);
  }

  return (
    <div className="flex flex-col items-center">
      
      
  <button onClick={weekData} className="w-1/6 px-4 py-2 mt-10 text-white border-2 border-transparent rounded-lg shadow-sm bg-metal hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">Past Week</button>

<h3>Custom Date Range:</h3>


      <div className="flex justify-center w-1/6 mt-10">
        <div className="flex flex-col items-center w-full md:w-1/2">
          <p className="font-bold text-center font 3xl">Start Date</p>
          <DatePicker
            portalId="root-portal"
            className="w-full p-2 bg-gray-100 border-2 border-black rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
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
        <p className="font-bold text-center font 3xl">End Date</p>
          <DatePicker
            portalId="root-portal"
            className="w-full p-2 bg-gray-100 border-2 border-black rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
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
      <button
        className="w-1/6 px-4 py-2 mt-10 text-white border-2 border-transparent rounded-lg shadow-sm bg-metal hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}
