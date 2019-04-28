import React, { Component } from 'react';
import SpotifyAPIService from '../services/SpotifyAPIService'
import UserService from '../services/UserService'
import ReviewService from '../services/ReviewService'
import {BrowserRouter as Router, Link, Route, Switch, Redirect} from 'react-router-dom'
import './Details.css'
import ProgressBar from 'react-bootstrap/ProgressBar'



class Details extends Component {
  constructor(props) {
  super(props)

  this.userService = new UserService()
  this.reviewService = new ReviewService()


  this.state = {
    playing: false,
    user: {role: ''},
    spotifyId: this.props.id,
    track: null,
    preview: new Audio(null),
    spotifyAPIService: this.props.spotifyAPIService,
    searching: false,
    loggedIn: null,
    reviews: [],
    addReview: ''
    }
  }

  componentDidMount() {
    this.state.spotifyAPIService.authenticateApp()
      .then(() => this.state.spotifyAPIService.getTrack(this.state.spotifyId)
      .then(track => {
        this.reviewService.findReviewsForTrack(track.id)
        .then(reviews => this.setState({reviews: reviews}))
        if (track.preview_url !== null) {
          this.setState({
            track: track,
            preview: new Audio(track.preview_url)
          })
        } else {
          this.setState({
            track: track
          })
        }
      }))
  }

  playTrack = () => {
    if (this.state.track.preview_url !== null) {
      this.setState({
        playing: true
      })
      this.state.preview.play()
    }
  }

  pauseTrack = () => {
    this.setState({
      playing: false
    })
    this.state.preview.pause()
  }


  addToPlayList() {
    return(
      <div className='row mb-2' >
        <button className='btn btn-sm btn-primary' style={{height: '30px', width: '110px'}}>Add to Playlist
        </button>
      </div>
    )
  }


  reviewChange = (event) => {
    this.setState({
      addReview: event.target.value
    })
  }

  createReview = () =>{
    this.reviewService.addReviewForTrack(this.props.user, this.state.track.id, this.state.addReview)
      .then(review => {
        this.setState({
          reivews: this.state.reviews.push(review),
        })
      })
    }

    unlikeTrack = () => {
          this.userService.removeTrackFromFavorites(this.props.user.id,this.state.track).then(() => this.props.getFavorites())
    }

    likeTrack = () => {
          this.userService.addTrackToFavoritesFromDetails(this.props.user.id, this.state.track).then(() => this.props.getFavorites())
    }


    displayLikeButton(){
        return(
            <button className='btn btn-lg' onClick={this.likeTrack}>
                <i className="fa fa-heart wbdv-like-button fa-2x"></i>
            </button>
        )
    }

    displayUnlikeButton(){
        return(
            <button className='btn btn-lg' onClick={this.unlikeTrack}>
                <i className="fa fa-heart wbdv-unlike-button fa-2x"></i>
            </button>
        )
    }

    checkInFavorites = () => {
      for (var i = 0; i < this.props.favorites.length; i++) {
        if (this.props.favorites[i].id === this.state.track.id) {
          return true
        }
      }
      return false
    }


  displayPlayButton(){
    return (

      <button className="btn btn-success"  onClick={this.playTrack}>
        <i className="fa fa-play"></i>
      </button>

    )
  }

  displayPauseButton() {
    return (
      <button className="btn btn-danger"onClick={this.pauseTrack}>
        <i className="fa fa-pause"></i>
      </button>
    )
  }


  addReview(){
    return (
      <div className='row ml-4 mr-4 mb-4 wbdv-add-review'>
        <textarea className="form-control mb-2" placeholder="Add a review"  onChange={this.reviewChange}></textarea>
        <button className="btn btn-success" onClick={this.createReview}>Submit</button>
      </div>
    )
  }

  deleteReview = (id) => {
    this.reviewService.deleteReview(id).then(() => {
      this.reviewService.findReviewsForTrack(this.state.track.id)
      .then(reviews => this.setState({reviews: reviews}))
    })
  }

  showReviews() {
    return (
      <div>
          {this.state.reviews.map((review, index) =>
            <div className='wbdv-reviewer-name mb-2' key={this.state.reviews[this.state.reviews.length - 1 - index].id}>
            <div className='row'>
            <div className='col-10'>
            <div className='row'>
              <Link to={'/profile/' + this.state.reviews[this.state.reviews.length - 1 - index].reviewer.id} className="wbdv-profile-link"><h5 className='mr-4 ml-4'>{this.state.reviews[this.state.reviews.length - 1 - index].reviewer.username}</h5></Link>
            </div>
            <div className='row'>
              <p className='ml-4 mr-4'>{this.state.reviews[this.state.reviews.length - 1 - index].review}</p>
            </div>
          </div>
          <div classname='col-2'>
            {this.props.user !== null && this.props.user.id === this.state.reviews[this.state.reviews.length - 1 - index].reviewer.id &&
               <button className='btn btn-lg align-middle' onClick={()=>this.deleteReview(this.state.reviews[this.state.reviews.length - 1 - index].id)}>
                  <i className="fa fa-times wbdv-delete-from-playlist"></i></button>}
          </div>
          </div>
            </div>
        )}
      </div>

    )
  }

  render() {
    return (
      <div className='wbdv-background-color'>
        {this.state.track !== null &&
      <div className='offset-md-2 col-md-8 wbdv-details'>
        <div className='row'>
          <div className='col-md-4'>
          <img src={this.state.track.album.images[0].url} className="img-fluid" alt="Responsive image"/>
          </div>
          <div className='col-md-6 wbdv-details-header'>
            <div className='row'>
              {!this.state.playing && this.state.track.preview_url !== null && this.displayPlayButton()}
              {this.state.track.preview_url === null && <p>Preview not available</p>}
              {this.state.playing && this.displayPauseButton()}
            </div>
          <div className='row'>
            <h3>{this.state.track.name}</h3>
          </div>
          <div className='row'>
            {this.state.track.artists.map((artist, i) => {
              if (i === this.state.track.artists.length - 1) {
                return <Link to={'/search/' + artist.name} key={artist.id} className='wbdv-artist-search'><h5>{artist.name}</h5></Link>
              } else {
                return <Link to={'/search/' + artist.name} className='wbdv-artist-search' key={artist.id}><h5>{artist.name},&nbsp;</h5></Link>
              }
            })}
          </div>
          <div className='row'>
            <h6>{this.state.track.album.name}</h6>
          </div>
          <div className='row'>
            <h6>Released on {this.state.track.album.release_date}</h6>
          </div>
          <div className='row'>
            <h6>{(Math.floor(this.state.track.duration_ms / 60000) + ":" + ((this.state.track.duration_ms % 60000) / 1000).toFixed(0))}</h6>
          </div>
            <div className='row'>
              <ProgressBar className='wbdv-details-popularity' now={this.state.track.popularity} label={`Popularity Rating ${this.state.track.popularity}`} />
            </div>
          </div>
          <div className='col-md-2 text-right'>
            {this.props.user !== null && !this.checkInFavorites() && this.displayLikeButton()}
            {this.props.user !== null && this.checkInFavorites() && this.displayUnlikeButton()}
        </div>
        </div>
      </div>
    }

    {this.state.track !== null &&
    <div className='offset-md-4 mt-4 col-md-4 wbdv-details'>
      {this.state.track !== null && this.state.reviews.length !== 0 && <h3 className='text-center'>Reviews</h3>}
      {this.state.track !== null && this.props.user !== null && this.props.user.role === 'reviewer' && this.addReview()}
      {this.state.track !== null && this.state.reviews.length === 0 && <h3 className='text-center'>No reviews for this song yet</h3>}
      {this.state.track !== null && this.state.reviews.length !== 0 && this.showReviews()}
    </div>
  }

  </div>






    );
  }
}

export default Details;
