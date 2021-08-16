package com.linkedbook.dto.book.like;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Getter
public class LikeBookSearchInput {
    int userId;
    String bookId;
    int page;
    int size;
}
