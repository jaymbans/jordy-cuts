import { Link } from 'react-router-dom';
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa';

function Home() {
  return (
    <>
      <section className='heading'>
        <h1>How can we assist you?</h1>
        <p>Please choose an option below</p>
      </section>

      <Link to='/new-ticket' className='btn btn-reverse btn-block'>
        <FaQuestionCircle /> Create Ticket
      </Link>
      <Link to='/tickets' className='btn btn-block'>
        <FaTicketAlt /> Create Ticket
      </Link>
    </>
  )
}

export default Home