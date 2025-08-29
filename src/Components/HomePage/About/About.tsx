import { IoIosReturnRight } from "react-icons/io";

export default function About() {
  return (
    <div className="px-20 flex justify-center items-center gap-10">
      <div className="w-[50%]">
        <h1 className="text-4xl">
          Welcome to <span className="text-red-600">Donorix</span>
        </h1>
        <hr className="my-5 border-2 border-red-600 w-[5%]" />
        <p className="text-gray-300">
          Since our inception set out in 2012, BloodTime has successfully
          contributed in blood donation to over 500+ patients. Sharing awareness
          to young generation the usefulness of donating blood for others to
          save countless lives.
        </p>
        <div className="my-10 w-[70%] text-gray-300">
          <div className="flex items-center gap-5 my-3">
            <IoIosReturnRight className="text-red-600 text-2xl" />
            <p>1000+ Donors Available 24/7</p>
          </div>
          <hr />
          <div className="flex items-center gap-5 my-3">
            <IoIosReturnRight className="text-red-600 text-2xl" />
            <p>Associated with 200+ Medical facilities</p>
          </div>
          <hr />
          <div className="flex items-center gap-5 my-3">
            <IoIosReturnRight className="text-red-600 text-2xl" />
            <p>Donated Blood to Over 500+ Patients</p>
          </div>
          <hr />
          <div className="flex items-center gap-5 my-3">
            <IoIosReturnRight className="text-red-600 text-2xl" />
            <p>Contributed in Public Awareness</p>
          </div>
          <hr />
          <div className="flex items-center gap-5 my-3">
            <IoIosReturnRight className="text-red-600 text-2xl" />
            <p>Customer Service Available Country Wide</p>
          </div>
          <hr />
        </div>
      </div>
      <div className="w-[50%] ">
        <img
          className="w-full h-[550px] rounded-2xl  object-cover"
          src="https://i.ibb.co.com/7dzywB3m/imgi-20-detail-with-hand-blood-donor-plastic-blood-bag-hospital-person-513275-2529.jpg"
          alt=""
        />
      </div>
    </div>
  );
}
