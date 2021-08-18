package com.linkedbook.dao;

import com.linkedbook.dto.alert.AlertStatus;
import com.linkedbook.entity.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlertRepository extends JpaRepository<AlertDB, Integer> {
    boolean existsByTypeAndCommentAndDealAndEvalAndFromUserAndToUserAndStatus
            (AlertStatus type, CommentDB comment, DealDB deal, UserDealDB eval, UserDB fromUser, UserDB toUser, String status);
    boolean existsByToUserAndStatus(UserDB userDB, String status);
    Page<AlertDB> findByToUserAndType(UserDB userDB, AlertStatus status, Pageable paging);
    Page<AlertDB> findByToUserAndTypeNot(UserDB userDB, AlertStatus status, Pageable paging);
}
