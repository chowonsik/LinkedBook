package com.linkedbook.dto.deal.updateDeal;

import lombok.Getter;
import lombok.NoArgsConstructor;
import java.util.List;

@NoArgsConstructor
@Getter
public class UpdateDealInput {
    private String bookId;
    private String title;
    private Integer price;
    private String quality;
    private String content;
    private String status;
    private List<UpdateDealImage> images;
}