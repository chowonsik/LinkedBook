package com.linkedbook.dto.deal.selectDealDetail;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Setter
public class SelectDealImage {
    private String imageurl;
    private int orders;

    public SelectDealImage(String imageurl, int orders) {
        this.imageurl = imageurl;
        this.orders = orders;
    }
}