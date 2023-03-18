import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateChart({
  callBackend,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  showTAView,
}) {
  const weekData = () => {
    const date = new Date().toLocaleDateString("en-US", {
      timeZone: "America/Los_Angeles",
    });
    const today = new Date(date);
    const endDate = today.toISOString().slice(0, 10);

    const weekAgo = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);
    const startDate = weekAgo.toISOString().slice(0, 10);

    const url1 = `${process.env.NEXT_PUBLIC_ADMIN_METRICS}?start_date=${startDate}&end_date=${endDate}`;
    const url2 = `${process.env.NEXT_PUBLIC_ADMIN_SUMMARY}?start_date=${startDate}&end_date=${endDate}`;
    callBackend([url1, url2]);
  };

  return (
    <div className="flex flex-col items-center">
      {showTAView === false ? (
        <button
          onClick={weekData}
          className="w-1/6 px-4 py-2 mt-10 text-white border-2 border-transparent rounded-lg shadow-sm bg-metal hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        >
          Past Week
        </button>
      ) : (
        <div></div>
      )}

      <h3 className="font-bold align-bottom p-0 mt-12">Custom Date Range:</h3>

      <div className="flex justify-center w-1/6">
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
    </div>
  );
}
