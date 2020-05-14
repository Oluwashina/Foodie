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
        const {count} = this.props
        return ( 
            <nav className="nav-wrapper nav-color">
                <div className="container">
                <Link to="/home" className="brand-logo white-text">Foodie</Link>
                <a href="/#" data-target="slide-out" className="sidenav-trigger">
                        <i className="material-icons">menu</i>
                 </a>
                <ul className="right">
                    <li className="hide-on-med-and-down"><NavLink className="white-text" to="/home">Home</NavLink></li>
                    <li className="hide-on-med-and-down"><NavLink className="white-text" to="/orders">Orders</NavLink></li>
                    <li className="hide-on-med-and-down"><NavLink className="white-text" to="/" onClick={this.props.signOut}>Logout</NavLink></li>
                    {/* <li><NavLink to="/summary" className="btn btn-floating transparent z-depth-0"><i className="material-icons">shopping_cart</i><span>55</span></NavLink></li> */}
                    <li><NavLink to="/summary" style={{marginTop: 5}} href=""><span><i className="material-icons left">shopping_cart</i></span><span className="cart-count">{count}</span></NavLink></li>
                    {/* <li><a href="">Cart<span className="badge white blue-text text-darken-3">50</span></a></li> */}
                 </ul>

                {/* mobile menu */}
                 <ul id="slide-out" className="sidenav sidenav-close">
                    <li><NavLink to="/home">Home</NavLink></li>
                    <li><NavLink to="/orders">Orders</NavLink></li>
                    <li><NavLink to="/" onClick={this.props.signOut}>Logout</NavLink></li>
                </ul>

                </div>
            </nav>
         );
    }
}

const mapStateToProps = (state) =>{
    return{
        count: state.item.addedItems.length
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        signOut: () => dispatch(signOut())
    }
} 
 
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);