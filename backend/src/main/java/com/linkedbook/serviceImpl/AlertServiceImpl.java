package com.linkedbook.serviceImpl;

import com.linkedbook.configuration.ValidationCheck;
import com.linkedbook.dao.*;
import com.linkedbook.dto.alert.AlertInput;
import com.linkedbook.dto.alert.AlertSearchInput;
import com.linkedbook.dto.alert.AlertSearchOutput;
import com.linkedbook.dto.alert.AlertStatus;
import com.linkedbook.dto.common.*;
import com.linkedbook.entity.*;
import com.linkedbook.response.PageResponse;
import com.linkedbook.response.Response;
import com.linkedbook.service.AlertService;
import com.linkedbook.service.JwtService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
    private final JwtService jwtService;

    @Override
    @Transactional
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
                if(targetDealDB.getUser().getStatus().equals("ACTIVATE")) {
                    toUserDBList.add(targetDealDB.getUser());
                } else {
                    log.warn("[alerts/post] DEACTIVATE TO-USER error");
                }

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
                toUserDBList = likeBookRepository.findByBookAndUserStatusAndUserIdNot(targetDealDB.getBook(), "ACTIVATE", fromUserDB.getId()) // 자신의 거래글 알람은 제외
                        .stream().map(LikeBookDB::getUser).collect(Collectors.toList());

            } else if (inputType == AlertStatus.LIKE_COMMENT) { // 자신의 한줄평 좋아요 알림(comment_id, to_user_id)
                targetCommentDB = commentRepository.findById(alertInput.getCommentId()).orElse(null);
                if (targetCommentDB == null || targetCommentDB.getUser().getId() == fromUserDB.getId()) { // 자기 자신의 좋아요 알림은 제외
                    log.error("[alerts/post] NOT FOUND COMMENT error");
                    return new Response<>(NOT_FOUND_COMMENT);
                }
                if(targetCommentDB.getUser().getStatus().equals("ACTIVATE")) {
                    toUserDBList.add(targetCommentDB.getUser());
                } else {
                    log.warn("[alerts/post] DEACTIVATE TO-USER error");
                }

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

    @Override
    @Transactional
    public Response<Object> updateAlertStatus(int id) {
        // 1. 값 형식 체크
        if(!ValidationCheck.isValidId(id)) return new Response<>(BAD_REQUEST);
        // 2. 알림 메시지 상태 CHECKED 로 변경
        try {
            AlertDB alertDB = alertRepository.findById(id).orElse(null);
            if(alertDB == null) {
                log.error("[alerts/patch] NOT FOUND ALERT error");
                return new Response<>(NOT_FOUND_ALERT);
            }
            alertDB.setStatus("CHECKED");
            alertRepository.save(alertDB);
        } catch (Exception e) {
            log.error("[alerts/patch] database error", e);
            return new Response<>(DATABASE_ERROR);
        }
        // 3. 결과 return
        return new Response<>(null, SUCCESS_CHANGE_ALERT);
    }

    @Override
    public PageResponse<AlertSearchOutput> getAlertList(AlertSearchInput alertSearchInput) {
        // 1. 값 형식 체크
        if(alertSearchInput == null)  return new PageResponse<>(NO_VALUES);
        if (!ValidationCheck.isValidPage(alertSearchInput.getPage())
                || !ValidationCheck.isValidId(alertSearchInput.getSize())) return new PageResponse<>(BAD_REQUEST);
        if(!alertSearchInput.getType().equals("follow")
                && !alertSearchInput.getType().equals("act"))  return new PageResponse<>(BAD_STATUS_VALUE);
        // 2. 알림 메시지 정보 가져오기
        String inputType = alertSearchInput.getType();
        Page<AlertSearchOutput> responseList;
        try {
            UserDB loginUserDB = jwtService.getUserDB();
            if (loginUserDB == null) {
                log.error("[alerts/get] NOT FOUND LOGIN USER error");
                return new PageResponse<>(NOT_FOUND_USER);
            }
            Pageable paging = PageRequest.of(alertSearchInput.getPage(), alertSearchInput.getSize(), Sort.Direction.DESC, "createdAt");
            // 필요한 정보 가공
            Page<AlertDB> alertDBList;
            if (inputType.equals("follow")) { // 신규 팔로우 알림 메세지를 보여준다.
                alertDBList = alertRepository.findByToUserAndType(loginUserDB, AlertStatus.FOLLOW, paging);
            } else { // 팔로우 외 모든 활동에 대한 알림 메세지를 보여준다.
                alertDBList = alertRepository.findByToUserAndTypeNot(loginUserDB, AlertStatus.FOLLOW, paging);
            }
            // 최종 출력값 정리
            responseList = alertDBList.map(alertDB -> {
                DealDB dealDB = alertDB.getDeal();
                UserDealDB evalDB = alertDB.getEval();
                CommentDB commentDB = alertDB.getComment();
                UserDB fromUserDB = alertDB.getFromUser();

                return AlertSearchOutput.builder()
                        .id(alertDB.getId())
                        .type(alertDB.getType())
                        .status(alertDB.getStatus())
                        .evalId(evalDB == null ? 0 : evalDB.getId())
                        .deal(dealDB == null ? null :
                                CommonDealOutput.builder()
                                        .id(dealDB.getId())
                                        .title(dealDB.getTitle())
                                        .price(dealDB.getPrice())
                                        .created_at(dealDB.getCreated_at())
                                        .updated_at(dealDB.getUpdated_at())
                                        .build())
                        .comment(commentDB == null ? null :
                                CommonCommentOutput.builder()
                                        .id(commentDB.getId())
                                        .score(commentDB.getScore())
                                        .content(commentDB.getContent())
                                        .created_at(commentDB.getCreated_at())
                                        .updated_at(commentDB.getUpdated_at())
                                        .build())
                        .fromUser(CommonUserOutput.builder()
                                .id(fromUserDB.getId())
                                .email(fromUserDB.getEmail())
                                .nickname(fromUserDB.getNickname())
                                .image(fromUserDB.getImage())
                                .created_at(fromUserDB.getCreated_at())
                                .updated_at(fromUserDB.getUpdated_at())
                                .build())
                        .created_at(alertDB.getCreatedAt())
                        .build();
            });
        } catch (Exception e) {
            log.error("[alerts/get] database error", e);
            return new PageResponse<>(DATABASE_ERROR);
        }
        // 3. 결과 return
        return new PageResponse<>(responseList, SUCCESS_GET_ALERT_LIST);
    }

    @Override
    public Response<Object> checkNewAlert() {
        // 1. UNCHECKED 알림 메시지 찾기
        boolean isExistNewAlert;
        try {
            UserDB loginUserDB = jwtService.getUserDB();
            if (loginUserDB == null) {
                log.error("[alerts/check/get] NOT FOUND LOGIN USER error");
                return new Response<>(NOT_FOUND_USER);
            }
            isExistNewAlert = alertRepository.existsByToUserAndStatus(loginUserDB, "UNCHECKED");
        } catch (Exception e) {
            log.error("[alerts/check/get] database error", e);
            return new Response<>(DATABASE_ERROR);
        }
        // 2. 결과 return
        if(isExistNewAlert) {
            return new Response<>(null, SUCCESS_NEW_ALERT);
        } else {
            return new Response<>(null, SUCCESS_NO_NEW_ALERT);
        }
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
