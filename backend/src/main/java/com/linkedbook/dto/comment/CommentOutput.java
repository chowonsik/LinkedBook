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
    private int commentId;
    private double commentScore;
    private String commentContent;
    private Date created_at;
    private Date updated_at;
    // 한줄평 좋아요 정보
    private int likeCommentCnt;
    private boolean userLikeComment;
    // 유저 정보
    private int userId;
    private String userNickname;
    private String userImage;
    // 책 정보
    private String bookId;
    private String bookTitle;
    private String bookImage;
}