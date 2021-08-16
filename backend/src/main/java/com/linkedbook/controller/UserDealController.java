package com.linkedbook.controller;

import com.linkedbook.dto.userDeal.createUserDeal.CreateUserDealInput;
import com.linkedbook.dto.userDeal.selectUserDeal.SelectUserDealOutput;
import com.linkedbook.dto.userDeal.updateUserDeal.UpdateUserDealInput;
import com.linkedbook.dto.userDeal.selectUserDeal.SelectUserDealInput;
import com.linkedbook.response.PageResponse;
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

    /**
     * 유저 거래 내역 조회 API [GET] /user-deals
     * 
     * @return Response<Page<SelectUserDealOutput>>
     */
    // Params
    @ResponseBody
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
    @ResponseBody
    @PatchMapping("/{id}")
    public Response<Object> updateUserDeal(@RequestBody UpdateUserDealInput updateUserDealInput,
            @PathVariable("id") int userDealId) {
        log.info("[PATCH] /user-deals/" + userDealId);
        return userDealService.updateUserDeal(updateUserDealInput, userDealId);
    }

}
