package com.linkedbook.dao;

import com.linkedbook.entity.UserDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserDB, Integer> {
    List<UserDB> findByEmailAndStatus(String email, String status);
}