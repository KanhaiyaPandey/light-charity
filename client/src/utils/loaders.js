import { redirect } from "react-router-dom";
import { customFetchDonor } from "./helper";

export const DonordashboardLoader = async () =>{
    try {
      const {data} = await customFetchDonor.get("/donor/current-donor");
      console.log(data);
      return data;
    } catch (error) {
     return redirect("/donor/login");
    }
 }