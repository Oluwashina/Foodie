import React, {useState,useEffect} from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import socketIOClient from 'socket.io-client';
import {payUpdate} from '../../store/actions/itemAction'




function QRCode(props){
        const [endpoint] = useState('https://vast-brook-06837.herokuapp.com')
        const {imageUrl, amount, payUpdate, status} = props

        useEffect(()=>{
        const socket = socketIOClient(endpoint, { transports : ['websocket'] });
            socket.on('message', function(data){
                console.log(data)
                payUpdate(data)
            })
        })
        
         // Route for successful payment using the paynow method
         if(status === "successful"){
            return <Redirect to="/success" />
         }
         else if(status === "failed"){
             return <Redirect to="/error" />
         }

    return(

        <div className="container load">
        <h5 className="center">SRDD-包含消费税测试</h5>
        <div className="row valign-wrapper">
          <div className="col card hoverable s12 m8 pull-m2 l6 pull-l3">
          <div className="center">
              <div>
               <img src="img/PayNow-1.png" className="" alt="payNow" width="100" height="50" />
              </div>
              <span className="card-title">Scan the QR Code to Pay</span>
              </div>

              <div className="center">
              <img src={ imageUrl !== "" ? imageUrl : "https://api.omise.co/charges/chrg_test_5jk1z6feqzjjwmv3sjw/documents/docu_test_5jk1z6gu8bdhi9qgns1/downloads/2E9ED1F9736CC77B"} alt="qr" />
              </div>

          <p className="center" style={{fontWeight: 600}}>SGD {amount}</p>
              </div>
          </div>         
      </div>
    )
}


const mapStateToProps = (state) =>{
    return{
        imageUrl: state.item.downloadUrl,
        amount: state.item.total,
        status: state.item.paynow_status
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        payUpdate: (data) => dispatch(payUpdate(data)),
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(QRCode);