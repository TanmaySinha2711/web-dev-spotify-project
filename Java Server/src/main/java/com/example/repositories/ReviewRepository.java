package com.example.repositories;

import org.springframework.data.repository.CrudRepository;

import com.example.models.Review;

public interface ReviewRepository extends CrudRepository<Review, Integer>{

}
