import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { viewTicket, closeTicket, reset } from '../features/tickets/ticketSlice';
import { BackButton } from '../components/BackButton';
import Spinner from '../components/Spinner';

function Ticket() {
  const { ticket, isLoading, isSuccess, isError, message } = useSelector((state) => state.tickets);

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ticketId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(viewTicket(ticketId))
    // eslint-disable-next-line
  }, [isError, message, ticketId])

  // close ticket
  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success('Cut Request Closed');
    navigate('/tickets')
  }


  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Error fetching cut</h3>
  }

  return (
    <div className='ticket-page'>
      <header className="ticket-header">
        <BackButton url='/tickets' />
        <h2>
          Cut Type: {ticket.product}
          <br />
        </h2>
        <h3>
          Cut Request ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h3>
        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleDateString('en-US')}
        </h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description / Extra Details</h3>
          <p>{ticket.description}</p>
        </div>
      </header>

      {ticket.status !== 'closed' &&
        (<button
          onClick={onTicketClose}
          className='btn btn-block btn-danger'>
          Close Cut Request
        </button>)}
    </div>
  )
}

export default Ticket