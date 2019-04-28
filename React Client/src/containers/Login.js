import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route, Switch, Redirect} from 'react-router-dom'
import SpotifyAPIService from '../services/SpotifyAPIService'
import UserService from '../services/UserService'


class Login extends Component {
  constructor(props) {
  super(props)

  this.userService = new UserService()

    this.state = {
      username: '',
      password: '',
      redirect: false
    }

  }

  componentDidMount() {
    this.props.updateSearchBarOnArtistClick("")
  }


  submit = () =>{
    this.userService.login(this.state.username, this.state.password).then(user => {
      this.props.checkLoggedIn()
      if (user.id !== 0) {
        this.setState({
          redirect: true
        })
      } else {
          alert("Login failed. Username and password do not match.")
        }
      }
    )
  }

  onKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.submit();
    }
  }

  usernameChange = (event) => {
    this.setState({
      username: event.target.value
    })
  }

  passwordChange = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to='/' />
    }
    return (
      <div>
        <div className="container">
          <div className="form-group row justify-content-center">
            <div >
              <h1>Sign In</h1>
            </div>
          </div>
          <form>
            <div className="form-group row">
              <label htmlFor="username" className="col-md-2 offset-md-1 col-lg-1 offset-lg-3 col-form-label">
                Username
              </label>
              <div className="col-md-6 col-lg-4">
                <input className="form-control" id="username" onChange={this.usernameChange} onKeyDown={this.onKeyDown} placeholder="alice"/>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="password" className="col-md-2 offset-md-1 col-lg-1 offset-lg-3 col-form-label">
                Password
              </label>
            <div className="col-md-6 col-lg-4">
              <input type="password" onChange={this.passwordChange} onKeyDown={this.onKeyDown} className="form-control wbdv-password-fld" id="password" placeholder="123qwe#$%"/>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-md-2 offset-md-1 col-lg-1 offset-lg-3 col-form-label"></label>
            <div className="col-md-6 col-lg-4 wbdv-login-button" >
              <a className="btn btn-block bg-success" id="sign-in" role="button" onClick={this.submit} style={{ color: 'white' }}>
                Sign in
              </a>
              <div className="row">
                <div className="col-12">
                  <Link to="/register" className="float-right">
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      </div>
    );
  }
}

export default Login;
