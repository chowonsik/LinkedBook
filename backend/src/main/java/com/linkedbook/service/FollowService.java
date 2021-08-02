package com.linkedbook.service;

import com.linkedbook.dto.follow.FollowInput;
import com.linkedbook.dto.follow.FollowOutput;
import com.linkedbook.response.Response;

import java.util.List;

public interface FollowService {
    Response<List<FollowOutput>> getFollowList(String info);
    Response<Object> createFollowRelation(FollowInput followInput);
    Response<Object> deleteFollowRelation(FollowInput followInput);
}
