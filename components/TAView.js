import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import { hours } from "../data/sharedData";

export default function TAView({ callBackend, data }) {
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
    const url1 = `${process.env.NEXT_PUBLIC_TA_DATA}?start_date=${startStr}&end_date=${endStr}&ta=Justin_Hamerly`;
    const url2 = `${process.env.NEXT_PUBLIC_TA_SUMMARY}?start_date=${startStr}&end_date=${endStr}&ta=Justin_Hamerly`;
    callBackend([url1, url2]);
  };

  return (
    <div className="mt-4 ml-6 w-full justify-center m-25">
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
        closeOnScroll={true}
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

      {data.length > 0 ? (
        <div className="text-center w-4/5 justify-center items-center m-auto">
          <p className="bg-gray-200 border px-4 py-2 text-center">
            Total: {data[1][0].tot_tickets} Total Student Help Time:{" "}
            {(data[1][0].tot_help_time / 60).toFixed(1)} minutes
          </p>
        </div>
      ) : (
        <div></div>
      )}
      <div className="flex justify-center">
        {data.length > 0 ? (
          <table className="table-auto border-collapse border border-gray-500 w-4/5">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Date</th>
                {hours.map((hour, index) => (
                  <th key={index} className="px-4 py-2">
                    {hour}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data[0].map((day, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0
                      ? "bg-gray-100 hover:bg-blue-200"
                      : "bg-slate-300 hover:bg-blue-300"
                  }
                >
                  <td className="border px-4 py-2">{day.date}</td>
                  {hours.map((hour, index) => (
                    <td key={index} className="border px-4 py-2">
                      tickets: {day.hours[hour].tickets}
                      wait: {(day.hours[hour].time / 60).toFixed(1)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
