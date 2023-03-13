import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useResource from '../hooks/useResource';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function AdminView() {
  const [data, setData] = useState([])
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { fetchResource } = useResource();


  async function callBackend(url) {
    try {
    const response = await fetch(url);
    const responseJSON = await response.json();
    console.log(responseJSON);
    setData(responseJSON);
    } catch (err) {
      console.log(err)
    }
    
  }
  // useEffect(() => {
  //   callBackend();
  // },[]);

  const hours = ['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM'];
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`start: ${startDate}`);
    console.log(`end: ${endDate}`);
    const startStr = `${String(startDate.getFullYear())}-${String(startDate.getMonth() + 1)}-${String(startDate.getDate())}`;
    const endStr = `${String(endDate.getFullYear())}-${String(endDate.getMonth() + 1)}-${String(endDate.getDate())}`;
    const url = `${process.env.NEXT_PUBLIC_TA_METRICS}?start_date=${startStr}&end_date=${endStr}`
    console.log(url);
    callBackend(url);
  }
  
  const onChange = (dates) => {
    const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    
  }
  
  return (
    <div>
      <h1 className="text-4xl font-bold text-center">
        TA-Metrics
      </h1>
      
      <h3 className='mt-4 ml-6'>Input Dates:</h3>
      <div className='mt-4 ml-6'>
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
      <button className="p-1 mt-2 text-white border-2 rounded bg-metal" onClick={handleSubmit}>Submit</button>
        </div>


      {data.length > 0 && 
      <table className="mx-auto my-8 border border-collapse table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Day</th>
            <th className="px-4 py-2 border">Category</th>
            {hours.map(hour => (
              <th key={uuidv4()} className="px-4 py-2 border">{hour}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(day => (
            <>
            <tr key={uuidv4()}>
            <td rowSpan="2" key={uuidv4()} className="px-4 py-2 border">{day.date}</td>
            <td className="px-4 py-2 border">Tickets</td>
          {
              hours.map(hour => (
                <td key={uuidv4()} className="px-4 py-2 border">{day['hours'][hour]['tickets']}</td>
              ))
            }
            </tr>
            <tr key={uuidv4()}>
            <td className="px-4 py-2 border">Wait Time</td>
              {
              hours.map(hour => (
                <td key={uuidv4()} className="px-4 py-2 border">{(day['hours'][hour]['tot_wait']/60).toFixed(1)}</td>
              ))
            }
            </tr>
            </>
          ))}
        </tbody>
      </table>
}
    </div>
  )
          
}