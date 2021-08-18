package com.linkedbook.serviceImpl;

import com.linkedbook.configuration.ValidationCheck;
import com.linkedbook.dao.*;
import com.linkedbook.dto.alert.AlertStatus;
import com.linkedbook.dto.deal.createDeal.CreateDealImage;
import com.linkedbook.dto.deal.createDeal.CreateDealInput;
import com.linkedbook.dto.deal.createDeal.CreateDealOutput;
import com.linkedbook.dto.deal.selectDeal.SelectDealInput;
import com.linkedbook.dto.deal.selectDeal.SelectDealOutput;
import com.linkedbook.dto.deal.selectDealDetail.SelectDealDetailOutput;
import com.linkedbook.dto.deal.selectDealDetail.SelectDealImage;
import com.linkedbook.dto.deal.updateDeal.UpdateDealImage;
import com.linkedbook.dto.deal.updateDeal.UpdateDealInput;
import com.linkedbook.entity.*;
import com.linkedbook.response.PageResponse;
import com.linkedbook.response.Response;
import com.linkedbook.service.AlertService;
import com.linkedbook.service.DealService;
import com.linkedbook.service.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.linkedbook.response.ResponseStatus.*;

@Service("DealService")
@RequiredArgsConstructor
@Slf4j
public class DealServiceImpl implements DealService {

    private final DealRepository dealRepository;
    private final BookRepository bookRepository;
    private final LikeBookRepository likeBookRepository;
    private final FollowRepository followRepository;
    private final ImageRepository imageRepository;
    private final DealImageRepository dealImageRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AlertService alertService;

    @Override
    public PageResponse<SelectDealOutput> selectDealList(SelectDealInput selectDealInput, Pageable pageable) {
        // 값 형식 체크
        if (selectDealInput == null)
            return new PageResponse<>(NO_VALUES);

        Page<SelectDealOutput> selectDealOutput;
        try {
            selectDealOutput = dealRepository.findDynamicQueryDeal(selectDealInput, jwtService.getUserId(), pageable);
        } catch (Exception e) {
            log.error("[GET]/deals database error", e);
            return new PageResponse<>(DATABASE_ERROR);
        }
        // 결과 return
        return new PageResponse<>(selectDealOutput, SUCCESS_SELECT_DEAL_LIST);
    }

    @Override
    @Transactional
    public Response<CreateDealOutput> createDeal(CreateDealInput createDealInput) {
        // 1. 값 형식 체크
        if (createDealInput == null)
            return new Response<>(NO_VALUES);
        if (!ValidationCheck.isValid(createDealInput.getBookId()))
            return new Response<>(NO_VALUES);
        if (!ValidationCheck.isValid(createDealInput.getTitle()))
            return new Response<>(NO_VALUES);
        if (!ValidationCheck.isValidPrice(createDealInput.getPrice()))
            return new Response<>(NO_VALUES);
        if (!ValidationCheck.isValid(createDealInput.getQuality()))
            return new Response<>(NO_VALUES);
        if (!ValidationCheck.isValid(createDealInput.getContent()))
            return new Response<>(NO_VALUES);

        CreateDealOutput createDealOutput;
        try {
            UserDB user = userRepository.findById(jwtService.getUserId()).orElse(null);
            BookDB book = bookRepository.findById(createDealInput.getBookId()).orElse(null);
            if (user == null || book == null) {
                return new Response<>(BAD_ID_VALUE);
            }

            DealDB dealDB = DealDB.builder().user(user).book(book).title(createDealInput.getTitle())
                    .price(createDealInput.getPrice()).quality(createDealInput.getQuality())
                    .content(createDealInput.getContent()).status("ACTIVATE").build();
            dealRepository.save(dealDB);

            createDealOutput = CreateDealOutput.builder().dealId(dealDB.getId()).build();
            List<CreateDealImage> images = createDealInput.getImages();
            if (images.size() != 0) {
                for (CreateDealImage image : images) {
                    ImageDB imageDB = ImageDB.builder().imageurl(image.getImageUrl()).build();
                    imageDB = imageRepository.save(imageDB);
                    DealImageDB dealImage = DealImageDB.builder().deal(dealDB).image(imageDB).orders(image.getOrders())
                            .build();
                    dealImageRepository.save(dealImage);
                }
            }

            List<AlertDB> alertDBList = new ArrayList<>();
            List<UserDB> toUserDBList;
            // 팔로우한 책방의 신규 입고 알림(deal_id, to_user_id)
            toUserDBList = followRepository.findByToUserIdAndFromUserStatus(user.getId(), "ACTIVATE")
                    .stream().map(FollowDB::getFromUser).collect(Collectors.toList());
            for (UserDB toUserDB : toUserDBList) {
                if (!alertService.checkDuplicateUncheckedAlert(AlertStatus.NEW_DEAL_FOLLOW, null, dealDB, null,
                        user, toUserDB)) {
                    alertDBList.add(
                            AlertDB.builder()
                                    .type(AlertStatus.NEW_DEAL_FOLLOW)
                                    .deal(dealDB)
                                    .fromUser(user)
                                    .toUser(toUserDB)
                                    .status("UNCHECKED")
                                    .build()
                    );
                }
            }
            // 관심 등록한 책의 신규 입고 알림(deal_id, to_user_id)
            toUserDBList = likeBookRepository.findByBookAndUserStatus(book, "ACTIVATE")
                    .stream().map(LikeBookDB::getUser).collect(Collectors.toList());
            for (UserDB toUserDB : toUserDBList) {
                if (!alertService.checkDuplicateUncheckedAlert(AlertStatus.NEW_DEAL_BOOK, null, dealDB, null,
                        user, toUserDB) && toUserDB.getId() != user.getId()) {
                    alertDBList.add(
                            AlertDB.builder()
                                    .type(AlertStatus.NEW_DEAL_BOOK)
                                    .deal(dealDB)
                                    .fromUser(user)
                                    .toUser(toUserDB)
                                    .status("UNCHECKED")
                                    .build()
                    );
                }
            }
            alertService.createAlertInfo(alertDBList);

        } catch (IllegalArgumentException e) {
            log.error("[POST]/deals undefined status exception", e);
            return new Response<>(BAD_STATUS_VALUE);
        } catch (Exception e) {
            log.error("[POST]/deals database error", e);
            return new Response<>(DATABASE_ERROR);
        }
        // 3. 결과 return
        return new Response<>(createDealOutput, CREATED_DEAL);
    }

    @Override
    @Transactional
    public Response<Object> updateDeal(UpdateDealInput updateDealInput, int dealId) {
        try {
            // deal 정보 가져오기
            DealDB dealDB = dealRepository.findById(dealId).orElse(null);
            if (dealDB == null)
                return new Response<>(BAD_ID_VALUE);

            // 상태가 삭제일 경우
            if (StringUtils.isNotBlank(updateDealInput.getStatus())) {
                if (updateDealInput.getStatus().equals("DELETED")) {
                    dealDB.setStatus(updateDealInput.getStatus());
                    dealDB = dealRepository.save(dealDB);
                    return new Response<>(null, SUCCESS_DELETE_DEAL);
                }
            }
            if (StringUtils.isNotBlank(updateDealInput.getBookId())) {
                BookDB bookDB = bookRepository.findById(updateDealInput.getBookId()).orElse(null);
                dealDB.setBook(bookDB);
            }
            if (StringUtils.isNotBlank(updateDealInput.getTitle()))
                dealDB.setTitle(updateDealInput.getTitle());
            if (StringUtils.isNotBlank(updateDealInput.getQuality()))
                dealDB.setQuality(updateDealInput.getQuality());
            if (StringUtils.isNotBlank(updateDealInput.getContent()))
                dealDB.setContent(updateDealInput.getContent());
            if (updateDealInput.getPrice() != null)
                dealDB.setPrice(updateDealInput.getPrice());

            List<UpdateDealImage> updateImages = updateDealInput.getImages();

            // 기존의 사진들을 지워준다.
            for (DealImageDB dealImage : dealDB.getImages()) {
                dealImageRepository.deleteById(dealImage.getId());
            }

            // 새로운 사진으로 채운다.
            for (UpdateDealImage dealImage : updateImages) {
                // 저장된 이미지인지 확인하고 저장된 이미지가 아니라면 이미지를 만들고 생성
                ImageDB imageDB = imageRepository.findByImageurl(dealImage.getImageUrl()).orElse(null);
                if (imageDB == null) {
                    imageDB = ImageDB.builder().imageurl(dealImage.getImageUrl()).build();
                    imageDB = imageRepository.save(imageDB);
                    DealImageDB dealImageDB = DealImageDB.builder().deal(dealDB).image(imageDB)
                            .orders(dealImage.getOrders()).build();
                    dealImageRepository.save(dealImageDB);
                } else {
                    DealImageDB dealImageDB = DealImageDB.builder().deal(dealDB).image(imageDB)
                            .orders(dealImage.getOrders()).build();
                    dealImageRepository.save(dealImageDB);
                }
            }
            dealDB = dealRepository.save(dealDB);
        } catch (IllegalArgumentException e) {
            log.error("[PATCH]/deals undefined status exception", e);
            return new Response<>(BAD_STATUS_VALUE);
        } catch (Exception e) {
            log.error("[PATCH]/deals database error", e);
            return new Response<>(DATABASE_ERROR);
        }
        // 3. 결과 return
        return new Response<>(null, SUCCESS_UPDATE_DEAL);
    }

    @Override
    public Response<SelectDealDetailOutput> selectDeal(int dealId) {
        // 1. 값 형식 체크
        SelectDealDetailOutput selectDealDetailOutput;
        try {
            selectDealDetailOutput = dealRepository.findDealDetail(dealId, jwtService.getUserId());
            List<SelectDealImage> dealImageDB = dealImageRepository.findByDealImages(dealId);
            selectDealDetailOutput.setDealImages(dealImageDB);
        } catch (Exception e) {
            log.error("[GET]/deals/" + dealId + " database error", e);
            return new Response<>(DATABASE_ERROR);
        }
        // 4. 결과 return
        return new Response<>(selectDealDetailOutput, SUCCESS_SELECT_DEAL_DETAIL);
    }
}
