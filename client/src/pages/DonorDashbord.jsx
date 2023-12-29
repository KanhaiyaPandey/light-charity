import DonorHeroSection from "../components/DonorHeroSection"
import Navbar from "./Navbar"



const DonorDashbord = () => {
  return (
   <>
   <Navbar/>
  <section className="align-element py-20">
    <DonorHeroSection/>
  </section>
   
   </>
  )
}

export default DonorDashbord