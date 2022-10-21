import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import Card from './Card';
import Checkout from './Checkout';

import Copyright from './Copyright';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);
  let location = useLocation();
console.log(location.data);
  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    return (
      <div>
        <h2>Your cart has {`${items.length}`} items</h2>
        <hr />
        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };

  const noItemsMessage = () => (
    <h2>
      Your cart is empty. <br /> <Link to='/shop'>Continue shopping</Link>
    </h2>
  );
const [mult,setMult]=useState(1);
  return (
    <Layout
      title='Shopping Cart'
      description='Manage your cart items. Add remove checkout or continue shopping.'
      className='container-fluid'
    >
      <div className='row'>
        {
          location.data ?
          <>
          <div className='col-md-2'></div>
        <div className='col-md-4'>
         <img style={{position:'relative',right:'50px',width:'100%'}} src={location.data.photo} alt=''/>
         <h2>Rs.&nbsp;&nbsp;{ mult * location.data.price}</h2>
        <div><input type="number" value={mult} defaultValue="1" onChange={(e)=>setMult(e.target.value)} step="0.5"/></div>


<div className='row'> <h3>Choose You Plan !</h3>
<div>
        <div><input type="radio" value="one-time" name="plan" /> one time order </div>
        <div><input type="radio" value="week" name="plan" /> Weekly Plan (Order same food product this day every week)</div>
        <div><input type="radio" value="month" name="plan" /> Monthly Plan (Order same food product this date every month)</div>
      </div>
</div>
        </div> 
        <div className='col-md-4'>
          <h2 className='mb-4'>Your cart summary</h2>
          <hr />
          <Checkout products={items} setRun={setRun} run={run} />
        </div>
        <div className='col-md-2'></div>
          </>
          :
          <h1>Your cart is empty! 😢  <a href='/'>Shop now!</a></h1>
        }
        
      </div>
      <Copyright />
    </Layout>
  );
};

export default Cart;
