package com.linkedbook.dao;

import com.linkedbook.entity.DealDB;
import com.linkedbook.entity.UserDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DealRepository extends JpaRepository<DealDB, Integer>, DealRepositoryCustom {
    int countByUserAndStatusNot(UserDB userDB, String status);
}
