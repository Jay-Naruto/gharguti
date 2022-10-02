import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { DriverSignUp, getProducts, getProductsssss } from './apiCore';
import Card from './Card';
import svg from  "./option.svg"
import Search from './Search';
import 'fontsource-roboto';
import Copyright from './Copyright';
import { API } from '../config';
import axios from 'axios';

const Home = () => {
  const [people,setPeople]=useState([])
  
    useEffect(()=>{
        const fetchData= async ()=>{
         const fetchBody=await fetch('http://localhost:5000/api/display-all');
         console.log(fetchBody);
      
        }
        const addDriverInfo=async()=>{
          await DriverSignUp({
            photo:"hdhhd.jpg",
              name:"to",
              description:"jfjf",
              quantity:46,
              price:6,
              category:'Rotis',
              stars:[1,2,3,4,3]
          })
            }
// addDriverInfo()     

            setTimeout(()=>{
              // fetchData();   

            },5000)
    },[])
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState([]);

  const loadProductsBySell = () => {
    getProductsssss().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts('createdAt').then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    // loadProductsByArrival();
    setTimeout(()=>{
      loadProductsBySell();

    },5000)
    
  }, []);
  // console.log(people)

  return (
    <Layout
     
      description='Ghar-guti'
      className='container-fluid'
    >
     <div>
                <img width="100%" height="600px"  src={svg} alt=""/>
            </div>
      <div className='row'>
        <div className='col-md-1'></div>
        <div className='col-md-11'>
           
            {/* {
              people ?
              <div>
                    {people.name}
              </div>:null
            }
          */}
          <div className='row'>
            {productsByArrival.map((product, i) => (
              <div key={i} className='col-xl-4 col-lg-6 col-md-6 col-sm-12'>
                <Card product={product} />
              </div>
            ))}
          </div>

       
          <div className='row'>
            {productsBySell.map((product, i) => (
              <div style={{display:'flex',flexDirection:'column'}}>
             {/* <h6>{product.description}</h6> */}
             <br></br>
              <div key={i} style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly',width:'100%'}}>
                <Card product={product} />
              </div>
              </div>
            ))}
          </div>
        </div>
        {/* <div className='col-md-1'></div> */}
      </div>

      {/* <Copyright /> */}
    </Layout>
  );
};

export default Home;
