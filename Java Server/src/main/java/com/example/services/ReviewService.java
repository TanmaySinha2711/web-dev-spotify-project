package com.example.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.Review;
import com.example.models.Reviewer;
import com.example.models.Track;
import com.example.repositories.ReviewRepository;
import com.example.repositories.ReviewerRepository;
import com.example.repositories.TrackRepository;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
public class ReviewService {
	@Autowired
	ReviewRepository rr;
	
	@Autowired
	TrackRepository tr;
	
	@Autowired
	ReviewerRepository rvr;
	
	@PostMapping("/api/reviewer/{reviewerId}/track/{trackId}/review")
	public Review addReviewForTrack(@PathVariable("reviewerId") int reviewerId,
			@PathVariable("trackId") String trackId,
			@RequestBody Review r) {
		System.out.println(reviewerId + " " + trackId + " ");
		if(rvr.findById(reviewerId).isPresent()) {
			if(tr.findBySpotifyId(trackId).isPresent()) {
				Track t = tr.findBySpotifyId(trackId).get();
				t.getReviews().add(r);
				tr.save(t);
				rvr.findById(reviewerId).get().getReviews().add(r);
				rvr.save(rvr.findById(reviewerId).get());
				r.setTrack(t);
				r.setReviewer(rvr.findById(reviewerId).get());
				return rr.save(r);
			}
			else {
				Track t = new Track();
				t.setId(trackId);
				tr.save(t);
				if (t.getReviews() != null) {
					t.getReviews().add(r);
					tr.save(t);
				} else {
					t.setReviews(new ArrayList<>());
					t.getReviews().add(r);
					tr.save(t);
				}
				rvr.findById(reviewerId).get().getReviews().add(r);
				rvr.save(rvr.findById(reviewerId).get());
				r.setTrack(t);
				r.setReviewer(rvr.findById(reviewerId).get());
				return rr.save(r);
			}
		}
		return null;
	}
	
	@GetMapping("api/reviewer/{reviewerId}/review")
	public List<Review> getReviewsByReviewer(@PathVariable("reviewerId") int id){
		Optional<Reviewer> r = rvr.findById(id);
		if(r.isPresent()) {
			return r.get().getReviews();
		}
		return new ArrayList<>();
	}
	
	@GetMapping("api/track/{trackId}/review")
	public List<Review> getReviewsForTrack(@PathVariable("trackId") String id){
		Optional<Track> t = tr.findBySpotifyId(id);
		if(t.isPresent()) {
			return t.get().getReviews();
		}
		return new ArrayList<>();
	}
	
	@DeleteMapping("api/review/{id}")
	public void deleteReview(@PathVariable("id") int id) {
		rr.deleteById(id);
	}
}

