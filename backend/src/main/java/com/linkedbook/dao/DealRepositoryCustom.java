package com.linkedbook.dao;

import com.linkedbook.dto.deal.selectDeal.SelectDealInput;
import com.linkedbook.dto.deal.selectDeal.SelectDealOutput;
import com.linkedbook.dto.deal.selectDealDetail.SelectDealDetailOutput;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface DealRepositoryCustom {
    Page<SelectDealOutput> findDynamicQueryDeal(SelectDealInput selectDealInput, Integer userId, Pageable pageable);

    SelectDealDetailOutput findDealDetail(Integer dealId, Integer userId);
}