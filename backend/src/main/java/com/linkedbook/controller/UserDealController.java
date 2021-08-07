package com.linkedbook.controller;

import com.linkedbook.dto.userDeal.createUserDeal.CreateUserDealInput;
import com.linkedbook.response.Response;
import com.linkedbook.service.UserDealService;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import static com.linkedbook.response.ResponseStatus.*;

import java.util.List;

@RestController
@RequestMapping("/user-deals")
@AllArgsConstructor
@Slf4j
public class UserDealController {
    private final UserDealService userDealService;

    /**
     * 유저 거래 내역 생성 API [POST] /user-deals
     * 
     * @return Response<Object>
     */
    // Body
    @ResponseBody
    @PostMapping
    public Response<Object> createUserDeal(@RequestBody CreateUserDealInput createUserDealInput) {
        log.info("[POST] /user-deals");
        return userDealService.createUserDeal(createUserDealInput);
    }

}
