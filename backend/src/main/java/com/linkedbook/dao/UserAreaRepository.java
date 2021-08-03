package com.linkedbook.dao;

import com.linkedbook.entity.UserAreaDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserAreaRepository extends JpaRepository<UserAreaDB, Integer> {
    Optional<UserAreaDB> findByUserIdAndOrders(int userId, int orders);
}
