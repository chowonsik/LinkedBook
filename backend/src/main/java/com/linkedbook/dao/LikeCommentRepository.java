package com.linkedbook.dao;

import com.linkedbook.entity.CommentDB;
import com.linkedbook.entity.LikeCommentDB;
import com.linkedbook.entity.UserDB;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeCommentRepository extends JpaRepository<LikeCommentDB, Integer> {
    Page<LikeCommentDB> findByComment(CommentDB commentDB, Pageable paging);
    boolean existsByUserAndComment(UserDB commentUserDB, CommentDB commentDB);
    LikeCommentDB findByUserAndComment(UserDB commentUserDB, CommentDB commentDB);
}
