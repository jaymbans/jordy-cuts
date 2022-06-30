import React from 'react';
import { useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { email, password } = formData;

  // dispatch and grab global state
  const dispatch = useDispatch();
  const { user, isLoading, isSuccess, isMessage } = useSelector(state => state.auth)

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password
    }
    dispatch(login(userData))
  }

  return (
    <>
      <section className="heading">
        <FaSignInAlt /> Login
        <p>Sign In Below</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input required type="email" value={email}
              name="email" id="email" className="form-control" placeholder='Enter Email' onChange={onChange} />
            <input required type="password" value={password}
              name="password" id="password" className="form-control" placeholder='Enter Password' onChange={onChange} />
          </div>
          <div className="form-group">
            <button className="btn btn-block">
              Login
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login