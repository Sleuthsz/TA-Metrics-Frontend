import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
export default function AdminView() {
  const [data, setData] = useState([])
  async function callBackend() {
    try {
    const response = await fetch(process.env.NEXT_PUBLIC_TA_METRICS);
    const responseJSON = await response.json();
    console.log(responseJSON);
    setData(responseJSON);
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    callBackend();
  },[]);
  const hours = ['7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM'];
  return (
    <div>
      <h1 className="text-4xl font-bold text-center">
        TA-Metrics
      </h1>
      <table className="mx-auto my-8 border border-collapse table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Day</th>
            {hours.map((hour, idx) => (
              <th key={idx} className="px-4 py-2 border">{hour}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((day, idx) => (
            <>
            <tr key={uuidv4()}>
            <td rowSpan="2" key={uuidv4()} className="px-4 py-2 border">{day.date}</td>
          {
              hours.map((hour, idx2) => (
                <td key={idx2} className="px-4 py-2 border">{day['hours'][hour]['tickets']}</td>
              ))
            }
            </tr>
            <tr key={uuidv4()}>
              {
              hours.map((hour, idx2) => (
                <td key={idx2} className="px-4 py-2 border">{(day['hours'][hour]['tot_wait']/60).toFixed(1)}</td>
              ))
            }
            </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  )
}