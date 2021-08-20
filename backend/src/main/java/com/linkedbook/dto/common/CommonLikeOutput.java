package com.linkedbook.dto.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class CommonLikeOutput {
    private int totalLikeCnt;
    private boolean userLike;
    private int id;
}
