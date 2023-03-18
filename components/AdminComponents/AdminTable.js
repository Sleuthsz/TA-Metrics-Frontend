import { v4 as uuidv4 } from "uuid";
import { hours } from "../../data/sharedData";
import Legend from "./Legend"

export default function AdminTable({ data }) {
  function getClassForWaitTime(waitTime) {
    const mean = data[1].mean_data;
    const standardDeviation = data[1].standard_deviation;
    if (waitTime == 0) {
      return "bg-gray-100 hover:bg-gray-300";
    }
    if (waitTime < standardDeviation - mean) {
      return "bg-green-500 hover:bg-green-300";
    } else if (waitTime > standardDeviation + mean) {
      return "bg-red-500 hover:bg-red-300";
    } else {
      return "bg-yellow-500 hover:bg-yellow-300";
    }
  }

  return (
    <div>
      <div className="block p-0 bg-gray-100 w-36 m-auto">
        <Legend data={data}/>
      </div>
      <div className="flex justify-center w-4/5 m-auto bg-yellow-50">
        <table className="mx-auto my-8 border-collapse table-auto border-black border-4">
          <thead>
            <tr>
              <th className="px-4 py-2 border bg-blue-100 hover:bg-blue-300">
                Day
              </th>
              <th className="px-4 py-2 border bg-blue-100 hover:bg-blue-300">
                Category
              </th>
              {hours.map((hour) => (
                <th
                  key={`${hour}:${uuidv4()}`}
                  className={`px-4 py-2 border bg-blue-100 hover:bg-blue-300`}
                >
                  {hour}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data[0].map((day) => (
              <>
                <tr key={`${day.date}${uuidv4()}`}>
                  <td
                    rowSpan="2"
                    key={uuidv4()}
                    className={`px-4 py-2 border  bg-blue-100 hover:bg-blue-300`}
                  >
                    {day.date}
                  </td>
                  <td className="px-4 py-2 border font-bold bg-blue-100 hover:bg-blue-300">
                    Tickets
                  </td>
                  {hours.map((hour) => {
                    return (
                      <td
                        key={`${hour}${uuidv4()}`}
                        className={`px-4 py-2 border font-bold ${getClassForWaitTime(
                          (day["hours"][hour]["time"] / 60).toFixed(1)
                        )}`}
                      >
                        {day["hours"][hour]["tickets"]}
                      </td>
                    );
                  })}
                </tr>
                <tr key={`Test ${uuidv4()}`}>
                  <td className="px-4 py-2 border font-bold bg-blue-100 hover:bg-blue-300">
                    Wait Time
                  </td>
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
    </div>
  );
}
