package com.linkedbook.dto.comment;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class CommentInput {
    String isbn;
    int score;
    String content;
}
