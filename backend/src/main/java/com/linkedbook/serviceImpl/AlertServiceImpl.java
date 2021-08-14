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

import static com.linkedbook.response.ResponseStatus.*;

@Service("AlertService")
@AllArgsConstructor
@Slf4j
public class AlertServiceImpl implements AlertService {

    private final AlertRepository alertRepository;
    private final DealRepository dealRepository;
    private final CommentRepository commentRepository;
    private final UserDealRepository userDealRepository;
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
            if (fromUserDB.getId() == alertInput.getToUserId()) {
                log.error("[alerts/post] FROM-USER == TO-USER error");
                return new Response<>(BAD_REQUEST);
            }
            UserDB toUserDB = userRepository.findById(alertInput.getToUserId()).orElse(null); // to
            if (toUserDB == null) {
                log.error("[alerts/post] NOT FOUND USER error");
                return new Response<>(NOT_FOUND_USER);
            }

            AlertStatus inputType = AlertStatus.valueOf(alertInput.getType());
            CommentDB targetCommentDB = null;
            DealDB targetDealDB = null;
            UserDealDB targetEvalDB = null;
            if (inputType == AlertStatus.LIKE_DEAL) { // 자신의 거래글 좋아요 알림
                targetDealDB = dealRepository.findByIdAndUser(alertInput.getDealId(), toUserDB);
                if (targetDealDB == null) {
                    log.error("[alerts/post] NOT FOUND TO-USER's DEAL error");
                    return new Response<>(NOT_FOUND_DEAL);
                }
            } else if (inputType == AlertStatus.NEW_DEAL_FOLLOW || inputType == AlertStatus.NEW_DEAL_BOOK) {
                // 팔로우한 책방의 신규 입고 알림, 관심 등록한 책의 신규 입고 알림
                targetDealDB = dealRepository.findByIdAndUser(alertInput.getDealId(), fromUserDB);
                if (targetDealDB == null) {
                    log.error("[alerts/post] NOT FOUND FROM-USER's DEAL error");
                    return new Response<>(NOT_FOUND_DEAL);
                }
            } else if (inputType == AlertStatus.LIKE_COMMENT) { // 자신의 한줄평 좋아요 알림
                targetCommentDB = commentRepository.findByIdAndUser(alertInput.getCommentId(), toUserDB);
                if (targetCommentDB == null) {
                    log.error("[alerts/post] NOT FOUND TO-USER's COMMENT error");
                    return new Response<>(NOT_FOUND_COMMENT);
                }
            } else if (inputType == AlertStatus.EVAL) { // 거래 구매완료 알림
                targetEvalDB = userDealRepository.findByIdAndUserAndType(alertInput.getEvalId(), fromUserDB, "SALE");
                if (targetEvalDB == null) {
                    log.error("[alerts/post] NOT FOUND SELLER's EVAL(USER-DEAL) error");
                    return new Response<>(NOT_FOUND_USER_DEAL);
                }
                if(!userDealRepository.existsByUserAndDeal(toUserDB, targetEvalDB.getDeal())) {
                    log.error("[alerts/post] NOT FOUND BUYER's EVAL(USER-DEAL) error");
                    return new Response<>(NOT_FOUND_USER_DEAL);
                }
            }

            AlertDB alertDB = AlertDB.builder()
                    .type(inputType.toString())
                    .comment(targetCommentDB)
                    .deal(targetDealDB)
                    .eval(targetEvalDB)
                    .toUser(toUserDB)
                    .fromUser(fromUserDB)
                    .status("UNCHECKED")
                    .build();

            alertRepository.save(alertDB);
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
            if (!ValidationCheck.isValidId(alertInput.getToUserId())) return new Response<>(BAD_REQUEST);

            AlertStatus type = AlertStatus.valueOf(alertInput.getType());
            if (
                    (type == AlertStatus.LIKE_DEAL && !ValidationCheck.isValidId(alertInput.getDealId())) // 자신의 거래글 좋아요
                            || (type == AlertStatus.LIKE_COMMENT && !ValidationCheck.isValidId(alertInput.getCommentId())) // 자신의 한줄평 좋아요
                            || (type == AlertStatus.EVAL && !ValidationCheck.isValidId(alertInput.getEvalId())) // 거래 구매완료
                            || (type == AlertStatus.NEW_DEAL_FOLLOW && !ValidationCheck.isValidId(alertInput.getDealId())) // 팔로우 책방의 신규 입고
                            || (type == AlertStatus.NEW_DEAL_BOOK && !ValidationCheck.isValidId(alertInput.getDealId())) // 좋아요 책의 신규 입고
            )
                return new Response<>(BAD_REQUEST);
        } catch (IllegalArgumentException e) {
            log.error("[alerts/post] undefined type exception", e);
            return new Response<>(BAD_STATUS_VALUE);
        }

        return null;
    }
}
