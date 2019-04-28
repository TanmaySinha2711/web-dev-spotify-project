package com.example.models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Playlist {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private String title;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "Playlist_Tracks", 
	joinColumns = @JoinColumn(name = "Playlist", referencedColumnName = "id"),
	inverseJoinColumns = @JoinColumn(name = "Track", referencedColumnName = "id"))
	private List<Track> tracks;
	
	@ManyToOne
	@JsonIgnore
	private User creator;
	
	public Playlist() {
		super();
	}
	public Playlist(int id, String title, List<Track> tracks, User creator) {
		super();
		this.id = id;
		this.title = title;
		this.tracks = tracks;
		this.creator = creator;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public List<Track> getTracks() {
		return tracks;
	}
	public void setTracks(List<Track> tracks) {
		this.tracks = tracks;
	}
	public User getCreator() {
		return creator;
	}
	public void setCreator(User creator) {
		this.creator = creator;
	}
}