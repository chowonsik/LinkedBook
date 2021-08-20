package com.linkedbook.dao;

import com.linkedbook.entity.CommentCategoryDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentCategoryRepository extends JpaRepository<CommentCategoryDB, Integer> {
}
