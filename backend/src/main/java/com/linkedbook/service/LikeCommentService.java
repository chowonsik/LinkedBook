package com.linkedbook.service;

import com.linkedbook.dto.comment.like.LikeCommentInput;
import com.linkedbook.response.Response;

public interface LikeCommentService {
    Response<Object> createLikeComment(LikeCommentInput likeCommentInput);
    Response<Object> deleteLikeComment(int id);
}
