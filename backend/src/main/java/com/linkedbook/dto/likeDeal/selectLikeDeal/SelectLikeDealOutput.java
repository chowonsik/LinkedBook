package com.linkedbook.dto.likeDeal.selectLikeDeal;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@NoArgsConstructor
@Getter
@Setter

public class SelectLikeDealOutput {
    private Integer dealId;
    private String dealTitle;
    private String dealImage;
    private Integer dealPrice;
    private String dealQuality;
    private Date dealCreatedAt;
    private Integer isLikeDeal;
    private String bookTitle;
    private String bookAuthor;
    private String bookPublisher;

    @QueryProjection
    public SelectLikeDealOutput(Integer dealId, String dealTitle, String dealImage, Integer dealPrice,
            String dealQuality, Date dealCreatedAt, Integer isLikeDeal, String bookTitle, String bookAuthor,
            String bookPublisher) {
        this.dealId = dealId;
        this.dealTitle = dealTitle;
        this.dealImage = dealImage;
        this.dealPrice = dealPrice;
        this.dealQuality = dealQuality;
        this.dealCreatedAt = dealCreatedAt;
        this.isLikeDeal = isLikeDeal;
        this.bookTitle = bookTitle;
        this.bookAuthor = bookAuthor;
        this.bookPublisher = bookPublisher;
    }

}