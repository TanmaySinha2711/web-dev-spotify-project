import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route, Switch, Redirect} from 'react-router-dom'
import SpotifyAPIService from '../services/SpotifyAPIService'
import Track from '../components/Track'
import UserService from '../services/UserService'
import './Homepage.css'
import {history} from 'react-router';

class SearchResults extends Component {
    constructor(props) {
        super(props)


        this.userService = new UserService()

        this.state = {
            trackName: "",
            searchResults: null,
            searchBar: this.props.searchQuery,
            spotifyAPIService: this.props.spotifyAPIService,
            redirectToHomePage: false
        }
    }

    componentDidMount() {
        this.props.updateSearchBarOnArtistClick(this.state.searchBar)
        this.state.spotifyAPIService.authenticateApp()
            .then(() => this.state.spotifyAPIService.search(this.props.searchQuery)
                .then(results => {
                    this.setState({
                        searchResults: results
                    })
                }))
    }

    componentDidUpdate(prevProps) {
        if (prevProps.searchQuery !== this.props.searchQuery) {
            this.state.spotifyAPIService.search(this.props.searchQuery)
                .then(results => {
                    this.setState({
                        searchResults: results
                    })
                })
        }
    }

    render() {
        return (
            <div className='wbdv-hp-background-color'>
              {this.props.searchQuery === '' && <h3 className="text-center">No Search Results To Display :-/ </h3>}
              {this.state.searchBar !== "" &&
                <div>
                <h3 className="text-center">Search Results</h3>
                <div className='container'>
                    <table className="table-responsive-sm table table-dark table-hover align-middle wbdv-table">
                        <tbody>
                        {this.state.searchResults !== null &&
                        this.state.searchResults.tracks.items.map(track =>
                            <Track track={track} key={track.id} user={this.props.user} favorites={this.props.favorites}
                                   spotifyAPIService={this.spotifyAPIService} getFavorites={this.props.getFavorites}
                                   currentPlaylistId={null} deleteTrackFromPlaylist={null}
                                   playlists={this.props.playlists}
                                   addTrackToPlaylist={this.props.addTrackToPlaylist}/>
                        )}

                        </tbody>
                    </table>
                </div>
                </div>
              }

            </div>
        )
    }
}

export default SearchResults;
