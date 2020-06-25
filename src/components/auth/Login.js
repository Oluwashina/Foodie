import React, { Component } from 'react';
import {connect} from 'react-redux';
import { login } from '../../store/actions/authAction';

class Login extends Component {
    state = { 
        phone: "",
       submitDisabled: true
     }

     handleChange = (e) => {
        let emailValid = e.target.value ? true : false;       
        this.setState({
          [e.target.id]: e.target.value,
          submitDisabled: !emailValid
        });
      };

      
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
        this.props.signIn(this.state.phone)
    };

    render() { 
        const {loading} = this.props
        return ( 
            <div className="container">
            <h5 className="center signin-text">Enter your Phone Number to create account or login</h5>
            <div className="valign-wrapper row">
                <div className="col card hoverable s12 m8 pull-m2 l6 pull-l3 form-box">
                    <form onSubmit={this.handleSubmit}>
                        <div className="card-content">
                            <div className="row">
                                <div className="input-field col s12">
                                <i className="fa fa-phone prefix"></i>
                                    <input
                                    type="text"
                                    className="validate"
                                    id="phone"
                                    placeholder="+65 8123 4567"
                                    onChange={this.handleChange}
                                />
                                  <label htmlFor="phone">Phone Number</label>
                                 </div>
                                 <div className="center col s12 input-field">
                                    <button className="btn z-depth-0" disabled={this.state.submitDisabled}>
                                      {loading && (
                                        <i
                                        className="fa fa-circle-o-notch fa-spin"
                                        style={{ marginRight: "5px", fontSize: "15px" }}
                                        />
                                    )}
                                    {loading && <span>Login</span>}
                                    {!loading && <span>Login</span>} 
                                  </button>      
                                 </div>
                            </div>
                        </div>
                </form>
                </div>
            </div>
        </div>
         );
    }
}

const mapStateToProps = (state) =>{
    return{
        loading: state.auth.loading
    }
}


const mapDispatchToProps = (dispatch) =>{
    return{
        signIn: (creds) => dispatch(login(creds)),
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Login);