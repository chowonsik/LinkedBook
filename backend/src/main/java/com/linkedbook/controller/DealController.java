package com.linkedbook.controller;

import com.linkedbook.response.Response;
import com.linkedbook.service.DealService;
import com.linkedbook.dto.deal.createDeal.CreateDealInput;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import static com.linkedbook.response.ResponseStatus.*;

@RestController
@RequestMapping("/deals")
@AllArgsConstructor
@Slf4j
public class DealController {
    @Autowired
    private final DealService dealService;

    /**
     * 거래 생성 API
     * [POST] /deals
     * @return Response<Object>
     */
    // Body
    @ResponseBody
    @PostMapping
    public Response<Object> createDeal(@RequestBody CreateDealInput createDealInput) {
        log.info("[POST] /deals");
        return dealService.createDeal(createDealInput);
    }
}
