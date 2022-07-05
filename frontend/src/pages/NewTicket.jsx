import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createTicket, reset } from '../features/tickets/ticketSlice';
import Spinner from '../components/Spinner';
import { BackButton } from '../components/BackButton';

function NewTicket() {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.tickets)

  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [product, setProduct] = useState('Buzzcut');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      navigate('/tickets')
    }

    dispatch(reset())
  }, [dispatch, isError, isSuccess, navigate, message])


  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createTicket({ product, description }))


  }

  if (isLoading) {
    return <Spinner />
  }


  return (
    <>
      <BackButton url='/' />
      <section className="heading">
        <h1>Request a Cut</h1>
        <p>Please choose a cut a provide any extra necessary details</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input type="text" value={name} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="email">Customer Email</label>
          <input type="text" value={email} disabled />
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">Type of Cut</label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={(e) => {
                setProduct(e.target.value)
              }}>
              <option value="Buzzcut">Buzzcut</option>
              <option value="Fade - Sides Only">Fade - Sides Only</option>
              <option value="Fade - Complete">Fade - Complete</option>
              <option value="Facial Hair">Facial Hair</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description (or any needed details)</label>
            <textarea
              name="description"
              id="description"
              className='form-control'
              placeholder='i.e: Fade Length, Beard Trim, Lineup Only'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <div className="form-group">
              <button className="btn btn-block bk-blue">
                Request Cut
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  )
}

export default NewTicket