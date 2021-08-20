package com.linkedbook.controller;

import com.linkedbook.response.PageResponse;
import com.linkedbook.response.Response;
import com.linkedbook.service.DealService;
import com.linkedbook.dto.deal.createDeal.CreateDealInput;
import com.linkedbook.dto.deal.createDeal.CreateDealOutput;
import com.linkedbook.dto.deal.selectDeal.SelectDealInput;
import com.linkedbook.dto.deal.selectDeal.SelectDealOutput;
import com.linkedbook.dto.deal.selectDealDetail.SelectDealDetailOutput;
import com.linkedbook.dto.deal.updateDeal.UpdateDealInput;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/deals")
@RequiredArgsConstructor
@Slf4j
public class DealController {

    private final DealService dealService;

    /**
     * 거래 생성 API [POST] /deals
     * 
     * @return Response<Object>
     */
    // Body
    @PostMapping
    public Response<CreateDealOutput> createDeal(@RequestBody CreateDealInput createDealInput) {
        log.info("[POST] /deals");
        return dealService.createDeal(createDealInput);
    }

    /**
     * 거래 조회 API [GET]] /deals
     * 
     * @return Response<List<SelectDealOutput>>
     */
    // Params
    @GetMapping
    public PageResponse<SelectDealOutput> selectDealList(@RequestParam(required = false) String search,
            @RequestParam(required = false) String filter, @RequestParam(required = false) Integer userId,
            @RequestParam(required = false) String bookId, @RequestParam(required = false) Integer areaId,
            @RequestParam int page, @RequestParam int size) {
        log.info("[GET] /deals");
        SelectDealInput selectDealInput = SelectDealInput.builder().search(search).filter(filter).userId(userId)
                .bookId(bookId).areaId(areaId).page(page).size(size).build();
        Pageable pageable;
        if (filter.equals("NEW")) {
            pageable = PageRequest.of(selectDealInput.getPage(), selectDealInput.getSize(), Sort.Direction.DESC,
                    "created_at");
        } else if (filter.equals("PRICE")) {
            pageable = PageRequest.of(selectDealInput.getPage(), selectDealInput.getSize(), Sort.Direction.ASC,
                    "price");
        } else {
            pageable = PageRequest.of(selectDealInput.getPage(), selectDealInput.getSize(),
                    Sort.by("quality").and(Sort.by("created_at").descending()));
        }
        return dealService.selectDealList(selectDealInput, pageable);
    }

    /**
     * 거래 수정 API [PATCH] /deals/{id}
     * 
     * @return Response<Object>
     */
    // Body
    @PatchMapping("/{id}")
    public Response<Object> updateDeal(@RequestBody UpdateDealInput updateDealInput, @PathVariable("id") int dealId) {
        log.info("[PATCH] /deals/" + dealId);
        return dealService.updateDeal(updateDealInput, dealId);
    }

    /**
     * 거래 상세 조회 API [GET]] /deals/{id}
     * 
     * @return Response<Object>
     */
    // Params
    @GetMapping("/{id}")
    public Response<SelectDealDetailOutput> selectDeal(@PathVariable("id") int dealId) {
        log.info("[GET] /deals/" + dealId);
        return dealService.selectDeal(dealId);
    }
}
