package com.linkedbook.dto.deal.createDeal;

import lombok.Getter;
import lombok.NoArgsConstructor;
import java.util.List;

@NoArgsConstructor
@Getter
public class CreateDealInput {
    private String bookId;
    private String title;
    private int price;
    private String quality;
    private String content;
    private List<CreateDealImage> images;
}