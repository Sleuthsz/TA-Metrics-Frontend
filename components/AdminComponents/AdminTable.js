import { v4 as uuidv4 } from "uuid";
import { hours } from "../../data/sharedData";

export default function AdminTable({ data }) {
  function getClassForWaitTime(waitTime) {
    const delta = data[1].average_time_delta / 60;
    console.log(`${waitTime}`);

    if (waitTime > delta * 2) {
      return "bg-red-500 hover:bg-red-300";
    }
    if (waitTime < delta * 0.5) {
      return "bg-green-500 hover:bg-green-300";
    } else {
      return "bg-yellow-500 hover:bg-yellow-300";
    }
  }

  return (
    <div className="flex justify-center w-4/5 m-auto bg-yellow-50">
      <table className="mx-auto my-8 border-black border-4 border-collapse table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border bg-gray-100 hover:bg-gray-300">Day</th>
            <th className="px-4 py-2 border bg-gray-100 hover:bg-gray-300">Category</th>
            {hours.map((hour) => (
              <th key={`${hour}:${uuidv4()}`} className={`px-4 py-2 border bg-gray-100 hover:bg-gray-300`}>
                {hour}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data[0].map((day) => (
            <>
              <tr key={uuidv4()}>
                <td rowSpan="2" key={uuidv4()} className={`px-4 py-2 border bg-gray-100 hover:bg-gray-300`}>
                  {day.date}
                </td>
                <td className="px-4 py-2 border bg-gray-100 hover:bg-gray-300">Tickets</td>
                {hours.map((hour) => {
                  return (
                    <td
                      key={uuidv4()}
                      className={`px-4 py-2 border ${getClassForWaitTime(
                        (day["hours"][hour]["time"] / 60).toFixed(1)
                      )}`}
                    >
                      {day["hours"][hour]["tickets"]}
                    </td>
                  );
                })}
              </tr>
              <tr key={uuidv4()}>
                <td className="px-4 py-2 border bg-gray-100 hover:bg-gray-300">Wait Time</td>
                {hours.map((hour) => (
                  <td
                    key={uuidv4()}
                    className={`px-4 py-2 border ${getClassForWaitTime(
                      (day["hours"][hour]["time"] / 60).toFixed(1)
                    )}`}
                  >
                    {(day["hours"][hour]["time"] / 60).toFixed(1)}
                  </td>
                ))}
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
