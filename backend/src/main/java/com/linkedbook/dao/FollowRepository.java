package com.linkedbook.dao;

import com.linkedbook.entity.FollowDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowRepository extends JpaRepository<FollowDB, Integer> {
    List<FollowDB> findByFromUserId(int fromUserId);
    List<FollowDB> findByToUserId(int toUserId);
    boolean existsByFromUserIdAndToUserId(int fromUserId, int toUserId);
}
