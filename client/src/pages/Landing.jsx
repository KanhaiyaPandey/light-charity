
import hospital from "../assets/hospital.svg"
import bloodbank from "../assets/bloodbank.svg"
import user from "../assets/user.svg"
import { Link } from "react-router-dom"


const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
    <h1 className="text-4xl font-bold mb-[6rem]">You are ?</h1>
  
    <div className="flex flex-wrap justify-around max-w-4xl">
      <div className="relative group w-full sm:w-1/4 md:w-1/3 lg:w-1/4 xl:w-1/4 p-6 rounded-lg cursor-pointer  mb-6 overflow-hidden transition-transform ease-out transform hover:scale-105">
        <img src={hospital} alt="Card 1" className="w-full h-auto mb-4 rounded-md" />
        <p className="text-center text-3xl font-bold relative z-10">Hospital</p>
      </div>

     
      <div className="relative group w-full sm:w-1/4 md:w-1/3 lg:w-1/4 xl:w-1/4  p-6 rounded-lg cursor-pointer mb-6 overflow-hidden transition-transform ease-out transform hover:scale-105">
        <Link to = "/donor/register">
        <img src={user} alt="Card 2" className="w-full h-auto mb-4 rounded-md" />
        <p className="text-3xl text-center font-bold relative z-10">Donor</p>
        </Link>
      
      </div>
 
  
    
  
      <div className="relative group w-full sm:w-1/4 md:w-1/3 lg:w-1/4 xl:w-1/4  p-6 rounded-lg cursor-pointer mb-6 overflow-hidden transition-transform ease-out transform hover:scale-105">
        <img src={bloodbank} alt="Card 3" className="w-full h-auto mb-4 rounded-md" />
        <p className="text-3xl  text-center font-bold relative z-10">Bloodbank</p>
      </div>
    </div>
  </div>
  )
}

export default Landing