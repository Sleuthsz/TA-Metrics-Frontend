import { v4 as uuidv4 } from "uuid";

export default function AdminTable({data}) {

  function getClassForWaitTime(waitTime) {
    const delta = data[1].average_time_delta / 60;
    console.log(`${waitTime}`);

    if (waitTime > delta * 2) {
      return "bg-red-500";
    }
    if (waitTime < delta * 0.5) {
      return "bg-green-500";
    } else {
      return "bg-yellow-500";
    }
  }

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

 return ( 
  <table className="mx-auto my-8 border border-collapse table-auto">
  <thead>
    <tr>
      <th className="px-4 py-2 border">Day</th>
      <th className="px-4 py-2 border">Category</th>
      {hours.map((hour) => (
        <th key={`${hour}:${uuidv4()}`} className={`px-4 py-2 border`}>
          {hour}
        </th>
      ))}
    </tr>
  </thead>
  <tbody>
    {data[0].map((day) => (
      <>
        <tr key={uuidv4()}>
          <td rowSpan="2" key={uuidv4()} className={`px-4 py-2 border`}>
            {day.date}
          </td>
          <td className="px-4 py-2 border">Tickets</td>
          {hours.map((hour) => {
            return (
              <td
                key={uuidv4()}
                className={`px-4 py-2 border ${getClassForWaitTime(
                  (day["hours"][hour]["tot_wait"] / 60).toFixed(1)
                )}`}
              >
                {day["hours"][hour]["tickets"]}
              </td>
            );
          })}
        </tr>
        <tr key={uuidv4()}>
          <td className="px-4 py-2 border">Wait Time</td>
          {hours.map((hour) => (
            <td
              key={uuidv4()}
              className={`px-4 py-2 border ${getClassForWaitTime(
                (day["hours"][hour]["tot_wait"] / 60).toFixed(1)
              )}`}
            >
              {(day["hours"][hour]["tot_wait"] / 60).toFixed(1)}
            </td>
          ))}
        </tr>
      </>
    ))}
  </tbody>
</table>
 )
}