package com.example.repositories;

import org.springframework.data.repository.CrudRepository;

import com.example.models.Playlist;

public interface PlaylistRepository extends CrudRepository<Playlist, Integer>{

}