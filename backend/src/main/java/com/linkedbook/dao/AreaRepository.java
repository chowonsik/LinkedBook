package com.linkedbook.dao;

import com.linkedbook.entity.AreaDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AreaRepository extends JpaRepository<AreaDB, Integer> {
}
