import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom'
import M from 'materialize-css';
import {connect} from 'react-redux';
import {signOut} from '../../store/actions/authAction'
import {shopDetails} from '../../store/actions/shopAction'

class Navbar extends Component {
    state = { 

     }
      componentDidMount(){
        let sidenav = document.querySelector('#slide-out');
        M.Sidenav.init(sidenav, {});
        this.props.shop()
     }
    render() { 
        const {count, name} = this.props
        return ( 
            <React.Fragment>
            <div className="navbar-fixed">
                    <nav className="nav-wrapper nav-color">
                <div className="container">
                <Link to="/home" className="brand-logo white-text" style={{fontSize: 15}}>{name.brandName}</Link>
                <a href="/#" data-target="slide-out" className="sidenav-trigger">
                        <i className="material-icons">menu</i>
                 </a>
                <ul className="right">
                    <li className="hide-on-med-and-down"><NavLink className="white-text" to="/home">Menu</NavLink></li>
                    <li className="hide-on-med-and-down"><NavLink className="white-text" to="/about">About</NavLink></li>
                     <li className="hide-on-med-and-down"><NavLink className="white-text" to="/orders">Orders</NavLink></li>
                    <li className="hide-on-med-and-down"><NavLink className="white-text" to="/" onClick={this.props.signOut}>Logout</NavLink></li>
                    {/* <li><NavLink to="/summary" className="btn btn-floating transparent z-depth-0"><i className="material-icons">shopping_cart</i><span>55</span></NavLink></li> */}
                    <li><NavLink to="/summary" style={{marginTop: 5}} href=""><span><i className="material-icons left">shopping_cart</i></span><span className="cart-count">{count}</span></NavLink></li>
                 </ul>
                </div>
              </nav>
            </div>
             <ul id="slide-out" className="sidenav sidenav-close nav-color">
            <li><div className="user-view">
                <h5 className="white-text center">{name.brandName}</h5>
                </div></li>
             <li><NavLink to="/home" className="white-text">Menu</NavLink></li>
             <li><NavLink to="/about" className="white-text">About</NavLink></li>
             <li><NavLink to="/orders" className="white-text">Orders</NavLink></li>
             <li><NavLink to="/" onClick={this.props.signOut} className="white-text">Logout</NavLink></li>
            </ul>
            </React.Fragment>
         );
    }
}

const mapStateToProps = (state) =>{
    return{
        count: state.item.addedItems.length,
        name: state.shop.shopDetails
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        signOut: () => dispatch(signOut()),
        shop: () => dispatch(shopDetails())
    }
} 
 
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);