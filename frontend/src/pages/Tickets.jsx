import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { viewTickets, reset } from '../features/tickets/ticketSlice';
import Spinner from '../components/Spinner';
import { BackButton } from '../components/BackButton';
import TicketItem from '../components/TicketItem';

function Tickets() {
  const { tickets, isLoading, isSuccess } = useSelector((state) => state.tickets);
  const dispatch = useDispatch();

  // unmount
  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])

  useEffect(() => {
    dispatch(viewTickets())
  }
    , [dispatch])


  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <BackButton url='/' />
      <h1>My Cuts</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Request Date</div>
          <div>Cut Type</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets.map((ticket) => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  )
}

export default Tickets