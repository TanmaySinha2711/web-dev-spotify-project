package com.example.models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Reviewer extends User{
	

	@OneToMany(mappedBy = "reviewer", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JsonIgnore
	private List<Review> reviews;
	
	public List<Review> getReviews() {
		return reviews;
	}
	public void setReviews(List<Review> reviews) {
		this.reviews = reviews;
	}
	
	public Reviewer() {
		super();
	}	
	public Reviewer(int id, String username, String password, String firstName, String lastName, String email,
			String role, List<Track> favorites, List<Playlist> playLists, List<Review> reviews) {
		super(id, username, password, firstName, lastName, email, role, favorites, playLists);
		this.reviews = reviews;
	}
	public void set(Reviewer r) {
		this.setEmail(r.getEmail());
		this.setUsername(r.getUsername());
		this.setPassword(r.getPassword());
		this.setReviews(r.getReviews());
		this.setFavorites(r.getFavorites());
		this.setPlayLists(r.getPlayLists());
	}
}
