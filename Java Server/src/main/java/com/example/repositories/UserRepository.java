package com.example.repositories;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.example.models.User;

public interface UserRepository extends CrudRepository<User, Integer>{
	
	@Modifying
	@Transactional
	@Query(value = "UPDATE user "
			+ "SET "
			+ "email=:email, "
			+ "dtype=:dtype, "
			+ "first_name=:firstname, "
			+ "last_name=:lastname, "
			+ "role=:role "
			+ "WHERE id=:id", nativeQuery = true) 
	public void updateUser(@Param("id") Integer id, 
			@Param("email") String email,
			@Param("firstname") String firstname,
			@Param("lastname") String lastname,
			@Param("dtype") String dtype,
			@Param("role") String role);

}