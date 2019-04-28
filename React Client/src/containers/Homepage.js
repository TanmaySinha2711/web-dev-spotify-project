import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route, Switch, Redirect} from 'react-router-dom'
import SpotifyAPIService from '../services/SpotifyAPIService'
import Track from '../components/Track'
import UserService from '../services/UserService'
import './Homepage.css'

class Homepage extends Component {
    constructor(props) {
        super(props)


        this.userService = new UserService()

        this.state = {
            token: "",
            trackName: "",
            searchResults: null,
            searchBar: '',
            searching: false,
            mostPlayed: null,
        }
    }

    componentDidMount() {
        this.props.updateSearchBarOnArtistClick("");
        this.props.spotifyAPIService.authenticateApp()
            .then(() => this.props.spotifyAPIService.getTopSongs()
                .then(playlist => {
                    this.setState({
                        mostPlayed: playlist
                    })
                }))
    }


    render() {
        return (
            <div className='wbdv-hp-background-color'>
                {this.props.loggedIn !== true &&
                <div className="overflow-hidden p-3 p-md-5 text-center wbdv-homepage-title">
                    <div className="col-md-5  mx-auto wbdv-homepage-title-text">
                        <h1 className="display-4 font-weight-normal wbdv-homepage-text">
                            Find Your Jam
                        </h1>
                        <p className="lead font-weight-normal wbdv-homepage-text">Preview music from every genre and see
                            what your friends are listening to today. Sign up to get the benefits of creating playlists,
                            favoriting tracks, and seeing what critics are saying about your favorite songs!</p>
                        <Link to="/login" className="btn btn-primary mr-5 btn-lg">Login</Link>
                        <Link to="/register" className="btn btn-primary btn-lg">Register</Link>
                    </div>
                </div>}

                {this.props.loggedIn === true &&
                <div className="position relative overflow-hidden p-3 p-md-5 text-center bg-light wbdv-homepage-title">
                    <div className="col-md-5 p-lg-5 mx-auto my-5 wbdv-homepage-title-text">
                        <h1 className="display-4 font-weight-normal wbdv-homepage-text">
                            Welcome, {this.props.user.username}!
                        </h1>
                    </div>
                </div>}

                <div className='wbdv-bottom-bg pt-4'>
                    {this.state.searchResults === null && this.state.mostPlayed !== null &&
                    <h3 className="text-center">Top 50 Hits Today</h3>}


                    <div className='container'>
                        <table className="table-responsive-sm table table-dark table-hover align-middle wbdv-table">
                            <tbody>


                            {this.state.searchResults === null && this.state.mostPlayed !== null &&
                            this.state.mostPlayed.tracks.items.map(track =>
                                <Track track={track.track} key={track.track.id} user={this.props.user}
                                       getFavorites={this.props.getFavorites} favorites={this.props.favorites}
                                       spotifyAPIService={this.props.spotifyAPIService}
                                       currentPlaylistId={null} deleteTrackFromPlaylist={null}
                                       playlists={this.props.playlists}
                                       addTrackToPlaylist={this.props.addTrackToPlaylist}/>)}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default Homepage;
