package com.linkedbook.serviceImpl;

import com.linkedbook.configuration.ValidationCheck;
import com.linkedbook.dao.*;
import com.linkedbook.dto.alert.AlertSearchInput;
import com.linkedbook.dto.alert.AlertSearchOutput;
import com.linkedbook.dto.alert.AlertStatus;
import com.linkedbook.dto.common.*;
import com.linkedbook.entity.*;
import com.linkedbook.response.PageResponse;
import com.linkedbook.response.Response;
import com.linkedbook.service.AlertService;
import com.linkedbook.service.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.linkedbook.response.ResponseStatus.*;

@Service("AlertService")
@RequiredArgsConstructor
@Slf4j
public class AlertServiceImpl implements AlertService {

    private final AlertRepository alertRepository;
    private final JwtService jwtService;

    @Override
    public boolean createAlertInfo(AlertDB inputAlertDB) {
        try {
            log.info("[alerts/post] SUCCESS SEND NEW ALERT");
            alertRepository.save(inputAlertDB);
        } catch (Exception e) {
            log.error("[alerts/post] database error", e);
            return false;
        }
        return true;
    }

    @Override
    public boolean createAlertInfo(List<AlertDB> inputAlertDBList) {
        try {
            log.info("[alerts/post] SUCCESS SEND NEW ALERT LIST");
            alertRepository.saveAll(inputAlertDBList);
        } catch (Exception e) {
            log.error("[alerts/post] database error", e);
            return false;
        }
        return true;
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

    @Override
    public boolean checkDuplicateUncheckedAlert(AlertStatus type, CommentDB comment, DealDB deal, UserDealDB eval, UserDB fromUser, UserDB toUser) {
        if(alertRepository.existsByTypeAndCommentAndDealAndEvalAndFromUserAndToUserAndStatus(type, comment,
                deal, eval, fromUser, toUser, "UNCHECKED")) {
            log.warn("[alerts/post] DUPLICATE UNCHECKED ALERT error");
            return true;
        }
        return false;
    }
}
