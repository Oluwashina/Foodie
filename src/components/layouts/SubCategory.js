import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import M from 'materialize-css';
import {connect} from 'react-redux';
import {DishList} from '../../store/actions/itemAction'


class SubCategory extends Component {
    state = { 

     }
     componentDidMount(){
         
     }
     componentDidUpdate() {
        let tabs = document.querySelector('.tabs');
        M.Tabs.init(tabs, {});
      }

     tabClick = (id) =>{
        this.props.DishList(id)
     }
     

    render() { 
        const {dishes,categories} = this.props
        let dishlist;
          const menutab = categories.length ? (
            categories.map(category=>{
                return (
                    <li className="tab" key={category.id} onClick={() => this.tabClick(category.id)}>
                    <a href={`#${category.id}`}>{category.name}</a>
                </li> 
                )
            })
        ) : (
            <p className="center">Loading Menu Items...</p>
        )

        if(!dishes || dishes.length === 0){
            dishlist = <p className="center">You have no dishes for this category</p>
        }else{
            dishlist = dishes.map(dish=>{
                return(
                    <div key={dish.uuid} className="col s12 m6 l4">
            <div className="card hoverable">
                 <div className="card-image">
                     <img src={dish.smallImgUrls} className="responsive-img" alt="first" />
                     <button className="btn-floating halfway-fab btn-large blue darken-3 z-depth-0"><i className="material-icons">add_shopping_cart</i></button>
                 </div>
                     <div className="card-content">
                        <p style={{fontWeight: 600}} className="">{dish.name}</p>
                            <p>{`$${dish.marketPrice}`}</p>
                        </div>
                    <div className="card-action">
                  <Link to={`/item/${dish.dishTypeId}`} className="btn white grey-text text-darken-1 z-depth-0"><i className="material-icons right">chevron_right</i> Details</Link>
                    </div>
                </div>
         </div>
                )
             })
        }

      
        return ( 
            <div className="container">

                <div>
                    <ul style={{marginTop: 20}} className="tabs tabs-fixed-width tab-demo z-depth-1">
                        {menutab}
                    </ul>
                </div>

                <div style={{marginTop: 20}} className="row">
                    {dishlist}
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
        dishes: state.item.dishlist
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        DishList : (id) => dispatch(DishList(id)),
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(SubCategory);