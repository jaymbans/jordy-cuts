import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice'

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className='header'>
      <div className="logo">
        <Link to='/'><span className='blue'>Jordy</span><span className='red'>Cuts</span></Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className="btn bk-red" onClick={onLogout}><FaSignOutAlt />Logout</button>
          </li>
        ) : (
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt className='blue' />
                <span className='blue'>
                  Login
                </span>
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser className='red' />
                <span className='red'>
                  Register
                </span>
              </Link>
            </li>
          </>
        )
        }

      </ul >
    </header >
  )
}

export default Header