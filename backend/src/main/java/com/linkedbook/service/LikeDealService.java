package com.linkedbook.service;

import com.linkedbook.dto.likeDeal.selectLikeDeal.SelectLikeDealInput;
import com.linkedbook.dto.likeDeal.selectLikeDeal.SelectLikeDealOutput;
import com.linkedbook.response.PageResponse;
import com.linkedbook.response.Response;

public interface LikeDealService {
    Response<Object> createLikeDeal(int dealId);

    PageResponse<SelectLikeDealOutput> selectLikeDeal(SelectLikeDealInput selectLikeDealInput);
}
