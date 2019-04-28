let instance = null;

var hostURL = 'http://localhost:8080/api/'

hostURL = 'https://cs5610-project-spotify-java.herokuapp.com/api/'


class UserService {
    constructor() {
        if (!instance) {
            instance = this;
        }

    }

    login = (username, password) => {
        var loginUrl = hostURL + "login"
        return fetch(loginUrl, {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password
            }),
            credentials:'include',
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json());
    }


    register = (username, password, role) => {
        var registerUrl = hostURL + "register"
        return fetch(registerUrl, {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password,
                role: role
            }),
            credentials:'include',
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json());

    }

    findUserById = (userId) => {
        var findUserUrl = hostURL + "user/" + userId
        return fetch(findUserUrl, {
            method: "GET",
            credentials:'include'
        }).then(response => response.json());
    }

    findAllUsers = () => {
        var findUserUrl = hostURL + "user"
        return fetch(findUserUrl, {
            method: 'GET',
            credentials:'include'
        }).then(response => response.json());
    }

    getUserProfile = () => {
        var profileUrl = hostURL + "profile"
        return fetch(profileUrl, {
            method: 'POST',
            credentials:'include',
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json());
    }


    loggedIn = () => {
        var loggedInUrl = hostURL + "loggedin"
        return fetch(loggedInUrl, {
            method: 'POST',
            credentials:'include',
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json());

    }

    logout = () => {
        var logoutUrl = hostURL + "logout"
        return fetch(logoutUrl, {
            method: 'POST',
            credentials:'include',
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json());
    }

    updateUser = (id, username, password, firstName, lastName, email, role) => {
        var updateURL = hostURL + "user/" + id
        return fetch(updateURL, {
            method: 'PUT',
            body: JSON.stringify({
                id: id,
                username: username,
                password: password,
                firstName: firstName,
                lastName: lastName,
                email: email,
                role: role
            }),
            credentials:'include',
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json());
    }

    deleteUser = (user) => {
        var updateURL = hostURL + "user/" + user.id
        return fetch(updateURL, {
            method: 'DELETE',
            credentials:'include',
            headers: {
                'content-type': 'application/json'
            }
        });
    }

    addTrackToFavorites = (id, track) => {
        let updateURL = hostURL + "user/" + id + "/favorites"
        return fetch(updateURL, {
            method: 'POST',
            body: JSON.stringify({
                id: track.id,
                title: track.title,
                album: track.album,
                previewURL: track.previewURL,
                albumArt: track.albumArt,
                popularity: track.popularity,
                artist: track.artist
            }),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json())
    }

    addTrackToFavoritesFromDetails = (id, track) => {
        let updateURL = hostURL + "user/" + id + "/favorites"
        return fetch(updateURL, {
            method: 'POST',
            body: JSON.stringify({
                id: track.id,
                title: track.name,
                album: track.album.name,
                previewURL: track.preview_url,
                albumArt: track.album.images[0].url,
                popularity: track.popularity,
                artist: track.artists[0].name
            }),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json())
    }

    removeTrackFromFavorites = (id, track) => {
        let updateURL = hostURL + "/user/" + id + "/deletetrack"
        console.log(track.id)
        return fetch(updateURL, {
            method: 'DELETE',
            body: JSON.stringify({
                id: track.id
            }),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json())
    }

    getFavorites = (id) => {
        let updateURL = hostURL + "/user/" + id + "/favorites"
        return fetch(updateURL, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json())
    }


} export default UserService
