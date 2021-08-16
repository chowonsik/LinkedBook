package com.linkedbook.dto.deal.selectDealDetail;

import com.querydsl.core.annotations.QueryProjection;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class SelectDealDetailOutput {
    private Integer dealId;
    private String dealTitle;
    private String dealContent;
    private List<SelectDealImage> dealImages;
    private Integer dealPrice;
    private String dealQuality;
    private Date dealCreatedAt;
    private Integer isLikeDeal;
    private String bookId;
    private String bookTitle;
    private String bookAuthor;
    private String bookPublisher;
    private Integer bookPrice;
    private Integer userId;
    private String userNickname;
    private String userImage;
    private String userDong;
    private double userMannerScore;

    @QueryProjection
    public SelectDealDetailOutput(Integer dealId, String dealTitle, String dealContent, Integer dealPrice,
            String dealQuality, Date dealCreatedAt, Integer isLikeDeal, String bookId, String bookTitle,
            String bookAuthor, String bookPublisher, Integer bookPrice, Integer userId, String userNickname,
            String userImage, String userDong, double userMannerScore) {
        this.dealId = dealId;
        this.dealTitle = dealTitle;
        this.dealContent = dealContent;
        this.dealPrice = dealPrice;
        this.dealQuality = dealQuality;
        this.dealCreatedAt = dealCreatedAt;
        this.isLikeDeal = isLikeDeal;
        this.bookId = bookId;
        this.bookTitle = bookTitle;
        this.bookAuthor = bookAuthor;
        this.bookPublisher = bookPublisher;
        this.bookPrice = bookPrice;
        this.userId = userId;
        this.userNickname = userNickname;
        this.userImage = userImage;
        this.userDong = userDong;
        this.userMannerScore = userMannerScore;
    }
}