package com.example.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Review {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;

	private String reviewText;
	
	@ManyToOne
	private Reviewer reviewer;
	
	@ManyToOne
	@JsonIgnore
	private Track track;
	
	public Review() {
		super();
	}

	public Track getTrack() {
		return track;
	}

	public void setTrack(Track track) {
		this.track = track;
	}

	public Review(String review, Reviewer reviewer, Track track) {
		super();
		this.reviewText = review;
		this.reviewer = reviewer;
		this.track = track;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getReview() {
		return reviewText;
	}

	public void setReview(String review) {
		this.reviewText = review;
	}

	public Reviewer getReviewer() {
		return reviewer;
	}

	public void setReviewer(Reviewer reviewer) {
		this.reviewer = reviewer;
	}
	
	public void set(Review r) {
		this.setReview(r.getReview());
		this.setReviewer(r.getReviewer());
		this.setTrack(r.getTrack());
	}
}
