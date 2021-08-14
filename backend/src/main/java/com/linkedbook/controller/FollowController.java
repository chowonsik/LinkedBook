package com.linkedbook.controller;

import com.linkedbook.dto.follow.FollowInput;
import com.linkedbook.dto.follow.FollowSearchOutput;
import com.linkedbook.dto.follow.FollowSearchInput;
import com.linkedbook.response.PageResponse;
import com.linkedbook.response.Response;
import com.linkedbook.service.FollowService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/follow")
@AllArgsConstructor
@Slf4j
public class FollowController {

    private final FollowService followService;

    /**
     * 팔로우(follower / following) 유저 정보 조회 API
     * [GET] /follow/{info}
     * @param info follower: 유저를 팔로우하는 타 유저 정보를 원하는 상태 / following: 유저가 팔로우하는 타 유저 정보를 원하는 상태
     * @return PageResponse<FollowSearchOutput>
     */
    // Path-Variable, Params
    @ResponseBody
    @GetMapping("/{info}")
    public PageResponse<FollowSearchOutput> getFollowList(@PathVariable("info") String info, FollowSearchInput followSearchInput) {
        log.info("[GET] /follow/" + info);
        return followService.getFollowList(info, followSearchInput);
    }

    /**
     * 팔로우 상태 생성 API
     * [POST] /follow
     * @return Response<Object>
     */
    // Body
    @ResponseBody
    @PostMapping
    public Response<Object> createFollowRelation(@RequestBody FollowInput followInput) {
        log.info("[POST] /follow");
        return followService.createFollowRelation(followInput);
    }

    /**
     * 팔로우 상태 삭제 API
     * [DELETE] /follow/{id}
     * @return Response<Object>
     */
    // Path-Variable
    @ResponseBody
    @DeleteMapping("/{id}")
    public Response<Object> createFollowRelation(@PathVariable("id") int id) {
        log.info("[DELETE] /follow/" + id);
        return followService.deleteFollowRelation(id);
    }
}
