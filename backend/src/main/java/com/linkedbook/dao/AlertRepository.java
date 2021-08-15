package com.linkedbook.dao;

import com.linkedbook.dto.alert.AlertStatus;
import com.linkedbook.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlertRepository extends JpaRepository<AlertDB, Integer> {
    boolean existsByTypeAndCommentAndDealAndEvalAndFromUserAndToUserAndStatus
            (AlertStatus type, CommentDB commentDB, DealDB dealDB, UserDealDB userDealDB, UserDB fromUserDB, UserDB toUserDB, String status);
}
