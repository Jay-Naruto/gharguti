import React from 'react';
import { API } from '../config';

const ShowImage = ({ item, url,product }) => (
  <div style={{position:'relative',zIndex:1}}>
    {/* {
                  item.five > item.one && item.five > item.two && item.five > item.three && item.five > item.four ?
                   <img className='crown' src='./asset/king.png' alt=''/>
                   :
                   <img src='' alt=''/>
                } */}
  <div className='product-img' style={{height: '250px',position:'relative'}}>
   
    <img
      src={item.photo}
      alt={item.name}
      className='mb-3'
      style={{ objectFit: 'contain', height: '100%', width: '100%', display: 'flex', marginLeft: 'auto',
       marginRight: 'auto',position:'relative' }}
    />
   
  </div>
</div>);

export default ShowImage;
