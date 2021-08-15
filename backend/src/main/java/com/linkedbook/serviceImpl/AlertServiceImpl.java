package com.linkedbook.serviceImpl;

import com.linkedbook.configuration.ValidationCheck;
import com.linkedbook.dao.*;
import com.linkedbook.dto.alert.AlertInput;
import com.linkedbook.dto.alert.AlertStatus;
import com.linkedbook.entity.*;
import com.linkedbook.response.Response;
import com.linkedbook.service.AlertService;
import com.linkedbook.service.JwtService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.linkedbook.response.ResponseStatus.*;

@Service("AlertService")
@AllArgsConstructor
@Slf4j
public class AlertServiceImpl implements AlertService {

    private final AlertRepository alertRepository;
    private final DealRepository dealRepository;
    private final CommentRepository commentRepository;
    private final UserDealRepository userDealRepository;
    private final LikeBookRepository likeBookRepository;
    private final FollowRepository followRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    @Override
    public Response<Object> createAlertInfo(AlertInput alertInput) {
        // 1. 값 형식 체크
        Response<Object> errorResponse = validateInputValue(alertInput);
        if (errorResponse != null) return errorResponse;
        // 2. 알림 정보 생성
        try {
            UserDB fromUserDB = jwtService.getUserDB(); // from
            if (fromUserDB == null) {
                log.error("[alerts/post] NOT FOUND LOGIN USER error");
                return new Response<>(NOT_FOUND_USER);
            }

            List<UserDB> toUserDBList = new ArrayList<>();
            AlertStatus inputType = AlertStatus.valueOf(alertInput.getType());
            CommentDB targetCommentDB = null;
            DealDB targetDealDB = null;
            UserDealDB targetEvalDB = null;

            if (inputType == AlertStatus.LIKE_DEAL) { // 자신의 거래글 좋아요 알림(deal_id, to_user_id)
                targetDealDB = dealRepository.findById(alertInput.getDealId()).orElse(null);
                if (targetDealDB == null || targetDealDB.getUser().getId() == fromUserDB.getId()) { // 자기 자신의 좋아요 알림은 제외
                    log.error("[alerts/post] NOT FOUND DEAL error");
                    return new Response<>(NOT_FOUND_DEAL);
                }
                toUserDBList.add(targetDealDB.getUser());

            } else if (inputType == AlertStatus.NEW_DEAL_FOLLOW) { // 팔로우한 책방의 신규 입고 알림(deal_id, to_user_id)
                targetDealDB = dealRepository.findByIdAndUser(alertInput.getDealId(), fromUserDB);
                if (targetDealDB == null) {
                    log.error("[alerts/post] NOT FOUND FROM-USER's DEAL error");
                    return new Response<>(NOT_FOUND_DEAL);
                }
                toUserDBList = followRepository.findByToUserIdAndFromUserStatus(fromUserDB.getId(), "ACTIVATE")
                        .stream().map(FollowDB::getFromUser).collect(Collectors.toList());

            } else if(inputType == AlertStatus.NEW_DEAL_BOOK) { // 관심 등록한 책의 신규 입고 알림(deal_id, to_user_id)
                targetDealDB = dealRepository.findByIdAndUser(alertInput.getDealId(), fromUserDB);
                if (targetDealDB == null) {
                    log.error("[alerts/post] NOT FOUND FROM-USER's DEAL error");
                    return new Response<>(NOT_FOUND_DEAL);
                }
                toUserDBList = likeBookRepository.findByBookAndUserIdNot(targetDealDB.getBook(), fromUserDB.getId()) // 자신의 거래글 알람은 제외
                        .stream().map(LikeBookDB::getUser).collect(Collectors.toList());

            } else if (inputType == AlertStatus.LIKE_COMMENT) { // 자신의 한줄평 좋아요 알림(comment_id, to_user_id)
                targetCommentDB = commentRepository.findById(alertInput.getCommentId()).orElse(null);
                if (targetCommentDB == null || targetCommentDB.getUser().getId() == fromUserDB.getId()) { // 자기 자신의 좋아요 알림은 제외
                    log.error("[alerts/post] NOT FOUND COMMENT error");
                    return new Response<>(NOT_FOUND_COMMENT);
                }
                toUserDBList.add(targetCommentDB.getUser());

            } else if (inputType == AlertStatus.EVAL) { // 거래 구매완료 알림(eval_id, deal_id, to_user_id)
                targetEvalDB = userDealRepository.findByIdAndUserAndType(alertInput.getEvalId(), fromUserDB, "SALE");
                if (targetEvalDB == null) {
                    log.error("[alerts/post] NOT FOUND SELLER's EVAL(USER-DEAL) error");
                    return new Response<>(NOT_FOUND_USER_DEAL);
                }
                UserDealDB evalToUserDB = userDealRepository.findByDealAndType(targetEvalDB.getDeal(), "PURCHASE");
                if(evalToUserDB == null) {
                    log.error("[alerts/post] NOT FOUND BUYER's EVAL(USER-DEAL) error");
                    return new Response<>(NOT_FOUND_USER_DEAL);
                }
                targetDealDB = targetEvalDB.getDeal(); // 거래 번호 저장
                toUserDBList.add(evalToUserDB.getUser());

            } else if (inputType == AlertStatus.FOLLOW) { // 신규 팔로우 알림(follow_id, to_user_id)
                FollowDB targetFollowDB = followRepository.findById(alertInput.getFollowId()).orElse(null);
                if(targetFollowDB == null || targetFollowDB.getFromUser().getId() != fromUserDB.getId()) {
                    log.error("[alerts/post] NOT FOUND FOLLOW error");
                    return new Response<>(NOT_FOUND_FOLLOW);
                }
                toUserDBList.add(targetFollowDB.getToUser());
            }

            if (toUserDBList.size() == 0)
                log.warn("[alerts/post] NOT FOUND TO-USER error");

            List<AlertDB> responseList = new ArrayList<>();
            for (UserDB toUserDB : toUserDBList) {
                // 아직 읽지 않은 동일한 알림 메세지가 있으면, 알림을 또 보내지 않는다.
                if(alertRepository.existsByTypeAndCommentAndDealAndEvalAndFromUserAndToUserAndStatus
                        (inputType, targetCommentDB, targetDealDB, targetEvalDB, fromUserDB, toUserDB, "UNCHECKED")) {
                    log.warn("[alerts/post] DUPLICATE UNCHECKED ALERT error");
                    continue;
                }
                responseList.add(
                        AlertDB.builder()
                        .type(inputType)
                        .comment(targetCommentDB)
                        .deal(targetDealDB)
                        .eval(targetEvalDB)
                        .toUser(toUserDB)
                        .fromUser(fromUserDB)
                        .status("UNCHECKED")
                        .build()
                );
            }
            alertRepository.saveAll(responseList);

        } catch (Exception e) {
            log.error("[alerts/post] database error", e);
            return new Response<>(DATABASE_ERROR);
        }
        // 3. 결과 return
        return new Response<>(null, CREATED_ALERT);
    }

    private Response<Object> validateInputValue(AlertInput alertInput) {
        try {
            if (alertInput == null) return new Response<>(NO_VALUES);
            AlertStatus type = AlertStatus.valueOf(alertInput.getType());
            if (
                    (type == AlertStatus.LIKE_DEAL && !ValidationCheck.isValidId(alertInput.getDealId())) // 자신의 거래글 좋아요
                            || (type == AlertStatus.LIKE_COMMENT && !ValidationCheck.isValidId(alertInput.getCommentId())) // 자신의 한줄평 좋아요
                            || (type == AlertStatus.EVAL && !ValidationCheck.isValidId(alertInput.getEvalId())) // 거래 구매완료
                            || (type == AlertStatus.NEW_DEAL_FOLLOW && !ValidationCheck.isValidId(alertInput.getDealId())) // 팔로우 책방의 신규 입고
                            || (type == AlertStatus.NEW_DEAL_BOOK && !ValidationCheck.isValidId(alertInput.getDealId())) // 좋아요 책의 신규 입고
                            || (type == AlertStatus.FOLLOW && !ValidationCheck.isValidId(alertInput.getFollowId())) // 신규 팔로우 등록
            )
                return new Response<>(BAD_REQUEST);
        } catch (IllegalArgumentException e) {
            log.error("[alerts/post] undefined type exception", e);
            return new Response<>(BAD_STATUS_VALUE);
        }

        return null;
    }
}
