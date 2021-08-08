package com.linkedbook.dao;

import com.linkedbook.entity.BookDB;
import com.linkedbook.entity.CommentDB;
import com.linkedbook.entity.UserDB;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<CommentDB, Integer> {
    List<CommentDB> findByBook(BookDB bookDB);
    List<CommentDB> findByBook(BookDB bookDB, Pageable paging);
    List<CommentDB> findByUser(UserDB userDB, Pageable paging);
}
