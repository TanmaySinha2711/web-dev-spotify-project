import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route, Switch, Redirect} from 'react-router-dom'
import SpotifyAPIService from '../services/SpotifyAPIService'
import UserService from '../services/UserService'
import User from '../components/User'
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';


class ListOfUsers extends Component {
  constructor(props) {
  super(props)
    this.userService = new UserService()

    this.state = {
      spotifyAPIService: new SpotifyAPIService(),
      users: null,
      admin: false,
      user: {role: ''}
    }
  }

  componentDidMount() {
    this.props.updateSearchBarOnArtistClick("")
    this.state.spotifyAPIService.authenticateApp()
      .then(() => this.userService.findAllUsers()
        .then(users => this.setState({users: users}))
      )
    if (this.props.user !== null) {
      this.setState({
        user: this.props.user
      })
    }
  }


  saveUser = (user) => {
    this.userService.updateUser(user.id, user.username, user.password, user.firstName, user.lastName, user.email, user.role)
      .then(user => {
        if (user.id !== 0) {
          return ToastsStore.success("User info saved.")
        } else {
          return ToastsStore.error("User info could not be saved.")
        }
  })}

  adminDeleteUser = (user) => {
    this.userService.deleteUser(user)
    this.setState({
      users: this.state.users.filter(thisUser => thisUser.id !== user.id)
    })
    return ToastsStore.success("User deleted.")
  }


  render() {
    return (
      <div className='wbdv-hp-background-color'>
        <h3 className='text-center wbdv-header'>Users</h3>
        <div className='container'>
        <table className="table table-responsive-sm table-dark table-hover align-middle wbdv-table">
         <thead>
          <tr>
            <td>ID</td>
            <td>Username</td>
            <td >First Name</td>
            <td>Last Name</td>
            <td>Role</td>
            <td>&nbsp;</td>
            {this.state.user.role === 'admin' && <td>&nbsp;</td>}
          </tr>
          </thead>
          <tbody>
          {this.state.users !== null &&
            this.state.users.map(user =>
              <User
              user={user}
              key={user.id}
              admin={this.state.user.role}
              adminDeleteUser={this.adminDeleteUser}
              saveUser={this.saveUser} />
          )}
          </tbody>
        </table>
        </div>
        <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_CENTER}/>
      </div>
    );
  }
}

export default ListOfUsers;
