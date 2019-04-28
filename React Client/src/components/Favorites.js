import UserService from '../services/UserService'
import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route, Switch, Redirect} from 'react-router-dom'
import Track from "./Track";
import './Favorites.css'

class Favorites extends Component {
    constructor(props) {
        super(props)

        this.userService = new UserService()
        this.state = {
            newTracks: [],
            favorites: this.props.favorites
        }
    }


    componentDidMount() {
        this.props.favorites.map(track => {
            this.props.spotifyAPIService.getTrack(track.id)
                .then(newTrack => {
                    this.setState({
                        newTracks: [newTrack,
                            ...this.state.newTracks]
                    })
                })
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.favorites !== this.props.favorites) {
            this.setState({
                favorites: this.props.favorites,
                newTracks: this.state.newTracks.filter(track => {
                    for (var i = 0; i < this.props.favorites.length; i++) {
                        if (this.props.favorites[i].id === track.id) {
                            return true
                        }
                    }
                    return false
                })
            })
        }
    }

    render() {
        if (!this.props.loggedIn) {
            return <Redirect to='/login'/>
        }
        return (
            <div className='wbdv-background-color'>
                <h3 className='text-center wbdv-header'>Favorite Tracks</h3>
                <div className='container'>
                    <table className="table table-dark table-hover align-middle wbdv-table">
                        <tbody>
                        {this.state.newTracks.map(track => {
                            return <Track track={track} key={track.id} user={this.props.user}
                                          spotifyAPIService={this.props.spotifyAPIService}
                                          favorites={this.state.favorites} getFavorites={this.props.getFavorites}
                                          currentPlaylistId={null} deleteTrackFromPlaylist={null}
                                          playlists={this.props.playlists}
                                          addTrackToPlaylist={this.props.addTrackToPlaylist}/>
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}

export default Favorites
