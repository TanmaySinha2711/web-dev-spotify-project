package com.example.repositories;

import com.example.models.Track;

import java.util.Optional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;


public interface TrackRepository extends CrudRepository<Track, Integer>{
    @Query("SELECT t FROM Track t WHERE t.id=:id")
    public Optional<Track> findBySpotifyId(
            @Param("id")String id);
    
    @Modifying
    @Transactional
    @Query("DELETE FROM Track t WHERE t.id=:id")
    public void deleteBySpotifyId(@Param("id") String id);	
}
