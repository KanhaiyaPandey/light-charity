/* eslint-disable no-unused-vars */
import { redirect } from "react-router-dom";
import { customFetch } from "./helper";
import { toast } from 'react-toastify';

export const RegisterAction = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      const response = await customFetch.post('/donor/auth/register', data);
      toast.success('account created successfully');
      return redirect('/donor/login');
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        'please double check your credentials';
  
      toast.error(errorMessage);
      return null;
    }
  };

  export const loginAction = async ({request}) =>{
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    
    try {
        await customFetch.post('/donor/auth/login', data);
        toast.success('Logged in successful');
        return redirect('/dashboard');
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.msg);
        return error;
      }
  };