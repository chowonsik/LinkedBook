package com.linkedbook.dao;

import com.linkedbook.entity.DealDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DealRepository extends JpaRepository<DealDB, Integer> {
}
