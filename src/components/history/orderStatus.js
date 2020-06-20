import React, { Component } from 'react';
import Navbar from '../layouts/Navbar'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {orderList} from '../../store/actions/itemAction'


class OrderHistory extends Component {
    state = {

      }

    componentDidMount(){
        this.props.Orders()
      }

    render() { 

        const {dishInfo} = this.props
        
        const dishHistory = dishInfo.length ? (

            dishInfo.map(dish=> dish.dishInfos.map(dis =>{
                var unixTimestamp = dish.baseInfo.createTime;
                var dateObj = new Date(unixTimestamp * 1000); 
                            var utcString = dateObj.toUTCString();

                var time = utcString.slice(-24, -13);

                return(
                    <div className="card" key={dis.itemId}>
                    <div className="card-content">
                        <div className="row">
                            <div className="col s8 l8">
                            <span className="card-title" style={{fontWeight: 600}}>{dis.dishName}</span>
                            <p>Placed on {time}</p>
                            </div>
                            <div className="col s4 l4 right-align">
                                <p style={{fontWeight: 600}}>{`${dis.quantity}x`}</p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col s6 l8">
                            <p style={{fontWeight: 600, marginTop: 10}}>{`$${dis.price / 100}`}</p>
                            </div>
                            <div className="col s6 l4 right-align">
                            <Link to={`orders/${dish.baseInfo.id}`}className="btn blue-text white text-darken-3 z-depth-0" style={{padding: 0}}>See Details</Link>
                            </div>
                        </div>
                     </div>
                </div>
                )
            }))
        )
        : (
            <p>Looks like you have no items in your cart</p>
        )

        return ( 
            <React.Fragment>
                <Navbar />
                <div className="container">
                   <div className="card" style={{marginTop: 20}}>
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

                           {/* <div className="row">
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
                           </div> */}
                         <h5 style={{marginTop: 30}}>My Orders</h5>  
                    
                   {dishHistory}

                </div>
            </React.Fragment> 
        );
    }
}


const mapStateToProps = (state) =>{
    return{
        dishInfo: state.item.orderHistory
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        Orders: () => dispatch(orderList()),
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);