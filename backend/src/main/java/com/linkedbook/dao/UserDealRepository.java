package com.linkedbook.dao;

import com.linkedbook.entity.DealDB;
import com.linkedbook.entity.UserDB;
import com.linkedbook.entity.UserDealDB;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDealRepository extends JpaRepository<UserDealDB, Integer> {
    UserDealDB findByIdAndUserAndType(int id, UserDB userDB, String type);
    UserDealDB findByDealAndType(DealDB dealDB, String type);
}
