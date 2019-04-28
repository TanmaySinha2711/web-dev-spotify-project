package com.example.models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Inheritance(strategy=InheritanceType.SINGLE_TABLE)
public class User {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private String username;
	private String password;
	
	private String firstName;
	private String lastName;
	private String email;
	

	@Column(name="role", nullable=true, columnDefinition="varchar(10) default 'user'")
	private String role = "user";
	
	@ManyToMany
	@JoinTable(name = "Favorites",
	joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
	inverseJoinColumns = @JoinColumn(name = "liked_song_id", referencedColumnName = "id"))
	private List<Track> favorites;
	
	@OneToMany(mappedBy = "creator", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Playlist> playLists;
	
	@ManyToMany(mappedBy = "following", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JsonIgnore
	private List<User> followers;
	
	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinTable(name = "Follow",
	joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id" ),
	inverseJoinColumns = @JoinColumn(name = "following_id", referencedColumnName = "id"))
	@JsonIgnore
	 private List<User> following;
	
	public List<User> getFollowers() {
		return followers;
	}

	public void setFollowers(List<User> followers) {
		this.followers = followers;
	}

	public List<User> getFollowing() {
		return following;
	}

	public void setFollowing(List<User> following) {
		this.following = following;
	}

	public User() {
		super();
	}
	
	public User(int id) {
		this.id = id;
	}
	
	public User(int id, String username, String password, String firstName, String lastName, String email, String role, List<Track> favorites, List<Playlist> playLists) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.role = role;
		this.favorites = favorites;
		this.playLists = playLists;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public List<Track> getFavorites() {
		return favorites;
	}
	public void setFavorites(List<Track> favorites) {
		this.favorites = favorites;
	}
	public List<Playlist> getPlayLists() {
		return playLists;
	}
	public void setPlayLists(List<Playlist> playLists) {
		this.playLists = playLists;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
}