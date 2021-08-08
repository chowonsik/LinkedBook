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
public class CommentOutput {
    // 한줄평 정보
    int commentId;
    double score;
    String content;
    Date created_at;
    Date updated_at;
    // 한줄평 좋아요 정보
    int likeCnt;
    boolean userLikeComment;
    // 유저 정보
    int userId;
    String userNickname;
    String userImage;
    // 책 정보
    String bookId;
    String bookTitle;
    String bookImage;
//    double bookScoreAvg; // [TODO] 책 상세정보를 조회할 때 얻도록 수정해야함
}