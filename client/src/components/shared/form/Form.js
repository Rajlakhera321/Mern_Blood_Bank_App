import React, { useState } from 'react'
import InputType from './InputType';
import { Link } from 'react-router-dom';
import { handleLogin, handleRegister } from '../../../services/authServices';

const Form = ({ formType, submitBtn, formTitle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('donar');
  const [name, setName] = useState('');
  const [organisationName, setOrganisationName] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [website, setWebiste] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  return (
    <div>
      <form onSubmit={(e) => {
        console.log(formType, "formtype");
        if (formType === 'login') return handleLogin(e, email, password, role);
        else if (formType === 'register') return handleRegister(e, name, role, email, password, organisationName, hospitalName, address, phone)
      }}>
        <h1 className='text-center'>{formTitle}</h1>
        <hr />
        <div className='d-flex mb-3'>
          <div className='form-click ms-2'>
            <input type='radio' className='form-check-input' id='donarRadio' name='role' value={'donar'} onChange={e => setRole(e.target.value)} defaultChecked/>
            <label htmlFor='donarRadio' className='form-check-label'>
              Donar
            </label>
          </div>
          <div className='form-click ms-2'>
            <input type='radio' className='form-check-input' id='adminRadio' name='role' value={'admin'} onChange={e => setRole(e.target.value)} />
            <label htmlFor='adminRadio' className='form-check-label'>
              Admin
            </label>
          </div>
          <div className='form-click ms-2'>
            <input type='radio' className='form-check-input' id='hospitalRadio' name='role' value={'hospital'} onChange={e => setRole(e.target.value)} />
            <label htmlFor='hospitalRadio' className='form-check-label'>
              Hospital
            </label>
          </div>
          <div className='form-click ms-2'>
            <input type='radio' className='form-check-input' id='organisationRadio' name='role' value={'organisation'} onChange={e => setRole(e.target.value)} />
            <label htmlFor='organisationRadio' className='form-check-label'>
              Organisation
            </label>
          </div>
        </div>
        {(() => {
          switch (true) {
            case formType === 'login': {
              return (
                <>
                  <InputType labelText={'Email'} labelFor={'forEmail'} inputType={'email'} name={'email'} value={email} onChange={e => setEmail(e.target.value)} />
                  <InputType labelText={'Password'} labelFor={'forPassword'} inputType={'password'} name={'password'} value={password} onChange={e => setPassword(e.target.value)} />
                </>
              )
            }
            case formType === 'register': {
              return (
                <>
                  {(role === "admin" || role === "donar") && (
                    <InputType labelText={'Name'} labelFor={'forName'} inputType={'text'} name={'name'} value={name} onChange={e => setName(e.target.value)} />
                  )}
                  {role === 'organisation' && (
                    <InputType labelText={'Organisation Name'} labelFor={'forOrganisationName'} inputType={'text'} name={'organisationName'} value={organisationName} onChange={e => setOrganisationName(e.target.value)} />
                  )}
                  {role === 'hospital' && (
                    <InputType labelText={'Hospital Name'} labelFor={'forHospitalName'} inputType={'text'} name={'hospitalName'} value={hospitalName} onChange={e => setHospitalName(e.target.value)} />
                  )}
                  <InputType labelText={'Email'} labelFor={'forEmail'} inputType={'email'} name={'email'} value={email} onChange={e => setEmail(e.target.value)} />
                  <InputType labelText={'Password'} labelFor={'forPassword'} inputType={'password'} name={'password'} value={password} onChange={e => setPassword(e.target.value)} />
                  <InputType labelText={'Website'} labelFor={'forWebsite'} inputType={'text'} name={'website'} value={website} onChange={e => setWebiste(e.target.value)} />
                  <InputType labelText={'Address'} labelFor={'forAddress'} inputType={'text'} name={'address'} value={address} onChange={e => setAddress(e.target.value)} />
                  <InputType labelText={'Phone'} labelFor={'forPhone'} inputType={'text'} name={'phone'} value={phone} onChange={e => setPhone(e.target.value)} />
                </>
              )
            }
          }
        })()}

        <div className="d-flex flex-row justify-content-between">
          {formType === 'login' ? (
            <p>Not registered yet ? Register
              <Link to='/register'> Here !</Link>
            </p>
          ) : (
            <p>Already user exists
              <Link to='/login'> Login !</Link>
            </p>
          )}
          <button className='btn btn-primary' type='submit'>
            {submitBtn}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Form