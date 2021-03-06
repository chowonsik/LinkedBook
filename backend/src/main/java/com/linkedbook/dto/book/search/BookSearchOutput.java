package com.linkedbook.dto.book.search;

import com.linkedbook.dto.common.CommonLikeOutput;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class BookSearchOutput {
    private String id;
    private String title;
    private int price;
    private String author;
    private String publisher;
    private String contents;
    private Date dateTime;
    private String image;
    private String status;
    private BookPopularOutput popular;
    private CommonLikeOutput like;
}