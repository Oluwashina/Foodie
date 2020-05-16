import React, { Component } from 'react';
import M from 'materialize-css';


class DeliveryOptions extends Component {
    state = { 

     }

     componentDidMount(){
        let select = document.querySelectorAll('select');
      M.FormSelect.init(select, {})
     }

    render() { 
        return ( 
            <div className="container" style={{marginTop: 20}}>
                <div className="row">
                    <div className="col s12 l6">
                        <div className="input-field">
                            <select>
                            <option value="1" defaultValue>Self Pickup</option>
                            <option value="2">Delivery</option>
                            </select>
                            <label>Select dining preference</label>
                        </div>
                    </div>
                    <div className="col s12 l6">
                        <div className="input-field">
                            <select>
                            <option value="1" defaultValue>ASAP</option>
                            </select>
                            <label>Timing</label>
                        </div>
                    </div>
                    <div className="col s12 l12">
                    <div className="input-field">
                            <select>
                            <option value="1" defaultValue>Victor's Kitchen @ Sunshine Plaza 91 Bencoolen Street, 01-49, Singapore, 189652</option>
                            <option value="2">Victor's Kitchen @ Chinatown Point 133 New Bridge Rd, Chinatown Point, B1-33, Singapore, 059413</option>
                            <option vlaue="3">290A BISHAN STREET 24 MULTI STOREY CAR PARK, Singapore, 571290</option>
                            <option value="4">Add new</option>
                            </select>
                            <label>Delivery Address</label>
                        </div>
                    </div>
                </div>

            </div>
         );
    }
}
 
export default DeliveryOptions;