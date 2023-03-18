import { hours } from "../../data/sharedData";
import React from "react";
import { useState, useEffect } from "react";

export default function TAView({ data }) {
  return (
    <div className="w-full justify-center">
      {data.length > 0 ? (
        <div className="text-left w-1/2 m-auto mt-4 mb-4">
          <div className="bg-blue-200 border px-4 py-2 text-center w-1/2 m-auto font-bold border-black">
            <p text-left>Total Tickets: {data[1][0].tot_tickets}</p>
            <p>
              Student help time: {(data[1][0].tot_help_time / 60).toFixed(1)}{" "}
              minutes
            </p>
            <p>Unique Students Helped: {data[1][0].num_unique_students}</p>
            <p>
              Average Help Time: {(data[1][0].avg_help_time / 60).toFixed(1)}
            </p>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <div className="flex justify-center">
        {data.length > 0 ? (
          <table className="table-auto border-collapse border-black border-2 w-4/5">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 border bg-blue-100 hover:bg-blue-300">
                  Date
                </th>
                <th className="px-4 py-2 border bg-blue-100 hover:bg-blue-300">
                  Category
                </th>
                {hours.map((hour, index) => (
                  <th
                    key={`hour${hour}${index}`}
                    className={`px-4 py-2 border bg-blue-100 hover:bg-blue-300`}
                  >
                    {hour}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data[0]
                .filter((day) => {
                  const ticketCounts = Object.values(day.hours).map(
                    (hourData) => hourData.tickets
                  );
                  const totalTickets = ticketCounts.reduce(
                    (acc, count) => acc + count,
                    0
                  );
                  return totalTickets > 0;
                })
                .map((day, index) => (
                  <React.Fragment key={`${day.date}${index}`}>
                    <tr
                      className={
                        index % 2 === 0 ? "bg-green-100" : "bg-gray-100"
                      }
                    >
                      <td
                        rowSpan="2"
                        className={`px-4 py-2 border-2 border-black bg-blue-100 font-bold`}
                      >
                        {day.date}
                      </td>
                      <td className="px-4 py-2 border-2 border-black font-bold bg-blue-100">
                        Tickets
                      </td>
                      {hours.map((hour, index) => {
                        return (
                          <td
                            key={`the${hour}${index}`}
                            className={`px-4 py-2 border-2 border-black font-bold}`}
                          >
                            {day.hours[hour].tickets}
                          </td>
                        );
                      })}
                    </tr>
                    <tr
                      className={
                        index % 2 === 0 ? "bg-blue-100" : "bg-gray-100"
                      }
                    >
                      <td className="px-4 py-2 border-2 border-black font-bold bg-blue-100">
                        Time Helped
                      </td>
                      {hours.map((hour) => {
                        return (
                          <td
                            key={`hour${hour}${index}`}
                            className={`px-4 py-2 border-2 border-black font-bold)}`}
                          >
                            {(day.hours[hour].time / 60).toFixed(1)}
                          </td>
                        );
                      })}
                    </tr>
                  </React.Fragment>
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
