package com.linkedbook.dao;

import com.linkedbook.entity.DealDB;
import com.linkedbook.entity.UserDB;
import com.linkedbook.entity.UserDealDB;

import org.springframework.data.jpa.repository.JpaRepository;
import com.linkedbook.dto.userDeal.selectUserDeal.SelectUserDealOutput;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDealRepository extends JpaRepository<UserDealDB, Integer> {
    UserDealDB findByIdAndUserAndType(int id, UserDB userDB, String type);
    UserDealDB findByDealAndType(DealDB dealDB, String type);
    @Query("select new com.linkedbook.dto.userDeal.selectUserDeal.SelectUserDealOutput(ud.id, b.image, ud.created_at, ud.updated_at)"
            + " from UserDealDB ud join DealDB d on ud.deal.id = d.id join BookDB b on d.book.id = b.id"
            + " where ud.user.id = ?1 and ud.type = ?2")
    Page<SelectUserDealOutput> findUserDealList(int userId, String type, Pageable pageable);
}
