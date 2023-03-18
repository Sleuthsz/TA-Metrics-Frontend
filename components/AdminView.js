import { useState, useEffect } from "react";
import AdminChart from "./AdminComponents/AdminChart";
import AdminTable from "./AdminComponents/AdminTable";
import DateChart from "./AdminComponents/DateChart";
import TAView from "./AdminComponents/TAView";

export default function AdminView({
  data,
  callBackend,
  setData,
  setNames,
  fetchNames,
  names,
}) {
  const [showTAView, setShowTAView] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const isDataEmpty = data.length === 0;
  const containerClassName = isDataEmpty ? "h-screen" : "h-auto";

  useEffect(() => {
    fetchNames();
  }, []);

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

  const handleTASubmit = (event) => {
    event.preventDefault();
    const startStr = `${String(startDate.getFullYear())}-${String(
      startDate.getMonth() + 1
    )}-${String(startDate.getDate())}`;
    const endStr = `${String(endDate.getFullYear())}-${String(
      endDate.getMonth() + 1
    )}-${String(endDate.getDate())}`;
    const url1 = `${process.env.NEXT_PUBLIC_TA_DATA}?start_date=${startStr}&end_date=${endStr}&ta=${selectedOption}`;
    const url2 = `${process.env.NEXT_PUBLIC_TA_SUMMARY}?start_date=${startStr}&end_date=${endStr}&ta=${selectedOption}`;
    callBackend([url1, url2]);
  };

  const toggleChart = () => {
    setShowChart((prev) => !prev);
  };
  const toggleTAView = () => {
    setShowTAView((prev) => !prev);
    setShowChart(false);
    setData([]);
  };

  return (
    <div className={`bg-yellow-50 ${containerClassName}`}>
      <button
        className="p-1 mt-2 ml-2 text-white border-2 rounded bg-metal hover:bg-gray-600"
        onClick={toggleTAView}
      >
        {showTAView ? "Admin View" : "TA View"}
      </button>
      <DateChart
        callBackend={callBackend}
        setEndDate={setEndDate}
        setStartDate={setStartDate}
        startDate={startDate}
        endDate={endDate}
      />
      {showTAView && (
        <select
          className="block w-1/6 text-center font-bold mt-3 m-auto px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <option value="">Select a TA</option>
          {names.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      )}
      <div className="flex justify-center m-auto mt-4 w-64">
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 011.414 0l.707.707a1 1 0 010 1.414L11.414 10l2.293 2.293a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414 0L10 11.414l-2.293 2.293a1 1 0 01-1.414 0l-.707-.707a1 1 0 010-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414l.707-.707z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div className="m-auto justify-center flex align-top">
        <button
          className="w-1/6 px-4 py-2 mt-10 text-white border-2 border-transparent rounded-lg shadow-sm bg-metal hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          onClick={showTAView ? handleTASubmit : handleSubmit}
        >
          Submit
        </button>
      </div>
      {data.length > 0 ? (
        <div className="flex justify-center m-auto">
          {!showTAView && (
            <button
              className="p-1 order-2 mt-2 text-white border-2 rounded bg-metal hover:bg-gray-600"
              onClick={toggleChart}
            >
              {showChart ? "Show Table" : "Show Chart"}
            </button>
          )}
        </div>
      ) : (
        <div></div>
      )}

      {data.length > 0 && !showTAView && !showChart && (
        <AdminTable data={data} />
      )}
      {data.length > 0 && showChart && !showTAView && (
        <AdminChart data={data} />
      )}
      {data.length > 0 && showTAView && !showChart && (
        <TAView
          data={data}
          fetchNames={fetchNames}
          names={names}
          setNames={setNames}
        />
      )}
    </div>
  );
}
