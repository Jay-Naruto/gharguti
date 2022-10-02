import { Button } from '@material-ui/core';
import React from 'react'
import  { useRef, useEffect, useState } from 'react';
import { Marker,Popup , useMapEvents,MapContainer,TileLayer} from 'react-leaflet'
import { Link, useLocation } from 'react-router-dom';
import Time from './Time';

function LocationMarker() {
  
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        // setData(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  
    return position === null ? null : (
      <Marker position={position} >
        <Popup>You are here</Popup>
      </Marker>
    )
  }
  
export default function Map() {
  let location = useLocation();
  console.log(location.data);
  return (
    <div>
         <div id="map">
    
    <MapContainer style={{height:500}} center={[0,0]} zoom={13} scrollWheelZoom={false}>
<TileLayer
 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>

 <LocationMarker/>

     <Marker position={[19.1090571,72.8342723]} >
 <Popup>"Im here"</Popup>
</Marker>
   

</MapContainer>
    </div>
    <Time/>
    <div className='go'>
    <Button color='primary' style={{textAlign:'center' , marginTop:30}} className=''>
    <Link to={{pathname:"/rate",
                  
                  data:location.data}}>
                Go back
                  </Link>
          </Button>
    </div>
   
    </div>
  )
}
