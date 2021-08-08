package com.linkedbook.dto.comment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class CommentByBookOutput {
    // 한줄평 정보
    int commentId;
    double score;
    String content;
    Date created_at;
    Date updated_at;
    // 유저 정보
    int userId;
    String nickname;
    String image;
    // 한줄평 좋아요 정보
    int likeCnt;
    boolean userLikeComment;
}
