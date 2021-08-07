package com.linkedbook.dao;

import com.linkedbook.entity.UserAreaDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAreaRepository extends JpaRepository<UserAreaDB, Integer> {
}
