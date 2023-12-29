/* eslint-disable no-unused-vars */
import { redirect } from "react-router-dom";
import { customFetchDonor } from "./helper";
import { toast } from 'react-toastify';

export const DonorRegisterAction = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      const response = await customFetchDonor.post('/auth/register', data);
      toast.success("A verification code has been sended to your email");
      return redirect('/donor/register/verification');
    } catch (error) {
      const errorMessage =
      error?.response?.data?.error?.message ||
     'an account is already existed by this email';
      toast.error(errorMessage);
      return null;
    }
  };



  export const DonorRegisterVerificationAction = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      const response = await customFetchDonor.post('/auth/register/verify', data);
      toast.success("Registerd Successfully");
      return redirect('/donor/dashboard');
    } catch (error) {
      const errorMessage =
      error?.response?.data?.error?.message ||
     'Otp is incorrect';
      toast.error(errorMessage);
      return null;
    }
  };




  export const DonorLoginAction = async ({request}) =>{
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    
    try {
        await customFetchDonor.post('/auth/login', data);
        toast.success('Logged in successful');
        return redirect('/donor/dashboard');
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.msg);
        return error;
      }
  };