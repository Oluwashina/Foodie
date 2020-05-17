import React, { Component } from 'react';
import Navbar from '../layouts/Navbar';


class About extends Component {
    state = { 

     }
    render() { 
        return ( 
            <React.Fragment>
                 <Navbar />
                <div className="container">
                    <h5>Store Information</h5>
                    <div className="row">
                        <div className="col s12 l12">
                            <div className="card">
                                <div className="card-content">
                                    <span className="card-title">Victor's Kitchen @Sunshine Plaza</span>
                                    <p>91 Bencoolen Street, 01-49, Singapore, 189652</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default About;