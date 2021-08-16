package com.linkedbook.dao;

import com.linkedbook.entity.BookDB;
import com.linkedbook.entity.LikeBookDB;
import com.linkedbook.entity.UserDB;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikeBookRepository extends JpaRepository<LikeBookDB, Integer> {
    boolean existsByUserAndBook(UserDB userDB, BookDB bookDB);
    LikeBookDB findByUserAndBook(UserDB userDB, BookDB bookDB);
    List<LikeBookDB> findByBookAndUserStatusAndUserIdNot(BookDB book, String status, int loginUserId);
    Page<LikeBookDB> findByUser(UserDB userDB, Pageable paging);
    Page<LikeBookDB> findByBook(BookDB bookDB, Pageable paging);
}