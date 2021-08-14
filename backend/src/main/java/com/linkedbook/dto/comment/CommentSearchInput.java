package com.linkedbook.dto.comment;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Getter
public class CommentSearchInput {
    int userId;
    String bookId;
    int page;
    int size;
}
