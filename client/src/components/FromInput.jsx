/* eslint-disable react/prop-types */


const FormInput = ({label, name, type, defaultValue, size, maxLength,  required }) => {
    return (
      <div className="form-control">
    <label className="label">
      <span className="label-text text-white capitalize">{label}</span>
    </label>
    <input type={type}
         name={name}
        defaultValue={defaultValue}
        maxLength={maxLength}
        required = {required}
      className={`input input-bordered ${size}` }/>
  </div>





    )
  }
  
  export default FormInput