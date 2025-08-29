import { IoIosReturnRight } from "react-icons/io";

export default function About() {
  return (
    <div className="px-5">
      <div>
        <h1 className="text-5xl">Welcome to <span className="text-red-600">Donorix</span></h1>
        <hr className="my-5 border-2 border-red-600 w-[5%]"/>
        <p></p>
        <div>
           <IoIosReturnRight /> 
           <p></p>
           <hr />
        </div>
      </div>
      <div></div>
    </div>
  )
}
