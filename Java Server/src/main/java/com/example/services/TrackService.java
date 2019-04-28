package com.example.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.Track;
import com.example.repositories.TrackRepository;


@RestController
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
public class TrackService {

	@Autowired
	TrackRepository tr;
	
	@PostMapping("/api/track")
	public Track createTrack(@RequestBody Track t) {
		tr.save(t);
		return t;
	}
	
	@GetMapping("/api/track")
	public List<Track> findAllTracks() {
		return (List<Track>) tr.findAll();
	}
	
	@GetMapping("/api/track/{id}")
	public Track findTrackById(@PathVariable("id") String id) {
		Optional<Track> track = tr.findBySpotifyId(id);
		if (track.isPresent()) {
			return track.get();
		}
		return null;
	}
	
	@PutMapping("/api/track/{trackId")
	public void updateTrack(@PathVariable("trackId") String id,
			@RequestBody Track t) {
		Optional<Track> opt = tr.findBySpotifyId(id);
		if(opt.isPresent()) {
			tr.save(t);
		}
	}
	
	@DeleteMapping("/api/track/{trackId}")
	public void deleteTrack(@PathVariable("trackId") String id) {
		tr.deleteBySpotifyId(id);
	}
	
}