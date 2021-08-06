package com.linkedbook.dao;

import com.linkedbook.entity.ImageDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ImageRepository extends JpaRepository<ImageDB, Integer> {
    Optional<ImageDB> findByImageurl(String imageurl);
}
