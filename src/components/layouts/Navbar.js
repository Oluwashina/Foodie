import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom'
import M from 'materialize-css';
import {connect} from 'react-redux';
import {signOut} from '../../store/actions/authAction'

class Navbar extends Component {
    state = { 

     }
      componentDidMount(){
        let sidenav = document.querySelector('#slide-out');
        M.Sidenav.init(sidenav, {});
     }
    render() { 
        return ( 
            <nav className="nav-wrapper nav-color">
                <div className="container">
                <Link to="/dashboard" className="brand-logo white-text">Foodie</Link>
                <a href="/#" data-target="slide-out" className="sidenav-trigger">
                        <i className="material-icons">menu</i>
                 </a>
                <ul className="right">
                    <li className="hide-on-med-and-down"><NavLink className="white-text" to="/dashboard">Home</NavLink></li>
                    <li className="hide-on-med-and-down"><NavLink className="white-text" to="/orders">Orders</NavLink></li>
                    {/* <li><NavLink to="/" className="btn btn-floating grey darken-1">OP</NavLink></li> */}
                    <li><NavLink to="/"><i className="material-icons">shopping_cart</i></NavLink></li>
                    <li className="hide-on-med-and-down"><NavLink className="white-text" to="/" onClick={this.props.signOut}>Logout</NavLink></li>
                 </ul>

                {/* mobile menu */}
                 <ul id="slide-out" className="sidenav sidenav-close">
                    <li><NavLink to="/dashboard">Home</NavLink></li>
                    <li><NavLink to="/orders">Orders</NavLink></li>
                    <li><NavLink to="/" onClick={this.props.signOut}>Logout</NavLink></li>
                </ul>

                </div>
            </nav>
         );
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        signOut: () => dispatch(signOut())
    }
} 
 
export default connect(null, mapDispatchToProps)(Navbar);