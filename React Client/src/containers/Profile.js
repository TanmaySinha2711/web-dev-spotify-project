import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route, Switch, Redirect} from 'react-router-dom'
import SpotifyAPIService from '../services/SpotifyAPIService'
import UserService from '../services/UserService'
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';

class Profile extends Component {
  constructor(props) {
  super(props)

  this.userService = new UserService()

  this.state = {
    user: this.props.user
    }
  }

  componentDidMount() {
    this.props.updateSearchBarOnArtistClick("")
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.id !== this.props.user.id) {
      this.setState({
        user: this.props.user
      })
    }
  }

  update = () => {

    this.userService.updateUser(this.state.user.id, this.state.user.username, this.state.user.password, this.state.user.firstName, this.state.user.lastName, this.state.user.email, this.state.user.role)
      .then(user => {
        this.props.checkLoggedIn()
        if (user !== 0) {
          this.setState({
            user: user
          })
          return ToastsStore.success("Profile saved successfully!")
        } else {
          return ToastsStore.error("Profile could not be saved.")
        }
  })}

  updateSuccessful = () => {
    return ToastsStore.success("Profile saved successfully!")
  }

  onKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.update();
    }
  }

  passwordChange = (event) => {
    console.log(event)
    this.setState({
      user: {id: this.state.user.id,
            username: this.state.user.username,
            password: event.target.value,
            firstName: this.state.user.firstName,
            lastName:  this.state.user.lastName,
            email:  this.state.user.email,
            role: this.state.user.role}
    })
  }

  firstNameChange = (event) => {
    this.setState({
      user: {id: this.state.user.id,
            username: this.state.user.username,
            password: this.state.user.password,
            firstName: event.target.value,
            lastName:  this.state.user.lastName,
            email:  this.state.user.email,
            role: this.state.user.role}
    })
  }

  lastNameChange = (event) => {
    this.setState({
      user: {id: this.state.user.id,
            username: this.state.user.username,
            password: this.state.user.password,
            firstName: this.state.user.firstName,
            lastName:  event.target.value,
            email:  this.state.user.email,
            role: this.state.user.role}
    })
  }

  emailChange = (event) => {
    this.setState({
      user: {id: this.state.user.id,
            username: this.state.user.username,
            password: this.state.user.password,
            firstName: this.state.user.firstName,
            lastName:  this.state.user.lastName,
            email:  event.target.value,
            role: this.state.user.role}
    })
  }


  roleChange = (event) => {
    this.setState({
      user: {id: this.state.user.id,
            username: this.state.user.username,
            password: this.state.user.password,
            firstName: this.state.user.firstName,
            lastName:  this.state.user.lastName,
            email:  this.state.user.email,
            role: event.target.value}
    })
  }


  deleteAccount = () => {
    this.props.logout()
    this.userService.deleteUser(this.state.user)
  }




  render() {
    if (this.props.loggedIn === false) {
      return <Redirect to='/' />
    }
    return (

      <div>

      {this.props.loggedIn &&
        <div>

      <div className="container">
        <div className="form-group row justify-content-center">
          <div>
            <h1>Profile</h1>
          </div>
        </div>
        <form>
          <div className="form-group row">
            <label htmlFor="id" className="col-md-2 offset-md-1 col-lg-2 offset-lg-2 col-form-label">
              ID
            </label>
            <div className="col-md-6 col-lg-4">
              <input className="form-control" id="id" type="text" defaultValue={this.props.user.id} readOnly/>
            </div>
          </div>

          <div className="form-group row ">
            <label htmlFor="username" className="col-md-2 offset-md-1 col-lg-2 offset-lg-2 col-form-label">
              Username
            </label>
            <div className="col-md-6 col-lg-4">
              <input className="form-control" id="username" type="text" placeholder="alice" defaultValue={this.props.user.username} readOnly/>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="password" className="col-md-2 offset-md-1 col-lg-2 offset-lg-2 col-form-label">
              Password
            </label>
          <div className="col-md-6 col-lg-4">
            <input className="form-control" id="firstName" type="password" placeholder="aXRdi$!*" defaultValue={this.props.user.password} onChange={this.passwordChange} onKeyDown={this.onKeyDown}/>
          </div>
        </div>

          <div className="form-group row ">
            <label htmlFor="firstName" className="col-md-2 offset-md-1 col-lg-2 offset-lg-2 col-form-label">
              First Name
            </label>
          <div className="col-md-6 col-lg-4">
            <input className="form-control" id="firstName" type="text" placeholder="alice" defaultValue={this.props.user.firstName} onChange={this.firstNameChange} onKeyDown={this.onKeyDown}/>
          </div>
        </div>

        <div className="form-group row ">
          <label htmlFor="lastName" className="col-md-2 offset-md-1 col-lg-2 offset-lg-2 col-form-label">
            Last name
          </label>
          <div className="col-md-6 col-lg-4" >
            <input className="form-control" id="lastName" type="text" placeholder="alice" defaultValue={this.props.user.lastName} onChange={this.lastNameChange} onKeyDown={this.onKeyDown}/>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="email" className="col-md-2 offset-md-1 col-lg-2 offset-lg-2 col-form-label">
            Email
          </label>
          <div className="col-md-6 col-lg-4" >
            <input type="email" className="form-control" id="email" defaultValue={this.props.user.email} placeholder="alice@wonderland.com" onChange={this.emailChange} onKeyDown={this.onKeyDown}/>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="role" className="col-md-2 offset-md-1 col-lg-2 offset-lg-2 col-form-label">
            Role
          </label>
          <div className="col-md-6 col-lg-4" >
          <select className="form-control" id='role' defaultValue={this.props.user.role} onChange={this.roleChange}>
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
          <div className="col-md-6 col-lg-4" >
            <button className="btn btn-success btn-block" type="button" onClick={this.update}>
              Update
            </button>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-md-2 offset-md-1 col-lg-2 offset-lg-2 col-form-label">
          </label>
          <div className="col-md-6 col-lg-4" >
            <Link to="/login" ><button className="btn btn-danger btn-block btn-danger-outline" onClick={this.deleteAccount} type="button">
              Delete Account
            </button></Link>
          </div>
        </div>
      </form>
      <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_CENTER}/>
    </div>
    </div>


  }


  </div>




    );
  }
}

export default Profile;
