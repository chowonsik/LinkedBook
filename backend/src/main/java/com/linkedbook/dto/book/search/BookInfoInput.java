package com.linkedbook.dto.book.search;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@Getter
public class BookInfoInput {
    private String isbn;
    private String title;
    private int price;
    private String author;
    private String publisher;
    private String contents;
    private Date dateTime;
    private String thumbnail;
    private String status;
}
