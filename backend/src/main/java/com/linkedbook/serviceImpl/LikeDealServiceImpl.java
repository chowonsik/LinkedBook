package com.linkedbook.serviceImpl;

import com.linkedbook.configuration.ValidationCheck;
import com.linkedbook.dao.DealRepository;
import com.linkedbook.dao.LikeDealRepository;
import com.linkedbook.dao.UserRepository;
import com.linkedbook.dto.likeDeal.createLikeDeal.CreateLikeDealInput;
import com.linkedbook.dto.likeDeal.deleteLikeDeal.DeleteLikeDealInput;
import com.linkedbook.dto.likeDeal.selectLikeDeal.SelectLikeDealInput;
import com.linkedbook.dto.likeDeal.selectLikeDeal.SelectLikeDealOutput;
import com.linkedbook.entity.DealDB;
import com.linkedbook.entity.LikeDealDB;
import com.linkedbook.entity.UserDB;
import com.linkedbook.response.PageResponse;
import com.linkedbook.response.Response;
import com.linkedbook.service.JwtService;
import com.linkedbook.service.LikeDealService;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.linkedbook.response.ResponseStatus.*;

@Service("LikeDealService")
@AllArgsConstructor
@Slf4j
public class LikeDealServiceImpl implements LikeDealService {

    private final DealRepository dealRepository;
    private final LikeDealRepository likeDealRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    @Override
    @Transactional
    public Response<Object> createLikeDeal(CreateLikeDealInput createLikeDealInput) {
        // 값 형식 체크

        if (createLikeDealInput == null)
            return new Response<>(NO_VALUES);
        if (!ValidationCheck.isValidId(createLikeDealInput.getDealId()))
            return new Response<>(BAD_REQUEST);

        LikeDealDB likeDeal;
        try {
            UserDB user = userRepository.findById(jwtService.getUserId()).orElse(null);
            DealDB deal = dealRepository.findById(createLikeDealInput.getDealId()).orElse(null);
            if (deal == null || user == null) {
                return new Response<>(BAD_ID_VALUE);
            }

            likeDeal = LikeDealDB.builder().user(user).deal(deal).build();

            likeDealRepository.save(likeDeal);

        } catch (Exception e) {
            log.error("[POST]/like-deals database error", e);
            return new Response<>(DATABASE_ERROR);
        }
        // 결과 return
        return new Response<>(null, CREATED_LIKEDEAL);
    }

    @Override
    public PageResponse<SelectLikeDealOutput> selectLikeDeal(SelectLikeDealInput selectLikeDealInput) {
        // 값 형식 체크

        if (selectLikeDealInput == null)
            return new PageResponse<>(NO_VALUES);

        Page<SelectLikeDealOutput> selectLikeDealOutput;
        Pageable pageable;
        try {
            pageable = PageRequest.of(selectLikeDealInput.getPage(), selectLikeDealInput.getSize(), Sort.Direction.DESC,
                    "created_at");
            selectLikeDealOutput = likeDealRepository.findByUserId(selectLikeDealInput.getUserId(),
                    jwtService.getUserId(), pageable);

        } catch (Exception e) {
            log.error("[GET]/like-deals database error", e);
            return new PageResponse<>(DATABASE_ERROR);
        }
        // 결과 return
        return new PageResponse<>(selectLikeDealOutput, SUCCESS_SELECT_LIKEDEAL);
    }

    @Override
    @Transactional
    public Response<Object> deleteLikeDeal(DeleteLikeDealInput deleteLikeDealInput) {
        // 값 형식 체크

        if (deleteLikeDealInput == null)
            return new Response<>(NO_VALUES);

        if (!ValidationCheck.isValidId(deleteLikeDealInput.getDealId()))
            return new Response<>(BAD_REQUEST);

        LikeDealDB likeDeal;
        try {
            likeDeal = likeDealRepository.findByDealIdAndUserId(deleteLikeDealInput.getDealId(), jwtService.getUserId())
                    .orElse(null);
            if (likeDeal == null) {
                return new Response<>(BAD_ID_VALUE);
            }

            likeDealRepository.delete(likeDeal);

        } catch (Exception e) {
            log.error("[POST]/like-deals database error", e);
            return new Response<>(DATABASE_ERROR);
        }
        // 결과 return
        return new Response<>(null, SUCCESS_DELETE_LIKEDEAL);
    }

}
