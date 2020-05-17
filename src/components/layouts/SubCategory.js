import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import Menus from './Menus';
import {DishList} from '../../store/actions/itemAction'
import Loader from 'react-loader-spinner'



class SubCategory extends Component {
    state = { 

     }
     componentDidMount(){
        var id = "350368638463726592"
        this.props.DishList(id)
     }
     

    render() { 
        const {dishes, loading} = this.props
        let dishlist;

        if(!dishes || dishes.length === 0){
            dishlist = <p className="center">You have no dishes for this category</p>
        }else{
            dishlist = dishes.map(dish=>{
                return(
                    <div key={dish.id} className="col s12 m6 l4">
            <div className="card medium hoverable">
                 <div className="card-image">
                     <img src={dish.largeImgList} className="responsive-img" alt="first" />
                     {/* <Link to={`item/${dish.id}`} className="btn-floating halfway-fab btn-large blue darken-3 z-depth-0"><i className="material-icons">add_shopping_cart</i></Link> */}
                 </div>
                     <div className="card-content">
                         <div className="row">
                             <div className="col s6 l6">
                                <p style={{fontWeight: 500, fontSize: 18}} className="">{dish.name}</p>
                                <p style={{fontWeight: 600}}>{`$${dish.marketPrice}`}</p>
                             </div>
                             <div className="col s6 l6" style={{marginTop: 5}}>
                                 <Link to={`/item/${dish.id}`} className="btn-details" style={{marginRight: 8}}>Details</Link>
                                 <Link to={`/item/${dish.id}`} className="btn-add">Add</Link>
                             </div>
                         </div>
                       
                        </div>
                </div>
         </div>
                )
             })
        }

      
        return ( 
            <div className="container">

                <Menus />
                                  
                <div style={{marginTop: 20}} className="row">
                    { loading ? <Loader
                    type="Oval"
                    color="#1565C0"
                    height={50}
                    width={50}
                    className="center"
                    /> : dishlist}
                </div>
                    
                {/* <ul style={{marginTop: 10}} className="tabs tabs-fixed-width tab-demo z-depth-1">
                    <li className="tab" onClick={() => this.clickMe()}><a href="#test1">Test 1</a></li>
                    <li className="tab"><a href="#test2">Test 2</a></li>
                    <li className="tab"><a href="#test4">Test 4</a></li>
                    <li className="tab"><a href="#test0">Test 5</a></li>
                    <li className="tab"><a href="#test0">Test 5</a></li>
                    <li className="tab"><a href="#test0">Test 5</a></li>
                </ul>
                <div id="test1" className="col s12"><p>Test 1</p></div>
                <div id="test2" className="col s12"><p>Test 2</p></div>
                <div id="test4" className="col s12"><p>Test 4</p></div>
                <div id="test0" className="col s12"><p>Test 5</p></div> */}

              
            </div>
         );
    }
}

const mapStateToProps = (state) =>{
    return{
        dishes: state.item.dishlist,
        loading: state.item.loading
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        DishList : (id) => dispatch(DishList(id)),
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(SubCategory);