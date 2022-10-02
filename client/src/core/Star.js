import { Button } from '@material-ui/core';
import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import "../styles.css"
import { updateRate } from './apiCore';



// function Star( props ){
//     return (
//       <div className={`star ${(props.value == 0) ? 'semi-active' : ''} ${(props.position <= props.rated) ? 'active' : ''} `} 
//            onMouseEnter={ props.onMouseEnter }
//            onMouseLeave={ props.onMouseLeave }
//            onClick={ props.onClick }
  
//       >
//         <i className="fas fa-star"></i>
//       </div>
//     );
//   }
  
//   function Rating( props ){
//     const messages = {
//       "1": "Oh. Sorry you had a bad experience :( ",
//       "2": "We will try to improve.",
//       "3": "Appreciate it!",
//       "4": "Thank you!", 
//       "5": "You're Awesome!"
//     };
    
//     let rating = props.rating;
    
//     return(
//         <div className={"after-rating-message " + ((rating > 0) ? 'show': '')} >
//             <span>You rated this {rating} star{rating > 1 ? 's' : ''}</span>
//             <br/>
//             <span>{ messages[rating] }</span>
//         </div>
//     );
//   }
  
  
//   class RatingWidget extends React.Component {
//     constructor( props ) {
//       super( props );
//       this.state = {
//         stars: Array(5).fill(-1),
//         rated: 0
//       };
//     }
    
//     handleMouseOver( i ) {
//       let currentRating = this.state.rated;
      
//       if ( currentRating > 0 ) {
//         const hoverRatedStars = this.state.stars.slice();
//         _.fill( hoverRatedStars, 0, currentRating, i );
//         this.setState({ stars: hoverRatedStars });
//       }
//       else {
//         const hoverStars = Array(5).fill(-1);
//         _.fill( hoverStars, 0, 0, (i+1) );     
//         this.setState({ stars: hoverStars});
//       }
//     }
    
//     handleMouseOut() {
//       let currentRating = this.state.rated;
//       if ( currentRating > 0) {
//         const resetRatedStars = this.state.stars.slice();
//         _.fill( resetRatedStars, -1, currentRating, resetRatedStars.length );
//         this.setState({stars: resetRatedStars});
//       }
//       else {
//         const resetStars = this.state.stars.slice();
//         _.fill( resetStars, -1, 0, resetStars.length );
//         this.setState({stars: resetStars});
//       }
//     }
    
//     handleClick( i ) {
//       const clickedStar = this.state.stars.slice();
      
//       _.fill( clickedStar, 1, 0, i );
//       _.fill( clickedStar, 1, i, clickedStar.length );
        
//       this.setState({
//         stars: clickedStar,
//         rated: i
//       });
//     }
    
    
//     handleRating( rating ){
//       return (<Rating rating={this.state.rated} />)
//     }
    
//     renderStar( i ){
//       return (
//         <Star 
//           position={i}
//           value={this.state.stars[i]} 
//           rated={this.state.rated}
//           onMouseEnter={ () => this.handleMouseOver(i) }
//           onMouseLeave={ () => this.handleMouseOut() }
//           onClick={ () => this.handleClick(i) }
//           />
//       );
//     }
    
//     render(){
// // console.log(location.userProps);
//       return (
//         <>
        
//         <div className='rating-stars-widget-outer'>
//             <div className='rating-stars'>
//               {this.renderStar(1)}
//               {this.renderStar(2)}
//               {this.renderStar(3)}
//               {this.renderStar(4)}
//               {this.renderStar(5)}
//             </div>
          
//             {this.handleRating( this.state.rated )}
//         </div>
        
        
//     </>  );
//     }
//   }
export default function Stars() {
    const [additional,setAdditional]=useState({})
    let location = useLocation();
    console.log(location)
    const rate1=async(id)=>{

        await updateRate(
           {
               data:id,
               rate:1
           }
        );
        alert("Thanks for rating us!")
       }
      
       const rate2=async(id)=>{

        await updateRate(
           {
               data:id,
               rate:2
           }
        );
        alert("Thanks for rating us!")
       }
       const rate3=async(id)=>{

        await updateRate(
           {
               data:id,
               rate:3
           }
        );
        alert("Thanks for rating us!")
       }
       const rate4=async(id)=>{

        await updateRate(
           {
               data:id,
               rate:4
           }
        )
        ;
        alert("Thanks for rating us!")
       }
       const rate5=async(data)=>{

        await updateRate(
           {
               data:data,
               rate:5
           }
        );
        alert("Thanks for rating us!")
       }
  return (
    <div>
RATINGS
<div>
         {
            location.data ?
            <div style={{textAlign:'center', display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <div>
                    <img src={location.data.photo} alt=''/>
                </div>
                <div>
                    <h2>Please rate us</h2>
                </div>
                <div  style={{textAlign:'center', display:'flex',flexDirection:'row',width:500,justifyContent:'space-evenly',alignItems:'center'}}>
                    <div>
                        <img onClick={()=>rate1(location.data)} className='star' src='./asset/star1.png' alt=''/>
                    </div>
                    <div>
                        <img  onClick={()=>rate2(location.data)}   className='star' src='./asset/star2.png' alt=''/>
                    </div>
                    <div>
                        <img onClick={()=>rate3(location.data)}   className='star' src='./asset/star3.png' alt=''/>
                    </div>
                    <div>
                        <img onClick={()=>rate4(location.data)}   className='star' src='./asset/star4.png' alt=''/>
                    </div>
                    <div>
                        <img  onClick={()=>rate5(location.data)}  className='star' src='./asset/star5.png' alt=''/>
                    </div>
                </div>
                <div>
                    <Button color='secondary'>
                       <NavLink to={{pathname:'/'}}>
                        Home
                       </NavLink>

                    </Button>
                </div>
            </div>
            :null
         }
        </div>
        </div>
  )
}
