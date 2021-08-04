package com.linkedbook.service;

import com.linkedbook.dto.deal.createDeal.CreateDealInput;
import com.linkedbook.response.Response;

import java.util.List;

public interface DealService {
    Response<Object> createDeal(CreateDealInput createDealInput);
}
