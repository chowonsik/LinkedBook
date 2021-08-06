package com.linkedbook.dao;

import com.linkedbook.entity.DealImageDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DealImageRepository extends JpaRepository<DealImageDB, Integer> {
    
}
