import React, { Component } from 'react';


class Footer extends Component {
    state = {

      }
    render() { 
        return ( 
               <footer className="footer">
                    <div className="container" style={{paddingTop: 20}}>
                        <p className="footer-color">&copy; 2020 Victor's Kitchen. All rights reserved.</p>
                    </div>
               </footer>
         );
    }
}
 
export default Footer;