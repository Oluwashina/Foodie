import React, { Component } from 'react';
import Navbar from '../layouts/Navbar';
import M from 'materialize-css';
import {connect} from 'react-redux';
import {Increment} from '../../store/actions/itemAction'
import {Decrement} from '../../store/actions/itemAction'
import {addToCart} from '../../store/actions/itemAction'
import {dishMenuById} from '../../store/actions/itemAction'
import Loader from 'react-loader-spinner'


class ItemDetails extends Component {
    state = { 
        selectedOption: 'Toast Only',
        specs: '',
        checked: 0
     }

     onToppingsChange = (i,e) =>{
         console.log(i)
        this.setState({
            checked: i,
            selectedOption: e.target.value
          });
     }

     handleChange = (e) =>{
         this.setState({
             specs: e.target.value
         })
     }

     componentDidMount(){
         const {item} = this.props
        let Materialbox = document.querySelector('.materialboxed');
        M.Materialbox.init(Materialbox, {});
        this.props.dishMenuById(item.dishTypeId,this.props.match.params.id)
     }
     incrementClick = () =>{
         this.props.Increment()
     }
     decrementClick = () =>{
         this.props.Decrement()
     }
     addCartClick = (id, name) =>{
        M.toast({html: `${name} added to cart`, classes: 'green'})
        this.props.addToCart(id, this.state.selectedOption); 
        this.props.history.push("/summary")
    }
    render() { 
        console.log(this.props)
        const {count, item, price, dishattr, dishmenu, loading} = this.props

        const dishMenu = dishmenu.length ? (
            dishmenu.map(dish=>{
                return (
                    <div className="col s12 l6 m6" key={dish.id}>
                    <div className="card medium">
                    <div className="card-image">
                        <img src={dish.imgUrl} className="responsive-img materialboxed" alt="third" />
                    </div>
                    <div className="card-content">
                        <div className="row">
                            <div className="col l6 s6">
                                <span className="card-title" style={{fontWeight: 500}}>{dish.name}</span>
                            </div>
                            <div className="col l6 s6 right-align">
                            <span className="card-title" style={{fontWeight: 500}}>{`$${dish.price/100}`}</span>
                            <p>Base Price</p>
                            </div>
                        </div>              
                    </div>
                </div>
             </div>
                )
            })
        ) : (
            <p></p>
        )
        
        if(loading) return <Loader
                            type="Oval"
                            color="#1565C0"
                            height={50}
                            width={50}
                            className="center load"
                            />

        
    const dishAttr =  dishattr.length ? (dishattr.map((attr,i) =>{
        return (
            <div className="row" key={attr.id}>
            <div className="col l6 s6">
                    <p>
                <label>
                    <input className="with-gap" name="toppings" type="radio"
                    value={attr.name}
                    checked={this.state.checked === i ? true : false}
                    onChange={this.onToppingsChange.bind(this,i)}
                    />
                    <span>{attr.name}</span>
                </label>
                </p>
            </div>
            <div className="col l6 s6 right-align">
                {`+${attr.reprice.toFixed(2)}`}
            </div>
        </div>
        )
        })) :
        (
        <p></p>
        )

        // if(!loading) return dishMenu

        return ( 
            <React.Fragment>
             <Navbar />
                <div className="container section">
                    <div className="row">
                    {dishMenu}
                     <div className="col s12 l6 m6">
                         <div className="card z-depth-1">
                            <div className="card-content">
                             <span className="card-title" style={{fontWeight: 500}}>Top up into Set <span style={{fontSize: 18}}>(Pick 1)</span></span>
                                
                                {dishAttr}
                              <span className="card-title" style={{fontWeight: 500}}>Special Instructions <span style={{fontSize: 18}}>(Optional)</span></span>
                              <p>For self pick-ups, you won't be able to add special instructions after placing your order</p>
                              
                            <div className="input-field">
                              <input placeholder="E.g No onions please" id="specs" 
                              type="text"
                              onChange={this.handleChange}
                               />
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
                         <button onClick={()=>{this.addCartClick(item.id, item.name)}} className="waves-effect btn btn-style blue darken-3 z-depth-0"><i className="material-icons left">shopping_cart</i>Add to Basket - {`$${price.toFixed(2)}`}</button>
                         </div>
                    </div>
                 </div>       
            </div>
            </React.Fragment>
         );
    }
}

const mapStateToProps = (state, ownProps) =>{
    let id = ownProps.match.params.id;
    return{
        count: state.item.count,
        price: state.item.pricesum,
        dishmenu: state.item.dishMenuById,
        dishattr: state.item.dishattr,
        loading: state.item.loading,
        item: state.item.dishlist.find(dish => dish.id.toString() === id),
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        Increment : () => dispatch(Increment()),
        Decrement : () => dispatch(Decrement()),
        addToCart: (id, selectedOption) => dispatch(addToCart(id,selectedOption)),
        dishMenuById: (dishId, id) => dispatch(dishMenuById(dishId, id))
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(ItemDetails);