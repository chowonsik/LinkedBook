package com.linkedbook.dto.comment.like;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Getter
public class LikeCommentSearchInput {
    private int id;
    private int page;
    private int size;
}
