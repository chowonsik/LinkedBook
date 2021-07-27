package com.linkedbook.service;

import com.linkedbook.dto.follow.FollowInput;
import com.linkedbook.dto.follow.FollowOutput;
import com.linkedbook.response.Response;

import java.util.List;

public interface FollowService {
    Response<List<FollowOutput>> getFollowList(FollowInput followInput);
}
