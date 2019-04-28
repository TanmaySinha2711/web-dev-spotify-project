import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route, Switch, Redirect} from 'react-router-dom'
import SpotifyAPIService from '../services/SpotifyAPIService'
import UserService from '../services/UserService'
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Track from "../components/Track";
import "./OtherProfile.css"

class OtherProfile extends Component {
    constructor(props) {
        super(props)

        this.userService = new UserService()

        this.state = {
            otherUser: null,
            playlists: null,
            selectedPlaylist: null
        }
    }

    componentDidMount = () => {
        console.log("componentDidMount:")
        this.props.updateSearchBarOnArtistClick("")
        this.userService.findUserById(this.props.uid).then(user => {
            this.setState({
                otherUser: user,
                playlists: user.playLists,
            })
        }).then(() => {
            console.log(this.state.playlists)
            if (this.state.playlists !== null && this.state.playlists.length !== 0) {
                this.setState({
                    selectedPlaylist: this.state.playlists[0]
                })
            }
        })
    }

    changePlaylist = (playlist) => {
        this.setState({
            selectedPlaylist: playlist
        })
    }

    render() {
        return (
            <div className="wbdv-background-color">
                {
                    this.state.otherUser !== null &&
                          <div className='row wbdv-other-profile'>
                          <div className="col-md-4 col-lg-4 wbdv-profile-page">
                            <form className="wbdv-user-outline">
                            <div className="form-group row justify-content-center">
                                <div>
                                    <h1>{this.state.otherUser.username}</h1>
                                </div>
                            </div>
                                <div className="form-group row justify-content-left">
                                    <label className="col-md-4 col-form-label">
                                        ID
                                    </label>
                                    <label className="col-md-8 col-form-label text-left">
                                        {this.state.otherUser.id}
                                    </label>
                                </div>

                                <div className="form-group row ">
                                    <label className="col-md-4 col-form-label">
                                        Username
                                    </label>
                                    <label className="col-md-8 col-form-label text-left">
                                        {this.state.otherUser.username}
                                    </label>
                                </div>

                                <div className="form-group row ">
                                    <label htmlFor="firstName"
                                           className="col-md-4 col-form-label">
                                        First Name
                                    </label>
                                    <label className="col-md-8 col-form-label text-left">
                                        {this.state.otherUser.firstName}
                                    </label>
                                </div>

                                <div className="form-group row ">
                                    <label htmlFor="lastName"
                                           className="col-md-4 col-form-label">
                                        Last name
                                    </label>
                                    <label className="col-md-8 col-form-label text-left">
                                        {this.state.otherUser.lastName}
                                    </label>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="email"
                                           className="col-md-4 col-form-label">
                                        Email
                                    </label>
                                    <label className="col-md-8 col-form-label text-left">
                                        {this.state.otherUser.email}
                                    </label>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="role"
                                           className="col-md-4 col-form-label">
                                        Role
                                    </label>
                                    <label className="col-md-8 col-form-label text-left">
                                        {this.state.otherUser.role}
                                    </label>
                                </div>
                            </form>
                            </div>

                            <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_CENTER}/>

                        {this.state.playlists !== null && this.state.selectedPlaylist !== null &&
                        <div className='col-md-8 col-lg-8'>
                                    <h1 className="row justify-content-center">Playlists</h1>
                                    <DropdownButton drop={'down'} size={'md'} variant={'primary'}
                                                    title={this.state.selectedPlaylist.title} className="form-group row justify-content-center">
                                        {this.state.playlists.map(playlist =>
                                            <Dropdown.Item onClick={() => this.changePlaylist(playlist)}>
                                                {playlist.title}</Dropdown.Item>)}
                                    </DropdownButton>
                            <div >
                                <table className="table-responsive-sm table table-dark table-hover align-middle wbdv-table">
                                    <tbody>
                                    {this.state.selectedPlaylist.tracks.map(track => {
                                        return <Track track={track} key={track.id} user={this.props.user}
                                                      spotifyAPIService={this.props.spotifyAPIService}
                                                      favorites={this.props.favorites}
                                                      getFavorites={this.props.getFavorites}
                                                      currentPlaylistId={null} deleteTrackFromPlaylist={null}
                                                      playlists={this.props.playlists}
                                                      addTrackToPlaylist={this.props.addTrackToPlaylist}/>
                                    })}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                        }

                      </div>


                }
            </div>


        );
    }
}

export default OtherProfile;
