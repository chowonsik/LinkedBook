package com.linkedbook.dao;

import com.linkedbook.entity.BookDB;
import com.linkedbook.entity.LikeBookDB;
import com.linkedbook.entity.UserDB;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeBookRepository extends JpaRepository<LikeBookDB, Integer> {
    boolean existsByUserAndBookAndStatus(UserDB user, BookDB book, String status);
}
