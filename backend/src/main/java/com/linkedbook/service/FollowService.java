package com.linkedbook.service;

import com.linkedbook.dto.follow.FollowInput;
import com.linkedbook.dto.follow.FollowSearchOutput;
import com.linkedbook.dto.follow.FollowSearchInput;
import com.linkedbook.response.PageResponse;
import com.linkedbook.response.Response;

public interface FollowService {
    PageResponse<FollowSearchOutput> getFollowList(String info, FollowSearchInput followSearchInput);
    Response<Object> createFollowRelation(FollowInput followInput);
    Response<Object> deleteFollowRelation(int id);
}
