package com.linkedbook.dao;

import com.linkedbook.entity.BookDB;
import com.linkedbook.entity.CommentDB;
import com.linkedbook.entity.UserDB;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<CommentDB, Integer> {
    Page<CommentDB> findByBook(BookDB bookDB, Pageable paging);
    Page<CommentDB> findByUser(UserDB userDB, Pageable paging);
    CommentDB findByIdAndUser(int id, UserDB userDB);
}
