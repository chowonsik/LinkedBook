package com.linkedbook.controller;

import com.linkedbook.dto.likeDeal.createLikeDeal.CreateLikeDealInput;
import com.linkedbook.dto.likeDeal.deleteLikeDeal.DeleteLikeDealInput;
import com.linkedbook.dto.likeDeal.selectLikeDeal.SelectLikeDealInput;
import com.linkedbook.dto.likeDeal.selectLikeDeal.SelectLikeDealOutput;
import com.linkedbook.response.PageResponse;
import com.linkedbook.response.Response;
import com.linkedbook.service.LikeDealService;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/like-deals")
@AllArgsConstructor
@Slf4j
public class LikeDealController {

    private final LikeDealService likeDealService;

    /**
     * 관심 거래 생성 API [POST] /like-deals
     * 
     * @return Response<Object>
     */
    // Body
    @ResponseBody
    @PostMapping
    public Response<Object> createLikeDeal(@RequestBody CreateLikeDealInput createLikeDealInput) {
        log.info("[POST] /like-deals");
        return likeDealService.createLikeDeal(createLikeDealInput);
    }

    /*
     * 
     * 관심 거래 조회 API
     * 
     * @return PageResponse<SelectLikeDealOutput>
     */
    // Params
    @ResponseBody
    @GetMapping
    public PageResponse<SelectLikeDealOutput> selectLikeDeal(SelectLikeDealInput selectLikeDealInput) {
        log.info("[GET] /like-deals");
        return likeDealService.selectLikeDeal(selectLikeDealInput);
    }

    /*
     * 
     * 관심 거래 삭제 API
     * 
     * @return Response<Object>
     */
    // Params
    @ResponseBody
    @DeleteMapping
    public Response<Object> deleteLikeDeal(DeleteLikeDealInput deleteLikeDealInput) {
        log.info("[DELETE] /like-deals");
        return likeDealService.deleteLikeDeal(deleteLikeDealInput);
    }
}
