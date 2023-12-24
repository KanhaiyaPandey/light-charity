
import { Form, Link } from "react-router-dom"
import FormInput from "../components/FromInput";
import SubmitBtn from "../components/SubmitBtn";



const Register = () => {


  return (
      <section className='h-screen grid place-items-center'>
      <Form
        method='POST'
        className='card w-1/4 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'
      >
        <h4 className='text-center text-3xl font-bold'>Register</h4>
        <FormInput type='text' label='name' name='name' />
        <div className="form-control">
    <label htmlFor='bloodGroup' className="label">
      Blood Group
    </label>
    <select
      id='bloodGroup'
      name='bloodGroup'
      className= {`input input-bordered `}
    >
      <option value='A+'>A+</option>
      <option value='A-'>A-</option>
      <option value='B+'>B+</option>
      <option value='B-'>B-</option>
      <option value='AB+'>AB+</option>
      <option value='AB-'>AB-</option>
      <option value='O+'>O+</option>
      <option value='O-'>O-</option>
    </select>
      </div>

        <FormInput type='text' label='address' name='address' />
        <FormInput type='email' label='email' name='email' />
        <FormInput type='password' label='password' name='password' />
        
     
        <div className='mt-4'>
          <SubmitBtn text='register' />
        </div>
  
        <p className='text-center'>
          Already a member?
          <Link
            to='/donor/login'
            className='ml-2 link link-hover link-primary capitalize'
          >
            login
          </Link>
        </p>
      </Form>
    </section>
  )
};

export default Register;