import CountUp from "react-countup";

const Counter = () => {
  return (
    <section className="py-20 sm:py-28 lg:py-32 px-4 sm:px-8 md:px-16 lg:px-20">
      {/* Section Title */}
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-center mb-10 sm:mb-14 lg:mb-16">
        Visit Our <span className="text-red-600">Camps</span>
      </h1>

      {/* Counter Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2  md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto">
        {/* Available Volunteers */}
        <div className="bg-white/90 shadow-md sm:shadow-lg p-6 sm:p-8 rounded-xl sm:rounded-2xl text-center border border-red-100 hover:shadow-2xl transition-all duration-300">
          <h2 className="text-lg sm:text-xl font-semibold text-red-700 mb-2">
            Available Volunteers
          </h2>
          <p className="text-3xl sm:text-4xl font-bold text-gray-900">
            <CountUp end={1250} duration={3} />
          </p>
        </div>

        {/* Active Areas */}
        <div className="bg-white/90 shadow-md sm:shadow-lg p-6 sm:p-8 rounded-xl sm:rounded-2xl text-center border border-red-100 hover:shadow-2xl transition-all duration-300">
          <h2 className="text-lg sm:text-xl font-semibold text-red-700 mb-2">
            Active Areas
          </h2>
          <p className="text-3xl sm:text-4xl font-bold text-gray-900">
            <CountUp end={70} duration={3} />
          </p>
        </div>

        {/* Donation Camps */}
        <div className="bg-white/90 shadow-md sm:shadow-lg p-6 sm:p-8 rounded-xl sm:rounded-2xl text-center border border-red-100 hover:shadow-2xl transition-all duration-300">
          <h2 className="text-lg sm:text-xl font-semibold text-red-700 mb-2">
            Donation Camps
          </h2>
          <p className="text-3xl sm:text-4xl font-bold text-gray-900">
            <CountUp end={17} duration={3} />
          </p>
        </div>

        {/* Successful Donations */}
        <div className="bg-white/90 shadow-md sm:shadow-lg p-6 sm:p-8 rounded-xl sm:rounded-2xl text-center border border-red-100 hover:shadow-2xl transition-all duration-300">
          <h2 className="text-lg sm:text-xl font-semibold text-red-700 mb-2">
            Successful Donations
          </h2>
          <p className="text-3xl sm:text-4xl font-bold text-gray-900">
            <CountUp end={474} duration={3} />
          </p>
        </div>
      </div>
    </section>
  );
};

export default Counter;
