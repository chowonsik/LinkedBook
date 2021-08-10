package com.linkedbook.dao;

import com.linkedbook.entity.FollowDB;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FollowRepository extends JpaRepository<FollowDB, Integer> {
    Page<FollowDB> findByFromUserIdAndToUserStatus(int fromUserId, String status, Pageable paging);
    Page<FollowDB> findByToUserIdAndFromUserStatus(int toUserId, String status, Pageable paging);
    boolean existsByFromUserIdAndToUserId(int fromUserId, int toUserId);
    FollowDB findByFromUserIdAndToUserId(int fromUserId, int toUserId);
}
