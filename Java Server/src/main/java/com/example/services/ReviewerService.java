package com.example.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.Reviewer;
import com.example.repositories.ReviewerRepository;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
public class ReviewerService {
	
	@Autowired
	ReviewerRepository rr;
	
	@GetMapping("/api/reviewer")
	public List<Reviewer> findAllReviewers() {

		return (List<Reviewer>) rr.findAll();
	}

	@PostMapping("/api/reviewer")
	public Reviewer createReviewer(@RequestBody Reviewer r) {
		return rr.save(r);
	}

}
