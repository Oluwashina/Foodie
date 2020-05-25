import React, { Component } from 'react';
import Navbar from '../layouts/Navbar'


class OrderHistory extends Component {
    state = {

      }
    render() { 
        // const data = "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"
        return ( 
            <React.Fragment>
                <Navbar />
                <div className="container">
                   <div className="card" style={{marginTop: 20}}>
                       {/* <img src={`data:image/jpeg;base64,${data}`} alt="barcode" /> */}
                       <div className="card-content">
                            <span className="card-title center green-text text-darken-1">COMPLETED</span>
                            <p className="center">Your order is now completed. We hope you enjoyed it!</p>                           
                        </div>  
                        <div className="progresy">
                            <ul className="progresy-ul">
                                <li>
                                    <i className="fa fa-check white-text"></i>
                                    <p>SUBMITTED</p>
                                    <p>10:20</p>
                                </li>
                                <li>
                                    <i className="fa fa-check white-text"></i>
                                    <p>READY</p>
                                    <p>10:46</p>
                                </li>
                            </ul>
                        </div>
                        <div className="card-action center">
                        <button style={{textTransform: 'initial'}} className="btn white grey-text text-darken-1 z-depth-0"><i className="material-icons left">refresh</i>Update Order Information</button>
                        </div>
                   </div>

                   {/* order details */}
                   <div className="card">
                       <div className="card-content">
                           <span className="card-title" style={{fontWeight: 600}}>Li Ji Coffee House</span>

                           <div className="row">
                               <div className="col s6 l6">
                                   <p>PickUp #:</p>
                               </div>
                               <div className="col s6 l6">
                                   <p>FO17</p>
                               </div>
                           </div>

                           <div className="row">
                               <div className="col s6 l6">
                                   <p>Order Type:</p>
                               </div>
                               <div className="col s6 l6">
                                   <p>Eat In</p>
                               </div>
                           </div>

                           <div className="row">
                               <div className="col s6 l6">
                                   <p>Transaction time</p>
                               </div>
                               <div className="col s6 l6">
                                   <p>04 Mar, 10:20</p>
                               </div>
                           </div>

                           <div className="row">
                               <div className="col s6 l6">
                                   <p>Transaction Ref</p>
                               </div>
                               <div className="col s6 l6">
                                   <p>AR7HX3A38R</p>
                               </div>
                           </div>

                           <div className="row">
                               <div className="col s6 l6">
                                   <p>Payment Method</p>
                               </div>
                               <div className="col s6 l6">
                                   <p>Stripe</p>
                               </div>
                           </div>
                       </div>
                       <div className="card-action">
                       <div className="row">
                        <div className="col s3 l3">
                            <img src="img/food1.jpg" width="200" height="30" alt="" className="responsive-img" />
                        </div>
                        <div className="col s6 l6">
                            <span className="card-title" style={{fontWeight: 600}}>Coffee</span>
                            <p>Less Sugar</p>
                            <p style={{fontWeight: 600}}>$1.30</p>
                        </div>
                        <div className="col s3 l3">
                            <p style={{fontWeight: 600}}>1x</p>
                        </div>
                        </div>
                       </div>
                   </div>

                </div>
            </React.Fragment> 
        );
    }
}
 
export default OrderHistory;