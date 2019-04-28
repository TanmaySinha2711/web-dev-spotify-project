import React, { Component } from 'react';
import SpotifyAPIService from '../services/SpotifyAPIService'
import UserService from '../services/UserService'
import {BrowserRouter as Router, Link, Route, Switch, Redirect} from 'react-router-dom'
import './Track.css'

class User extends Component {
  constructor(props) {
  super(props)

  this.userService = new UserService()

  this.state = {
    user: this.props.user
    }
  }

  roleChange = (event) => {
    console.log(event.target.value)
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



  render() {
    return (
      <tr className='wbdv-user' >
        <td className='align-middle'>
          {this.props.user.id}
        </td>
        <td className='align-middle'>
          {this.props.user.username}
        </td>
        <td className='align-middle' >
          {this.props.user.firstName}
        </td>
        <td className='align-middle' >
          {this.props.user.lastName}
        </td>


        {this.props.admin !== 'admin' &&
        <td className='align-middle' >
          {this.props.user.role}
        </td>
        }
        {this.props.admin === 'admin' &&
        <td className='align-middle' >
          <select className="form-control" defaultValue={this.props.user.role} onChange={this.roleChange}>
            <option value='user'>User
            </option>
            <option value='reviewer'>Reviewer
            </option>
            <option value='admin'>Admin
            </option>
          </select>
        </td>
        }

        <td className='align-middle justify-content-right' >
          <Link to={'/profile/' + this.props.user.id}><button className='btn btn-primary'>View Profile</button></Link>
        </td>
        {this.props.admin === 'admin' &&
        <td className='align-middle justify-content-right' >
          <button className='btn btn-success' onClick={()=>this.props.saveUser(this.state.user)}><i className="fa fa-save"></i></button>&nbsp;
          <button className='btn btn-danger'  onClick={()=>this.props.adminDeleteUser(this.state.user)}><i className="fa fa-window-close"></i></button>
        </td>}
      </tr>
    )
  }
}

export default User;
