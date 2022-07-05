import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const { name, email, password, password2 } = formData;

  // dispatch and grab global state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

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
    // password verification
    if (password !== password2) {
      toast.error('Please make sure your passwords match!')
    } else {
      const userData = {
        name,
        email,
        password
      }
      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <FaUser /> Register
        <p>Create an Account!</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input required type="text" value={name}
              name="name" id="name" className="form-control" placeholder='Enter Name' onChange={onChange} />
            <input required type="email" value={email}
              name="email" id="email" className="form-control" placeholder='Enter Email' onChange={onChange} />
            <input required type="password" value={password}
              name="password" id="password" className="form-control" placeholder='Enter Password' onChange={onChange} />
            <input required type="password" value={password2}
              name="password2" id="password2" className="form-control" placeholder='Re-enter Password' onChange={onChange} />
          </div>
          <div className="form-group">
            <button className="btn btn-block bk-red">
              Register
            </button>
          </div>
        </form>
      </section>
    </>
  )
}


export default Register