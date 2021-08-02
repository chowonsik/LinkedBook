package com.linkedbook.dao;

import com.linkedbook.entity.FollowDB;
import com.linkedbook.dto.follow.FollowStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowRepository extends JpaRepository<FollowDB, Integer> {
    List<FollowDB> findByFromUserIdAndStatus(int fromUserId, FollowStatus status);
    List<FollowDB> findByToUserIdAndStatus(int toUserId, FollowStatus status);
    FollowDB findByFromUserIdAndToUserId(int fromUserId, int toUserId);
}
