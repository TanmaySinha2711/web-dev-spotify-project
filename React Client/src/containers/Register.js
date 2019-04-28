import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route, Switch, Redirect} from 'react-router-dom'
import SpotifyAPIService from '../services/SpotifyAPIService'
import UserService from '../services/UserService'

class Register extends Component {
  constructor(props) {
  super(props)

  this.userService = new UserService()

  this.state = {
    username: '',
    password: '',
    verifyPassword: '',
    role: 'user',
    redirect: false
    }

  }

  componentDidMount() {
    this.props.updateSearchBarOnArtistClick('')
  }

  submit = () => {
    if (this.state.verifyPassword === this.state.password) {
      this.userService.register(this.state.username, this.state.password, this.state.role).then(user => {
        this.props.checkLoggedIn()
        if (user.id != null) {
          this.setState({
            redirect: true
          })
        }})}
    else {
        alert("Passwords must match.")
      }
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

  verifyPasswordChange = (event) => {
    this.setState({
      verifyPassword: event.target.value
    })
  }

  roleChange = (event) => {
    this.setState({
      role: event.target.value
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
            <div>
              <h1>
                Register
              </h1>
            </div>
          </div>
          <form>
            <div className="form-group row">
              <label htmlFor="username" className="col-md-2 offset-md-1 col-lg-2 offset-lg-2 col-form-label" >
                Username
              </label>
              <div className="col-md-6 col-lg-4">
                <input className="form-control" id="username" placeholder="Alice" onChange={this.usernameChange} onKeyDown={this.onKeyDown} />
              </div>
            </div>
            <div className="form-group row ">
              <label htmlFor="password" className="col-md-2 offset-md-1 col-lg-2 offset-lg-2 col-form-label">
                Password
              </label>
              <div className="col-md-6 col-lg-4">
                <input type="password" className="form-control wbdv-password-fld" id="password" placeholder="123qwe#$%" onChange={this.passwordChange} onKeyDown={this.onKeyDown}/>
              </div>
              </div>
                <div className="form-group row">
                  <label htmlFor="verifyPassword" className="col-md-2 offset-md-1 col-lg-2 offset-lg-2 col-form-label">
                    Verify Password
                  </label>
                  <div className="col-md-6 col-lg-4">
                    <input type="password" className="form-control wbdv-password-fld" id="verifyPassword" placeholder="123qwe#$%" onChange={this.verifyPasswordChange} onKeyDown={this.onKeyDown}/>
                  </div>
                </div>


                <div className="form-group row">
                  <label htmlFor="role" className="col-md-2 offset-md-1 col-lg-2 offset-lg-2 col-form-label">
                    Role
                  </label>
                  <div className="col-md-6 col-lg-4">
                    <select className="form-control" defaultValue='user' onChange={this.roleChange}>
                      <option value='user'>User
                      </option>
                      <option value='reviewer'>Reviewer
                      </option>
                    </select>
                  </div>
                </div>


                <div className="form-group row">
                  <label className="col-md-2 offset-md-1 col-lg-2 offset-lg-2 col-form-label">
                  </label>
                    <div className="col-md-6 col-lg-4 wbdv-register-button">
                      <a className="btn btn-success btn-block" role="button" onClick={this.submit} style={{ color: 'white' }}>
                        Register
                      </a>
                      <div className="row">
                        <div className="col-12">
                          <Link to="/login">
                            Login
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-2 offset-md-1 col-lg-2 offset-lg-2 col-form-label">
                    </label>
                    <div className="col-md-6 col-lg-4">
                      <Link to="/" className="btn btn-danger btn-block" role="button">
                        Cancel
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>


    );
  }
}

export default Register;
