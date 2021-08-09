package com.linkedbook.controller;

import com.linkedbook.dto.userArea.createUserArea.CreateUserAreaInput;
import com.linkedbook.response.Response;
import com.linkedbook.service.UserAreaService;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user-areas")
@AllArgsConstructor
@Slf4j
public class UserAreaController {

    private final UserAreaService userAreaService;

    /**
     * 유저 거래 지역 등록 API [POST] /user-areas
     * 
     * @return Response<Object>
     */
    // Body
    @ResponseBody
    @PostMapping
    public Response<Object> createUserArea(@RequestBody CreateUserAreaInput createUserAreaInput) {
        log.info("[POST] /user-areas");
        return userAreaService.createUserArea(createUserAreaInput);
    }

}
