let instance = null;

var hostURL = 'http://localhost:8080/api/'


hostURL = 'https://cs5610-project-spotify-java.herokuapp.com/api/'


class ReviewerService {
  constructor() {
    if (!instance) {
      instance = this;
    }
  }

    findReviewsForTrack = (trackId) => {
      var findReviews = hostURL + "track/" + trackId + "/review"
      return fetch(findReviews, {
        method: "GET",
        credentials:'include'
      }).then(response => response.json());
    }

    addReviewForTrack = (reviewer, trackId, review) =>{
      var findReviews = hostURL + "reviewer/" + reviewer.id + '/track/' + trackId + '/review'
      return fetch(findReviews, {
        method: "POST",
        body: JSON.stringify({
          reviewer: reviewer,
          track: {id: trackId},
          review: review
        }),
        headers: {
          'content-type': 'application/json'
        },
        credentials:'include'
      }).then(response => response.json());
    }

    deleteReview = (reviewId) => {
      return fetch(hostURL + 'review/' + reviewId, {
        method: "DELETE",
        headers: {
          'content-type': 'application/json'
        },
        credentials:'include'
      })
    }






} export default ReviewerService
