import { IoIosReturnRight } from "react-icons/io";

export default function About() {
  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-20 flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-16 py-12">
      {/* Left Content */}
      <div className="w-full lg:w-1/2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          Welcome to <span className="text-red-600">Donorix</span>
        </h1>
        <hr className="my-4 sm:my-5 border-2 border-red-600 w-12" />
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          Since our inception set out in 2012, BloodTime has successfully
          contributed in blood donation to over 500+ patients. Sharing awareness
          to young generation the usefulness of donating blood for others to
          save countless lives.
        </p>

        {/* Features */}
        <div className="my-6 sm:my-10 w-full sm:w-4/5 text-gray-300">
          {[
            "1000+ Donors Available 24/7",
            "Associated with 200+ Medical facilities",
            "Donated Blood to Over 500+ Patients",
            "Contributed in Public Awareness",
            "Customer Service Available Country Wide",
          ].map((item, index) => (
            <div key={index}>
              <div className="flex items-center gap-4 my-3">
                <IoIosReturnRight className="text-red-600 text-xl sm:text-2xl" />
                <p className="text-sm sm:text-base">{item}</p>
              </div>
              {index < 4 && <hr className="border-gray-600/40" />}
            </div>
          ))}
        </div>
      </div>

      {/* Right Image */}
      <div className="w-full lg:w-1/2">
        <img
          className="w-full h-56 sm:h-72 md:h-96 lg:h-[550px] rounded-xl sm:rounded-2xl object-cover"
          src="https://i.ibb.co.com/7dzywB3m/imgi-20-detail-with-hand-blood-donor-plastic-blood-bag-hospital-person-513275-2529.jpg"
          alt="Blood Donation"
        />
      </div>
    </div>
  );
}
