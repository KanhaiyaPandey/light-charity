import { Form, Link } from "react-router-dom"
import FormInput from "../components/FromInput"
import SubmitBtn from "../components/SubmitBtn"


const Login = () => {
  return (
    <section className='h-screen grid place-items-center'>
    <Form
      method='post'
      className='card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'
    >
      <h4 className='text-center text-3xl font-bold'>Login</h4>
      <FormInput
        type='email'
        label='email'
        name='email'
      />
      <FormInput
        type='password'
        label='password'
        name='password'
      />
      <div className='mt-4'>
        <SubmitBtn text='login' />
      </div>
      <p className='text-center'>
        Not a member yet?
        <Link
          to='/donor/register'
          className='ml-2 link link-hover link-primary capitalize'
        >
          register
        </Link>
      </p>
    </Form>
  </section>
  )
}

export default Login