import React,{Fragment,useState} from "react";
import {Link, Redirect} from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {login} from "../../actions/authActions";

const Login =({login,isAuthenticated}) =>{
    const [formData,setFormData] = useState({
        email: '',
        password: ''
    });
    const {email, password} = formData;

    const onSubmitHandler = async e =>{
        e.preventDefault();
        login(email,password);
    }
//Redirect if login
    if(isAuthenticated){
        return <Redirect to='/dashboard'/>
    }
    const onChangeHandler = e => setFormData({...formData, [e.target.name]: e.target.value});
    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
            <form className="form" onSubmit={e=>onSubmitHandler(e)}>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" value={email} onChange={e=>{onChangeHandler(e)}} required/>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        value={password}
                        onChange={e=>{onChangeHandler(e)}}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Login"/>
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </Fragment>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { login })(Login);