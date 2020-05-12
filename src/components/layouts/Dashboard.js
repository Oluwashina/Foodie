import React, { Component } from 'react';
import Navbar from './Navbar'
import Slider from './Slider'
import SubCategory from './SubCategory'
import Footer from './Footer';
import {connect} from 'react-redux';
import {Menus} from '../../store/actions/itemAction'
// import {Redirect} from 'react-router-dom';




class Dashboard extends Component {
    state = { 

     }
     componentDidMount(){
        this.props.Menus()
     }
    
    render() { 
        // const {auth} = this.props
        // if(!auth.uid) return <Redirect to="/" />
        const {category} = this.props
        return ( 
            <div>
                <Navbar/>
                <Slider/>
                <SubCategory categories={category} />
                <Footer />
            </div>
         );
    }
}

const mapStateToprops = (state) =>{
    return{
        auth: state.firebase.auth,
        category: state.item.category
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        Menus : (hash) => dispatch(Menus(hash)),
    }
  }
 
export default connect(mapStateToprops, mapDispatchToProps)(Dashboard);