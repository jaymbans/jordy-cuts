import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate();

  const { email, password } = formData;

  // dispatch and grab global state
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // redirection
    if (isSuccess && user) {
      navigate('/')
    }

    dispatch(reset())
  }, [isError, isSuccess, user, message, navigate, dispatch])

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

  if (isLoading) {
    return <Spinner />
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
            <button className="btn btn-block bk-blue">
              Login
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login