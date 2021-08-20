package com.linkedbook.controller;

import com.linkedbook.dto.userDeal.createUserDeal.CreateUserDealInput;
import com.linkedbook.dto.userDeal.createUserDeal.CreateUserDealOutput;
import com.linkedbook.dto.userDeal.selectUserDeal.SelectUserDealOutput;
import com.linkedbook.dto.userDeal.updateUserDeal.UpdateUserDealInput;
import com.linkedbook.dto.userDeal.selectUserDeal.SelectUserDealInput;
import com.linkedbook.response.PageResponse;
import com.linkedbook.response.Response;
import com.linkedbook.service.UserDealService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user-deals")
@RequiredArgsConstructor
@Slf4j
public class UserDealController {

    private final UserDealService userDealService;

    /**
     * 유저 거래 내역 생성 API [POST] /user-deals
     * 
     * @return Response<Object>
     */
    // Body
    @PostMapping
    public Response<CreateUserDealOutput> createUserDeal(@RequestBody CreateUserDealInput createUserDealInput) {
        log.info("[POST] /user-deals");
        return userDealService.createUserDeal(createUserDealInput);
    }

    /**
     * 유저 거래 내역 조회 API [GET] /user-deals
     * 
     * @return Response<Page<SelectUserDealOutput>>
     */
    // Params
    @GetMapping
    public PageResponse<SelectUserDealOutput> selectUserDeal(SelectUserDealInput selectUserDealInput) {
        log.info("[GET] /user-deals");
        return userDealService.selectUserDeal(selectUserDealInput);
    }

    /**
     * 유저 거래 내역 수정 API [PATCH] /user-deals/{id}
     * 
     * @return Response<Object>
     */
    // Body
    @PatchMapping("/{id}")
    public Response<Object> updateUserDeal(@RequestBody UpdateUserDealInput updateUserDealInput,
            @PathVariable("id") int userDealId) {
        log.info("[PATCH] /user-deals/" + userDealId);
        return userDealService.updateUserDeal(updateUserDealInput, userDealId);
    }

}
