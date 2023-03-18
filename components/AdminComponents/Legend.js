export default function Legend({ data }) {
  return (
    <div className="border-black border-2">
      <p className="text-center font-bold text-2xl">
        Wait Time σ
      </p>
      <div className="flex mr-4 text-center">
        <div className="w-4 h-4 bg-green-500 mr-2"></div>
        <p>Below 1 SD</p>
      </div>
      <div className="flex mr-4">
        <div className="w-4 h-4 bg-red-500 mr-2"></div>
        <p>Above 1 SD</p>
      </div>
      <div className="flex">
        <div className="w-4 h-4 bg-yellow-500 mr-2"></div>
        <p>Within 1 SD</p>
      </div>
      <div className="flex">
        <div className="w-4 h-4 bg-gray-100 border-black border-2 mr-2"></div>
        <p>No tickets</p>
      </div>
      <div>
        <p className="font-bold text-xl text-center">
          σ {data[1].standard_deviation.toFixed(1)} minutes
        </p>
      </div>
    </div>
  );
}
