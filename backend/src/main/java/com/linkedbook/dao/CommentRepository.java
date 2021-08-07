package com.linkedbook.dao;

import com.linkedbook.entity.CommentDB;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<CommentDB, Integer> {
}
