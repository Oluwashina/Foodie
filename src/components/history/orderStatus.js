import React, { Component } from 'react';
import Navbar from '../layouts/Navbar'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import {orderList} from '../../store/actions/itemAction'
import {orderDetails} from '../../store/actions/itemAction'
import {orderStatus} from '../../store/actions/itemAction'
import Loader from 'react-loader-spinner'


class OrderHistory extends Component {
    state = {

      }

    componentDidMount(){
        this.props.Orders()
      }

      componentDidUpdate(prevProps){
          const {orderStatus, dishInfo} = this.props
        if (dishInfo !== prevProps.dishInfo) {
            orderStatus(dishInfo[0].baseInfo.id)
        }
        
      }

      viewDetails = (orderId, itemId) =>{
          this.props.orderDetails(orderId, itemId)
          this.props.history.push(`/order/details/${itemId}`)
      }

      updateOrderStatus = (orderId) =>{
         alert(orderId)
         this.props.orderStatus(orderId) 
      }

    render() { 

        const {dishInfo, loading, order_status, status_loader, status_time} = this.props

            if(loading) return <Loader
            type="Oval"
            color="#1565C0"
            height={50}
            width={50}
            className="center load"
            />

        
        const dishHistory = dishInfo.length ? (

            dishInfo.map(dish=> dish.dishInfos.map(dis =>{
                var unixTimestamp = dish.baseInfo.createTime;
                var dateObj = new Date(unixTimestamp * 1000); 
                            var utcString = dateObj.toUTCString();

                var time = utcString.slice(-24, -13);

                return(
                    <div className="card" key={dis.itemId} style={{marginTop: 20}}>
                    <div className="card-content">
                        <div className="row">
                            <div className="col s12 l12">
                            <span className="card-title" style={{fontWeight: 600}}>{dis.dishName}</span>
                            <p>Placed on {time}</p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col s6 l8">
                            <p style={{fontWeight: 600}}>{`QTY: ${dis.quantity}`}</p>
                            <p style={{fontWeight: 600, marginTop: 10}}>{`$${dis.price / 100}`}</p>
                            </div>
                            <div className="col s6 l4 right-align">
                            <button onClick={()=>{this.viewDetails(dish.baseInfo.id, dis.itemId)}} className="btn blue-text white text-darken-3 z-depth-0" style={{padding: 0, marginTop: 15}}>See Details</button>
                            </div>
                        </div>
                     </div>
                </div>
                )
            }))
        )
        : (
            <div className="card" style={{marginTop: 20}}>
                <div className="card-content">
                    <div className="center">
                    <img src="img/empty.svg" width="100" height="100" alt="Empty Order" />
                        <span className="card-title">No Orders Yet!!!</span>
                        <p>Looks like you haven't made your choice yet</p>
                        <Link to="/home" className="btn blue darken-3 z-depth-0" style={{marginTop: 20}} >Start Shopping</Link> 
                    </div>
                </div>
             </div>
        )

          // This is to calculate the order time of the most recent order placed
          if(dishInfo.length !== 0){
            var Timestamp = dishInfo[0].baseInfo.createTime;
            var date = new Date(Timestamp * 1000); 
            var utcStringTime = date.toUTCString();
    
            var recentOrderTime = utcStringTime.slice(-13, -7);
            var time = utcStringTime.slice(-24, -13);
            // orderStatus(dishInfo[0].baseInfo.id) 
        }
        // end of calculation


        // checking order status of the most recent order placed
            let status;
            if(order_status === 1){
                status = "Not Processed"
            }
            else if(order_status === 2){
                status = "CONFIRMED"
            }
            else if(order_status === 3){
                status = "COMPLETED"
            }
            else if(order_status === 4){
                status = "CANCELLED"
            }

            // END OF CHECKING status check


            // display of status of recent order been placec
        const statusPage = dishInfo.length ? (
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
                         <p>{recentOrderTime}</p>
                     </li>
                     <li>
                         <i className="fa fa-check white-text"></i>
                             <p>{order_status === "" ? "PROCESSING" : status}</p>
                         <p>{status_time === "" ? "..." : status_time }</p>
                     </li>
                 </ul>
             </div>
             <div className="card-action center">
             <button onClick={()=>{this.updateOrderStatus(dishInfo[0].baseInfo.id)}} style={{textTransform: 'initial'}} className="btn white grey-text text-darken-1 z-depth-0">
                 {status_loader && (
                             <i
                             className="fa fa-circle-o-notch fa-spin left"
                             />
                             )}
                 {!status_loader && (<i className="material-icons left">refresh</i>) }Update Order Information
                 </button>
             </div>
        </div>
        ) : (
            <p></p>
        )

        // recently ordered items design
        const recentOrder = dishInfo.length ? (
            dishInfo[0].dishInfos.map(dish=>{
                return(
                    <div className="card" key={dish.itemId} style={{marginTop: 20}}>
                    <div className="card-content">
                        <div className="row">
                            <div className="col s12 l12">
                            <span className="card-title" style={{fontWeight: 600}}>{dish.dishName}</span>
                            <p>Placed on {time}</p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col s6 l8">
                            <p style={{fontWeight: 600}}>{`QTY: ${dish.quantity}`}</p>
                            <p style={{fontWeight: 600, marginTop: 10}}>{`$${dish.price / 100}`}</p>
                            </div>
                            <div className="col s6 l4 right-align">
                            <button onClick={()=>{this.viewDetails(dishInfo[0].baseInfo.id, dish.itemId)}} className="btn blue-text white text-darken-3 z-depth-0" style={{padding: 0, marginTop: 15}}>See Details</button>
                            </div>
                        </div>
                     </div>
                </div>
                )
            })
        ) : (
            <p></p>
        )

      

        return ( 
            <React.Fragment>
                <Navbar />
                <div className="container">
                    <div className="row">
                        <div className="col s12 l10 m10">

                        {statusPage}

                        {recentOrder}

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
                         <h5 style={{marginTop: 30}}>Past Orders</h5>  
                    
                        {dishHistory}


                        </div>
                    </div>
                    

                  

                </div>
            </React.Fragment> 
        );
    }
}


const mapStateToProps = (state) =>{
    return{
        dishInfo: state.item.orderHistory,
        loading: state.item.loading,
        order_status: state.item.order_status,
        status_loader: state.item.status_loader,
        status_time: state.item.status_time
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        Orders: () => dispatch(orderList()),
        orderDetails: (orderId, itemId) => dispatch(orderDetails(orderId, itemId)),
        orderStatus: (orderId) => dispatch(orderStatus(orderId))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);