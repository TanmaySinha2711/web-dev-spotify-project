package com.example.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.User;
import com.example.models.Playlist;
import com.example.models.Reviewer;
import com.example.models.Track;
import com.example.repositories.UserRepository;
import com.example.repositories.PlaylistRepository;
import com.example.repositories.ReviewerRepository;
import com.example.repositories.TrackRepository;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
public class UserService {

	@Autowired
	UserRepository ur;
	
	@Autowired
	TrackRepository tr;
	
	@Autowired
	ReviewerRepository rr;
	
	@Autowired
	PlaylistRepository pr;
	
	//////////////////////////////////////////
	//////////// CRUD OPERATIONS /////////////
	//////////////////////////////////////////
	
	@GetMapping("/api/user")
	public List<User> findAllUsers() {
		return (List<User>) ur.findAll();
	}
	
	@GetMapping("/api/user/{id}")
	public User findUserById(@PathVariable("id") Integer id) {
		Optional<User> answer = ur.findById(id);
		if (answer.isPresent()) {
			return answer.get();
		}
		return null;
	}
	
	@PostMapping("/api/user")
	public User createUser(@RequestBody User user) {
		return ur.save(user);
	}
	
	@PutMapping("/api/user/{id}")
	public User updateUser(@PathVariable("id") Integer id, @RequestBody Reviewer user, HttpSession session) {
		String dtype = "User";
		if (user.getRole().equals("user")) {
			dtype = "User";
		} else {
			dtype = "Reviewer";
		}
		ur.updateUser(id, user.getEmail(), user.getFirstName(), user.getLastName(), dtype, user.getRole());
		if (id == ((User)session.getAttribute("currentUser")).getId()) {
			session.removeAttribute("currentUser");
			session.setAttribute("currentUser",  ur.findById(id).get());
			return ur.findById(id).get();
		}
		
		return ((User)session.getAttribute("currentUser"));
	}
	
	@DeleteMapping("/api/user/{id}")
	public void deleteUser(@PathVariable("id") Integer id) {
		ur.deleteById(id);
	}
	
	@PostMapping("api/user/save")
	public List<User> saveAllUser(@RequestBody List<User> user) {
		return (List<User>) ur.saveAll(user);
	}
	
	
	/////////////////////////////////////////////
	//////////// SESSION OPERATIONS /////////////
	/////////////////////////////////////////////
	
	@PostMapping("/api/loggedin")
	public User loggedin(HttpSession session) {
		int id = ((User)session.getAttribute("currentUser")).getId();
		return this.findUserById(id);
	}
	
	@PostMapping("/api/login")
	public User login(@RequestBody User loginUser, HttpSession session) {
		List<User> users = (List<User>) ur.findAll();
		for (User user : users) {
			if (user.getUsername().equalsIgnoreCase(loginUser.getUsername()) && 
					user.getPassword().equals(loginUser.getPassword())) {
				session.setAttribute("currentUser", user);
				return user;
			}
		}
		return new User();
	}
	
	@PostMapping("/api/profile")
	public User profile(HttpSession session) {
		if ((User)session.getAttribute("currentUser") != null) {
			return (User)session.getAttribute("currentUser");
		}
		return new User(0);
	}
	
	@PostMapping("/api/logout")
	public Integer logout(HttpSession session) {
		session.removeAttribute("currentUser");
		session.invalidate();
		return 1;
	}
	
	@PostMapping("/api/register")
	public User register(@RequestBody Reviewer user, HttpSession session) {
		List<User> users = (List<User>) ur.findAll();
		for(User u: users) {
			if(u.getUsername().equals(user.getUsername()))
				return null;
		}
		
		// default playlist for a user
		Playlist pl = new Playlist();
		pl.setTitle("My First Playlist");
		pr.save(pl);
		List<Playlist> playlists = new ArrayList<>();
		playlists.add(pl);
		
		User newUser = null;
		if (user.getRole().equals("user")) {
			newUser = new User();
			newUser.setUsername(user.getUsername());
			newUser.setPassword(user.getPassword());
			newUser.setRole(user.getRole());
			newUser.setPlayLists(playlists);
			newUser = ur.save(newUser);
		} else {
			user.setPlayLists(playlists);
			newUser = rr.save(user);
		}

		pl.setCreator(newUser);
		pr.save(pl);
		session.setAttribute("currentUser", newUser);
		return newUser;
	}
	
	@GetMapping("/api/user/{userId}/favorites")
	public List<Track> getFavorites(@PathVariable("userId") int id){
		Optional<User> opt  = ur.findById(id);
		if(opt.isPresent()) {
			return opt.get().getFavorites();
		}
		return new ArrayList<>();
	}
	
	@PostMapping("/api/user/{userId}/favorites")
	public User addToFavorites(@PathVariable("userId") int id, 
			@RequestBody Track t) {
		Optional<User> opt = ur.findById(id);
    	if(opt.isPresent()) {
    		List<Track> favorites;
    		if(opt.get().getFavorites() != null)
    			favorites = opt.get().getFavorites();
    		else
    			favorites = new ArrayList<>();
    		
    		if(!tr.findBySpotifyId(t.getId()).isPresent()) {
    			List<User> users = new ArrayList<>();
        		users.add(opt.get());
        		t.setLikedBy(users);
        		tr.save(t);
    		}
    		else {
    			Optional<Track> track = tr.findBySpotifyId(t.getId());
    			List<User> users = track.get().getLikedBy();
        		users.add(opt.get());
        		track.get().setLikedBy(users);
        		tr.save(track.get());
    		}
    		favorites.add(t);
    		opt.get().setFavorites(favorites);
    		
    		ur.save(opt.get());
    		return opt.get();
    	}
    	return null;
	}
	
	@DeleteMapping("/api/user/{userId}/deletetrack")
	public User removeFromFavorites(@PathVariable("userId") int id, 
			@RequestBody Track t) {
		Optional<User> opt = ur.findById(id);
    	if(opt.isPresent()) {
    		List<Track> favorites;
    		if(opt.get().getFavorites() != null)
    			favorites = opt.get().getFavorites();
    		else
    			favorites = new ArrayList<>();
    		
    		Optional<Track> track = tr.findBySpotifyId(t.getId());
	    	List<User> users = track.get().getLikedBy();
	        users.remove(opt.get());
	        track.get().setLikedBy(users);
	        tr.save(track.get());
        		
    		favorites.remove(track.get());
    		opt.get().setFavorites(favorites);
    		
    		ur.save(opt.get());
    		return opt.get();
    	}
    	return null;
	}

	@PostMapping("/api/user/{userId}/follow")
	public User follow(@PathVariable("userId") int id1,
			@RequestBody User user) {
    	Optional<User> u1 = ur.findById(id1);
    	Optional<User> u2 = ur.findById(user.getId());
    	
    	if(u1.isPresent() && u2.isPresent()) {
    		List<User> u1Following = u1.get().getFollowing();
    		if(!u1.get().getFollowing().contains(u2.get())) {
    			u1Following.add(u2.get());
    			u1.get().setFollowing(u1Following);
    			ur.save(u1.get());
    			
    			List<User> u2Followers = u2.get().getFollowers();
        		u2Followers.add(u1.get());
        		u2.get().setFollowers(u2Followers);
        		ur.save(u2.get());
    		}
    		
    	}
    	return u1.get();
    }
    
	@DeleteMapping("/api/user/{userId}/unfollow")
	public User unfollow(@PathVariable("userId") int id1,
			@RequestBody User user) {
    	Optional<User> u1 = ur.findById(id1);
    	Optional<User> u2 = ur.findById(user.getId());
    	
    	if(u1.isPresent() && u2.isPresent()) {
    		List<User> u1Following = u1.get().getFollowing();
    		u1Following.remove(u2.get());
    		u1.get().setFollowing(u1Following);
    		ur.save(u1.get());
    		
    		List<User> u2Followers = u2.get().getFollowers();
    		u2Followers.remove(u1.get());
    		u2.get().setFollowers(u2Followers);
    		ur.save(u2.get());
    	}
    	return u1.get();
    }
	
	@GetMapping("/api/user/{userId}/following")
	public List<User> getFollowing(@PathVariable("userId") int id){
		Optional<User> u1 = ur.findById(id);
		
		if(u1.isPresent()) {
			return u1.get().getFollowing();
		}
		return new ArrayList<>();
	}
	
	@GetMapping("/api/user/{userId}/followers")
	public List<User> getFollowers(@PathVariable("userId") int id){
		Optional<User> u1 = ur.findById(id);
		
		if(u1.isPresent()) {
			return u1.get().getFollowers();
		}
		return new ArrayList<>();
	}
}