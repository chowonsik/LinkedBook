package com.linkedbook.dto.book.search;

import com.linkedbook.entity.BookDB;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class BookSearchOutput {
    private BookDB book;
    private boolean userLikeBook;
}
