package com.linkedbook.service;

import com.linkedbook.dto.likeDeal.createLikeDeal.CreateLikeDealInput;
import com.linkedbook.dto.likeDeal.deleteLikeDeal.DeleteLikeDealInput;
import com.linkedbook.dto.likeDeal.selectLikeDeal.SelectLikeDealInput;
import com.linkedbook.dto.likeDeal.selectLikeDeal.SelectLikeDealOutput;
import com.linkedbook.response.PageResponse;
import com.linkedbook.response.Response;

public interface LikeDealService {
    Response<Object> createLikeDeal(CreateLikeDealInput createLikeDealInput);

    PageResponse<SelectLikeDealOutput> selectLikeDeal(SelectLikeDealInput selectLikeDealInput);

    Response<Object> deleteLikeDeal(DeleteLikeDealInput deleteLikeDealInput);
}
