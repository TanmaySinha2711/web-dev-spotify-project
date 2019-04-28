import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom'
import Track from "../components/Track";
import './Playlist.css'
import ListGroup from 'react-bootstrap/ListGroup'

class Playlist extends Component {
    constructor(props) {
        super(props)

        this.state = {
            playlists: this.props.playlists,
            newPlayListName: '',
            selectedPlaylist: null,
        };

        this.titleChanged = this.titleChanged.bind(this);
    }

    componentDidMount = () => {
        this.props.updateSearchBarOnArtistClick('')
        if (this.props.playlists.length !== 0) {
            this.setState({
                selectedPlaylist: this.props.playlists[0]
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.playlists !== this.props.playlists) {
            this.setState({
                playlists: this.props.playlists
            })
        }
    }

    titleChanged = (event) => {
        this.setState(
            {
                newPlayListName: event.target.value
            });
    }

    selectPlaylist = (playlist) => {
        this.setState({
            selectedPlaylist: playlist
        })
    }

    render() {
        if (!this.props.loggedIn) {
            return <Redirect to='/login'/>
        }
        return (
            <div className={"wbdv-background-color"}>
                <div className={"row wbdv-playlist"} id={"playlistRow"}>
                    <div className={"col-md-4 col-lg-3"} id={"playlist"}>
                        <ul className="list-group ">
                            <li className="list-group-item wbdv-playlist-list-item list-group-item-dark"><h3
                                className='wbdv-playlist-title'>Playlists</h3></li>
                            <li className="list-group-item wbdv-playlist-list-item list-group-item-dark">
                                <div className='row '>
                                    <input
                                        onChange={this.titleChanged}
                                        className="form-control col-lg-8 float-left col-md-7"
                                        placeholder={"New playlist title"}
                                        value={this.state.newPlayListName}/>
                                    <div className="col-lg-4 col-md-5 float-right">
                                        <button onClick={() => this.props.createPlaylist(this.state.newPlayListName)}
                                                className="btn btn-primary btn-block"><i class="fa fa-plus-square"></i>
                                        </button>
                                    </div>
                                </div>
                            </li>
                            {
                                this.state.playlists !== null && this.state.playlists.length !== 0 &&
                                this.state.playlists.map(playlist =>
                                    <li onClick={() => this.selectPlaylist(playlist)}
                                        className={playlist === this.state.selectedPlaylist ?
                                            "list-group-item active wbdv-playlist-list-item list-group-item-dark" : "list-group-item wbdv-playlist-list-item list-group-item-dark"}>
                                        {playlist.title}

                                        <span className="pull-right">
                                                <button className={"btn btn-danger btn-sm"}
                                                        onClick={() => this.props.deletePlaylist(playlist)}>
                                                    <i className={"fa fa-times"}></i>
                                                </button>
                                            </span>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                    <div className={"col-md-8 col-lg-9"}>
                        {this.state.selectedPlaylist !== null && this.state.selectedPlaylist.tracks !== null
                        && this.state.selectedPlaylist.tracks.length != 0 &&
                        <table className={"table-responsive-sm table table-dark table-hover align-middle wbdv-table"}>
                            <tbody>

                            {this.state.selectedPlaylist.tracks.map(track =>
                                <Track track={track} key={track.id} user={this.props.user}
                                       spotifyAPIService={this.props.spotifyAPIService}
                                       getFavorites={this.props.getFavorites} favorites={this.props.favorites}
                                       currentPlaylistId={this.state.selectedPlaylist.id}
                                       deleteTrackFromPlaylist={this.props.deleteTrackFromPlaylist}
                                       playlists={this.state.playlists}
                                       addTrackToPlaylist={this.props.addTrackToPlaylist}/>)
                            }
                            </tbody>
                        </table>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Playlist;
