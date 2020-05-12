import React, { Component } from 'react';
import Navbar from '../layouts/Navbar';
import StripeCheckout from 'react-stripe-checkout'
// import axios from 'axios';
import {ToastsContainer, ToastsStore} from 'react-toasts';

class Summary extends Component {
    state = { 
        product:{
            name: "Set B - Toast",
            price: 2.80
        }
     }
handleToken = (token) =>{
    console.log({token})
    // const {product} = this.state
    // axios.post("http://localhost:4000/charge", 
    //     {token,product}
    //     ).then((response)=>{
    //      console.log("Response:", response.data);
    //      const {status} = response.data
    //      if(status === 'success'){
    //          ToastsStore.success("Success! Check email for details");
    //      }
    //      else{
    //          ToastsStore.error("Something went wrong!");
    //      }
    //  }).catch((err)=>{
    //     console.log(err);
    // });
}

    render() { 
        return ( 
            <React.Fragment>
                <Navbar />
                <div className="container">
                <ToastsContainer store={ToastsStore}/>
                    <div className="row">
                        <div className="col s12 l10 m10">
                            <div className="card z-depth-1">
                                <div className="card-content">
                                    <div className="row">
                                    <div className="col s6 l6">
                                        <span className="card-title">Order Summary</span>
                                    </div>
                                    <div className="col s6 l6 right-align">
                                    <button className="btn z-depth-0 white green-text" style={{padding: 0}}>Add items</button>
                                    </div>
                                    </div>
                                    {/* item details list */}
                                    <div className="row">
                                        <div className="col s2 l2">
                                            <p className="green-text">1x</p>
                                        </div>
                                        <div className="col s6 l6">
                                           <p style={{fontWeight: 600}}>Set B - French Toast</p>
                                           <p>Toast Only</p>
                                           <button style={{padding: 0}} className="btn z-depth-0 white green-text">Edit</button>
                                        </div>
                                        <div className="col s4 l4 right-align">
                                           <p style={{fontWeight: 600}}>$2.80</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-action">
                                    <div className="row">
                                        <div className="col s6 l6">
                                            <span className="card-title">Subtotal</span>
                                        </div>
                                        <div className="col s6 l6 right-align">
                                            <p style={{fontWeight: 600}}>$2.80</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* second row */}
                    <div className="row">
                        <div className="col s12 l10 m10">
                            <div className="card z-depth-1">
                                <div className="card-content">
                                    <div className="row">
                                        <div className="col s8 l6">
                                            <span className="card-title">Plastic Cutlery</span>
                                            <p>No cutlery provided.</p>
                                            <p>Thank you for reducing single-use plastic!</p>
                                        </div>
                                        <div className="col s4 l6 right-align">
                                            <div className="switch">
                                                <label>
                                                    <input type="checkbox" />
                                                    <span className="lever"></span>
                                                </label>
                                                </div>
                                        </div>
                                    </div>
                                    {/* payment method */}
                                    <span className="card-title">Payment Method</span>
                                    <img src="img/stripe.png" width="80" height="50" alt="stripe" className="responsive-img" />
                                </div>
                                <div className="card-action">
                                    <div className="row">
                                        <div className="col s6 l6">
                                            <span className="card-title">Total</span>
                                        </div>
                                        <div className="col s6 l6 right-align">
                                            <p style={{fontWeight: 600}}>$2.80</p>
                                        </div>
                                    </div>
                                     <div className="center">
                                         {/* <button style={{textTransform: 'initial'}} className="waves-effect btn green darken-1 z-depth-0">Place Order - Self Pick-up</button> */}
                                         <StripeCheckout
                                            stripeKey="pk_test_lD4fwMmmeJw5ZbIN1salJO1400rzkliycN"
                                            token={this.handleToken}
                                            billingAddress
                                            shippingAddress
                                            amount={2.80 * 100}
                                            name="Set B - Toast"
                                          />
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default Summary;