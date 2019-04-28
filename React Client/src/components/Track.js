import React, {Component} from 'react';
import SpotifyAPIService from '../services/SpotifyAPIService'
import UserService from '../services/UserService'
import {BrowserRouter as Router, Link, Route, Switch, Redirect} from 'react-router-dom'
import './Track.css'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import PlaylistService from "../services/PlaylistService";

class Track extends Component {
    constructor(props) {
        super(props)

        this.userService = new UserService()
        this.playlistService = new PlaylistService()

        if (this.props.user !== null) {
            if (typeof this.props.track.album === 'object') {
                this.preview = new Audio(this.props.track.preview_url)
                this.state = {
                    playing: false,
                    favorited: false,
                    user: this.props.user,
                    playlists: this.props.playlists,
                    spotifyAPIService: this.props.spotifyAPIService,
                    trackId: this.props.track.id,
                    trackTitle: this.props.track.name,
                    trackAlbum: this.props.track.album.name,
                    trackPreviewURL: this.props.track.preview_url,
                    trackAlbumArt: this.props.track.album.images[0].url,
                    trackPopularity: this.props.track.popularity,
                    trackArtist: this.props.track.artists[0].name

                }
            } else {
                this.preview = new Audio(this.props.track.previewURL)
                this.state = {
                    playing: false,
                    favorited: false,
                    user: this.props.user,
                    playlists: this.props.playlists,
                    spotifyAPIService: this.props.spotifyAPIService,
                    trackId: this.props.track.id,
                    trackTitle: this.props.track.title,
                    trackAlbum: this.props.track.album,
                    trackPreviewURL: this.props.track.previewUrl,
                    trackAlbumArt: this.props.track.albumArt,
                    trackPopularity: this.props.track.popularity,
                    trackArtist: this.props.track.artist
                }
            }
        } else {
            if (typeof this.props.track.album === 'object') {
                this.preview = new Audio(this.props.track.preview_url)
                this.state = {
                    playing: false,
                    favorited: false,
                    user: this.props.user,
                    playlists: null,
                    spotifyAPIService: this.props.spotifyAPIService,
                    trackId: this.props.track.id,
                    trackTitle: this.props.track.name,
                    trackAlbum: this.props.track.album.name,
                    trackPreviewURL: this.props.track.preview_url,
                    trackAlbumArt: this.props.track.album.images[0].url,
                    trackPopularity: this.props.track.popularity,
                    trackArtist: this.props.track.artists[0].name

                }
            } else {
                this.preview = new Audio(this.props.track.previewURL)
                this.state = {
                    playing: false,
                    favorited: false,
                    user: this.props.user,
                    playlists: null,
                    spotifyAPIService: this.props.spotifyAPIService,
                    trackId: this.props.track.id,
                    trackTitle: this.props.track.title,
                    trackAlbum: this.props.track.album,
                    trackPreviewURL: this.props.track.previewUrl,
                    trackAlbumArt: this.props.track.albumArt,
                    trackPopularity: this.props.track.popularity,
                    trackArtist: this.props.track.artist
                }
            }
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.playlists !== this.props.playlists) {
            this.setState({
                playlists: this.props.playlists
            })
        }
    }

    playTrack = () => {
        if (this.state.trackPreviewURL !== null) {
            this.setState({
                playing: true
            })
            this.preview.play()
        }
    }

    pauseTrack = () => {
        this.setState({
            playing: false
        })
        this.preview.pause()
    }

    unlikeTrack = () => {
        let trackToUnlike = {
            id: this.state.trackId,
            title: this.state.trackTitle,
            album: this.state.trackAlbum,
            previewURL: this.state.trackPreviewURL,
            albumArt: this.state.trackAlbumArt,
            popularity: this.state.trackPopularity,
            artist: this.state.trackArtist
        }
        this.userService.removeTrackFromFavorites(this.state.user.id, trackToUnlike)
            .then(() => this.props.getFavorites())
    }

    likeTrack = () => {
        let trackToLike = {
            id: this.state.trackId,
            title: this.state.trackTitle,
            album: this.state.trackAlbum,
            previewURL: this.state.trackPreviewURL,
            albumArt: this.state.trackAlbumArt,
            popularity: this.state.trackPopularity,
            artist: this.state.trackArtist
        }
        this.userService.addTrackToFavorites(this.state.user.id, trackToLike).then(() => this.props.getFavorites())
    }

    addToPlayListButton() {
        return (
            this.state.playlists !== null &&
            <div className='justify-content-center'>
                <DropdownButton
                    drop='down'
                    size={'sm'}
                    variant="primary"
                    title={`Add to playlist`}
                    id={`add-to-playlist-button`}>
                    {this.state.playlists.map(playlist =>
                        <Dropdown.Item
                            onClick={() => this.addTrackToPlaylist(playlist.id)}>{playlist.title}</Dropdown.Item>
                    )}
                </DropdownButton>
            </div>
        )
    }

    addTrackToPlaylist = (pid) => {
        let trackToAdd = {
            id: this.state.trackId,
            title: this.state.trackTitle,
            album: this.state.trackAlbum,
            previewURL: this.state.trackPreviewURL,
            albumArt: this.state.trackAlbumArt,
            popularity: this.state.trackPopularity,
            artist: this.state.trackArtist
        }
        this.props.addTrackToPlaylist(pid, trackToAdd)
    }

    details() {
        return (
            <div className='justify-content-center'>
                <button className='btn btn-sm btn-primary wbdv-details-btn'>Details
                </button>
            </div>
        )
    }


    displayPlayButton() {
        return (

            <button className="btn btn-success" onClick={this.playTrack}>
                <i className="fa fa-play"></i>
            </button>

        )
    }

    displayPauseButton() {
        return (
            <button className="btn btn-danger" onClick={this.pauseTrack}>
                <i className="fa fa-pause"></i>
            </button>
        )
    }

    displayLikeButton() {
        return (
            <button className='btn btn-lg '  title='Add to Favorites' onClick={this.likeTrack}>
                <i className="fa fa-heart wbdv-like-button fa-lg"></i>
            </button>
        )
    }

    displayUnlikeButton() {
        return (
            <button className='btn btn-lg wbdv-unlike-button'  title='Remove from Favorites' onClick={this.unlikeTrack}>
                <i className="fa fa-heart wbdv-unlike-button fa-lg"></i>
            </button>
        )
    }

    checkInFavorites = () => {
        for (var i = 0; i < this.props.favorites.length; i++) {
            if (this.props.favorites[i].id === this.props.track.id) {
                return true
            }
        }
        return false
    }

    deleteTrackFromPlaylist = () => {
        let trackToDelete = {
            id: this.state.trackId,
            title: this.state.trackTitle,
            album: this.state.trackAlbum,
            previewURL: this.state.trackPreviewURL,
            albumArt: this.state.trackAlbumArt,
            popularity: this.state.trackPopularity,
            artist: this.state.trackArtist
        }
        this.props.deleteTrackFromPlaylist(this.props.currentPlaylistId, trackToDelete)
    }

    render() {
        return (
            <tr className='wbdv-track'>
                <td className='align-middle'>
                    {this.state.trackPreviewURL !== null && !this.state.playing && this.displayPlayButton()}
                    {this.state.trackPreviewURL !== null && this.state.playing && this.displayPauseButton()}
                </td>
                <td className='align-middle'>
                    <img src={this.state.trackAlbumArt} width='100' height='100'/>
                </td>
                <td className='align-middle'>
                    <h4>{this.state.trackTitle}</h4>
                    <Link to={'/search/' + this.state.trackArtist} className='wbdv-artist-search'><h5>{this.state.trackArtist}</h5></Link>
                </td>
                <td className='align-middle'>
                    <Link to={`/details/${this.state.trackId}`}><h5 className="card-title">{this.details()}</h5></Link>
                </td>
                <td className='align-middle'>
                    {this.props.user !== null && this.addToPlayListButton()}
                </td>
                <td className='align-middle'>

                </td>
                <td className='align-middle'>
                    {this.state.user !== null && !this.checkInFavorites() && this.displayLikeButton()}
                    {this.state.user !== null && this.checkInFavorites() && this.displayUnlikeButton()}
                </td>
                <td className='align-middle'>
                    <div  title='Delete from playlist'>
                        {this.props.currentPlaylistId !== null &&
                            <button className='btn btn-lg align-middle ' onClick={() => this.deleteTrackFromPlaylist()}>
                                <i className="fa fa-times wbdv-delete-from-playlist"></i></button>}
                    </div>
                </td>
            </tr>
        )
    }
}

export default Track;
