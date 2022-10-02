import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import {
  getProducts,
  getBraintreeClientToken,
  processPayment,
  createOrder,
} from './apiCore';
import { emptyCart } from './cartHelpers';
import Card from './Card';
import { isAuthenticated } from '../auth';
import { Link, NavLink, useLocation } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';

const Checkout = ({  setRun = (f) => f, run = undefined }) => {
  let location = useLocation();
console.log(location.data);
  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: '',
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
        setData({ ...data, error: data.error });
      } else {
        console.log(data);
        setData({ clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const handleAddress = (event) => {
    setData({ ...data, address: event.target.value });
  };

 
  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to='/signin'>
        <Button variant='contained' color='primary'>
          Sign in to checkout
        </Button>
      </Link>
    );
  };

  let deliveryAddress = data.address;

  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: '' })}>
      {data.clientToken !== null  ? (
        <div>
          <div className='gorm-group mb-3'>
            <label className='text-muted'>Delivery address:</label>
            <textarea
              onChange={handleAddress}
              className='form-control'
              value={data.address}
              placeholder='Type your delivery address here...'
            />
          </div>

          <DropIn
            options={{
              authorization: data.clientToken,
              paypal: {
                flow: 'vault',
              },
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <button  className='btn btn-success btn-block'>
            <Link to={{
       pathname:'/map',
       data:location.data
            }}
            >Pay</Link>
          </button>
        </div>
      ) : null}
    </div>
  );

  const showError = (error) => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const showSuccess = (success) => (
    <div
      className='alert alert-info'
      style={{ display: success ? '' : 'none' }}
    >
      Thanks! Your payment was successful!
    </div>
  );

  const showLoading = (loading) =>
    loading && <h2 className='text-danger'>Loading...</h2>;

  return (
    <div>
      {/* <h2>Total: ${getTotal()}</h2> */}
      {showLoading(data.loading)}
      {showSuccess(data.success)}
      {/* {showError(data.error)} */}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
