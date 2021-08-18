package com.linkedbook.serviceImpl;

import com.linkedbook.configuration.ValidationCheck;
import com.linkedbook.dao.DealRepository;
import com.linkedbook.dao.UserDealRepository;
import com.linkedbook.dao.UserRepository;
import com.linkedbook.dto.alert.AlertStatus;
import com.linkedbook.dto.userDeal.createUserDeal.CreateUserDealInput;
import com.linkedbook.dto.userDeal.createUserDeal.CreateUserDealOutput;
import com.linkedbook.dto.userDeal.selectUserDeal.SelectUserDealInput;
import com.linkedbook.dto.userDeal.selectUserDeal.SelectUserDealOutput;
import com.linkedbook.dto.userDeal.updateUserDeal.UpdateUserDealInput;
import com.linkedbook.entity.AlertDB;
import com.linkedbook.entity.DealDB;
import com.linkedbook.entity.UserDB;
import com.linkedbook.entity.UserDealDB;
import com.linkedbook.response.PageResponse;
import com.linkedbook.response.Response;
import com.linkedbook.service.UserDealService;
import com.linkedbook.service.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.linkedbook.response.ResponseStatus.*;

@Service("UserDealService")
@RequiredArgsConstructor
@Slf4j
public class UserDealServiceImpl implements UserDealService {

    private final DealRepository dealRepository;
    private final UserDealRepository userDealRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AlertServiceImpl alertService;

    @Override
    @Transactional
    public Response<CreateUserDealOutput> createUserDeal(CreateUserDealInput createUserDealInput) {
        // 값 형식 체크
        if (createUserDealInput == null)
            return new Response<>(BAD_REQUEST);
        if (!ValidationCheck.isValidId(createUserDealInput.getDealId()))
            return new Response<>(BAD_REQUEST);
        if (!ValidationCheck.isValidId(createUserDealInput.getUserId()))
            return new Response<>(BAD_REQUEST);
        if (!ValidationCheck.isValidScore(createUserDealInput.getScore()))
            return new Response<>(BAD_REQUEST);

        CreateUserDealOutput createUserDealOutput;
        try {
            UserDB saleUser = userRepository.findById(jwtService.getUserId()).orElse(null);
            DealDB deal = dealRepository.findById(createUserDealInput.getDealId()).orElse(null);
            UserDB purchaseUser = userRepository.findById(createUserDealInput.getUserId()).orElse(null);
            if (saleUser == null || deal == null || purchaseUser == null) {
                return new Response<>(BAD_ID_VALUE);
            }

            UserDealDB purchaseUserDB = UserDealDB.builder().user(purchaseUser).deal(deal).type("PURCHASE")
                    .score(createUserDealInput.getScore()).build();
            UserDealDB saleUserDealDB = UserDealDB.builder().user(saleUser).deal(deal).type("SALE").score(3).build();
            userDealRepository.save(purchaseUserDB);
            saleUserDealDB = userDealRepository.save(saleUserDealDB);
            createUserDealOutput = CreateUserDealOutput.builder().userDealId(saleUserDealDB.getId()).build();
            deal.setStatus("COMPLETE");
            dealRepository.save(deal);

            // 거래 구매완료 알림(eval_id, deal_id, to_user_id)
            if(!alertService.checkDuplicateUncheckedAlert(AlertStatus.EVAL, null, deal, saleUserDealDB,
                    saleUser, purchaseUser)) {
                AlertDB alertDB = AlertDB.builder()
                        .type(AlertStatus.EVAL)
                        .eval(saleUserDealDB)
                        .fromUser(saleUser)
                        .toUser(purchaseUser)
                        .status("UNCHECKED")
                        .build();
                alertService.createAlertInfo(alertDB);
            }
        } catch (IllegalArgumentException e) {
            log.error("[POST]/user-deals undefined status exception", e);
            return new Response<>(BAD_STATUS_VALUE);
        } catch (Exception e) {
            log.error("[POST]/user-deals database error", e);
            return new Response<>(DATABASE_ERROR);
        }
        // 결과 return
        return new Response<>(createUserDealOutput, CREATED_USERDEAL);
    }

    @Override
    public PageResponse<SelectUserDealOutput> selectUserDeal(SelectUserDealInput selectUserDealInput) {
        // 1. 값 형식 체크
        if (selectUserDealInput == null)
            return new PageResponse<>(NO_VALUES);

        Pageable pageable;

        Page<SelectUserDealOutput> selectUserDealOutput;
        try {
            pageable = PageRequest.of(selectUserDealInput.getPage(), selectUserDealInput.getSize(), Sort.Direction.DESC,
                    "created_at");
            selectUserDealOutput = userDealRepository.findUserDealList(selectUserDealInput.getUserId(),
                    selectUserDealInput.getType(), pageable);
        } catch (Exception e) {
            log.error("[GET]/deals database error", e);
            return new PageResponse<>(DATABASE_ERROR);
        }
        // 4. 결과 return
        return new PageResponse<>(selectUserDealOutput, SUCCESS_SELECT_USERDEAL_LIST);
    }

    @Override
    @Transactional
    public Response<Object> updateUserDeal(UpdateUserDealInput updateUserDealInput, int userDealId) {
        // 값 형식 체크
        if (updateUserDealInput == null)
            return new Response<>(BAD_REQUEST);
        if (!ValidationCheck.isValidScore(updateUserDealInput.getScore()))
            return new Response<>(BAD_REQUEST);

        try {
            UserDealDB userDealDB = userDealRepository.findById(userDealId).orElse(null);
            if (userDealDB == null) {
                return new Response<>(BAD_ID_VALUE);
            }
            userDealDB.setScore(updateUserDealInput.getScore());
            userDealRepository.save(userDealDB);

        } catch (IllegalArgumentException e) {
            log.error("[PATCH]]/user-deals/" + userDealId + " undefined status exception", e);
            return new Response<>(BAD_STATUS_VALUE);
        } catch (Exception e) {
            log.error("[PATCH]/user-deals/" + userDealId + " database error", e);
            return new Response<>(DATABASE_ERROR);
        }
        // 결과 return
        return new Response<>(null, SUCCESS_UPDATE_USERDEAL);
    }
}
