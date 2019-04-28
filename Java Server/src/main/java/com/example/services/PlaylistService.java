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

import com.example.models.Playlist;
import com.example.models.Track;
import com.example.models.User;
import com.example.repositories.PlaylistRepository;
import com.example.repositories.TrackRepository;
import com.example.repositories.UserRepository;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
public class PlaylistService {

	@Autowired
	PlaylistRepository pr;
	
	@Autowired
	UserRepository ur;
	
	@Autowired
	TrackRepository tr;
	
	@PostMapping("/api/user/{userId}/playlist")
	public Playlist createPlaylist(@PathVariable("userId") int userId, @RequestBody Playlist p) {
		Optional<User> user = ur.findById(userId);
		if(user.isPresent())
		{
			p.setCreator(user.get());
			return pr.save(p);
		}
		return null;
	}
	
	@GetMapping("/api/user/{userId}/playlist")
	public List<Playlist> getPlaylistForUser(@PathVariable("userId") int userId){
		Optional<User> user = ur.findById(userId);
		if(user.isPresent())
		{
			return user.get().getPlayLists();
		}
		return new ArrayList<>();
	}
	
	@PostMapping("/api/playlist/{pid}/track")
	public Playlist addTrackToPlaylist(@PathVariable("pid") int pid, @RequestBody Track t) {
		Optional<Playlist> p = pr.findById(pid);
		Optional<Track> track = tr.findBySpotifyId(t.getId());
		if(!track.isPresent() && p.isPresent()) {
			List<Playlist> newPl = new ArrayList<>();
			newPl.add(p.get());
			t.setInPlaylists(newPl);
			tr.save(t);
		}
		if(p.isPresent()) {
			List<Track> plTracks = p.get().getTracks();
			boolean flag = true;
			for(Track temp:plTracks)
				if(temp.getId().equals(t.getId())) {
					flag = false;
					break;
				}
			
			if(flag) {
				plTracks.add(t);
				p.get().setTracks(plTracks);
				pr.save(p.get());
				return p.get();
			}
		}
		return null;
	}
	
	@DeleteMapping("/api/playlist/{pid}/track")
	public Playlist deleteTrackFromPlaylist(@PathVariable("pid") int pid, @RequestBody Track t) {
		Optional<Playlist> p = pr.findById(pid);
		Optional<Track> track = tr.findBySpotifyId(t.getId());
		if(p.isPresent() && track.isPresent()) {
			List<Track> plTracks = p.get().getTracks();
			plTracks.remove(track.get());
			p.get().setTracks(plTracks);
			pr.save(p.get());
			
			if(track.get().getInPlaylists().isEmpty()) {
				t.getInPlaylists().remove(p.get());
				tr.save(track.get());
			}
			return p.get();
		}
		return null;
	}
	
	@DeleteMapping("/api/playlist/{id}")
	public void deletePlaylist(@PathVariable("id") Integer id) {
		pr.deleteById(id);
	}
	
}
