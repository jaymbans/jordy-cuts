import { Link } from 'react-router-dom';
import { GiOfficeChair } from 'react-icons/gi';
import { TiScissorsOutline } from 'react-icons/ti'

function Home() {
  return (
    <>
      <section className='heading'>
        <h1>Welcome to Jordy Cuts</h1>
        <p>Please choose an option below</p>
      </section>

      <Link to='/new-ticket' className='btn  btn-block bk-blue'>
        <TiScissorsOutline /> Schedule Cut
      </Link>
      <Link to='/tickets' className='btn btn-reverse btn-block '>
        <GiOfficeChair /> View My Cut Requests
      </Link>
    </>
  )
}

export default Home