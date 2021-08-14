package com.linkedbook.dto.comment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class CommentBookOutput {
    private String id;
    private String title;
    private String image;
}
