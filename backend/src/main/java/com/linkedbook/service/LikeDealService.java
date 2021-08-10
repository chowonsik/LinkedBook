package com.linkedbook.service;

import com.linkedbook.response.Response;

public interface LikeDealService {
    Response<Object> createLikeDeal(int dealId);
}
