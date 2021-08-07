package com.linkedbook.dao;

import com.linkedbook.entity.UserDealDB;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDealRepository extends JpaRepository<UserDealDB, Integer> {
}
