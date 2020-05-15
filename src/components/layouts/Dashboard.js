import React, { Component } from 'react';
import Navbar from './Navbar'
import Slider from './Slider'
import Select from './DeliveryOptions'
import SubCategory from './SubCategory'
import Footer from './Footer';
import {connect} from 'react-redux';
// import {Redirect} from 'react-router-dom';




class Dashboard extends Component {
    state = { 

     }
     componentDidMount(){
    
     }
    
    render() { 
        // const {auth} = this.props
        // if(!auth.uid) return <Redirect to="/" />
     
        return ( 
            <div>
                <Navbar/>
                <Slider/>
                <Select />
                <SubCategory />
                <Footer />
            </div>
         );
    }
}

const mapStateToprops = (state) =>{
    return{
        auth: state.firebase.auth,
    }
}

 
export default connect(mapStateToprops)(Dashboard);