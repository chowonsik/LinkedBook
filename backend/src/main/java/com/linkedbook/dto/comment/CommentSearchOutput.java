package com.linkedbook.dto.comment;

import com.linkedbook.dto.common.CommonCommentOutput;
import com.linkedbook.dto.common.CommonLikeOutput;
import com.linkedbook.dto.common.CommonProfileBookOutput;
import com.linkedbook.dto.common.CommonUserOutput;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class CommentSearchOutput {
    // 한줄평 정보
    private CommonCommentOutput comment;
    // 한줄평 좋아요 정보
    private CommonLikeOutput like;
    // 유저 정보
    private CommonUserOutput user;
    // 책 정보
    private CommonProfileBookOutput book;
}