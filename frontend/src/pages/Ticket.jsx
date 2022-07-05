import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { RiChatNewLine } from 'react-icons/ri';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { viewTicket, closeTicket } from '../features/tickets/ticketSlice';
import { getNotes, createNote, reset as resetNotes } from '../features/notes/noteSlice';
import { BackButton } from '../components/BackButton';
import Spinner from '../components/Spinner';
import NoteItem from '../components/NoteItem';

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
}

Modal.setAppElement('#root')

function Ticket() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState('');

  const { ticket, isLoading, isSuccess, isError, message } = useSelector((state) => state.tickets);

  const { notes, isLoading: notesIsLoading } = useSelector((state) => state.notes);

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ticketId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(viewTicket(ticketId))
    dispatch(getNotes(ticketId))
    // eslint-disable-next-line
  }, [isError, message, ticketId])

  // close ticket
  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success('Cut Request Closed');
    navigate('/tickets')
  }

  // HANDLING MODAL BOX
  // modal box toggle
  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)
  // Note Submit
  const onNoteSubmit = (e) => {
    e.preventDefault();
    dispatch(createNote({ noteText, ticketId }))
    closeModal()
  }

  if (isLoading || notesIsLoading) {
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
        <h2>Notes</h2>
      </header>
      {ticket.status !== 'closed' &&
        (<button onClick={openModal} className='btn bk-blue'><RiChatNewLine />Add Note</button>)}

      {/* Modal Popup Section */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Add Note'>
        <h2>Add Note</h2>
        <button className='btn-close' onClick={closeModal}>X</button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              name="noteText"
              id="noteText"
              className='form-control'
              placeholder='add text'
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}>
            </textarea>
          </div>
          <div className="form-group">
            <button className="btn" type='submit'>Send Note</button>
          </div>
        </form>
      </Modal>

      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}

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