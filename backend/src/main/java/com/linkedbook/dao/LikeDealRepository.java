package com.linkedbook.dao;

import com.linkedbook.entity.LikeDealDB;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeDealRepository extends JpaRepository<LikeDealDB, Integer> {
    // boolean existsByUserAndBook(UserDB user, BookDB book);
}
