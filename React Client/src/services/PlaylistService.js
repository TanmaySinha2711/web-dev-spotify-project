let instance = null;

var hostURL = 'https://cs5610-project-spotify-java.herokuapp.com/api/'
{/*
hostURL = 'https://cs5610-project-spotify-java.herokuapp.com/api/'
'http://localhost:8080/api/'
*/}

class PlaylistService {
    constructor() {
        if (!instance) {
            instance = this;
        }

    }

    findPlaylistsForUser = (userId) => {
        var findPlaylistURL = hostURL + "user/" + userId
        return fetch(findPlaylistURL, {
            method: "GET",
            credentials: 'include'
        }).then(response => response.json());
    }

    createPlaylist = (user, title) => {
        var createPlaylistUrl = hostURL + "user/" + user.id + "/playlist"
        return fetch(createPlaylistUrl, {
            method: "POST",
            body: JSON.stringify({
                title: title,
                creator: user,
                tracks: []
            }),
            credentials:'include',
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json())
    }

    addTrackToPlaylist = (pid, track) => {
        var addTrackURL = hostURL + "playlist/" + pid + "/track"
        console.log(addTrackURL)
        console.log(track)
        return fetch(addTrackURL, {
            method: "POST",
            body: JSON.stringify({
                id: track.id,
                title: track.title,
                album: track.album,
                previewURL: track.previewURL,
                albumArt: track.albumArt,
                popularity: track.popularity,
                artist: track.artist
            }),
            credentials:'include',
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json())
    }

    deleteTrackFromPlaylist = (pid, track) => {
        var deleteTrackURL = hostURL + "playlist/" + pid + "/track"
        return fetch(deleteTrackURL, {
            method: "DELETE",
            body: JSON.stringify({
                id: track.id,
                title: track.title,
                album: track.album,
                previewURL: track.previewURL,
                albumArt: track.albumArt,
                popularity: track.popularity,
                artist: track.artist
            }),
            credentials:'include',
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json())
    }

    deletePlaylist = (pid) => {
        var deletePlaylistURL = hostURL + "playlist/" + pid
        return fetch(deletePlaylistURL, {
            method: 'DELETE',
            credentials: 'include',
        });
    }

} export default PlaylistService
