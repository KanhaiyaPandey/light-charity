import { Form } from "react-router-dom"
import FormInput from "../components/FromInput"
import SubmitBtn from "../components/SubmitBtn"


const RegisterVerify = () => {
  return (
    <section className='h-screen grid place-items-center'>
    <Form
    method='post'
    className='card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'
  >
    <h4 className='text-center text-3xl font-bold'>Verify OTP</h4>
    <FormInput
      type='text'
      name='otp'
   />
    <div className='mt-4'>
      <SubmitBtn text='verify' />
    </div>
  </Form>
  </section>
  )
}

export default RegisterVerify