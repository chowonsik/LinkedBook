package com.linkedbook.dto.deal.selectDeal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class SelectDealInput {
    private String search;
    private String filter;
    private Integer userId;
    private String bookId;
    private Integer areaId;
    private int page;
    private int size;
}
