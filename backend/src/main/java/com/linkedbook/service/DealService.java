package com.linkedbook.service;

import com.linkedbook.dto.deal.createDeal.CreateDealInput;
import com.linkedbook.dto.deal.selectDeal.SelectDealInput;
import com.linkedbook.dto.deal.selectDeal.SelectDealOutput;
import com.linkedbook.dto.deal.selectDealDetail.SelectDealDetailOutput;
import com.linkedbook.dto.deal.updateDeal.UpdateDealInput;
import com.linkedbook.response.Response;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface DealService {
    Response<Page<SelectDealOutput>> selectDealList(SelectDealInput selectDealInput, Pageable pageable);

    Response<Object> createDeal(CreateDealInput createDealInput);

    Response<Object> updateDeal(UpdateDealInput updateDealInput, int dealId);

    Response<SelectDealDetailOutput> selectDeal(int dealId);
}
