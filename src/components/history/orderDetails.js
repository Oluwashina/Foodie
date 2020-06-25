import React, { Component } from 'react';
import Navbar from '../layouts/Navbar'
import {connect} from 'react-redux'
import {orderStatus} from '../../store/actions/itemAction'



class OrderDetails extends Component {
    state = { 

     }

    //  componentDidMount(){
    //      const {orderStatus, orderId} = this.props
    //     orderStatus(orderId.baseInfo.id)
    //   }

    render() { 
        console.log(this.props)
        const {order, orderId, loading, order_status, orderStatus, status_time} = this.props

        var unixTimestamp = orderId.baseInfo.createTime;
        var dateObj = new Date(unixTimestamp * 1000); 
                    var utcString = dateObj.toUTCString();
    
        var time = utcString.slice(-24, -7);
    
        var recentOrderTime = utcString.slice(-13, -7);

    
       
    
       const updateOrderStatus = (orderId) =>{
            orderStatus(orderId)
        }
    
        // checking order status of the most recent order placed
        let status;
        if(order_status === 1){
            status = "Not Processed"
        }
        else if(order_status === 2){
            status = "PENDING"
        }
        else if(order_status === 3){
            status = "CONFIRMED"
        }
        else if(order_status === 4){
            status = "COMPLETED"
        }
        else if(order_status === 5){
            status = "RETURNED"
        }
        else if(order_status === 6){
            status = "CANCELLED"
        }
    
        // END OF CHECKING status check

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
                                    <p>{recentOrderTime}</p>
                                </li>
                                <li>
                                    <i className="fa fa-check white-text"></i>
                                    <p>{status}</p>
                                    <p>{status_time}</p>
                                </li>
                            </ul>
                        </div>
                        <div className="card-action center">
                        <button onClick={()=>{updateOrderStatus(orderId.baseInfo.id)}} style={{textTransform: 'initial'}} className="btn white grey-text text-darken-1 z-depth-0">
                            {loading && (
                                        <i
                                        className="fa fa-circle-o-notch fa-spin left"
                                        />
                                        )}
                            {!loading && (<i className="material-icons left">refresh</i>) }Update Order Information
                         </button>
                        </div>
                   </div>

                   {/* viewing the order selected design */}
                   <div className="card">
                    <div className="card-content">
                        <div className="row">
                            <div className="col s12 l12">
                            <span className="card-title" style={{fontWeight: 600}}>{order.dishName}</span>
                            <p>Placed on {time}</p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col s12 l12">
                            <p style={{fontWeight: 600}}>{`QTY: ${order.quantity}`}</p>
                            <p style={{fontWeight: 600, marginTop: 10}}>{`$${order.price / 100}`}</p>
                            </div>
                        </div>
                     </div>
                </div>

            </div>
        </React.Fragment>
         );
    }
}


// function OrderDetails(props){

//     const {order, orderId, loading, order_status, orderStatus} = props


     


//     var unixTimestamp = orderId.baseInfo.createTime;
//     var dateObj = new Date(unixTimestamp * 1000); 
//                 var utcString = dateObj.toUTCString();

//     var time = utcString.slice(-24, -7);

//     var recentOrderTime = utcString.slice(-11, -7);

   

//    const updateOrderStatus = (orderId) =>{
//         alert(orderId)
//         orderStatus(orderId)
//     }

//     // checking order status of the most recent order placed
//     let status;
//     if(order_status === 1){
//         status = "Not Processed"
//     }
//     else if(order_status === 2){
//         status = "CONFIRMED"
//     }
//     else if(order_status === 3){
//         status = "COMPLETED"
//     }
//     else if(order_status === 4){
//         status = "CANCELLED"
//     }

//     // END OF CHECKING status check

//     return(
//         <React.Fragment>
//             <Navbar />
//             <div className="container">
//                 <div className="card" style={{marginTop: 20}}>
//                        <div className="card-content">
//                             <span className="card-title center green-text text-darken-1">COMPLETED</span>
//                             <p className="center">Your order is now completed. We hope you enjoyed it!</p>                           
//                         </div>  
//                         <div className="progresy">
//                             <ul className="progresy-ul">
//                                 <li>
//                                     <i className="fa fa-check white-text"></i>
//                                     <p>SUBMITTED</p>
//                                     <p>{recentOrderTime}</p>
//                                 </li>
//                                 <li>
//                                     <i className="fa fa-check white-text"></i>
//                                     <p>{order_status === "" ? "PROCESSING" : status}</p>
//                                     <p>10:46</p>
//                                 </li>
//                             </ul>
//                         </div>
//                         <div className="card-action center">
//                         <button onClick={()=>{updateOrderStatus(orderId.baseInfo.id)}} style={{textTransform: 'initial'}} className="btn white grey-text text-darken-1 z-depth-0">
//                             {loading && (
//                                         <i
//                                         className="fa fa-circle-o-notch fa-spin left"
//                                         />
//                                         )}
//                             {!loading && (<i className="material-icons left">refresh</i>) }Update Order Information
//                          </button>
//                         </div>
//                    </div>

//                    {/* viewing the order selected design */}
//                    <div className="card">
//                     <div className="card-content">
//                         <div className="row">
//                             <div className="col s12 l12">
//                             <span className="card-title" style={{fontWeight: 600}}>{order.dishName}</span>
//                             <p>Placed on {time}</p>
//                             </div>
//                         </div>

//                         <div className="row">
//                             <div className="col s12 l12">
//                             <p style={{fontWeight: 600}}>{`QTY: ${order.quantity}`}</p>
//                             <p style={{fontWeight: 600, marginTop: 10}}>{`$${order.price / 100}`}</p>
//                             </div>
//                         </div>
//                      </div>
//                 </div>

//             </div>
//         </React.Fragment>
//     )
// }


const mapStateToProps = (state, ownProps) =>{
    let id = ownProps.match.params.id;
    return{
        orderId: state.item.order,
        order: state.item.order.dishInfos.find(item => item.itemId === id),
        loading: state.item.status_loader,
        order_status: state.item.order_status,
        status_time: state.item.status_time
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        orderStatus: (orderId) => dispatch(orderStatus(orderId))
    }
}

 
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);