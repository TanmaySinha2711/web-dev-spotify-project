let instance = null;

let spotifyUrl = 'https://api.spotify.com/v1/'

let ourUrl = 'https://cs5610-project-spotify-java.herokuapp.com/api/'
{/*
let ourUrl = 'http://localhost:8080/api/'
*/}

class SpotifyAPIService {
  constructor() {
    if (!instance) {
      instance = this;
    }
    this.token = ""

  }

  authenticateApp = () =>
    fetch(ourUrl + 'authenticate').then(response => response.json()).then(data =>{
      this.token = "" + data.access_token
    });



  getTrack = (id) => {
    console.log(this.token)
    return fetch('https://api.spotify.com/v1/tracks/' + id, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + this.token
        }
    }).then(response => response.json())
  }

  search = (query) => {
    var url = spotifyUrl + "search?" + "q=" + query + "&type=track" + "&limit=50"
    return fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + this.token
        }
    }).then(response => response.json())
  }


  getTopSongs = () => {
    var url = spotifyUrl +'playlists/37i9dQZEVXbMDoHDwVN2tF'
    return fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + this.token
        }
    }).then(response => response.json())
  }

} export default SpotifyAPIService
