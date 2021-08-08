package com.linkedbook.dto.comment;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class CommentInput {
    private String isbn;
    private double score;
    private String content;
}
