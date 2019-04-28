package com.example.models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
public class Track {

	@Id
	@Column(name = "id",nullable = false)
	private String id;
	
	private String title;
	private String album;
	private String previewURL;
	private String albumArt;
	private int popularity;
	private String artist;
	
	public String getAlbum() {
		return album;
	}
	public void setAlbum(String album) {
		this.album = album;
	}
	public String getPreviewURL() {
		return previewURL;
	}
	public void setPreviewURL(String previewURL) {
		this.previewURL = previewURL;
	}
	public String getAlbumArt() {
		return albumArt;
	}
	public void setAlbumArt(String albumArt) {
		this.albumArt = albumArt;
	}
	public int getPopularity() {
		return popularity;
	}
	public void setPopularity(int popularity) {
		this.popularity = popularity;
	}
	@JsonIgnore
	@ManyToMany(mappedBy="favorites", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<User> likedBy;
	
	@JsonIgnore
	@ManyToMany(mappedBy="tracks", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Playlist> inPlaylists;
	
	@OneToMany(mappedBy = "track", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Review> reviews;
	
	public List<Review> getReviews() {
		return reviews;
	}
	public void setReviews(List<Review> reviews) {
		this.reviews = reviews;
	}
	public Track() {
		super();
	}
	
	public Track(String id, String title, String album, String previewURL, String albumArt, int popularity,
			String artist, List<User> likedBy, List<Playlist> inPlaylists, List<Review> reviews) {
		super();
		this.id = id;
		this.title = title;
		this.album = album;
		this.previewURL = previewURL;
		this.albumArt = albumArt;
		this.popularity = popularity;
		this.artist = artist;
		this.likedBy = likedBy;
		this.inPlaylists = inPlaylists;
		this.reviews = reviews;
	}
	public String getTitle() {
		return title;
	}
	public String getId() {
		return id;
	}
	public void setId(String spotifyId) {
		this.id = spotifyId;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public List<User> getLikedBy() {
		return likedBy;
	}
	public void setLikedBy(List<User> likedBy) {
		this.likedBy = likedBy;
	}
	public List<Playlist> getInPlaylists() {
		return inPlaylists;
	}
	public void setInPlaylists(List<Playlist> inPlaylists) {
		this.inPlaylists = inPlaylists;
	}
	public String getArtist() {
		return artist;
	}
	public void setArtist(String artist) {
		this.artist = artist;
	}
}