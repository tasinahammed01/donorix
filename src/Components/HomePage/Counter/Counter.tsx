import CountUp from "react-countup";

const Counter = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-5 py-10 bg-gradient-to-r shadow-lg rounded-xl">
      {/* Donor Count */}
      <div className="bg-white/80 backdrop-blur-md shadow-md p-8 rounded-lg text-center w-full md:w-1/3">
        <h2 className="text-2xl font-bold text-red-600 mb-2">Total Donors</h2>
        <p className="text-4xl font-extrabold text-gray-800">
          <CountUp end={1250} duration={3} />
        </p>
      </div>

      {/* Patient Count */}
      <div className="bg-white/80 backdrop-blur-md shadow-md p-8 rounded-lg text-center w-full md:w-1/3">
        <h2 className="text-2xl font-bold text-blue-600 mb-2">
          Total Patients
        </h2>
        <p className="text-4xl font-extrabold text-gray-800">
          <CountUp end={980} duration={3} />
        </p>
      </div>

      {/* Blood Requests */}
      <div className="bg-white/80 backdrop-blur-md shadow-md p-8 rounded-lg text-center w-full md:w-1/3">
        <h2 className="text-2xl font-bold text-green-600 mb-2">
          Blood Requests
        </h2>
        <p className="text-4xl font-extrabold text-gray-800">
          <CountUp end={320} duration={3} />
        </p>
      </div>
    </div>
  );
};

export default Counter;
