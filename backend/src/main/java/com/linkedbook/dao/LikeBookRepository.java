package com.linkedbook.dao;

import com.linkedbook.entity.BookDB;
import com.linkedbook.entity.LikeBookDB;
import com.linkedbook.entity.UserDB;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeBookRepository extends JpaRepository<LikeBookDB, Integer> {
    boolean existsByUserAndBook(UserDB userDB, BookDB bookDB);
    LikeBookDB findByUserAndBook(UserDB userDB, BookDB bookDB);
    Page<LikeBookDB> findByUser(UserDB userDB, Pageable paging);
    Page<LikeBookDB> findByBook(BookDB bookDB, Pageable paging);
}