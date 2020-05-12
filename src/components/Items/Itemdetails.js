import React, { Component } from 'react';
import Navbar from '../layouts/Navbar';
import M from 'materialize-css';
import {connect} from 'react-redux';
import {Increment} from '../../store/actions/itemAction'
import {Decrement} from '../../store/actions/itemAction'


class ItemDetails extends Component {
    state = { 
        disabled: false
     }

     addBasket = () =>{
       this.props.history.push("/summary")
     }

     componentDidMount(){
        let Materialbox = document.querySelector('.materialboxed');
        M.Materialbox.init(Materialbox, {});
     }
     incrementClick = () =>{
         this.props.Increment()
     }
     decrementClick = () =>{
         this.props.Decrement()
     }
    render() { 
        const {count, price} = this.props
        return ( 
            <React.Fragment>
             <Navbar />
                <div className="container section">
                    <div className="row">
                         <div className="col s12 l6 m6">
                            <div className="card medium">
                            <div className="card-image">
                                <img src="../img/food1.jpg" className="responsive-img materialboxed" alt="third" />
                            </div>
                            <div className="card-content">
                                <div className="row">
                                    <div className="col l6 s6">
                                        <span className="card-title" style={{fontWeight: 500}}>Noodles</span>
                                    </div>
                                    <div className="col l6 s6 right-align">
                                    <span className="card-title" style={{fontWeight: 500}}>$2.80</span>
                                    <p>Base Price</p>
                                    </div>
                                </div>              
                            </div>
                        </div>
                     </div>
                     <div className="col s12 l6 m6">
                         <div className="card z-depth-1">
                            <div className="card-content">
                                <span className="card-title" style={{fontWeight: 500}}>Top up into Set <span style={{fontSize: 18}}>(Pick 1)</span></span>
                                <div className="row">
                                    <div className="col l6 s6">
                                            <p>
                                        <label>
                                            <input className="with-gap" name="group1" type="radio" checked />
                                            <span>Toast Only</span>
                                        </label>
                                        </p>
                                    </div>
                                    <div className="col l6 s6 right-align">
                                        0.00
                                    </div>
                                </div>
                                {/* second row */}
                                <div className="row">
                                    <div className="col s6 l6">
                                            <p>
                                        <label>
                                            <input className="with-gap" name="group1" type="radio" checked />
                                            <span>2 Eggs & Coffee</span>
                                        </label>
                                        </p>
                                    </div>
                                    <div className="col s6 l6 right-align">
                                        +2.00
                                    </div>
                                </div>
                                {/* third row */}
                                <div className="row">
                                    <div className="col s6 l6">
                                            <p>
                                        <label>
                                            <input className="with-gap" name="group1" type="radio" checked />
                                            <span>2 Eggs & Tea</span>
                                        </label>
                                        </p>
                                    </div>
                                    <div className="col s6 l6 right-align">
                                        +2.00
                                    </div>
                                </div>
                              
                              <span className="card-title" style={{fontWeight: 500}}>Special Instructions <span style={{fontSize: 18}}>(Optional)</span></span>
                              <p>For self pick-ups, you won't be able to add special instructions after placing your order</p>
                              
                            <div className="input-field">
                              <input placeholder="E.g No onions please" id="specs" type="text" />
                             </div>        
                            </div> 
                            <div className="card-action center">
                                <button onClick={this.decrementClick} disabled={count === 1} className="btn z-depth-1 white green-text"  style={{marginRight: 15}}><i className="material-icons">remove</i></button>
                                <span style={{fontWeight: 600}}>{count}</span>
                                <button onClick={this.incrementClick} className="btn z-depth-1 white green-text" style={{marginLeft: 15}}><i className="material-icons">add</i></button>
                            </div>
                         </div>
                         {/* add to basket */}
                         <div className="center">
                         <button onClick={this.addBasket} className="waves-effect btn btn-style blue darken-3 z-depth-0"><i className="material-icons left">shopping_cart</i>Add to Basket - {`$${price.toFixed(2)}`}</button>
                         </div>
                    </div>
                 </div>       
            </div>
            </React.Fragment>
         );
    }
}

const mapStateToProps = (state) =>{
    return{
        count: state.item.count,
        price: state.item.pricesum,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        Increment : () => dispatch(Increment()),
        Decrement : () => dispatch(Decrement()),
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(ItemDetails);