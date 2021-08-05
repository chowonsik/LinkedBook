package com.linkedbook.serviceImpl;

import com.linkedbook.configuration.ValidationCheck;
import com.linkedbook.dao.BookRepository;
import com.linkedbook.dao.DealImageRepository;
import com.linkedbook.dao.DealRepository;
import com.linkedbook.dao.ImageRepository;
import com.linkedbook.dao.UserRepository;
import com.linkedbook.dto.deal.createDeal.CreateDealImage;
import com.linkedbook.dto.deal.createDeal.CreateDealInput;
import com.linkedbook.dto.deal.selectDeal.SelectDealInput;
import com.linkedbook.dto.deal.selectDeal.SelectDealOutput;
import com.linkedbook.entity.DealDB;
import com.linkedbook.entity.DealImageDB;
import com.linkedbook.entity.ImageDB;
import com.linkedbook.entity.UserDB;
import com.linkedbook.entity.BookDB;
import com.linkedbook.response.Response;
import com.linkedbook.response.ResponseStatus;
import com.linkedbook.service.DealService;
import com.linkedbook.service.JwtService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static com.linkedbook.response.ResponseStatus.*;

@Service("DealService")
@AllArgsConstructor
@Slf4j
public class DealServiceImpl implements DealService {

    @Autowired
    private final DealRepository dealRepository;
    @Autowired
    private final BookRepository bookRepository;
    @Autowired
    private final ImageRepository imageRepository;
    @Autowired
    private final DealImageRepository dealImageRepository;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final JwtService jwtService;

    @Override
    public Response<Page<SelectDealOutput>> selectDealList(SelectDealInput selectDealInput, Pageable pageable) {
        // 1. 값 형식 체크
        if (selectDealInput == null)
            return new Response<>(NO_VALUES);

        Page<SelectDealOutput> selectDealOutput;
        try {
            selectDealOutput = dealRepository.findDynamicQueryDeal(selectDealInput, jwtService.getUserId(), pageable);
        } catch (Exception e) {
            log.error("[GET]/deals database error", e);
            return new Response<>(DATABASE_ERROR);
        }
        // 4. 결과 return
        return new Response<>(selectDealOutput, SUCCESS_SELECT_DEAL_LIST);
    }

    @Override
    @Transactional
    public Response<Object> createDeal(CreateDealInput createDealInput) {
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

        try {
            UserDB user = userRepository.findById(jwtService.getUserId()).orElse(null);
            BookDB book = bookRepository.findById(createDealInput.getBookId()).orElse(null);
            if (user == null || book == null) {
                return new Response<>(BAD_ID_VALUE);
            }

            DealDB dealDB = DealDB.builder().user(user).book(book).title(createDealInput.getTitle())
                    .price(createDealInput.getPrice()).quality(createDealInput.getQuality())
                    .content(createDealInput.getContent()).status("ACTIVATE").build();
            dealDB = dealRepository.save(dealDB);
            List<CreateDealImage> images = createDealInput.getImages();
            if (images.size() != 0) {
                for (CreateDealImage image : images) {
                    ImageDB imageDB = ImageDB.builder().imageurl(image.getImageUrl()).build();
                    imageDB = imageRepository.save(imageDB);
                    DealImageDB dealImage = DealImageDB.builder().deal(dealDB).image(imageDB).orders(image.getOrders())
                            .status("ACTIVATE").build();
                    dealImageRepository.save(dealImage);
                }
            }

        } catch (IllegalArgumentException e) {
            log.error("[POST]/deals undefined status exception", e);
            return new Response<>(BAD_STATUS_VALUE);
        } catch (Exception e) {
            log.error("[POST]/deals database error", e);
            return new Response<>(DATABASE_ERROR);
        }
        // 3. 결과 return
        return new Response<>(null, CREATED_DEAL);
    }
}
