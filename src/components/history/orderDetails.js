import React from 'react';
import Navbar from '../layouts/Navbar'
import {connect} from 'react-redux'


function orderDetails(props){
    const {order, orderId} = props
    var unixTimestamp = orderId.baseInfo.createTime;
    var dateObj = new Date(unixTimestamp * 1000); 
                var utcString = dateObj.toUTCString();

    var time = utcString.slice(-24, -13);
    return(
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
    )
}


const mapStateToProps = (state, ownProps) =>{
    let id = ownProps.match.params.id;
    return{
        orderId: state.item.order,
        order: state.item.order.dishInfos.find(item => item.itemId === id),
    }
}

 
export default connect(mapStateToProps)(orderDetails);