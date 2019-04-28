import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route, Switch, Redirect} from 'react-router-dom'
import SpotifyAPIService from '../services/SpotifyAPIService'
import UserService from '../services/UserService'
import Homepage from './Homepage'
import Login from './Login'
import Register from './Register'
import Profile from './Profile'
import Details from '../components/Details'
import SearchResults from './SearchResults'
import ListOfUsers from './ListOfUsers'
import Playlist from './Playlist'
import OtherProfile from './OtherProfile'
import Favorites from '../components/Favorites'
import PlaylistService from "../services/PlaylistService";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'



class PlaylistManager extends Component {
    constructor(props) {
        super(props)

        this.userService = new UserService()
        this.playlistService = new PlaylistService()
        this.state = {
            spotifyAPIService: new SpotifyAPIService(),
            searchBar: "",
            loggedIn: false,
            user: null,
            favorites: [],
            playlists: []
        }
    }

    componentDidMount() {
        this.state.spotifyAPIService.authenticateApp()
        this.isLoggedIn()
    }

    getFavorites = () => {
        this.userService.getFavorites(this.state.user.id)
            .then(favorites => this.setState({
                favorites: favorites
            }))
    }


    isLoggedIn = () => {
        this.userService.getUserProfile().then(user => {
            if (user.id !== 0) {
                this.userService.getFavorites(user.id)
                    .then(favorites => this.setState({
                        favorites: favorites
                    })).then(() => this.userService.findUserById(user.id).then(currentUser => {
                    this.setState({
                        playlists: currentUser.playLists
                    })
                }))
                this.setState({
                        loggedIn: true,
                        user: user,
                        playlists: user.playLists
                    }
                )
            } else {
                this.setState({
                    loggedIn: false,
                    user: null
                })
            }
        })
    }

    searchBarChange = (event) => {
        this.setState({
            searchBar: event.target.value
        })

    }

    updateSearchBarOnArtistClick = (searchQuery) => {
      this.setState({
        searchBar: searchQuery
      })
    }

    clear = () => {
        this.setState({
            searchResults: null,
            searchBar: ''
        })
    }

    logout = () => {
        this.userService.logout().then(() => this.setState({loggedIn: false, user: null}))
    }


    createPlaylist = (newPlaylistName) => {
        this.playlistService.createPlaylist(this.state.user, newPlaylistName).then(playlist => {
            this.setState({
                playlists: [
                    ...this.state.playlists,
                    playlist
                ]
            });
        })
    }

    deletePlaylist = (playlistToDelete) => {
        this.playlistService.deletePlaylist(playlistToDelete.id)
        this.setState({
            playlists: this.state.playlists.filter(playlist => playlist.id !== playlistToDelete.id)
        })
    }

    deleteTrackFromPlaylist = (pid, trackToRemove) => {
        let playlistModify = this.state.playlists.filter(playlist => playlist.id === pid)[0]
        let index = this.state.playlists.indexOf(playlistModify)
        let otherPlaylists = this.state.playlists.filter(playlist => playlist.id !== pid)
        playlistModify.tracks = playlistModify.tracks.filter(track => track.id !== trackToRemove.id)
        otherPlaylists.splice(index, 0, playlistModify)
        this.playlistService.deleteTrackFromPlaylist(pid, trackToRemove).then(() =>
            this.setState({
                playlists: otherPlaylists
            }))
    }

    addTrackToPlaylist = (pid, track) => {
        let playlistModify = this.state.playlists.filter(playlist => playlist.id === pid)[0]
        let index = this.state.playlists.indexOf(playlistModify)
        let otherPlaylists = this.state.playlists.filter(playlist => playlist.id !== pid)
        playlistModify.tracks.push(track)
        otherPlaylists.splice(index, 0, playlistModify)
        this.playlistService.addTrackToPlaylist(pid, track).then(() =>
            this.setState({
                playlists: otherPlaylists
            }))
    }

    showMenu = () => {
      return (

        <div>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                <Link to='/' className="nav-link">Home <span className="sr-only">(current)</span></Link>
                <Link to='/login' className="nav-link">Login</Link>
                <Link to='/register' className="nav-link">Register</Link>
                <Link to='/users' className="nav-link">Discover Users</Link>
            </div>
        </div>
        <div className="form-inline my-2 my-lg-2">
            <input className="form-control mr-sm-2" type="search" placeholder="Search for songs or artists"
                   aria-label="Search" onKeyDown={this.onKeyDown} onChange={this.searchBarChange}
                   value={this.state.searchBar} style={{width: '250px'}}/>
            <Link to={"/search/" + this.state.searchBar}>
                <button type="btn" className="btn btn-outline-success my-2 my-sm-0 mr-sm-2 wbdv-btn-link"
                        onClick={this.search} type="button">Search
                </button>
            </Link>
            <button className="btn btn-outline-danger my-2 my-sm-0" onClick={this.clear} type="button">Clear
            </button>
        </div>
        </div>
      )
    }



    notLoggedInNavBar() {
        return (
          <Navbar bg="dark" expand="lg"  className="nav navbar-dark">
            <Link to="/"><Navbar.Brand href="#home">Playlist Manager</Navbar.Brand></Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                  <Link to="/" className="nav-link">Home</Link>
                  <Link to='/login' className="nav-link">Login</Link>
                  <Link to='/register' className="nav-link">Register</Link>
                  <Link to='/users' className="nav-link">Discover Users</Link>
              </Nav>

                <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={this.searchBarChange}
                value={this.state.searchBar} style={{width: '250px'}} />
              <Link to={"/search/" + this.state.searchBar}><Button onClick={this.search} variant="outline-success">Search</Button></Link>

            </Navbar.Collapse>
          </Navbar>

        )
    }


    loggedInNavBar() {
        return (
            <Navbar bg="dark" expand="lg" className="nav navbar-dark">
              <Link to="/"><Navbar.Brand href="#home">Playlist Manager</Navbar.Brand></Link>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to='/playlists' className="nav-link">My Playlists</Link>
                    <Link to='/favorites' className="nav-link">Favorites</Link>
                    <Link to='/users' className="nav-link">Discover Users</Link>
                    <Link to='/profile' className="nav-link">My Profile</Link>
                    <Link to='/login' className="nav-link" onClick={this.logout}>Logout</Link>
                </Nav>
                <Form inline>
                  <FormControl type="text" placeholder="Search" className="mr-sm-2" onKeyDown={this.search} onChange={this.searchBarChange}
                  value={this.state.searchBar} style={{width: '250px'}} />
                <Link to={"/search/" + this.state.searchBar}><Button onClick={this.search} variant="outline-success">Search</Button></Link>
                </Form>
              </Navbar.Collapse>
            </Navbar>
        )
    }


    render() {
        return (
            <div>
                <Router>

                    {this.state.loggedIn === false && this.notLoggedInNavBar()}
                    {this.state.loggedIn && this.loggedInNavBar()}

                    <Route path='/' exact
                           render={(props) => <Homepage spotifyAPIService={this.state.spotifyAPIService}
                                                        user={this.state.user} loggedIn={this.state.loggedIn}
                                                        getFavorites={this.getFavorites}
                                                        favorites={this.state.favorites}
                                                        playlists={this.state.playlists}
                                                        addTrackToPlaylist={this.addTrackToPlaylist}
                                                        updateSearchBarOnArtistClick={this.updateSearchBarOnArtistClick}/>}/>

                    <Route path='/login' exact
                           render={(props) => <Login checkLoggedIn={this.isLoggedIn}
                           updateSearchBarOnArtistClick={this.updateSearchBarOnArtistClick}/>}/>

                    <Route path='/register' exact
                           render={(props) => <Register checkLoggedIn={this.isLoggedIn}
                           updateSearchBarOnArtistClick={this.updateSearchBarOnArtistClick}/>}/>

                    <Route path='/profile' exact
                           render={(props) => <Profile checkLoggedIn={this.isLoggedIn} loggedIn={this.state.loggedIn}
                                                       logout={this.logout} key={this.state.user}
                                                       user={this.state.user}
                                                       updateSearchBarOnArtistClick={this.updateSearchBarOnArtistClick}/>}/>

                   <Route path='/details/:id' exact
                           render={(props) => <Details id={props.match.params.id}
                                                       spotifyAPIService={this.state.spotifyAPIService}
                                                       user={this.state.user} getFavorites={this.getFavorites}
                                                       favorites={this.state.favorites}/>}/>

                   <Route path='/search/' exact
                          render={(props) => <SearchResults searchQuery={''}
                                                            spotifyAPIService={this.state.spotifyAPIService}
                                                            user={this.state.user} getFavorites={this.getFavorites}
                                                            favorites={this.state.favorites}
                                                            playlists={this.state.playlists}
                                                            addTrackToPlaylist={this.addTrackToPlaylist}
                                                            updateSearchBarOnArtistClick={this.updateSearchBarOnArtistClick}/>}/>

                    <Route path='/search/:searchQuery' exact
                           render={(props) => <SearchResults searchQuery={props.match.params.searchQuery}
                                                             spotifyAPIService={this.state.spotifyAPIService}
                                                             user={this.state.user} getFavorites={this.getFavorites}
                                                             favorites={this.state.favorites}
                                                             playlists={this.state.playlists}
                                                             addTrackToPlaylist={this.addTrackToPlaylist}
                                                             updateSearchBarOnArtistClick={this.updateSearchBarOnArtistClick}/>}/>

                    <Route path='/users' exact
                           render={(props) => <ListOfUsers checkLoggedIn={this.isLoggedIn}
                                                           loggedIn={this.state.loggedIn} logout={this.logout}
                                                           user={this.state.user}
                                                           spotifyAPIService={this.state.spotifyAPIService}
                                                           updateSearchBarOnArtistClick={this.updateSearchBarOnArtistClick}/>}/>

                    <Route path='/profile/:uid' exact
                           render={(props) => <OtherProfile uid={parseInt(props.match.params.uid)}
                                                            user={this.state.user}
                                                            playlists={this.state.playlists}
                                                            getFavorites={this.getFavorites}
                                                            favorites={this.state.favorites}
                                                            updateSearchBarOnArtistClick={this.updateSearchBarOnArtistClick}
                                                            addTrackToPlaylist={this.addTrackToPlaylist}/>}/>

                    <Route path='/playlists' exact
                           render={(props) => <Playlist spotifyAPIService={this.state.spotifyAPIService}
                                                        user={this.state.user}
                                                        loggedIn={this.state.loggedIn}
                                                        getFavorites={this.getFavorites}
                                                        favorites={this.state.favorites}
                                                        playlists={this.state.playlists}
                                                        createPlaylist={this.createPlaylist}
                                                        deletePlaylist={this.deletePlaylist}
                                                        deleteTrackFromPlaylist={this.deleteTrackFromPlaylist}
                                                        updateSearchBarOnArtistClick={this.updateSearchBarOnArtistClick}
                                                        addTrackToPlaylist={this.addTrackToPlaylist}/>}/>
                    <Route path='/favorites' exact
                           render={(props) => <Favorites favorites={this.state.favorites}
                                                         loggedIn={this.state.loggedIn}
                                                         user={this.state.user}
                                                         spotifyAPIService={this.state.spotifyAPIService}
                                                         getFavorites={this.getFavorites}
                                                         playlists={this.state.playlists}
                           addTrackToPlaylist={this.addTrackToPlaylist}/>}/>
                </Router>

            </div>

        );
    }
}

export default PlaylistManager;
